'use client';

import React, { useState } from 'react';
import { Activity, Compass, RotateCw, Play, RefreshCw, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';

type DrivetrainType = '4wd_mecanum' | '3wd_kiwi' | '4wd_omni';

export const KinematicsLab: React.FC = () => {
  const [drivetrain, setDrivetrain] = useState<DrivetrainType>('4wd_mecanum');
  
  // Velocity inputs
  const [vx, setVx] = useState<number>(0.5); // m/s forward/back
  const [vy, setVy] = useState<number>(0.2); // m/s left/right
  const [wz, setWz] = useState<number>(0.0); // rad/s rotation

  // Robot parameters
  const lx = 0.16; // 16 cm half-length
  const ly = 0.16; // 16 cm half-width
  const rw = 0.038; // 38 mm wheel radius
  const rBase = 0.20; // 20 cm kiwi omni radius

  // Calculate Wheel Velocities (rad/s & RPM)
  const calculateWheels = () => {
    if (drivetrain === '4wd_mecanum') {
      // 4WD Mecanum Inverse Kinematics
      const wFL = (1 / rw) * (vx - vy - (lx + ly) * wz);
      const wFR = (1 / rw) * (vx + vy + (lx + ly) * wz);
      const wBL = (1 / rw) * (vx + vy - (lx + ly) * wz);
      const wBR = (1 / rw) * (vx - vy + (lx + ly) * wz);
      return [
        { name: 'Front-Left (FL)', w: wFL, rpm: (wFL * 60) / (2 * Math.PI) },
        { name: 'Front-Right (FR)', w: wFR, rpm: (wFR * 60) / (2 * Math.PI) },
        { name: 'Back-Left (BL)', w: wBL, rpm: (wBL * 60) / (2 * Math.PI) },
        { name: 'Back-Right (BR)', w: wBR, rpm: (wBR * 60) / (2 * Math.PI) },
      ];
    } else if (drivetrain === '3wd_kiwi') {
      // 3WD Kiwi Omni (120 deg: 90, 210, 330)
      const w1 = (1 / rw) * (-vx + rBase * wz);
      const w2 = (1 / rw) * (0.5 * vx - (Math.sqrt(3) / 2) * vy + rBase * wz);
      const w3 = (1 / rw) * (0.5 * vx + (Math.sqrt(3) / 2) * vy + rBase * wz);
      return [
        { name: 'Top Wheel (90°)', w: w1, rpm: (w1 * 60) / (2 * Math.PI) },
        { name: 'Rear-Left (210°)', w: w2, rpm: (w2 * 60) / (2 * Math.PI) },
        { name: 'Rear-Right (330°)', w: w3, rpm: (w3 * 60) / (2 * Math.PI) },
      ];
    } else {
      // 4WD Omni 45 deg Corner Layout
      const invSqrt2 = 1 / Math.SQRT2;
      const w1 = (1 / (rw * Math.SQRT2)) * (-vx + vy + Math.SQRT2 * rBase * wz);
      const w2 = (1 / (rw * Math.SQRT2)) * (-vx - vy + Math.SQRT2 * rBase * wz);
      const w3 = (1 / (rw * Math.SQRT2)) * (vx - vy + Math.SQRT2 * rBase * wz);
      const w4 = (1 / (rw * Math.SQRT2)) * (vx + vy + Math.SQRT2 * rBase * wz);
      return [
        { name: 'Wheel 1 (45°)', w: w1, rpm: (w1 * 60) / (2 * Math.PI) },
        { name: 'Wheel 2 (135°)', w: w2, rpm: (w2 * 60) / (2 * Math.PI) },
        { name: 'Wheel 3 (225°)', w: w3, rpm: (w3 * 60) / (2 * Math.PI) },
        { name: 'Wheel 4 (315°)', w: w4, rpm: (w4 * 60) / (2 * Math.PI) },
      ];
    }
  };

  const wheels = calculateWheels();
  const linearSpeed = Math.sqrt(vx * vx + vy * vy);
  const headingAngle = Math.atan2(vy, vx) * (180 / Math.PI);

  const resetVelocities = () => {
    setVx(0.5);
    setVy(0.0);
    setWz(0.0);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border space-y-6 shadow-2xl hud-corner">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Laboratorium Kinematika Vektor Holonomik
            </h3>
            <p className="text-xs text-slate-400">
              Kalkulator Invers &amp; Maju Kinematika Matriks Penggerak 4WD Mecanum dan Omniwheel Holonomik.
            </p>
          </div>
        </div>

        {/* Drivetrain Selector */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setDrivetrain('4wd_mecanum')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              drivetrain === '4wd_mecanum'
                ? 'bg-brand-cyan text-black shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4WD Mecanum
          </button>
          <button
            type="button"
            onClick={() => setDrivetrain('3wd_kiwi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              drivetrain === '3wd_kiwi'
                ? 'bg-brand-cyan text-black shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3WD Kiwi Omni
          </button>
          <button
            type="button"
            onClick={() => setDrivetrain('4wd_omni')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              drivetrain === '4wd_omni'
                ? 'bg-brand-cyan text-black shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4WD Omni 45°
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
              Vektor Kecepatan Sasis:
            </span>
            <button
              type="button"
              onClick={resetVelocities}
              className="text-[11px] font-mono text-slate-400 hover:text-brand-cyan flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Vx Slider */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Kecepatan Longitudinal (Vx Maju/Mundur):</span>
              <span className="font-mono text-brand-cyan font-bold">{vx.toFixed(2)} m/s</span>
            </div>
            <input
              type="range" min="-1.5" max="1.5" step="0.05" value={vx}
              onChange={(e) => setVx(parseFloat(e.target.value))}
              className="w-full accent-[#00F5D4]"
            />
          </div>

          {/* Vy Slider */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Kecepatan Lateral (Vy Kiri/Kanan Strafe):</span>
              <span className="font-mono text-brand-cyan font-bold">{vy.toFixed(2)} m/s</span>
            </div>
            <input
              type="range" min="-1.5" max="1.5" step="0.05" value={vy}
              onChange={(e) => setVy(parseFloat(e.target.value))}
              className="w-full accent-[#00F5D4]"
            />
          </div>

          {/* Wz Slider */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Kecepatan Sudut (Wz Yaw Rotasi):</span>
              <span className="font-mono text-sky-400 font-bold">{wz.toFixed(2)} rad/s</span>
            </div>
            <input
              type="range" min="-3.14" max="3.14" step="0.1" value={wz}
              onChange={(e) => setWz(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          {/* Quick Presets */}
          <div className="pt-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">Preset Gerak Cepat:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setVx(1.0); setVy(0); setWz(0); }}
                className="py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-cyan text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Maju 1.0 m/s
              </button>
              <button
                type="button"
                onClick={() => { setVx(0); setVy(1.0); setWz(0); }}
                className="py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-cyan text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Strafe Kiri
              </button>
              <button
                type="button"
                onClick={() => { setVx(0.7); setVy(0.7); setWz(1.5); }}
                className="py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-cyan text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Spiral Holonomik
              </button>
            </div>
          </div>

          {/* Telemetry Summary */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Kecepatan Resultan:</span>
              <span className="text-white font-bold">{linearSpeed.toFixed(2)} m/s</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Sudut Arah Vektor:</span>
              <span className="text-brand-cyan font-bold">{headingAngle.toFixed(1)}°</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Dimensi Sasis Robot:</span>
              <span className="text-slate-300">{lx*200}×{ly*200} mm, Radius R={rw*1000}mm</span>
            </div>
          </div>
        </div>

        {/* Visualizer & Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Real-Time SVG Vector Field Visualizer */}
          <div className="relative w-full aspect-video rounded-2xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Center Coordinate Axis */}
              <line x1="200" y1="20" x2="200" y2="280" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="20" y1="150" x2="380" y2="150" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Robot Chassis Body */}
              <rect
                x="140" y="90" width="120" height="120"
                fill="#0B1322" stroke="#00F5D4" strokeWidth="2.5" rx="14"
                transform={`rotate(${wz * 15} 200 150)`}
              />
              <circle cx="200" cy="150" r="6" fill="#00F5D4" />
              <text x="200" y="145" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">CENTER</text>

              {/* Drivetrain Specific Wheel Representation */}
              {drivetrain === '4wd_mecanum' && (
                <>
                  {/* FL */}
                  <rect x="125" y="80" width="20" height="40" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" rx="4" />
                  <line x1="125" y1="90" x2="145" y2="110" stroke="#38BDF8" strokeWidth="1.5" />
                  {/* FR */}
                  <rect x="255" y="80" width="20" height="40" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" rx="4" />
                  <line x1="255" y1="110" x2="275" y2="90" stroke="#38BDF8" strokeWidth="1.5" />
                  {/* BL */}
                  <rect x="125" y="180" width="20" height="40" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" rx="4" />
                  <line x1="125" y1="210" x2="145" y2="190" stroke="#38BDF8" strokeWidth="1.5" />
                  {/* BR */}
                  <rect x="255" y="180" width="20" height="40" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" rx="4" />
                  <line x1="255" y1="190" x2="275" y2="210" stroke="#38BDF8" strokeWidth="1.5" />
                </>
              )}

              {/* Dynamic Velocity Arrow */}
              {linearSpeed > 0.05 && (
                <g transform="translate(200, 150)">
                  <line
                    x1="0" y1="0"
                    x2={vy * 60} y2={-vx * 60}
                    stroke="#00F5D4" strokeWidth="4" strokeLinecap="round"
                  />
                  <circle cx={vy * 60} cy={-vx * 60} r="5" fill="#00F5D4" />
                </g>
              )}

              {/* Rotation Indicator */}
              {Math.abs(wz) > 0.1 && (
                <circle
                  cx="200" cy="150" r="75"
                  fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="10 10"
                  className="animate-spin-slow"
                />
              )}
            </svg>
          </div>

          {/* Computed Wheel Velocity Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {wheels.map((w, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#060A12] border border-slate-800 space-y-1 font-mono"
              >
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold">{w.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${w.rpm >= 0 ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-sky-500/20 text-sky-300'}`}>
                    {w.rpm >= 0 ? 'CW' : 'CCW'}
                  </span>
                </div>
                <div className="text-lg font-black text-white">
                  {w.rpm.toFixed(1)} <span className="text-xs font-normal text-slate-400">RPM</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Angular: <span className="text-brand-cyan">{w.w.toFixed(2)} rad/s</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
