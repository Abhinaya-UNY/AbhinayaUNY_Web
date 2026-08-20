'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Trophy, Sparkles, Cpu, ArrowRight, ShieldCheck, ChevronRight, Play, Radio, Activity, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Background Cyber Grid & Neon Blurs */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-cyan/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-brand-emerald/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Top Telemetry HUD Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-cyan/40 shadow-[0_0_20px_rgba(0,245,212,0.25)] text-brand-cyan">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            <span className="font-bold text-[11px]">SYS: NOMINAL</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">CORE: DUAL ESP32-S3 + STM32F4</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
            <Compass className="w-3.5 h-3.5 text-brand-emerald" />
            <span className="text-[11px]">DRIVETRAIN: 4WD MECANUM HOLONOMIC</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-gold/40 text-brand-gold">
            <Trophy className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
            <span className="font-bold text-[11px]">JUARA 1 WILAYAH I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="text-center space-y-6 max-w-5xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
              UNIVERSITAS NEGERI YOGYAKARTA • ROBOTICS RESEARCH DIVISION
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              TIM ROBOTIKA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-emerald-400 to-sky-400 glow-cyan">
                ABHINAYA UNY
              </span>
            </h1>
          </div>
          
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            Platform resmi rekayasa, riset kinematika holonomik, dan dokumentasi kejuaraan divisi <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong> Puspresnas Kemendikbudristek (2019 – 2024) serta <strong>Technocorner FT UGM 2026</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/krtmi"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-cyan via-emerald-400 to-teal-400 hover:from-teal-300 hover:to-emerald-500 text-black font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(0,245,212,0.35)] hover:scale-105 transition font-mono uppercase tracking-wider"
          >
            <span>Jelajahi Arsip 7 Edisi (2019–2026)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/teknis"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B111B] hover:bg-slate-900 border-2 border-brand-border hover:border-brand-cyan text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition font-mono uppercase tracking-wider shadow-lg"
          >
            <Cpu className="w-4 h-4 text-brand-cyan" />
            <span>Laboratorium Kinematika &amp; PID</span>
          </Link>
          <Link
            href="/prestasi"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B111B] hover:bg-slate-900 border border-slate-800 hover:border-brand-gold text-slate-300 hover:text-brand-gold font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition font-mono uppercase tracking-wider"
          >
            <Trophy className="w-4 h-4 text-brand-gold" />
            <span>Kabinet Juara Nasional</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="p-5 rounded-3xl bg-[#090F1B] border-2 border-brand-border text-center space-y-1 shadow-xl hud-corner">
            <div className="text-3xl sm:text-4xl font-black text-brand-cyan font-mono">7 Edisi</div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Arsip Lengkap 2019–2026</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#090F1B] border-2 border-brand-border text-center space-y-1 shadow-xl hud-corner">
            <div className="text-3xl sm:text-4xl font-black text-brand-gold font-mono">Juara 1 &amp; 2</div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider font-mono">KRTMI Nasional &amp; Wilayah</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#090F1B] border-2 border-brand-border text-center space-y-1 shadow-xl hud-corner">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">100% Otonom</div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider font-mono">YOLOv8 Edge AI &amp; Kinematika</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#090F1B] border-2 border-brand-border text-center space-y-1 shadow-xl hud-corner">
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">Puspresnas</div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider font-mono">BPTI Kemendikbudristek</div>
          </div>
        </div>

      </div>
    </section>
  );
};
