/**
 * Tier 1: Feature Coverage - 3WD Kiwi & 4WD Omni Kinematics
 * Feature 13
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { OmniKinematics } = require('../helpers/math-oracle');

function runOmniKinematicsTests() {
  const omni = new OmniKinematics(0.20, 0.038);

  describe('Tier 1: Feature 13 - 3WD Kiwi & 4WD Omni-Directional Kinematics', () => {
    test('T1.13.1: 3WD Kiwi inverse kinematics at pure forward translation (Vx = 1.0, Vy = 0, wz = 0)', () => {
      const { w1, w2, w3 } = omni.inverse3WD(1.0, 0, 0);
      const invR = 1.0 / 0.038;
      // w1 = -1/R * 1.0, w2 = 0.5/R * 1.0, w3 = 0.5/R * 1.0
      expect(w1).toBeCloseTo(-invR, 2);
      expect(w2).toBeCloseTo(0.5 * invR, 2);
      expect(w3).toBeCloseTo(0.5 * invR, 2);
    });

    test('T1.13.2: 3WD Kiwi inverse kinematics at pure lateral strafe (Vx = 0, Vy = 1.0, wz = 0)', () => {
      const { w1, w2, w3 } = omni.inverse3WD(0, 1.0, 0);
      const invR = 1.0 / 0.038;
      const sqrt3_2 = Math.sqrt(3) / 2;
      expect(w1).toBeCloseTo(0, 2);
      expect(w2).toBeCloseTo(-sqrt3_2 * invR, 2);
      expect(w3).toBeCloseTo(sqrt3_2 * invR, 2);
    });

    test('T1.13.3: 3WD Kiwi pure rotation (wz = 1.0 rad/s) drives all 3 wheels with equal speed and sign', () => {
      const { w1, w2, w3 } = omni.inverse3WD(0, 0, 1.0);
      const expected = (1.0 / 0.038) * 0.20;
      expect(w1).toBeCloseTo(expected, 2);
      expect(w2).toBeCloseTo(expected, 2);
      expect(w3).toBeCloseTo(expected, 2);
    });

    test('T1.13.4: 3WD Kiwi forward kinematics reconstructs original inputs (Fwd * Inv = I)', () => {
      const testInputs = [
        { vx: 0.5, vy: 0.3, wz: 0.1 },
        { vx: -0.8, vy: -0.4, wz: 0.5 },
        { vx: 1.2, vy: 0.0, wz: -0.8 },
      ];
      for (const input of testInputs) {
        const inv = omni.inverse3WD(input.vx, input.vy, input.wz);
        const fwd = omni.forward3WD(inv.w1, inv.w2, inv.w3);
        expect(fwd.vx).toBeCloseTo(input.vx, 3);
        expect(fwd.vy).toBeCloseTo(input.vy, 3);
        expect(fwd.wz).toBeCloseTo(input.wz, 3);
      }
    });

    test('T1.13.5: 4WD Corner Omni (45°, 135°, 225°, 315°) pure translation yields balanced wheel pairs', () => {
      const { w1, w2, w3, w4 } = omni.inverse4WD(1.0, 0, 0);
      const factor = 1 / (Math.SQRT2 * 0.038);
      expect(w1).toBeCloseTo(-factor, 2);
      expect(w2).toBeCloseTo(-factor, 2);
      expect(w3).toBeCloseTo(factor, 2);
      expect(w4).toBeCloseTo(factor, 2);
    });

    test('T1.13.6: 4WD Corner Omni pure rotation produces equal rotational velocities across all 4 wheels', () => {
      const { w1, w2, w3, w4 } = omni.inverse4WD(0, 0, 1.0);
      const expected = (1 / 0.038) * 0.20; // sqrt(2) cancels
      expect(w1).toBeCloseTo(expected, 2);
      expect(w2).toBeCloseTo(expected, 2);
      expect(w3).toBeCloseTo(expected, 2);
      expect(w4).toBeCloseTo(expected, 2);
    });
  });
}

module.exports = runOmniKinematicsTests;

if (require.main === module) {
  runOmniKinematicsTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
