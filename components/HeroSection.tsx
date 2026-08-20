'use client';

import React from 'react';
import { ArrowRight, Play, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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
    <div className="relative w-full flex flex-col items-center bg-[#070503]">
      
      {/* 1. Hero Photo Stage: Proportional responsive height on mobile so full photo width is visible */}
      <section className="relative w-full h-[48vh] sm:h-[62vh] md:h-[75vh] lg:h-[82vh] flex flex-col items-center justify-start overflow-hidden px-4 pt-4 sm:pt-8">
        
        {/* Background Photo: Center-Top on Mobile, Parallax Fixed on Desktop */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center bg-no-repeat sm:bg-fixed brightness-95 contrast-105 will-change-transform"
          style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
        />

        {/* Gradient Vignette Overlays strictly at top & bottom edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070503]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/30 to-transparent" />

        {/* Compact Orange Ambient Glow tightly around logo only */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[220px] sm:w-[400px] h-[100px] sm:h-[150px] bg-brand-orange/20 blur-[60px] sm:blur-[100px] pointer-events-none rounded-full" />

        {/* Top Header: Emblem + Title + Subtitle */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3">
          
          {/* Logo Badge with Crisp White Background */}
          <div className="w-11 h-11 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl sm:rounded-3xl bg-white p-1.5 sm:p-2 border-2 border-brand-orange shadow-[0_0_25px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-0.5 sm:space-y-1.5 flex flex-col items-center justify-center text-center w-full">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] flex items-center justify-center gap-1.5 sm:gap-3 whitespace-nowrap">
              <span>ABHINAYA</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
            </h1>
            <p className="text-[10px] sm:text-sm md:text-base font-bold text-slate-100 tracking-[0.16em] sm:tracking-[0.25em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              Kontes Robot Tematik Indonesia
            </p>
          </div>

        </div>

      </section>

      {/* 2. Action Buttons: Placed cleanly below the photo stage with dedicated spacing */}
      <div className="relative z-20 w-full pt-4 pb-8 sm:py-7 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 bg-[#070503]">
        <a
          href="#krtmi-story"
          onClick={(e) => scrollToSection(e, 'krtmi-story')}
          className="w-full sm:w-auto px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(255,107,0,0.5)] hover:scale-105 transition cursor-pointer"
        >
          <Flame className="w-4 h-4 text-black fill-black" />
          <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#video-aksi"
          onClick={(e) => scrollToSection(e, 'video-aksi')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#140E09] hover:bg-[#20140A] border border-brand-orange/40 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-md shadow-lg cursor-pointer hover:scale-105"
        >
          <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>WATCH ROBOT IN ACTION</span>
        </a>
      </div>

    </div>
  );
};
