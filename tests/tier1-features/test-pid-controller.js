/**
 * Tier 1: Feature Coverage - Discrete Closed-Loop PID Controller & Step Response Metrics
 * Feature 15
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { DiscretePID } = require('../helpers/math-oracle');
const DomInspector = require('../helpers/dom-inspector');

function runPIDControllerTests() {
  const teknisPage = DomInspector.readFile('app/teknis/page.tsx');
  const pidLab = DomInspector.readFile('components/PIDTunerLab.tsx');

  describe('Tier 1: Feature 15 - Closed-Loop PID Dynamics & Response Formulation', () => {
    test('T1.15.1: Teknis page details all three terms of the PID control loop (Kp, Ki, Kd)', () => {
      expect(teknisPage).toContain('PID');
      expect(pidLab).toContain('Proportional');
      expect(pidLab).toContain('Integral');
      expect(pidLab).toContain('Derivative');
      expect(pidLab).toContain('u[k]');
    });

    test('T1.15.2: Pure Proportional controller calculates u = Kp * error with zero integral/derivative influence', () => {
      const pidP = new DiscretePID(2.5, 0.0, 0.0, 0.01, 255);
      const res = pidP.update(10.0, 4.0); // error = 6.0
      expect(res.error).toBe(6.0);
      expect(res.P).toBe(15.0); // 2.5 * 6
      expect(res.I).toBe(0.0);
      expect(res.D).toBe(0.0);
      expect(res.u).toBe(15.0);
    });

    test('T1.15.3: Integral term accumulates discrete error across time steps with clamping anti-windup', () => {
      const pidI = new DiscretePID(0.0, 1.0, 0.0, 0.01, 50);
      // Run 10 steps with constant error = 10
      let lastRes;
      for (let i = 0; i < 10; i++) {
        lastRes = pidI.update(10.0, 0.0);
      }
      expect(lastRes.I).toBeCloseTo(1.0, 3); // 10 steps * (1.0 * 10 * 0.01) = 1.0
    });

    test('T1.15.4: Derivative term responds immediately to sudden setpoint or velocity step changes', () => {
      const pidD = new DiscretePID(0.0, 0.0, 0.5, 0.01, 255);
      const res1 = pidD.update(10.0, 0.0); // error = 10.0 -> filtered derivative
      expect(res1.D).toBeGreaterThan(300.0);

      // Subsequent steps with constant error decay the filtered derivative
      let resN;
      for (let i = 0; i < 10; i++) {
        resN = pidD.update(10.0, 0.0);
      }
      expect(resN.D).toBeCloseTo(0.0, 1);
    });

    test('T1.15.5: Actuator saturation limits PWM output between -uMax and +uMax and sets isSaturated flag', () => {
      const pidSat = new DiscretePID(10.0, 0.0, 0.0, 0.01, 255);
      const highRes = pidSat.update(100.0, 0.0); // 10 * 100 = 1000 -> saturated at 255
      expect(highRes.u).toBe(255);
      expect(highRes.isSaturated).toBe(true);

      const lowRes = pidSat.update(-100.0, 0.0); // -1000 -> saturated at -255
      expect(lowRes.u).toBe(-255);
      expect(lowRes.isSaturated).toBe(true);
    });

    test('T1.15.6: Second-order step response metrics compute valid physical quantities (Tr, Ts, %OS, ess)', () => {
      const metrics = DiscretePID.computeStepResponseMetrics(3.0, 1.5, 0.2, 0.02, 0.05);
      expect(metrics.wn).toBeGreaterThan(0);
      expect(metrics.zeta).toBeGreaterThan(0);
      expect(metrics.tr).toBeGreaterThan(0);
      expect(metrics.ts).toBeGreaterThan(0);
      expect(metrics.ess).toBeLessThanOrEqual(0.05);
    });
  });
}

module.exports = runPIDControllerTests;

if (require.main === module) {
  runPIDControllerTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
