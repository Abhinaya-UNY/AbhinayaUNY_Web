/**
 * Tier 1: Feature Coverage - YOLO Computer Vision & Pinhole IPM Geometry
 * Feature 16
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { VisionGeometry } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runYoloCVTests() {
  const vision = new VisionGeometry(0.285, 22.5, 320, 320, 160, 120);
  const robotTechSpecs = DomInspector.readFile('components/RobotTechSpecs.tsx');
  const krtmiData = DomInspector.readFile('data/krtmiData.ts');

  describe('Tier 1: Feature 16 - YOLOv8/11 Edge AI Detection & Spatial Coordinate Transformation', () => {
    test('T1.16.1: Technical specs document YOLOv8/YOLOv11 Edge AI inference running at 30+ FPS', () => {
      expect(robotTechSpecs).toContain('YOLOv8/11');
      expect(robotTechSpecs).toContain('30+ FPS');
      expect(krtmiData).toContain('YOLOv8/YOLOv11');
    });

    test('T1.16.2: Pixel centroid at principal point (u=160, v=120) maps to center optical axis', () => {
      const coords = vision.pixelToRobotCoordinates(160, 120);
      expect(coords.valid).toBe(true);
      expect(coords.yr).toBeCloseTo(0.0, 2); // Perfectly centered laterally
      expect(coords.xr).toBeGreaterThan(0.0); // Directly in front
    });

    test('T1.16.3: Pixel target to the left of image (u < 160) yields positive Yr (left lateral in robot frame)', () => {
      const coords = vision.pixelToRobotCoordinates(60, 120);
      expect(coords.valid).toBe(true);
      expect(coords.yr).toBeGreaterThan(0.0); // Target is to the robot's left
    });

    test('T1.16.4: Pixel target to the right of image (u > 160) yields negative Yr (right lateral in robot frame)', () => {
      const coords = vision.pixelToRobotCoordinates(260, 120);
      expect(coords.valid).toBe(true);
      expect(coords.yr).toBeLessThan(0.0); // Target is to the robot's right
    });

    test('T1.16.5: Holonomic pursuit generator produces velocity commands (Vx, Vy, wz) clamped to safe limits', () => {
      const cmd = vision.generatePursuitVelocity(0.8, -0.4, 1.0, 1.5, 1.2, 2.0);
      expect(cmd.vx).toBeLessThanOrEqual(1.2);
      expect(cmd.vx).toBeGreaterThanOrEqual(-1.2);
      expect(cmd.vy).toBeLessThanOrEqual(1.2);
      expect(cmd.vy).toBeGreaterThanOrEqual(-1.2);
      expect(cmd.wz).toBeLessThanOrEqual(2.0);
      expect(cmd.wz).toBeGreaterThanOrEqual(-2.0);
    });

    test('T1.16.6: Target at infinite distance or above camera horizon safely returns invalid flag', () => {
      const coords = vision.pixelToRobotCoordinates(160, -300); // Point above horizon
      expect(coords.valid).toBe(false);
    });
  });
}

module.exports = runYoloCVTests;

if (require.main === module) {
  runYoloCVTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
