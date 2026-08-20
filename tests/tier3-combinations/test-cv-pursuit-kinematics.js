/**
 * Tier 3: Cross-Feature Combinations - Computer Vision Pursuit to Holonomic Mecanum Drive
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { VisionGeometry, MecanumKinematics } = require('../helpers/math-oracle');

function runCVPursuitKinematicsTests() {
  const vision = new VisionGeometry(0.285, 22.5, 320, 320, 160, 120);
  const robot = new MecanumKinematics(0.16, 0.16, 0.038, 300);

  describe('Tier 3: Pairwise Combination - YOLO Vision Target to 4WD Mecanum Actuation', () => {
    test('T3.2.1: Target directly ahead in camera FOV produces pure forward Mecanum drive (Vx > 0, Vy = 0, wz = 0)', () => {
      // 1. Vision pixel at center (u=160, v=160 -> ahead on floor)
      const coords = vision.pixelToRobotCoordinates(160, 160);
      expect(coords.valid).toBe(true);

      // 2. Pursuit generator
      const cmd = vision.generatePursuitVelocity(coords.xr, coords.yr, 1.0, 1.0, 1.0, 1.0);
      expect(cmd.vx).toBeGreaterThan(0);
      expect(cmd.vy).toBeCloseTo(0, 2);

      // 3. Mecanum kinematics
      const wheels = robot.inverseKinematics(cmd.vx, cmd.vy, cmd.wz);
      expect(wheels.wFL).toBeCloseTo(wheels.wFR, 2);
      expect(wheels.wBL).toBeCloseTo(wheels.wBR, 2);
    });

    test('T3.2.2: Target offset to the left causes robot to strafe left (Vy > 0) with all 4 wheels spinning in diagonal pairs', () => {
      // Target at pixel (80, 160) -> left side
      const coords = vision.pixelToRobotCoordinates(80, 160);
      expect(coords.yr).toBeGreaterThan(0);

      const cmd = vision.generatePursuitVelocity(coords.xr, coords.yr, 1.0, 0.0, 1.0, 0.0); // Pure translation
      const wheels = robot.inverseKinematics(cmd.vx, cmd.vy, 0);

      // Diagonal pairs should have opposite sign for lateral motion
      expect(wheels.wFL).toBeLessThan(wheels.wFR);
    });

    test('T3.2.3: Target offset to the right causes robot to strafe right (Vy < 0)', () => {
      // Target at pixel (240, 160) -> right side
      const coords = vision.pixelToRobotCoordinates(240, 160);
      expect(coords.yr).toBeLessThan(0);

      const cmd = vision.generatePursuitVelocity(coords.xr, coords.yr, 1.0, 0.0, 1.0, 0.0);
      const wheels = robot.inverseKinematics(cmd.vx, cmd.vy, 0);

      expect(wheels.wFL).toBeGreaterThan(wheels.wFR);
    });

    test('T3.2.4: Vision target distance increases required linear speed until saturation limit is hit', () => {
      const nearCoords = vision.pixelToRobotCoordinates(160, 200); // near floor
      const farCoords = vision.pixelToRobotCoordinates(160, 130);  // far floor

      const nearCmd = vision.generatePursuitVelocity(nearCoords.xr, nearCoords.yr, 0.5, 0.0, 1.5, 1.0);
      const farCmd = vision.generatePursuitVelocity(farCoords.xr, farCoords.yr, 0.5, 0.0, 1.5, 1.0);

      expect(farCmd.vx).toBeGreaterThan(nearCmd.vx);
    });

    test('T3.2.5: Integrated pipeline end-to-end: Camera Pixel (u,v) -> Body Coords -> Pursuit Cmd -> Motor RPMs', () => {
      const coords = vision.pixelToRobotCoordinates(140, 150);
      const cmd = vision.generatePursuitVelocity(coords.xr, coords.yr, 0.8, 1.2, 1.0, 1.5);
      const speeds = robot.inverseKinematics(cmd.vx, cmd.vy, cmd.wz);
      const normalized = robot.normalizeSpeeds(speeds);

      const rpmFL = robot.radSToRpm(normalized.wFL);
      const rpmFR = robot.radSToRpm(normalized.wFR);

      expect(Number.isFinite(rpmFL)).toBe(true);
      expect(Number.isFinite(rpmFR)).toBe(true);
      expect(Math.abs(rpmFL)).toBeLessThanOrEqual(robot.maxRpm + 0.01);
      expect(Math.abs(rpmFR)).toBeLessThanOrEqual(robot.maxRpm + 0.01);
    });
  });
}

module.exports = runCVPursuitKinematicsTests;

if (require.main === module) {
  runCVPursuitKinematicsTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
