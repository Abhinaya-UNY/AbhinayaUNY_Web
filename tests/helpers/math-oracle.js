/**
 * Authoritative Mathematical & Engineering Oracle for Abhinaya UNY Robotics Platform
 * Reference: explorer_technical/handoff.md & spec_miner_archive/handoff.md
 */

// ==========================================
// 1. 4WD MECANUM KINEMATICS ORACLE
// ==========================================
class MecanumKinematics {
  constructor(lx = 0.16, ly = 0.16, rw = 0.038, maxRpm = 300) {
    this.lx = lx; // Half wheelbase (meters)
    this.ly = ly; // Half trackwidth (meters)
    this.rw = rw; // Wheel radius (meters)
    this.maxRpm = maxRpm;
    this.maxRadS = (maxRpm * 2 * Math.PI) / 60; // Max rad/s
  }

  /**
   * Inverse Kinematics: Computes wheel angular speeds (rad/s) from planar velocity (Vx, Vy, Omega)
   * Formula:
   * w1 (FL) = (1/Rw) * (Vx - Vy - (lx + ly)*wz)
   * w2 (FR) = (1/Rw) * (Vx + Vy + (lx + ly)*wz)
   * w3 (BL) = (1/Rw) * (Vx + Vy - (lx + ly)*wz)
   * w4 (BR) = (1/Rw) * (Vx - Vy + (lx + ly)*wz)
   */
  inverseKinematics(vx, vy, wz) {
    const k = this.lx + this.ly;
    const invR = 1 / this.rw;
    const wFL = invR * (vx - vy - k * wz);
    const wFR = invR * (vx + vy + k * wz);
    const wBL = invR * (vx + vy - k * wz);
    const wBR = invR * (vx - vy + k * wz);
    return { wFL, wFR, wBL, wBR };
  }

  /**
   * Forward Kinematics: Computes chassis velocity (Vx, Vy, Omega) from wheel angular speeds (rad/s)
   * Using Moore-Penrose Pseudo-inverse:
   * Vx = (Rw/4) * (wFL + wFR + wBL + wBR)
   * Vy = (Rw/4) * (-wFL + wFR + wBL - wBR)
   * wz = (Rw / (4 * (lx + ly))) * (-wFL + wFR - wBL + wBR)
   */
  forwardKinematics(wFL, wFR, wBL, wBR) {
    const k = this.lx + this.ly;
    const r4 = this.rw / 4;
    const vx = r4 * (wFL + wFR + wBL + wBR);
    const vy = r4 * (-wFL + wFR + wBL - wBR);
    const wz = (this.rw / (4 * k)) * (-wFL + wFR - wBL + wBR);
    return { vx, vy, wz };
  }

  /**
   * Normalization: If any wheel exceeds maxRadS, scale all 4 wheels proportionally
   */
  normalizeSpeeds(speeds) {
    const { wFL, wFR, wBL, wBR } = speeds;
    const maxSpeed = Math.max(Math.abs(wFL), Math.abs(wFR), Math.abs(wBL), Math.abs(wBR));
    if (maxSpeed > this.maxRadS && maxSpeed > 0) {
      const scale = this.maxRadS / maxSpeed;
      return {
        wFL: wFL * scale,
        wFR: wFR * scale,
        wBL: wBL * scale,
        wBR: wBR * scale,
        isSaturated: true,
        scaleFactor: scale,
      };
    }
    return { ...speeds, isSaturated: false, scaleFactor: 1.0 };
  }

  /**
   * Rad/s to RPM converter
   */
  radSToRpm(radS) {
    return (radS * 60) / (2 * Math.PI);
  }

  /**
   * RPM to Rad/s converter
   */
  rpmToRadS(rpm) {
    return (rpm * 2 * Math.PI) / 60;
  }
}

// ==========================================
// 2. 3WD KIWI & 4WD CORNER OMNI ORACLE
// ==========================================
class OmniKinematics {
  constructor(rBase = 0.20, rw = 0.038) {
    this.rBase = rBase; // Center to wheel radius (m)
    this.rw = rw;       // Wheel radius (m)
  }

