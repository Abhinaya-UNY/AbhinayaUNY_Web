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
    <div className="relative w-full flex flex-col items-center bg-[#070503]">
      
      {/* 1. Hero Photo Stage: Responsive aspect ratio ensuring full team photo, trophies, and UNY flags remain unblocked & uncropped */}
      <section className="relative w-full min-h-[48vh] sm:min-h-[60vh] md:min-h-[72vh] lg:min-h-[82vh] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto flex flex-col items-center justify-start overflow-hidden px-4 pt-3 sm:pt-6 pb-2">
        
        {/* Background Photo: Center-Top on Mobile, Parallax Fixed on Desktop */}
        <div
          className="absolute inset-0 bg-cover bg-[center_22%] sm:bg-center bg-no-repeat sm:bg-fixed brightness-[0.98] contrast-105 will-change-transform"
          style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
        />

        {/* Crisp Edge Vignette Overlays strictly at extreme top & bottom edges to keep center 100% visible */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#070503]/90 via-[#070503]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#070503] via-[#070503]/30 to-transparent pointer-events-none" />

        {/* Focused Orange Ambient Glow around top emblem */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[200px] sm:w-[380px] h-[90px] sm:h-[130px] bg-brand-orange/20 blur-[50px] sm:blur-[90px] pointer-events-none rounded-full" />

        {/* Top Header: Emblem Badge + Title + Subtitle */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-1.5 sm:space-y-2.5">
          
          {/* Logo Badge with Crisp White Background */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white p-1 sm:p-1.5 border-2 border-brand-orange shadow-[0_0_25px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-0.5 sm:space-y-1 flex flex-col items-center justify-center text-center w-full">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] flex items-center justify-center gap-1.5 sm:gap-3 whitespace-nowrap">
              <span>ABHINAYA</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-100 tracking-[0.18em] sm:tracking-[0.25em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              Kontes Robot Tematik Indonesia
            </p>
          </div>

        </div>

      </section>

      {/* 2. Action Container: Strictly and comfortably positioned BELOW the hero photo stage across all viewports */}
      <div className="relative z-20 w-full py-4 sm:py-6 px-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 bg-[#070503] border-b border-[#1A120B]">
        <a
          href="#about-tim"
          onClick={(e) => scrollToSection(e, 'about-tim')}
          className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-[0_0_25px_rgba(255,107,0,0.45)] hover:shadow-[0_0_35px_rgba(255,107,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Flame className="w-4 h-4 text-black fill-black" />
          <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </a>
        <a
          href="#video-aksi"
          onClick={(e) => scrollToSection(e, 'video-aksi')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#140E09] hover:bg-[#20140A] border border-brand-orange/40 hover:border-brand-orange/80 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/60 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>WATCH ROBOT IN ACTION</span>
        </a>
      </div>

    </div>
  );
};
