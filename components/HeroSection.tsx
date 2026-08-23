'use client';

import React from 'react';
import { ArrowRight, Play, Flame } from 'lucide-react';

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
    <div className="relative w-full h-[calc(100svh-4rem)] sm:h-[calc(100vh-4.5rem)] min-h-[580px] max-h-[950px] flex flex-col justify-between items-center overflow-hidden bg-[#070503] border-b border-[#1A120B]">
      
      {/* Background Photo: Locked directly to element center without parallax shift */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.98] contrast-105"
        style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
      />

      {/* Top & Bottom Vignette Overlays */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#070503]/95 via-[#070503]/40 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#070503] via-[#070503]/60 to-transparent pointer-events-none z-[1]" />

      {/* Top Emblem Glow */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[240px] sm:w-[420px] h-[100px] sm:h-[140px] bg-brand-orange/20 blur-[50px] sm:blur-[90px] pointer-events-none rounded-full z-[2]" />

      {/* 1. Top Section: Centered Logo Badge + Title + Subtitle */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-3 sm:pt-6 flex flex-col items-center justify-center text-center">
        
        {/* Logo Badge with Crisp White Background */}
        <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white p-1 sm:p-1.5 border-2 border-brand-orange shadow-[0_0_25px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300 mb-1.5 sm:mb-2.5">
          <img
            src={`${basePath}/assets/logo_abhinaya.png`}
            alt="Logo Abhinaya UNY"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
            <span>ABHINAYA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-100 tracking-[0.2em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] mt-0.5 sm:mt-1">
            Kontes Robot Tematik Indonesia
          </p>
        </div>

      </div>

      {/* 2. Bottom Section: Action Buttons cleanly placed inside viewport above fold */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-5 sm:pb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
        <a
          href="#about-tim"
          onClick={(e) => scrollToSection(e, 'about-tim')}
          className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-[0_0_25px_rgba(255,107,0,0.5)] hover:shadow-[0_0_35px_rgba(255,107,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Flame className="w-4 h-4 text-black fill-black" />
          <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </a>
        <a
          href="#video-aksi"
          onClick={(e) => scrollToSection(e, 'video-aksi')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#140E09]/90 hover:bg-[#20140A] border border-brand-orange/40 hover:border-brand-orange/80 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/70 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>WATCH ROBOT IN ACTION</span>
        </a>
      </div>

    </div>
  );
};
