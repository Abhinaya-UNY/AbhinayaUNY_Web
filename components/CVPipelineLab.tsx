'use client';

import React, { useState } from 'react';
import { Camera, Eye, Cpu, Compass, Play, RefreshCw, CheckCircle2, Crosshair } from 'lucide-react';

export const CVPipelineLab: React.FC = () => {
  // Target coordinates in image plane (pixels in 640x480 frame)
  const [pixelU, setPixelU] = useState<number>(360); // X center 320
  const [pixelV, setPixelV] = useState<number>(340); // Y bottom 480
  const [targetClass, setTargetClass] = useState<'botol_plastik' | 'kaleng_alu' | 'kardus'>('botol_plastik');
  const [confidence, setConfidence] = useState<number>(0.94);

  // Camera geometric parameters
  const hCam = 0.285; // 28.5 cm camera height
  const alphaTilt = (22.5 * Math.PI) / 180; // 22.5 deg downward tilt
  const fx = 520.0;
  const fy = 520.0;
  const cx = 320.0;
  const cy = 240.0;

  // 1. Normalized Image Plane Coordinates
  const xn = (pixelU - cx) / fx;
  const yn = (pixelV - cy) / fy;

  // 2. Inverse Perspective Mapping (Ground Plane Constraint Z_ground = 0)
  const denominator = Math.sin(alphaTilt) + yn * Math.cos(alphaTilt);
  const zc = denominator > 0.05 ? hCam / denominator : 1.0;
  const xc = xn * zc;
  const yc = yn * zc;

  // 3. Robot Base Frame Coordinates (Xr forward, Yr lateral)
  const xr = zc * Math.cos(alphaTilt) - yc * Math.sin(alphaTilt) + 0.10; // 10cm camera forward offset
  const yr = -xc; // Left positive

  const targetDistance = Math.sqrt(xr * xr + yr * yr);
  const targetAngleDeg = Math.atan2(yr, xr) * (180 / Math.PI);

  // 4. Proportional-Pursuit Velocities
  const kv = 0.8;
  const kw = 1.2;
  const cmdVx = Math.max(-1.0, Math.min(1.0, kv * xr));
  const cmdVy = Math.max(-1.0, Math.min(1.0, kv * yr));
  const cmdWz = Math.max(-2.5, Math.min(2.5, kw * (targetAngleDeg * (Math.PI / 180))));

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border space-y-6 shadow-2xl hud-corner">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Pipeline Visi Komputer Edge AI &amp; Transformasi IPM
            </h3>
            <p className="text-xs text-slate-400">
              YOLOv8/11 Inference &rarr; Inverse Perspective Mapping &rarr; Proportional-Pursuit Setpoint.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-brand-cyan border border-slate-800 font-bold">
            INFERENCE: 32 FPS (TensorRT FP16)
          </span>
        </div>
      </div>

      {/* 5-Stage Interactive Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
        <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] uppercase">1. Frame Input</div>
          <div className="text-white font-bold text-[11px]">CSI 640×480</div>
          <p className="text-[10px] text-slate-500">Letterbox &amp; Bilateral</p>
        </div>
        <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] uppercase">2. YOLOv8 Engine</div>
          <div className="text-brand-cyan font-bold text-[11px]">BBox ({pixelU}, {pixelV})</div>
          <p className="text-[10px] text-slate-500">Conf: {(confidence * 100).toFixed(0)}%</p>
        </div>
        <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] uppercase">3. Pinhole Model</div>
          <div className="text-white font-bold text-[11px]">f=520, h=28.5cm</div>
          <p className="text-[10px] text-slate-500">Pitch Tilt: 22.5°</p>
        </div>
        <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800 space-y-1">
          <div className="text-slate-400 text-[10px] uppercase">4. Koordinat Sasis</div>
          <div className="text-emerald-300 font-bold text-[11px]">({xr.toFixed(2)}, {yr.toFixed(2)}) m</div>
          <p className="text-[10px] text-slate-500">Dist: {(targetDistance * 100).toFixed(1)} cm</p>
        </div>
        <div className="p-3 rounded-xl bg-[#060A12] border border-brand-cyan/40 bg-brand-cyan/10 space-y-1">
          <div className="text-brand-cyan text-[10px] uppercase font-bold">5. Setpoint Gerak</div>
          <div className="text-white font-bold text-[11px]">Vx: {cmdVx.toFixed(2)} m/s</div>
          <p className="text-[10px] text-brand-cyan">Wz: {cmdWz.toFixed(2)} rad/s</p>
        </div>
      </div>

      {/* Interactive Controls & Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
          <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
            Simulasi Posisi Deteksi Bounding Box:
          </div>

          {/* U Slider (Horizontal Pixel) */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Posisi Horisontal Piksel (u):</span>
              <span className="font-mono text-brand-cyan font-bold">{pixelU} px</span>
            </div>
            <input
              type="range" min="80" max="560" value={pixelU}
              onChange={(e) => setPixelU(parseInt(e.target.value))}
              className="w-full accent-[#00F5D4]"
            />
          </div>

          {/* V Slider (Vertical Pixel) */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Posisi Vertikal Piksel (v):</span>
              <span className="font-mono text-brand-cyan font-bold">{pixelV} px</span>
            </div>
            <input
              type="range" min="200" max="460" value={pixelV}
              onChange={(e) => setPixelV(parseInt(e.target.value))}
              className="w-full accent-[#00F5D4]"
            />
          </div>

          {/* Target Class Selector */}
          <div className="space-y-1.5 text-xs">
            <span className="text-slate-300 font-bold">Kelas Objek Sampah:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetClass('botol_plastik')}
                className={`py-1.5 px-2 rounded-xl font-mono text-[11px] font-bold border transition ${
                  targetClass === 'botol_plastik'
                    ? 'bg-brand-cyan text-black border-brand-cyan shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Botol Plastik
              </button>
              <button
                type="button"
                onClick={() => setTargetClass('kaleng_alu')}
                className={`py-1.5 px-2 rounded-xl font-mono text-[11px] font-bold border transition ${
                  targetClass === 'kaleng_alu'
                    ? 'bg-brand-cyan text-black border-brand-cyan shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Kaleng Alu
              </button>
              <button
                type="button"
                onClick={() => setTargetClass('kardus')}
                className={`py-1.5 px-2 rounded-xl font-mono text-[11px] font-bold border transition ${
                  targetClass === 'kardus'
                    ? 'bg-brand-cyan text-black border-brand-cyan shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Kardus
              </button>
            </div>
          </div>

          {/* IPM Calculation Matrix Preview */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 space-y-1">
            <div className="text-brand-cyan font-bold">Matriks Transformasi Kamera &rarr; Sasis:</div>
            <div>Zc = h_cam / (sin(alpha) + yn*cos(alpha)) = {zc.toFixed(3)} m</div>
            <div>Xr = Zc*cos(alpha) - Yc*sin(alpha) + dx = {xr.toFixed(3)} m</div>
            <div>Yr = -Xc = {yr.toFixed(3)} m</div>
          </div>
        </div>

        {/* Visual Simulated Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-video rounded-2xl bg-slate-950 border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 640 480" className="w-full h-full">
              {/* Virtual Camera Feed Background */}
              <rect x="0" y="0" width="640" height="480" fill="#040711" />
              {/* Crosshair grid */}
              <line x1="320" y1="0" x2="320" y2="480" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="240" x2="640" y2="240" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Floor Horizon Guideline */}
              <line x1="0" y1="180" x2="640" y2="180" stroke="#059669" strokeWidth="1.5" strokeDasharray="6 6" />
              <text x="50" y="175" fill="#10B981" fontSize="11" fontFamily="monospace">GROUND HORIZON (PITCH: 22.5°)</text>

              {/* Bounding Box on Target */}
              <rect
                x={pixelU - 40} y={pixelV - 40} width="80" height="80"
                fill="#00F5D422" stroke="#00F5D4" strokeWidth="2.5" rx="6"
              />
              <circle cx={pixelU} cy={pixelV} r="4" fill="#00F5D4" />

              {/* Target Label */}
              <rect x={pixelU - 40} y={pixelV - 60} width="110" height="18" fill="#00F5D4" rx="3" />
              <text x={pixelU - 35} y={pixelV - 47} fill="#000000" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {targetClass.toUpperCase()} {(confidence * 100).toFixed(0)}%
              </text>

              {/* Robot Chassis Aim Reticle */}
              <circle cx="320" cy="440" r="16" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="320" y1="440" x2={pixelU} y2={pixelV} stroke="#38BDF8" strokeWidth="2" strokeDasharray="5 5" />
              <text x="320" y="470" fill="#38BDF8" fontSize="10" textAnchor="middle" fontFamily="monospace">ROBOT CENTER</text>
            </svg>
          </div>

          {/* Pursuit Command Result Box */}
          <div className="grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Cmd Vx (Maju)</div>
              <div className="text-sm font-black text-brand-cyan">{cmdVx.toFixed(2)} m/s</div>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Cmd Vy (Strafe)</div>
              <div className="text-sm font-black text-brand-cyan">{cmdVy.toFixed(2)} m/s</div>
            </div>
            <div className="p-3 rounded-xl bg-[#060A12] border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Cmd Wz (Yaw)</div>
              <div className="text-sm font-black text-sky-400">{cmdWz.toFixed(2)} rad/s</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
