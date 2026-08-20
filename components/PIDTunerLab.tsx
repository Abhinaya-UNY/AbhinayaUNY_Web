'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Sliders, RefreshCw, CheckCircle2, AlertTriangle, Play } from 'lucide-react';

export const PIDTunerLab: React.FC = () => {
  const [kp, setKp] = useState<number>(3.2);
  const [ki, setKi] = useState<number>(1.8);
  const [kd, setKd] = useState<number>(0.45);
  const [setpoint, setSetpoint] = useState<number>(1.0); // 1.0 m/s target
  const [disturbance, setDisturbance] = useState<number>(0.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulate discrete closed-loop motor step response
  const simulateStepResponse = () => {
    const dt = 0.01; // 10ms sampling interval (100Hz)
    const steps = 150; // 1.5 seconds simulation
    const timeData: number[] = [];
    const responseData: number[] = [];
    const controlData: number[] = [];

    let currentVelocity = 0.0;
    let prevError = 0.0;
    let integralError = 0.0;
    const J = 0.02; // Motor rotor inertia
    const B = 0.08; // Viscous friction damping

    let peakValue = 0.0;
    let riseTime: number | null = null;
    let settlingTime: number | null = null;

    for (let i = 0; i < steps; i++) {
      const t = i * dt;
      timeData.push(t);

      const target = t >= 0.1 ? setpoint : 0.0;
      const error = target - currentVelocity;

      // PID terms
      const P = kp * error;
      integralError += error * dt;
      // Clamping anti-windup
      integralError = Math.max(-5.0, Math.min(5.0, integralError));
      const I = ki * integralError;
      const D = kd * (error - prevError) / dt;

      let u = P + I + D;
      // Actuator saturation (-12V to +12V normalized)
      u = Math.max(-12.0, Math.min(12.0, u));
      controlData.push(u);

      // Motor physics simulation: J*dv/dt + B*v = u - disturbance
      const load = t >= 0.8 ? disturbance : 0.0;
      const acceleration = (u - B * currentVelocity - load) / J;
      currentVelocity += acceleration * dt;
      responseData.push(currentVelocity);

      prevError = error;

      // Transient metric tracking
      if (t >= 0.1) {
        if (currentVelocity > peakValue) {
          peakValue = currentVelocity;
        }
        if (riseTime === null && currentVelocity >= 0.9 * setpoint) {
          riseTime = t - 0.1;
        }
        if (Math.abs(currentVelocity - setpoint) > 0.02 * setpoint) {
          settlingTime = t - 0.1;
        }
      }
    }

    const percentOvershoot = Math.max(0, ((peakValue - setpoint) / setpoint) * 100);
    const steadyStateError = Math.abs(setpoint - responseData[responseData.length - 1]);

    return {
      timeData,
      responseData,
      controlData,
      metrics: {
        peakValue: peakValue.toFixed(3),
        overshoot: percentOvershoot.toFixed(1),
        riseTime: riseTime ? (riseTime * 1000).toFixed(0) + ' ms' : '< 10 ms',
        settlingTime: settlingTime ? (settlingTime * 1000).toFixed(0) + ' ms' : 'Optimal',
        steadyStateError: (steadyStateError * 100).toFixed(2) + '%',
      },
    };
  };

  const simulation = simulateStepResponse();

  // Draw simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background & grid
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 30; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Setpoint Line
    const targetY = height - 40 - setpoint * 140;
    ctx.strokeStyle = '#38BDF8';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, targetY);
    ctx.lineTo(width - 20, targetY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Response Curve
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const len = simulation.responseData.length;
    for (let i = 0; i < len; i++) {
      const px = 40 + (i / len) * (width - 60);
      const py = height - 40 - simulation.responseData[i] * 140;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px monospace';
    ctx.fillText('0.0s', 40, height - 15);
    ctx.fillText('0.5s', width * 0.35, height - 15);
    ctx.fillText('1.0s', width * 0.65, height - 15);
    ctx.fillText('1.5s', width - 40, height - 15);
    ctx.fillText(`Target: ${setpoint.toFixed(1)} m/s`, width - 110, targetY - 6);

  }, [kp, ki, kd, setpoint, disturbance]);

  const applyPreset = (type: string) => {
    if (type === 'optimal') {
      setKp(3.2); setKi(1.8); setKd(0.45);
    } else if (type === 'underdamped') {
      setKp(6.5); setKi(0.5); setKd(0.05);
    } else if (type === 'overdamped') {
      setKp(1.2); setKi(0.4); setKd(0.8);
    } else if (type === 'fast_agile') {
      setKp(4.5); setKi(2.5); setKd(0.6);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border space-y-6 shadow-2xl hud-corner">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-emerald/20 text-brand-emerald flex items-center justify-center border border-brand-emerald/40">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Simulator Closed-Loop PID Velocity Loop (100 Hz)
            </h3>
            <p className="text-xs text-slate-400">
              Uji respons transien motor DC: Rise Time, Settling Time, Persen Overshoot, dan Penolakan Gangguan Beban.
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => applyPreset('optimal')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-brand-cyan/15 text-brand-cyan hover:bg-brand-cyan hover:text-black transition"
          >
            Optimal PID
          </button>
          <button
            type="button"
            onClick={() => applyPreset('fast_agile')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold text-slate-400 hover:text-white transition"
          >
            Fast Agile
          </button>
          <button
            type="button"
            onClick={() => applyPreset('underdamped')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold text-slate-400 hover:text-white transition"
          >
            Underdamped
          </button>
          <button
            type="button"
            onClick={() => applyPreset('overdamped')}
            className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold text-slate-400 hover:text-white transition"
          >
            Overdamped
          </button>
        </div>
      </div>

      {/* Grid: Sliders & Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
          
          <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
            Parameter Gain PID Loop:
          </div>

          {/* Kp */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Proportional Gain (Kp):</span>
              <span className="font-mono text-brand-cyan font-bold">{kp.toFixed(2)}</span>
            </div>
            <input
              type="range" min="0.1" max="10.0" step="0.1" value={kp}
              onChange={(e) => setKp(parseFloat(e.target.value))}
              className="w-full accent-[#00F5D4]"
            />
          </div>

          {/* Ki */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Integral Gain (Ki):</span>
              <span className="font-mono text-brand-emerald font-bold">{ki.toFixed(2)}</span>
            </div>
            <input
              type="range" min="0.0" max="6.0" step="0.1" value={ki}
              onChange={(e) => setKi(parseFloat(e.target.value))}
              className="w-full accent-[#10B981]"
            />
          </div>

          {/* Kd */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Derivative Gain (Kd):</span>
              <span className="font-mono text-sky-400 font-bold">{kd.toFixed(2)}</span>
            </div>
            <input
              type="range" min="0.0" max="2.0" step="0.05" value={kd}
              onChange={(e) => setKd(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          {/* Disturbance Slider */}
          <div className="space-y-1 text-xs pt-2 border-t border-slate-800">
            <div className="flex justify-between text-slate-300">
              <span>Beban Gangguan / Friction Drag (t=0.8s):</span>
              <span className="font-mono text-amber-400 font-bold">{disturbance.toFixed(1)} N·m</span>
            </div>
            <input
              type="range" min="0.0" max="4.0" step="0.2" value={disturbance}
              onChange={(e) => setDisturbance(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Formula preview */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 space-y-1">
            <div className="text-brand-cyan">u[k] = Kp·e[k] + Ki·∫e dt + Kd·(Δe/Δt)</div>
            <div>Frekuensi Sampling: 100 Hz (Δt = 10ms STM32 Hardware Timer)</div>
          </div>
        </div>

        {/* Canvas & Metrics Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Canvas Step Graph */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              width={600}
              height={260}
              className="w-full h-auto block rounded-xl"
            />
          </div>

          {/* Real-Time Transient Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-0.5 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Rise Time (Tr)</div>
              <div className="text-sm font-black text-brand-cyan">{simulation.metrics.riseTime}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-0.5 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Overshoot (%OS)</div>
              <div className="text-sm font-black text-amber-400">{simulation.metrics.overshoot}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-0.5 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Settling (Ts)</div>
              <div className="text-sm font-black text-sky-400">{simulation.metrics.settlingTime}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-0.5 text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Steady Err (ess)</div>
              <div className="text-sm font-black text-emerald-400">{simulation.metrics.steadyStateError}</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
