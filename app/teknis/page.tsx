import React from 'react';
import { Cpu, Zap, Activity, Radio, GitBranch, Layers, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Spesifikasi & Kinematika — Abhinaya UNY Robotics Team',
  description: 'Dokumentasi teknis kinematika invers roda mecanum, arsitektur sirkuit kendali closed-loop PID, dan sistem visi komputer robotika Abhinaya UNY.',
};

export default function TeknisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
          <Cpu className="w-4 h-4" />
          <span>REKAYASA SISTEM ROBOTIKA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Spesifikasi Teknis &amp; Matematika Kinematika
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dokumentasi mendalam mengenai perumusan matematis penggerak holonomik, sistem kendali lup tertutup, arsitektur kelistrikan tenaga tinggi, dan implementasi visi komputer tepi (Edge AI).
        </p>
      </div>

      {/* 1. Kinematika Invers */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              1. Kinematika Invers 4-Wheel Mecanum Drive
            </h2>
            <p className="text-xs text-slate-400">
              Transformasi kecepatan vektor planar (\(v_x, v_y, \omega_z\)) ke kecepatan angular masing-masing roda (\(\omega_1, \omega_2, \omega_3, \omega_4\)).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <p>
              Roda Mecanum memiliki roller bebas bersudut 45&deg; terhadap sumbu putar. Hal ini memungkinkan robot bergerak secara <strong>holonomik omnidirectional</strong> (maju, mundur, geser samping / strafe, dan rotasi) secara simultan tanpa memerlukan mekanisme kemudi belok roda depan.
            </p>
            <p>
              Di mana \(R\) adalah jari-jari roda, \(L_x\) adalah jarak sumbu roda ke pusat robot pada sumbu X, dan \(L_y\) adalah jarak pada sumbu Y.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Frekuensi komputasi matriks invers: <strong>100 Hz (10 ms)</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Kompensasi yaw drift terintegrasi IMU 6-DOF dengan Digital Motion Processor (DMP).</span>
              </li>
            </ul>
          </div>

          {/* Matrix Formula Card */}
          <div className="p-6 rounded-2xl bg-[#050811] border border-slate-800 space-y-3 font-mono">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Persamaan Matriks Kinematika:
            </div>
            <pre className="text-xs sm:text-sm text-brand-cyan bg-slate-950 p-4 rounded-xl overflow-x-auto border border-slate-800">
{`[ ω1 ]       [  1  -1  -(Lx + Ly) ]   [ vx ]
[ ω2 ] = 1/R [  1   1   (Lx + Ly) ] * [ vy ]
[ ω3 ]       [  1   1  -(Lx + Ly) ]   [ ωz ]
[ ω4 ]       [  1  -1   (Lx + Ly) ]`}
            </pre>
          </div>
        </div>
      </div>

      {/* 2. Closed-Loop PID Control & Microcontroller */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              2. Sistem Kendali Loop Tertutup PID &amp; Embedded Real-Time
            </h2>
            <p className="text-xs text-slate-400">
              Arsitektur kontrol mikrokontroler ganda (Dual ESP32-S3 + STM32 ARM Cortex-M4) dengan algoritma Proportional-Integral-Derivative.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 space-y-2">
            <div className="text-sm font-black text-white">Proportional (\(K_p\))</div>
            <p className="text-xs text-slate-300">
              Memberikan respons torsi seketika sebanding dengan selisih kecepatan target dan kecepatan riil roda.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 space-y-2">
            <div className="text-sm font-black text-white">Integral (\(K_i\))</div>
            <p className="text-xs text-slate-300">
              Mengeliminasi galat kondisi tunak (*steady-state error*) akibat gesekan mekanik dan beban muatan objek sampah.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 space-y-2">
            <div className="text-sm font-black text-white">Derivative (\(K_d\))</div>
            <p className="text-xs text-slate-300">
              Meredam lonjakan akselerasi (*overshoot*) dan osilasi saat robot melakukan akselerasi mendadak di arena.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
