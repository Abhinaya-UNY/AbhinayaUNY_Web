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
      
      {/* 1. Hero Photo Stage: Proportional responsive height on mobile so photo is not zoomed / cropped */}
      <section className="relative w-full h-[52vh] sm:h-[66vh] md:h-[78vh] lg:h-[85vh] flex flex-col items-center justify-start overflow-hidden px-4 pt-6 sm:pt-10">
        
        {/* Background Photo: Center-Top on Mobile to show full width of team, Parallax Fixed on Desktop */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center bg-no-repeat sm:bg-fixed brightness-95 contrast-105 will-change-transform"
          style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
        />

        {/* Subtle Gradient Vignette Overlays for Crisp Text Contrast without Darkening Faces */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070503]/75 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/40 to-transparent" />

        {/* Orange Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[550px] h-[140px] sm:h-[220px] bg-brand-orange/20 blur-[80px] sm:blur-[140px] pointer-events-none rounded-full" />

        {/* Top Header: Emblem + Title + Subtitle (Positioned neatly at the top so middle & bottom photo are 100% visible) */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3.5">
          
          {/* Logo Badge */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-white p-1.5 sm:p-2 border-2 border-brand-orange shadow-[0_0_28px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-1 sm:space-y-2 flex flex-col items-center justify-center text-center w-full">
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

      {/* 2. Action Buttons: Cleanly placed strictly BELOW the photo (never covers any flags, trophies, or faces) */}
      <div className="relative z-20 w-full py-5 sm:py-7 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 bg-[#070503]">
        <a
          href="#krtmi-story"
          onClick={(e) => scrollToSection(e, 'krtmi-story')}
          className="w-full sm:w-auto px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 transition cursor-pointer"
        >
          <Flame className="w-4 h-4 text-black fill-black" />
          <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#video-aksi"
          onClick={(e) => scrollToSection(e, 'video-aksi')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#140E09] hover:bg-[#20140A] border border-brand-orange/50 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-md shadow-lg cursor-pointer hover:scale-105"
        >
          <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>WATCH ROBOT IN ACTION</span>
        </a>
      </div>

    </div>
  );
};
