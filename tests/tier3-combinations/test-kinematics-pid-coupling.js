/**
 * Tier 3: Cross-Feature Combinations - Kinematics & PID Controller Coupling
 */

const { describe, test, it, expect } = require('../helpers/test-framework');
const { MecanumKinematics, DiscretePID } = require('../helpers/math-oracle');

function runKinematicsPIDCouplingTests() {
  const robot = new MecanumKinematics(0.16, 0.16, 0.038, 300);

  describe('Tier 3: Pairwise Combination - Kinematics to Motor PID Closed-Loop Pipeline', () => {
    test('T3.1.1: Forward chassis command (Vx = 1.0 m/s) computes target wheel setpoints that converge in closed-loop', () => {
      // 1. Compute wheel target speeds
      const targets = robot.inverseKinematics(1.0, 0, 0); // ~26.315 rad/s
      const pidFL = new DiscretePID(15.0, 8.0, 0.2, 0.01, 255);

      let currentSpeed = 0.0;
      // Simulate closed loop over 300 steps (3.0s)
      for (let step = 0; step < 300; step++) {
        const out = pidFL.update(targets.wFL, currentSpeed);
        const torque = (out.u / 255) * 8.0;
        const acc = (torque - 0.08 * currentSpeed) / 0.02;
        currentSpeed += acc * 0.01;
      }

      // Check tracking error convergence
      const finalError = Math.abs(targets.wFL - currentSpeed);
      expect(finalError).toBeLessThan(1.5); // within 1.5 rad/s convergence
      expect(currentSpeed).toBeGreaterThan(24.0);
    });

    test('T3.1.2: Changing chassis wheelbase (Lx, Ly) alters required wheel angular setpoints for rotational maneuvers', () => {
      const standardRobot = new MecanumKinematics(0.16, 0.16, 0.038);
      const wideRobot = new MecanumKinematics(0.32, 0.32, 0.038);

      const stdSpeeds = standardRobot.inverseKinematics(0, 0, 1.0);
      const wideSpeeds = wideRobot.inverseKinematics(0, 0, 1.0);

      // Wide robot requires exactly 2x angular wheel speed to achieve same rotational rate
      expect(Math.abs(wideSpeeds.wFL)).toBeCloseTo(2 * Math.abs(stdSpeeds.wFL), 2);
    });

    test('T3.1.3: Decreasing wheel radius (Rw = 0.019m vs 0.038m) doubles required motor RPM for same linear speed', () => {
      const standardWheel = new MecanumKinematics(0.16, 0.16, 0.038);
      const smallWheel = new MecanumKinematics(0.16, 0.16, 0.019);

      const std = standardWheel.inverseKinematics(1.0, 0, 0);
      const small = smallWheel.inverseKinematics(1.0, 0, 0);

      expect(small.wFL).toBeCloseTo(2 * std.wFL, 2);
    });

    test('T3.1.4: Motor speed saturation propagates correctly to PID anti-windup clamp', () => {
      const targets = robot.inverseKinematics(5.0, 0, 0); // Pure high forward speed (+131.5 rad/s)
      const normalized = robot.normalizeSpeeds(targets);
      const pid = new DiscretePID(10.0, 5.0, 0.1, 0.01, 255);

      const out = pid.update(normalized.wFL, 0.0);
      expect(out.u).toBe(255);
      expect(out.isSaturated).toBe(true);
    });

    test('T3.1.5: Bidirectional motion (reversing direction) reverses PID control effort u smoothly', () => {
      const pid1 = new DiscretePID(2.0, 0.5, 0.05, 0.01, 255);
      const forwardRes = pid1.update(20.0, 10.0); // +10 error -> positive u
      expect(forwardRes.u).toBeGreaterThan(0);

      const pid2 = new DiscretePID(2.0, 0.5, 0.05, 0.01, 255);
      const reverseRes = pid2.update(-20.0, -10.0); // -10 error -> negative u
      expect(reverseRes.u).toBeLessThan(0);
      expect(Math.abs(forwardRes.u)).toBeCloseTo(Math.abs(reverseRes.u), 2);
    });
  });
}

module.exports = runKinematicsPIDCouplingTests;

if (require.main === module) {
  runKinematicsPIDCouplingTests();
  const { reporter } = require('../helpers/test-framework');
  reporter.summary();
}
