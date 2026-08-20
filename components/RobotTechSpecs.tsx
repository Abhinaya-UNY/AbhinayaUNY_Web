import React from 'react';
import { Cpu, Zap, Activity, Radio, GitBranch, Terminal } from 'lucide-react';

export const RobotTechSpecs: React.FC = () => {
  return (
    <section className="py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARSITEKTUR TEKNOLOGI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Spesifikasi Rekayasa Robotika Otonom
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Fondasi komputasi embedded, kendali kinematika invers, dan visi komputer cerdas yang diterapkan pada robot Abhinaya UNY.
          </p>
        </div>

        {/* 3 Main Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Kinematika */}
          <div className="p-6 rounded-3xl bg-[#090F1A] border border-brand-border space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40 shadow-inner">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">
              Kinematika Invers Holonomik (Mecanum &amp; Omni)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Menerapkan pergerakan holonomik 360&deg; tanpa orientasi putar sasis. Setiap roda mecanum dikendalikan independen dengan komputasi matriks kecepatan linier (\(v_x, v_y\)) dan angular (\(\omega_z\)).
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] font-mono text-brand-cyan">
              &omega; = (1/R) &bull; [ v_x &plusmn; v_y &plusmn; (L_x + L_y)&omega;_z ]
            </div>
          </div>

          {/* Pillar 2: Embedded Architecture */}
          <div className="p-6 rounded-3xl bg-[#090F1A] border border-brand-border space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40 shadow-inner">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">
              Dual-Core Controller &amp; Closed-Loop PID
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrasi mikrokontroler frekuensi tinggi 240 MHz dengan FreeRTOS multithreading. Umpan balik enkoder magnetik 12-bit (AS5600) diproses pada timer interrupt 100 Hz untuk koreksi galat kecepatan presisi.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] font-mono text-sky-300">
              u(t) = K_p&bull;e(t) + K_i&int;e(t)dt + K_d&bull;(de/dt)
            </div>
          </div>

          {/* Pillar 3: Edge AI Vision */}
          <div className="p-6 rounded-3xl bg-[#090F1A] border border-brand-border space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 shadow-inner">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">
              Visi Komputer &amp; Klasifikasi Edge AI
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Model deteksi objek YOLOv8/11 yang dioptimasi untuk inferensi lokal real-time (30+ FPS). Membedakan jenis objek target, mengestimasi koordinat 3D spasial, dan memandu gripper secara otomatis.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] font-mono text-purple-300">
              BoundingBox [x, y, w, h] + Depth Z &rarr; 3D Pose
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