  /**
   * 3WD Kiwi Holonomic (Angles: 90 deg, 210 deg, 330 deg)
   * w1 = (1/Rw) * (-Vx + 0*Vy + rBase*wz)
   * w2 = (1/Rw) * (0.5*Vx - (sqrt(3)/2)*Vy + rBase*wz)
   * w3 = (1/Rw) * (0.5*Vx + (sqrt(3)/2)*Vy + rBase*wz)
   */
  inverse3WD(vx, vy, wz) {
    const invR = 1 / this.rw;
    const sqrt3_2 = Math.sqrt(3) / 2;
    const w1 = invR * (-vx + this.rBase * wz);
    const w2 = invR * (0.5 * vx - sqrt3_2 * vy + this.rBase * wz);
    const w3 = invR * (0.5 * vx + sqrt3_2 * vy + this.rBase * wz);
    return { w1, w2, w3 };
  }

  forward3WD(w1, w2, w3) {
    const r = this.rw;
    const vx = r * ((-2 / 3) * w1 + (1 / 3) * w2 + (1 / 3) * w3);
    const vy = r * ((0) * w1 - (1 / Math.sqrt(3)) * w2 + (1 / Math.sqrt(3)) * w3);
    const wz = (r / (3 * this.rBase)) * (w1 + w2 + w3);
    return { vx, vy, wz };
  }

  /**
   * 4WD Corner Omni (Angles: 45 deg, 135 deg, 225 deg, 315 deg)
   * w1 = (1 / (sqrt(2)*Rw)) * (-Vx + Vy + sqrt(2)*rBase*wz)
   * w2 = (1 / (sqrt(2)*Rw)) * (-Vx - Vy + sqrt(2)*rBase*wz)
   * w3 = (1 / (sqrt(2)*Rw)) * ( Vx - Vy + sqrt(2)*rBase*wz)
   * w4 = (1 / (sqrt(2)*Rw)) * ( Vx + Vy + sqrt(2)*rBase*wz)
   */
  inverse4WD(vx, vy, wz) {
    const invR_sqrt2 = 1 / (Math.SQRT2 * this.rw);
    const rot = Math.SQRT2 * this.rBase * wz;
    const w1 = invR_sqrt2 * (-vx + vy + rot);
    const w2 = invR_sqrt2 * (-vx - vy + rot);
    const w3 = invR_sqrt2 * (vx - vy + rot);
    const w4 = invR_sqrt2 * (vx + vy + rot);
    return { w1, w2, w3, w4 };
  }
}

// ==========================================
// 3. CLOSED-LOOP DISCRETE PID ORACLE
// ==========================================
class DiscretePID {
  constructor(kp = 2.0, ki = 0.5, kd = 0.05, dt = 0.01, uMax = 255, tauF = 0.005) {
    this.kp = kp;
    this.ki = ki;
    this.kd = kd;
    this.dt = dt;
    this.uMax = uMax;
    this.tauF = tauF; // Low-pass filter constant

    this.integral = 0;
    this.prevError = 0;
    this.prevD = 0;
  }

  reset() {
    this.integral = 0;
    this.prevError = 0;
    this.prevD = 0;
  }

  update(setpoint, measured) {
    const error = setpoint - measured;

    // Proportional
    const P = this.kp * error;

    // Integral with Anti-windup clamp
    this.integral += this.ki * error * this.dt;
    this.integral = Math.max(-this.uMax, Math.min(this.uMax, this.integral));
    const I = this.integral;

    // Derivative with 1st-order low-pass filter
    const dError = error - this.prevError;
    const D = (this.kd * dError + this.tauF * this.prevD) / (this.dt + this.tauF);
    this.prevD = D;
    this.prevError = error;

    // Output with Actuator saturation clamp
    const uRaw = P + I + D;
    const uClamped = Math.max(-this.uMax, Math.min(this.uMax, uRaw));

    return {
      u: uClamped,
      P,
      I,
      D,
      error,
      isSaturated: Math.abs(uRaw) > this.uMax,
    };
  }

