import React from 'react';
import { Cpu, Zap, Activity, Radio, GitBranch, Layers, CheckCircle2, Compass, Sliders, Eye } from 'lucide-react';
import { KinematicsLab } from '@/components/KinematicsLab';
import { PIDTunerLab } from '@/components/PIDTunerLab';
import { FreeRTOSSchedulerLab } from '@/components/FreeRTOSSchedulerLab';
import { CVPipelineLab } from '@/components/CVPipelineLab';

export const metadata = {
  title: 'Laboratorium Kinematika & Rekayasa Teknis — Abhinaya UNY',
  description: 'Dokumentasi komprehensif kinematika invers roda Mecanum, simulasi FreeRTOS dual-core, closed-loop PID tuner dinamis, dan pipeline visi komputer Edge AI robot Abhinaya UNY.',
};

export default function TeknisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30 font-mono">
          <Cpu className="w-4 h-4" />
          <span>BLUEPRINT REKAYASA &amp; LABORATORIUM DINAMIS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Spesifikasi Teknis, Kinematika &amp; Kontrol Cerdas
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dokumentasi mendalam mengenai perumusan matematis penggerak holonomik, simulasi penjadwalan multithreading real-time FreeRTOS, tuning lup tertutup PID, dan sistem visi komputer Edge AI.
        </p>
      </div>

      {/* 1. Interactive Mecanum & Omni Kinematics Lab */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="w-8 h-8 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold font-mono">
            01
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Kinematika Invers &amp; Vektor Penggerak Holonomik
          </h2>
        </div>
        
        <KinematicsLab />

        {/* Matrix Derivation Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-[#060A12] border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="font-mono font-bold text-white uppercase text-sm text-brand-cyan">
              Prinsip Dekomposisi Vektor 4WD Mecanum:
            </h4>
            <p className="leading-relaxed">
              Roda Mecanum memiliki sub-roller bebas bersudut 45 derajat terhadap bidang roda. Gaya kontak permukaan terurai menjadi gaya traksi longitudinal dan gaya selip lateral. Sasis mencapai derajat kebebasan planar penuh (3 DOF: Vx, Vy, Wz) tanpa memerlukan sistem kemudi mekanik.
            </p>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Radius Roda: Rw = 38.0 mm, Setengah Lebar: ly = 160 mm, Setengah Panjang: lx = 160 mm</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Frekuensi Kalkulasi Matriks: 100 Hz pada interrupt timer STM32F4</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div className="text-xs text-slate-400 uppercase font-bold">
              Formulasi Matriks Invers:
            </div>
            <pre className="text-xs text-brand-cyan bg-[#060A12] p-4 rounded-xl overflow-x-auto border border-slate-800">
{`[ ω_FL ]       [  1  -1  -(lx + ly) ]   [ Vx ]
[ ω_FR ] = 1/R [  1   1   (lx + ly) ] * [ Vy ]
[ ω_BL ]       [  1   1  -(lx + ly) ]   [ ωz ]
[ ω_BR ]       [  1  -1   (lx + ly) ]`}
            </pre>
          </div>
        </div>
      </section>

      {/* 2. FreeRTOS Multithreading Task Scheduler */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold font-mono">
            02
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Arsitektur Multithreading FreeRTOS &amp; Alokasi CPU
          </h2>
        </div>

        <FreeRTOSSchedulerLab />
      </section>

      {/* 3. Closed-Loop PID Velocity Tuner */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="w-8 h-8 rounded-xl bg-brand-emerald/20 text-brand-emerald flex items-center justify-center font-bold font-mono">
            03
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Sistem Kendali Loop Tertutup PID Kecepatan Motor
          </h2>
        </div>

        <PIDTunerLab />
      </section>

      {/* 4. Computer Vision Edge AI Pipeline */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono">
            04
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Pipeline Visi Komputer Edge AI &amp; Transformasi IPM
          </h2>
        </div>

        <CVPipelineLab />
      </section>

    </div>
  );
}
