import React from 'react';
import Link from 'next/link';
import { Bot, Trophy, Sparkles, Cpu, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background Neon Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-brand-blue/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Top Floating Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-brand-cyan/40 shadow-[0_0_20px_rgba(0,245,212,0.25)] text-brand-cyan text-xs font-black tracking-wider uppercase">
            <Trophy className="w-4 h-4 text-brand-gold animate-bounce" />
            <span>JUARA 1 REGIONAL I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
          </div>
        </div>

        {/* Main Hero Typography */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            TIM ROBOTIKA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-blue">ABHINAYA UNY</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            Portal resmi dokumentasi inovasi, riset, dan arsitektur robotika otonom pada ajang <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong> Puspresnas Kemendikbudristek (2019 – 2024) serta <strong>Technocorner UGM 2026</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/krtmi"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-cyan via-teal-400 to-brand-blue hover:from-teal-300 hover:to-blue-500 text-black font-black text-sm flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(0,245,212,0.3)] hover:scale-105 transition"
          >
            <span>Jelajahi Perjalanan KRTMI (2019–2026)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/teknis"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-brand-cyan text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
          >
            <Cpu className="w-4 h-4 text-brand-cyan" />
            <span>Spesifikasi &amp; Kinematika Robot</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
          <div className="p-5 rounded-3xl bg-[#0B111B] border border-brand-border text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-brand-cyan font-mono">7+ Edisi</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Kompetisi Robot Nasional</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#0B111B] border border-brand-border text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-brand-gold font-mono">Juara 1 &amp; 2</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">KRTMI Tingkat Nasional 2024</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#0B111B] border border-brand-border text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">100% Otonom</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Visi AI &amp; Kinematika Holonomik</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#0B111B] border border-brand-border text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">Puspresnas</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">BPTI Kemendikbudristek RI</div>
          </div>
        </div>

      </div>
    </section>
  );
};
