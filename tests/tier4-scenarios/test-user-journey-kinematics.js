/**
 * Tier 4: Real-World Scenarios - User Journey 3: Kinematics Lab Parameter Sweep & Controller Analysis
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { MecanumKinematics, DiscretePID, FreeRTOSScheduler } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runUserJourneyKinematicsTests() {
  const teknisPage = DomInspector.readFile('app/teknis/page.tsx');

  describe('Tier 4: Scenario 3 - Engineer Performs Kinematics Sweep & Controller Tuning in Lab', () => {
    test('T4.3.1: Engineer navigates to /teknis and page renders interactive equations and controller blueprints', () => {
      expect(teknisPage).toContain('Spesifikasi Teknis');
      expect(teknisPage).toContain('Kinematika Invers');
      expect(teknisPage).toContain('Loop Tertutup PID');
      expect(teknisPage).toContain('FreeRTOS');
      expect(teknisPage).toContain('Visi Komputer Edge AI');
    });

    test('T4.3.2: Engineer sweeps robot chassis dimensions across micro (0.1m) to heavy-duty (0.5m) configurations', () => {
      const sizes = [0.10, 0.16, 0.25, 0.50];
      for (const size of sizes) {
        const chassis = new MecanumKinematics(size, size, 0.038);
        const inv = chassis.inverseKinematics(0.8, -0.4, 0.5);
        const fwd = chassis.forwardKinematics(inv.wFL, inv.wFR, inv.wBL, inv.wBR);
        expect(fwd.vx).toBeCloseTo(0.8, 3);
        expect(fwd.vy).toBeCloseTo(-0.4, 3);
        expect(fwd.wz).toBeCloseTo(0.5, 3);
      }
    });

    test('T4.3.3: Engineer performs PID parameter sweep to optimize Rise Time and Overshoot', () => {
      // 1. Underdamped tuning (low Kp, high Ki -> zeta < 1 -> overshoot > 0)
      const underdamped = DiscretePID.computeStepResponseMetrics(0.2, 5.0, 0.0, 0.02, 0.05);
      // 2. Overdamped tuning (high Kp -> zeta >= 1 -> overshoot = 0)
      const overdamped = DiscretePID.computeStepResponseMetrics(3.0, 0.5, 0.1, 0.02, 0.05);

      expect(underdamped.overshootPct).toBeGreaterThan(0);
      expect(underdamped.overshootPct).toBeGreaterThan(overdamped.overshootPct);
      expect(overdamped.zeta).toBeGreaterThan(underdamped.zeta);
    });

    test('T4.3.4: Engineer evaluates FreeRTOS task timing headroom on dual-core embedded architecture', () => {
      const schedule = FreeRTOSScheduler.calculateCpuUtilization();
      expect(schedule.isFeasible).toBe(true);
      expect(schedule.totalUtilizationPct).toBeLessThan(25.0); // well within safe margin
      expect(schedule.idleHeadroomPct).toBeGreaterThan(75.0);
    });

    test('T4.3.5: Discrete velocity loop executes 100 iterations without numerical divergence or oscillation explosion', () => {
      const pid = new DiscretePID(5.0, 2.0, 0.05, 0.01, 255);
      let speed = 0;
      const targetSpeed = 25.0; // rad/s
      for (let i = 0; i < 100; i++) {
        const res = pid.update(targetSpeed, speed);
        // Simple motor simulation update
        speed += (res.u / 255) * 50.0 * 0.01;
        expect(Number.isFinite(res.u)).toBe(true);
      }
      expect(speed).toBeGreaterThan(15.0); // Successfully accelerated towards 25 rad/s
    });
  });
}

module.exports = runUserJourneyKinematicsTests;

if (require.main === module) {
  runUserJourneyKinematicsTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
