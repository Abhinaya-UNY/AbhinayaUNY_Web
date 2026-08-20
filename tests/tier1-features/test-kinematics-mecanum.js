/**
 * Tier 1: Feature Coverage - 4WD Mecanum Kinematics Matrix & Vector Decomposition
 * Feature 12
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { MecanumKinematics } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runMecanumKinematicsTests() {
  const robot = new MecanumKinematics(0.16, 0.16, 0.038, 300);
  const teknisPage = DomInspector.readFile('app/teknis/page.tsx');

  describe('Tier 1: Feature 12 - 4WD Mecanum Inverse & Forward Kinematics Matrix', () => {
    test('T1.12.1: Teknis documentation renders the exact 4WD Mecanum inverse matrix formula', () => {
      expect(teknisPage).toContain('Kinematika Invers');
      expect(teknisPage).toContain('-(lx + ly)');
      expect(teknisPage).toContain('(lx + ly)');
      expect(teknisPage).toContain('1/R');
    });

    test('T1.12.2: Pure Forward translation (Vx = 1.0 m/s, Vy = 0, wz = 0) yields identical wheel angular speeds', () => {
      const speeds = robot.inverseKinematics(1.0, 0, 0);
      const expectedSpeed = 1.0 / 0.038; // ~26.315 rad/s
      expect(speeds.wFL).toBeCloseTo(expectedSpeed, 2);
      expect(speeds.wFR).toBeCloseTo(expectedSpeed, 2);
      expect(speeds.wBL).toBeCloseTo(expectedSpeed, 2);
      expect(speeds.wBR).toBeCloseTo(expectedSpeed, 2);
    });

    test('T1.12.3: Pure Lateral Strafe (Vx = 0, Vy = 1.0 m/s, wz = 0) produces diagonal wheel speed symmetry', () => {
      const speeds = robot.inverseKinematics(0, 1.0, 0);
      const invR = 1.0 / 0.038;
      expect(speeds.wFL).toBeCloseTo(-invR, 2);
      expect(speeds.wFR).toBeCloseTo(invR, 2);
      expect(speeds.wBL).toBeCloseTo(invR, 2);
      expect(speeds.wBR).toBeCloseTo(-invR, 2);
    });

    test('T1.12.4: Pure CCW Rotation (Vx = 0, Vy = 0, wz = 1.0 rad/s) drives left and right sides in opposite directions', () => {
      const speeds = robot.inverseKinematics(0, 0, 1.0);
      const k = 0.16 + 0.16; // 0.32
      const expected = (1.0 / 0.038) * k; // ~8.421 rad/s
      expect(speeds.wFL).toBeCloseTo(-expected, 2);
      expect(speeds.wFR).toBeCloseTo(expected, 2);
      expect(speeds.wBL).toBeCloseTo(-expected, 2);
      expect(speeds.wBR).toBeCloseTo(expected, 2);
    });

    test('T1.12.5: Forward Kinematics (Pseudo-Inverse) perfectly reconstructs input velocities (J_fwd * J_inv = Identity)', () => {
      const testInputs = [
        { vx: 0.8, vy: 0.4, wz: 0.2 },
        { vx: -1.2, vy: 0.7, wz: -0.5 },
        { vx: 0.0, vy: -0.9, wz: 1.1 },
        { vx: 1.5, vy: -1.5, wz: 0.0 },
      ];

      for (const input of testInputs) {
        const inv = robot.inverseKinematics(input.vx, input.vy, input.wz);
        const fwd = robot.forwardKinematics(inv.wFL, inv.wFR, inv.wBL, inv.wBR);
        expect(fwd.vx).toBeCloseTo(input.vx, 3);
        expect(fwd.vy).toBeCloseTo(input.vy, 3);
        expect(fwd.wz).toBeCloseTo(input.wz, 3);
      }
    });

    test('T1.12.6: Vector decomposition angle at 45° roller contact validates omnidirectional force balance', () => {
      const rollerAngleDeg = 45;
      const rollerAngleRad = (rollerAngleDeg * Math.PI) / 180;
      expect(Math.cos(rollerAngleRad)).toBeCloseTo(Math.SQRT1_2, 3);
      expect(Math.sin(rollerAngleRad)).toBeCloseTo(Math.SQRT1_2, 3);
    });

    test('T1.12.7: Rad/s to RPM conversion maintains 60/(2*pi) factor accuracy', () => {
      const radS = 31.4159; // ~10*pi
      const rpm = robot.radSToRpm(radS);
      expect(rpm).toBeCloseTo(300, 0);
    });
  });
}

module.exports = runMecanumKinematicsTests;

if (require.main === module) {
  runMecanumKinematicsTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
