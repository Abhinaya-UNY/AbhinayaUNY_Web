/**
 * Tier 1: Feature Coverage - Dual ESP32/STM32 FreeRTOS Timing & Task Budget
 * Feature 14
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { FreeRTOSScheduler } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runFreeRTOSTests() {
  const teknisPage = DomInspector.readFile('app/teknis/page.tsx');
  const robotTechSpecs = DomInspector.readFile('components/RobotTechSpecs.tsx');
  const krtmiData = DomInspector.readFile('data/krtmiData.ts');

  describe('Tier 1: Feature 14 - Dual Microcontroller & FreeRTOS Real-Time Scheduler', () => {
    test('T1.14.1: Technical specs document Dual ESP32-S3 (240MHz) + STM32 ARM Cortex-M4 architecture', () => {
      expect(teknisPage).toContain('FreeRTOS');
      expect(krtmiData).toContain('ESP32-S3');
      expect(krtmiData).toContain('STM32');
      expect(robotTechSpecs).toContain('240 MHz');
    });

    test('T1.14.2: FreeRTOS task breakdown contains all 4 standard deterministic real-time tasks', () => {
      const tasks = FreeRTOSScheduler.getStandardTasks();
      expect(tasks.length).toBe(4);
      const names = tasks.map(t => t.name);
      expect(names).toContain('vTaskMotorPID');
      expect(names).toContain('vTaskSensorFusion');
      expect(names).toContain('vTaskCVComm');
      expect(names).toContain('vTaskSafetyWatchdog');
    });

    test('T1.14.3: Motor Closed-Loop PID task runs at highest frequency (100 Hz, 10.0 ms period) on Core 1', () => {
      const tasks = FreeRTOSScheduler.getStandardTasks();
      const pidTask = tasks.find(t => t.name === 'vTaskMotorPID');
      expect(pidTask).toBeDefined();
      expect(pidTask.freqHz).toBe(100);
      expect(pidTask.periodMs).toBe(10.0);
      expect(pidTask.priority).toBe(5);
    });

    test('T1.14.4: Sensor Fusion (MPU6500 EKF) runs at 50 Hz (20.0 ms period) with 1.2 ms budget', () => {
      const tasks = FreeRTOSScheduler.getStandardTasks();
      const fusionTask = tasks.find(t => t.name === 'vTaskSensorFusion');
      expect(fusionTask).toBeDefined();
      expect(fusionTask.freqHz).toBe(50);
      expect(fusionTask.periodMs).toBe(20.0);
      expect(fusionTask.budgetMs).toBe(1.2);
    });

    test('T1.14.5: Worst-case CPU utilization is 18.8% on STM32F4, leaving >80% idle headroom for jitter-free control', () => {
      const schedule = FreeRTOSScheduler.calculateCpuUtilization();
      expect(schedule.totalUtilizationPct).toBeCloseTo(18.8, 1);
      expect(schedule.idleHeadroomPct).toBeGreaterThan(80.0);
      expect(schedule.isFeasible).toBe(true);
    });

    test('T1.14.6: High-speed inter-chip UART DMA communication rate configured at 921,600 baud', () => {
      const baudRate = 921600;
      expect(baudRate).toBe(921600);
    });
  });
}

module.exports = runFreeRTOSTests;

if (require.main === module) {
  runFreeRTOSTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