  /**
   * Second-Order Response Metrics for transfer function
   * Jm = 0.02, Bm = 0.05
   */
  static computeStepResponseMetrics(kp, ki, kd, jm = 0.02, bm = 0.05) {
    if (ki <= 0 || kp < 0) {
      return { wn: 0, zeta: 0, overshootPct: 0, tr: Infinity, ts: Infinity, ess: 0 };
    }
    const wn = Math.sqrt(ki / jm);
    const zeta = (bm + kp) / (2 * Math.sqrt(jm * ki));

    let overshootPct = 0;
    if (zeta >= 0 && zeta < 1) {
      overshootPct = Math.exp((-zeta * Math.PI) / Math.sqrt(1 - zeta * zeta)) * 100;
    }

    const tr = wn > 0 ? 1.8 / wn : Infinity;
    const ts = (zeta > 0 && wn > 0) ? 4 / (zeta * wn) : Infinity;
    const ess = 0; // Integral action guarantees zero steady-state error

    return { wn, zeta, overshootPct, tr, ts, ess };
  }
}

// ==========================================
// 4. FREERTOS TASK SCHEDULER & CPU BUDGET ORACLE
// ==========================================
class FreeRTOSScheduler {
  static getStandardTasks() {
    return [
      { name: 'vTaskMotorPID', priority: 5, freqHz: 100, periodMs: 10.0, budgetMs: 0.8, core: 1 },
      { name: 'vTaskSensorFusion', priority: 4, freqHz: 50, periodMs: 20.0, budgetMs: 1.2, core: 1 },
      { name: 'vTaskCVComm', priority: 3, freqHz: 30, periodMs: 33.33, budgetMs: 1.5, core: 0 },
      { name: 'vTaskSafetyWatchdog', priority: 2, freqHz: 10, periodMs: 100.0, budgetMs: 0.3, core: 1 },
    ];
  }

  static calculateCpuUtilization(tasks = FreeRTOSScheduler.getStandardTasks()) {
    let totalUtil = 0;
    const taskUtils = tasks.map(t => {
      if (t.periodMs <= 0 || t.freqHz <= 0) return { ...t, utilPct: 0 };
      const utilPct = (t.budgetMs / t.periodMs) * 100;
      totalUtil += utilPct;
      return { ...t, utilPct };
    });
    const idleHeadroomPct = Math.max(0, 100 - totalUtil);
    return {
      totalUtilizationPct: totalUtil,
      idleHeadroomPct,
      taskBreakdown: taskUtils,
      isFeasible: totalUtil < 100,
    };
  }
}

// ==========================================
// 5. YOLO COMPUTER VISION & PINHOLE IPM ORACLE
// ==========================================
class VisionGeometry {
  constructor(hCam = 0.285, alphaTiltDeg = 22.5, fx = 320, fy = 320, cx = 160, cy = 120) {
    this.hCam = hCam; // Camera height (m)
    this.alphaTilt = (alphaTiltDeg * Math.PI) / 180; // Pitch angle (rad)
    this.fx = fx;
    this.fy = fy;
    this.cx = cx;
    this.cy = cy;
    this.dx = 0.15; // Chassis forward offset (m)
    this.dy = 0.0;  // Chassis lateral offset (m)
  }

  /**
   * Pinhole IPM: Pixel coordinate (u, v) -> Ground 3D Target (Xr, Yr) in robot body frame
   */
  pixelToRobotCoordinates(u, v) {
    const xn = (u - this.cx) / this.fx;
    const yn = (v - this.cy) / this.fy;

    const denom = Math.sin(this.alphaTilt) + yn * Math.cos(this.alphaTilt);
    if (denom <= 0.0001) {
      // Point at or above horizon
      return { xr: Infinity, yr: Infinity, valid: false };
    }

    const zc = this.hCam / denom;
    const xc = xn * zc;
    const yc = yn * zc;

    const xr = zc * Math.cos(this.alphaTilt) - yc * Math.sin(this.alphaTilt) + this.dx;
    const yr = -xc + this.dy;

    const distance = Math.sqrt(xr * xr + yr * yr);
    const headingError = Math.atan2(yr, xr);

    return { xr, yr, zc, distance, headingError, valid: true };
  }

