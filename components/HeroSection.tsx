'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Flame, Trophy } from 'lucide-react';
import { BlurText, ShinyText, DecryptedText, AmbientGrid } from '@/components/animations';

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
    <div className="relative w-full bg-[#070503] border-b border-white/5 overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16">
      
      {/* Subtle ambient grid */}
      <AmbientGrid className="pointer-events-none z-0" opacity={0.3} />

      {/* Single focal glow — much more restrained */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brand-orange/8 blur-[100px] pointer-events-none rounded-full" />

      {/* 1. Header Zone */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-4">
        
        {/* Logo + category line */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center space-x-2 text-brand-orange/80 text-[11px] font-mono font-semibold uppercase tracking-[0.2em]">
            <DecryptedText
              text="TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"
              animateOn="hover"
              className="text-brand-orange/80 text-[11px] font-mono font-semibold uppercase tracking-[0.2em]"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2" aria-label="ABHINAYA UNY">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap" title="ABHINAYA UNY" aria-label="ABHINAYA UNY">
            <BlurText
              text="ABHINAYA"
              delay={70}
              animateBy="letters"
              className="text-white"
            />
            <BlurText
              text="UNY"
              delay={70}
              animateBy="letters"
              className="text-brand-orange"
            />
          </h1>
          <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-[0.15em] uppercase flex items-center justify-center">
            <BlurText
              text="Divisi Kontes Robot Tematik Indonesia (KRTMI)"
              delay={40}
              animateBy="words"
              className="text-xs sm:text-sm font-medium text-slate-400 tracking-[0.15em] uppercase"
            />
          </div>
          <div className="pt-1">
            <span className="inline-flex items-center space-x-2 text-amber-400/70 text-xs sm:text-sm font-mono">
              <Trophy className="w-3.5 h-3.5 text-amber-500/60" />
              <ShinyText
                text="JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"
                speed={4}
                className="text-xs sm:text-sm font-mono"
              />
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#about-tim"
            onClick={(e) => scrollToSection(e, 'about-tim')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3 rounded-full bg-brand-orange hover:brightness-110 text-black font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-200 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>JELAJAHI TIM &amp; BUKU PANDUAN</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
          <a
            href="#video-aksi"
            onClick={(e) => scrollToSection(e, 'video-aksi')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full border border-white/10 hover:border-brand-orange/30 text-slate-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-200 cursor-pointer"
          >
            <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span>SAKSIKAN AKSI ROBOT DI ARENA</span>
          </a>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <Link
            href="/krtmi"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-slate-500 hover:text-slate-200 border border-white/8 hover:border-white/20 transition"
          >
            <span>Jelajahi Arsip KRTMI</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/pertandingan"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-slate-500 hover:text-slate-200 border border-white/8 hover:border-white/20 transition"
          >
            <span>Laga &amp; Hasil Pertandingan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* 2. Photo Stage — clean frame, no heavy orange border */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="relative rounded-2xl overflow-hidden bg-[#0A0704] group border border-white/5">
          <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={`${basePath}/assets/hero_abhinaya.jpg`}
              alt="Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional"
              className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
          
          {/* Bottom strip */}
          <div className="px-5 py-3 bg-black/60 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400">
              Kontingen Resmi Tim Abhinaya UNY — Divisi KRTMI UKM Rekayasa Teknologi
            </span>
            <span className="text-brand-orange/80">
              Juara 1 Wilayah I &amp; Juara 2 Nasional BPTI Puspresnas
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

