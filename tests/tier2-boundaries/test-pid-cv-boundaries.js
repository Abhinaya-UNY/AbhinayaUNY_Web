/**
 * Tier 2: Boundary & Corner Cases - PID Controller & Vision IPM Geometry
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { DiscretePID, VisionGeometry } = require('../helpers/math-oracle');

function runPIDCVBoundariesTests() {
  const vision = new VisionGeometry(0.285, 22.5, 320, 320, 160, 120);

  describe('Tier 2: Boundary Cases - PID Controller & CV Boundaries', () => {
    test('T2.2.1: Zero Gains (Kp=0, Ki=0, Kd=0) generates exactly 0.0 actuator output for any error', () => {
      const pid = new DiscretePID(0, 0, 0, 0.01, 255);
      const res = pid.update(100.0, 0.0);
      expect(res.u).toBe(0);
      expect(res.P).toBe(0);
      expect(res.I).toBe(0);
      expect(res.D).toBe(0);
    });

    test('T2.2.2: Negative or Zero Ki in step response metrics safely returns finite/infinite boundary representations', () => {
      const zeroKiMetrics = DiscretePID.computeStepResponseMetrics(2.0, 0.0, 0.1);
      expect(zeroKiMetrics.wn).toBe(0);
      expect(zeroKiMetrics.tr).toBe(Infinity);
      const negKiMetrics = DiscretePID.computeStepResponseMetrics(2.0, -1.0, 0.1);
      expect(negKiMetrics.wn).toBe(0);
    });

    test('T2.2.3: Anti-windup saturation clamps both positive and negative extremes to +-uMax', () => {
      const pid = new DiscretePID(0, 50.0, 0, 0.1, 255);
      // Large negative error
      for (let i = 0; i < 30; i++) {
        pid.update(-50.0, 0.0);
      }
      const negRes = pid.update(-50.0, 0.0);
      expect(negRes.I).toBeGreaterThanOrEqual(-255);
      expect(negRes.I).toBe(-255);

      // Large positive error
      for (let i = 0; i < 30; i++) {
        pid.update(50.0, 0.0);
      }
      const posRes = pid.update(50.0, 0.0);
      expect(posRes.I).toBeLessThanOrEqual(255);
      expect(posRes.I).toBe(255);
    });

    test('T2.2.4: High sampling rate / small dt (dt = 0.0001s) remains numerically stable in PID', () => {
      const fastPid = new DiscretePID(3.0, 1.0, 0.05, 0.0001, 255);
      const res = fastPid.update(1.0, 0.0);
      expect(Number.isFinite(res.u)).toBe(true);
      expect(res.P).toBeCloseTo(3.0, 2);
    });

    test('T2.2.5: Vision IPM pixel coordinate far below image bottom (extreme near field) resolves to valid ground point', () => {
      const coords = vision.pixelToRobotCoordinates(160, 240); // Image bottom
      expect(coords.valid).toBe(true);
      expect(coords.xr).toBeGreaterThan(0);
    });

    test('T2.2.6: Vision IPM pixel above horizon (v < 0 or negative denominator) safely flags invalid without crashing', () => {
      const coords = vision.pixelToRobotCoordinates(160, -500);
      expect(coords.valid).toBe(false);
      expect(coords.xr).toBe(Infinity);
    });

    test('T2.2.7: Pursuit velocity generator clamps extreme target distances to vMax and wMax', () => {
      // Extremely far target (Xr = 100m, Yr = 50m)
      const cmd = vision.generatePursuitVelocity(100.0, 50.0, 1.0, 1.5, 1.5, 3.0);
      expect(cmd.vx).toBe(1.5);
      expect(cmd.vy).toBe(1.5);
      expect(Math.abs(cmd.wz)).toBeLessThanOrEqual(3.0);
    });
  });
}

module.exports = runPIDCVBoundariesTests;

if (require.main === module) {
  runPIDCVBoundariesTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
