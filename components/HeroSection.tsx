'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Flame, Trophy } from 'lucide-react';

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
    <div className="relative w-full bg-[#070b09] border-b border-emerald-950/60 overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16">
      
      {/* Background Ambient High-Tech Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* 1. Header Zone: Clean Typography & Actions (0% photo behind text) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-4">
        
        {/* Team Branding Emblem & Category Pill */}
        <div className="flex flex-col items-center justify-center space-y-2.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1.5 sm:p-2 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5" aria-label="ABHINAYA UNY">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap" title="ABHINAYA UNY">
            <span>ABHINAYA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">UNY</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-200/90 tracking-[0.2em] sm:tracking-[0.25em] uppercase">
            Divisi Kontes Robot Tematik Indonesia (KRTMI)
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center space-x-2 px-4 py-1 rounded-xl bg-[#0e1c16] text-amber-300 text-xs sm:text-sm font-mono font-bold border border-amber-500/30 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>JUARA 1 WILAYAH I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#about-tim"
            onClick={(e) => scrollToSection(e, 'about-tim')}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-teal-300 hover:to-emerald-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>JELAJAHI TIM &amp; BUKU PANDUAN</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
          <a
            href="#video-aksi"
            onClick={(e) => scrollToSection(e, 'video-aksi')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-[#0f1a15] hover:bg-[#162920] border border-emerald-500/40 hover:border-emerald-400/80 text-emerald-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/70 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>SAKSIKAN AKSI ROBOT DI ARENA</span>
          </a>
        </div>

        {/* Fast Exploration Hub */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <Link
            href="/krtmi"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#0d1813] text-emerald-300 hover:text-white border border-emerald-500/25 hover:border-emerald-400/60 transition"
          >
            <span>Jelajahi Arsip KRTMI</span>
            <ArrowRight className="w-3 h-3 text-emerald-400" />
          </Link>
          <Link
            href="/teknis"
            className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#0d1813] text-emerald-300 hover:text-white border border-emerald-500/25 hover:border-emerald-400/60 transition"
          >
            <span>Laboratorium Kinematika &amp; AI</span>
            <ArrowRight className="w-3 h-3 text-emerald-400" />
          </Link>
        </div>

      </div>

      {/* 2. Photo Stage: Framed Cinematic Team Showcase (100% Unblocked, 0% Vignette Over Faces/Robots) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.2)] bg-[#0b1310] group">
          <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={`${basePath}/assets/hero_abhinaya.jpg`}
              alt="Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional"
              className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105 group-hover:scale-102 transition-transform duration-700"
            />
          </div>
          
          {/* Dedicated Bottom Metadata Strip (Cleanly placed BELOW the photo) */}
          <div className="px-5 py-3.5 bg-[#09110e] border-t border-emerald-950/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
            <span className="text-emerald-300 font-bold">
              Kontingen Resmi Tim Abhinaya UNY — Divisi KRTMI UKM Rekayasa Teknologi UNY
            </span>
            <span className="text-amber-300/90 font-bold">
              Prestasi: Juara 1 Wilayah I &amp; Juara 2 Nasional BPTI Puspresnas
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

