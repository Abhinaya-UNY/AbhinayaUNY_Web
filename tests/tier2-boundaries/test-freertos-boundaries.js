/**
 * Tier 2: Boundary & Corner Cases - FreeRTOS Timing & CPU Budget Overflows
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { FreeRTOSScheduler } = require('../helpers/math-oracle');

function runFreeRTOSBoundariesTests() {
  describe('Tier 2: Boundary Cases - FreeRTOS Scheduler & Timing Overflows', () => {
    test('T2.3.1: Task configuration with execution budget equal to period yields 100% CPU load', () => {
      const overloadedTasks = [
        { name: 'vTaskHeavy', priority: 5, freqHz: 100, periodMs: 10.0, budgetMs: 10.0, core: 1 },
      ];
      const res = FreeRTOSScheduler.calculateCpuUtilization(overloadedTasks);
      expect(res.totalUtilizationPct).toBeCloseTo(100.0, 1);
      expect(res.idleHeadroomPct).toBeCloseTo(0.0, 1);
    });

    test('T2.3.2: Task configuration exceeding 100% CPU utilization flags isFeasible as false', () => {
      const excessiveTasks = [
        { name: 'vTaskHeavy1', priority: 5, freqHz: 100, periodMs: 10.0, budgetMs: 8.0, core: 1 },
        { name: 'vTaskHeavy2', priority: 4, freqHz: 100, periodMs: 10.0, budgetMs: 5.0, core: 1 },
      ];
      const res = FreeRTOSScheduler.calculateCpuUtilization(excessiveTasks);
      expect(res.totalUtilizationPct).toBeCloseTo(130.0, 1);
      expect(res.isFeasible).toBe(false);
      expect(res.idleHeadroomPct).toBe(0);
    });

    test('T2.3.3: Zero task list yields 0% CPU utilization and 100% idle headroom', () => {
      const emptyTasks = [];
      const res = FreeRTOSScheduler.calculateCpuUtilization(emptyTasks);
      expect(res.totalUtilizationPct).toBe(0);
      expect(res.idleHeadroomPct).toBe(100);
      expect(res.isFeasible).toBe(true);
    });

    test('T2.3.4: Tasks with 0 or negative periods safely avoid division by zero (NaN protection)', () => {
      const invalidTasks = [
        { name: 'vTaskInvalid', priority: 1, freqHz: 0, periodMs: 0, budgetMs: 1.0, core: 0 },
      ];
      const res = FreeRTOSScheduler.calculateCpuUtilization(invalidTasks);
      expect(Number.isNaN(res.totalUtilizationPct)).toBe(false);
      expect(res.totalUtilizationPct).toBe(0);
    });

    test('T2.3.5: Highest real-time task priority (Priority 5) is higher than background supervisory tasks (Priority 2)', () => {
      const standardTasks = FreeRTOSScheduler.getStandardTasks();
      const pidTask = standardTasks.find(t => t.name === 'vTaskMotorPID');
      const watchdog = standardTasks.find(t => t.name === 'vTaskSafetyWatchdog');
      expect(pidTask.priority).toBeGreaterThan(watchdog.priority);
    });
  });
}

module.exports = runFreeRTOSBoundariesTests;

if (require.main === module) {
  runFreeRTOSTests = runFreeRTOSBoundariesTests;
  runFreeRTOSTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