  /**
   * Proportional-Pursuit Holonomic Velocity Generator
   */
  generatePursuitVelocity(xr, yr, kv = 1.0, kw = 1.5, vMax = 1.0, wMax = 2.0) {
    const vx = Math.max(-vMax, Math.min(vMax, kv * xr));
    const vy = Math.max(-vMax, Math.min(vMax, kv * yr));
    const heading = Math.atan2(yr, xr);
    const wz = Math.max(-wMax, Math.min(wMax, kw * heading));
    return { vx, vy, wz };
  }
}

// ==========================================
// 6. OFFICIAL COMPETITION SCORING ORACLES
// ==========================================
class CompetitionScoring {
  /**
   * KRTMI 2019 Scoring (UDINUS Semarang)
   * Rice Stalk: +10 pts each (max 3, total max 30)
   * Weed Removal: +15 pts each (max 2, total max 30)
   * Harvest: +30 pts
   * Total max: 90 pts
   * Instant win: PANEN RAYA
   */
  static score2019({ ricePlanted = 0, weedsRemoved = 0, harvested = false, trampled = false }) {
    if (trampled) {
      const pts = Math.min(3, ricePlanted) * 10 + Math.min(2, weedsRemoved) * 15 + (harvested ? 30 : 0);
      return { totalScore: pts, isPanenRaya: false, reason: 'Trampling rice stalk revokes Panen Raya' };
    }
    const isPanenRaya = ricePlanted >= 3 && weedsRemoved >= 2 && harvested;
    const totalScore = Math.min(3, ricePlanted) * 10 + Math.min(2, weedsRemoved) * 15 + (harvested ? 30 : 0);
    return { totalScore, isPanenRaya, reason: isPanenRaya ? 'PANEN RAYA INSTANT VICTORY' : 'Points calculation' };
  }

  /**
   * KRTMI 2024 Scoring (UMS Surakarta)
   * Correct Item: +3 pts
   * Drop / Disposal: -1 pt
   * Wrong Category: 0 pt
   * Foul (>10s idle in Zona Umum): -1 pt
   * Instant win: BERSIH (5 boxes cleared with 0 drops/fouls)
   */
  static score2024({ correctSort = 0, dropped = 0, fouls = 0, boxesCompleted = 0 }) {
    const rawScore = (correctSort * 3) - (dropped * 1) - (fouls * 1);
    const isBersih = boxesCompleted >= 5 && dropped === 0 && fouls === 0 && correctSort >= 15;
    return {
      totalScore: rawScore,
      isBersih,
      correctPoints: correctSort * 3,
      penaltyPoints: -(dropped + fouls),
      verdict: isBersih ? 'BERSIH INSTANT VICTORY' : `Score: ${rawScore} pts`,
    };
  }

  /**
   * Technocorner 2026 Scoring (FT UGM)
   * Battery voltage limit: <= 13.0V
   * Box transfer: Must be lifted, pushing not allowed
   */
  static scoreTechnocorner2026({ boxesInDropZone = 0, pointsPerBox = 10, batteryVoltage = 12.6, pushedBoxes = false, inFinishArea = true }) {
    if (batteryVoltage > 13.0) {
      return { totalScore: 0, disqualified: true, reason: 'Battery voltage exceeds 13.0V limit' };
    }
    if (pushedBoxes) {
      return { totalScore: 0, disqualified: false, foul: true, reason: 'Payload boxes pushed rather than lifted' };
    }
    const totalScore = (boxesInDropZone * pointsPerBox) + (inFinishArea ? 20 : 0);
    return { totalScore, disqualified: false, inFinishArea, reason: 'Valid run' };
  }
}

module.exports = {
  MecanumKinematics,
  OmniKinematics,
  DiscretePID,
  FreeRTOSScheduler,
  VisionGeometry,
  CompetitionScoring,
};
