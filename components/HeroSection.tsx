'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Flame, Trophy, Activity, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { BlurText, ShinyText, DecryptedText, AmbientGrid, Aurora, Magnet } from '@/components/animations';

export const HeroSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId) || document.getElementById('about-tim') || document.getElementById('krtmi-story');
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full bg-[#0B0B0E] border-b border-white/[0.06] overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-20">
      
      {/* 1. Ambient Background Layer: Fluid Aurora Mesh + Coordinate Grid */}
      <Aurora intensity="subtle" showVignette={true} className="pointer-events-none" />
      <AmbientGrid className="pointer-events-none z-0" opacity={0.18} />

      {/* 2. Header Content Zone */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-6">
        
        {/* Logo + Category Line */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-white/20">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center space-x-2 text-emerald-400 text-[11px] font-mono font-medium uppercase tracking-[0.25em]">
            <DecryptedText
              text="TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"
              animateOn="hover"
              className="text-emerald-400 text-[11px] font-mono font-medium uppercase tracking-[0.25em]"
            />
          </div>
        </div>

        {/* Kinetic Title & Subtitle */}
        <div className="space-y-3" aria-label="ABHINAYA UNY">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight uppercase flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap" title="ABHINAYA UNY" aria-label="ABHINAYA UNY">
            <BlurText
              text="ABHINAYA"
              delay={60}
              animateBy="letters"
              className="text-white"
            />
            <BlurText
              text="UNY"
              delay={60}
              animateBy="letters"
              className="text-emerald-400"
            />
          </h1>
          <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-[0.15em] uppercase flex items-center justify-center">
            <BlurText
              text="Divisi Kontes Robot Tematik Indonesia (KRTMI)"
              delay={35}
              animateBy="words"
              className="text-xs sm:text-sm font-medium text-slate-400 tracking-[0.15em] uppercase"
            />
          </div>
          <div className="pt-1">
            <span className="inline-flex items-center space-x-2 text-amber-400/90 text-xs sm:text-sm font-mono bg-white/[0.03] px-4 py-1.5 rounded-full border border-amber-500/20 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <ShinyText
                text="JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"
                speed={4}
                className="text-xs sm:text-sm font-mono text-amber-300"
              />
            </span>
          </div>
        </div>

        {/* Refined CTA Action Buttons with Magnet physics */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <Magnet strength={0.25} maxDistance={10}>
            <a
              href="#about-tim"
              onClick={(e) => scrollToSection(e, 'about-tim')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] shadow-emerald-glow hover:shadow-emerald-glow-sm"
            >
              <Flame className="w-4 h-4 text-black fill-black" />
              <span>JELAJAHI TIM &amp; BUKU PANDUAN</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </Magnet>
          <Magnet strength={0.25} maxDistance={10}>
            <a
              href="#video-aksi"
              onClick={(e) => scrollToSection(e, 'video-aksi')}
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full border border-white/10 hover:border-emerald-500/40 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>SAKSIKAN AKSI ROBOT DI ARENA</span>
            </a>
          </Magnet>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <Link
            href="/krtmi"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-slate-400 hover:text-emerald-300 border border-white/[0.08] hover:border-emerald-500/30 bg-[#121216]/60 transition"
          >
            <span>Jelajahi Arsip KRTMI</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </Link>
          <Link
            href="/pertandingan"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-slate-400 hover:text-emerald-300 border border-white/[0.08] hover:border-emerald-500/30 bg-[#121216]/60 transition"
          >
            <span>Laga &amp; Hasil Pertandingan</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </Link>
        </div>

      </div>

      {/* 3. Hero Stage Photography with Clean Floating Telemetry Pills */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 relative z-10">
        
        {/* Floating Status Telemetry Dock (Cleanly elevated above/alongside frame, unblocking faces) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-4">
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-emerald-500/20 text-xs font-mono text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[10px] text-slate-400">STATUS:</span>
            <span className="text-emerald-400 font-bold truncate">AUTONOMOUS</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="text-[10px] text-slate-400">KINEMATIKA:</span>
            <span className="text-cyan-300 font-bold truncate">4WD MECANUM</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="text-[10px] text-slate-400">TARGET:</span>
            <span className="text-amber-300 font-bold truncate">KRI 2026 READY</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-[10px] text-slate-400">TELEMETRI:</span>
            <span className="text-emerald-400 font-bold truncate">ACTIVE 5.8GHz</span>
          </div>
        </div>

        {/* Cinematic Studio Frame — 100% Unblocked Photography */}
        <div className="relative rounded-2xl overflow-hidden bg-[#121216] group border border-white/[0.08] shadow-2xl">
          <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={`${basePath}/assets/hero_abhinaya.jpg`}
              alt="Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional"
              className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105 group-hover:scale-[1.01] transition-transform duration-700"
            />
          </div>
          
          {/* Bottom Meta Strip */}
          <div className="px-5 py-3.5 bg-[#121216] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400">
              Kontingen Resmi Tim Abhinaya UNY — Divisi KRTMI UKM Rekayasa Teknologi
            </span>
            <span className="text-emerald-400 font-medium">
              Juara 1 Wilayah I &amp; Juara 2 Nasional BPTI Puspresnas
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
