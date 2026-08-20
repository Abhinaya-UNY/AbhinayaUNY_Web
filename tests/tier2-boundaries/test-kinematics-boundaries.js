/**
 * Tier 2: Boundary & Corner Cases - Kinematics Vector Boundaries
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { MecanumKinematics, OmniKinematics } = require('../helpers/math-oracle');

function runKinematicsBoundariesTests() {
  const robot = new MecanumKinematics(0.16, 0.16, 0.038, 300);
  const omni = new OmniKinematics(0.20, 0.038);

  describe('Tier 2: Boundary Cases - Kinematics Extremes & Velocity Vectors', () => {
    test('T2.1.1: Zero Velocity Vector (Vx=0, Vy=0, wz=0) results in exactly 0.0 rad/s on all 4 wheels', () => {
      const speeds = robot.inverseKinematics(0, 0, 0);
      expect(speeds.wFL).toBe(0);
      expect(speeds.wFR).toBe(0);
      expect(speeds.wBL).toBe(0);
      expect(speeds.wBR).toBe(0);
    });

    test('T2.1.2: Forward Kinematics with all 0 wheel speeds produces exactly 0 translation and rotation', () => {
      const fwd = robot.forwardKinematics(0, 0, 0, 0);
      expect(fwd.vx).toBe(0);
      expect(fwd.vy).toBe(0);
      expect(fwd.wz).toBe(0);
    });

    test('T2.1.3: Maximum RPM saturation properly scales all 4 wheels preserving trajectory vector angle', () => {
      // High speed input exceeding 300 RPM (~31.415 rad/s)
      const rawSpeeds = robot.inverseKinematics(3.0, 3.0, 2.0);
      const normalized = robot.normalizeSpeeds(rawSpeeds);
      expect(normalized.isSaturated).toBe(true);
      expect(normalized.scaleFactor).toBeLessThan(1.0);
      expect(Math.abs(normalized.wFL)).toBeLessThanOrEqual(robot.maxRadS + 0.001);
      expect(Math.abs(normalized.wFR)).toBeLessThanOrEqual(robot.maxRadS + 0.001);
      expect(Math.abs(normalized.wBL)).toBeLessThanOrEqual(robot.maxRadS + 0.001);
      expect(Math.abs(normalized.wBR)).toBeLessThanOrEqual(robot.maxRadS + 0.001);
    });

    test('T2.1.4: Speeds within max RPM limit are not scaled (scaleFactor = 1.0, isSaturated = false)', () => {
      const rawSpeeds = robot.inverseKinematics(0.2, 0.2, 0.1);
      const normalized = robot.normalizeSpeeds(rawSpeeds);
      expect(normalized.isSaturated).toBe(false);
      expect(normalized.scaleFactor).toBe(1.0);
      expect(normalized.wFL).toBeCloseTo(rawSpeeds.wFL, 4);
    });

    test('T2.1.5: Ultra-small wheel radius (Rw = 0.001 m) computes high angular speeds without NaN or Infinity', () => {
      const tinyWheelRobot = new MecanumKinematics(0.16, 0.16, 0.001, 5000);
      const speeds = tinyWheelRobot.inverseKinematics(1.0, 0, 0);
      expect(Number.isFinite(speeds.wFL)).toBe(true);
      expect(speeds.wFL).toBe(1000); // 1.0 / 0.001 = 1000 rad/s
    });

    test('T2.1.6: Large chassis dimensions (Lx = 5.0m, Ly = 5.0m) preserves forward-inverse transformation', () => {
      const largeRobot = new MecanumKinematics(5.0, 5.0, 0.1, 1000);
      const inv = largeRobot.inverseKinematics(2.0, -1.5, 0.5);
      const fwd = largeRobot.forwardKinematics(inv.wFL, inv.wFR, inv.wBL, inv.wBR);
      expect(fwd.vx).toBeCloseTo(2.0, 3);
      expect(fwd.vy).toBeCloseTo(-1.5, 3);
      expect(fwd.wz).toBeCloseTo(0.5, 3);
    });

    test('T2.1.7: Extreme aspect ratio chassis (Lx = 10.0m, Ly = 0.1m) handles rotational components smoothly', () => {
      const longRobot = new MecanumKinematics(10.0, 0.1, 0.05, 1000);
      const inv = longRobot.inverseKinematics(0, 0, 2.0);
      expect(inv.wFL).toBeCloseTo(-((10.1 * 2.0) / 0.05), 2);
    });

    test('T2.1.8: 3WD Kiwi Omni handles pure zero inputs cleanly', () => {
      const { w1, w2, w3 } = omni.inverse3WD(0, 0, 0);
      expect(w1).toBe(0);
      expect(w2).toBe(0);
      expect(w3).toBe(0);
    });

    test('T2.1.9: 4WD Corner Omni handles zero inputs cleanly', () => {
      const { w1, w2, w3, w4 } = omni.inverse4WD(0, 0, 0);
      expect(w1).toBe(0);
      expect(w2).toBe(0);
      expect(w3).toBe(0);
      expect(w4).toBe(0);
    });

    test('T2.1.10: Extreme angular velocity (wz = 50 rad/s) without translation produces pure symmetric wheel rotation', () => {
      const inv = robot.inverseKinematics(0, 0, 50.0);
      expect(inv.wFL).toBeCloseTo(-inv.wFR, 2);
      expect(inv.wBL).toBeCloseTo(-inv.wBR, 2);
    });
  });
}

module.exports = runKinematicsBoundariesTests;

if (require.main === module) {
  runKinematicsBoundariesTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
