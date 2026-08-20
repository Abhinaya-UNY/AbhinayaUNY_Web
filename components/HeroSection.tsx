'use client';

import React from 'react';
import Link from 'next/link';
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
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col justify-between items-center overflow-hidden px-4 pt-10 pb-8 sm:pb-12">
      
      {/* 1. Background Photo: Center-Top on Mobile, Parallax Fixed on Tablet/Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center bg-no-repeat sm:bg-fixed brightness-95 contrast-105 transform will-change-transform"
        style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
      />

      {/* 2. Soft Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/25 to-[#070503]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.05)_0%,_rgba(7,5,3,0.6)_85%)]" />

      {/* 3. Orange Ambient Glow behind top header */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[200px] sm:h-[300px] bg-brand-orange/15 blur-[120px] sm:blur-[160px] pointer-events-none rounded-full" />

      {/* 4. Top Header: Emblem, Title, Subtitle (High at the top, clear from center team photo) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6 pt-6 sm:pt-10">
        
        {/* Real Abhinaya Emblem Badge with Crisp White Background */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 border-2 border-brand-orange shadow-[0_0_35px_rgba(255,107,0,0.75)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Proportional Single-Line Title */}
        <div className="space-y-2 sm:space-y-3 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap">
            <span>ABHINAYA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
          </h1>
          {/* Subtitle with Spacious Tracking */}
          <p className="text-xs sm:text-base md:text-lg font-bold text-slate-100 tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)] text-center">
            Kontes Robot Tematik Indonesia
          </p>
        </div>

      </div>

      {/* 5. Middle Space is completely clear so the team faces, trophies, and flags are 100% visible */}
      <div className="flex-1 min-h-[80px] sm:min-h-[140px]" />

      {/* 6. Action Buttons positioned cleanly at the bottom */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-4">
        <a
          href="#krtmi-story"
          onClick={(e) => scrollToSection(e, 'krtmi-story')}
          className="w-full sm:w-auto px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_35px_rgba(255,107,0,0.7)] hover:scale-105 transition cursor-pointer"
        >
          <Flame className="w-4 h-4 text-black fill-black" />
          <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#video-aksi"
          onClick={(e) => scrollToSection(e, 'video-aksi')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#120B06]/95 hover:bg-[#20140A] border border-brand-orange/50 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-md shadow-xl cursor-pointer hover:scale-105"
        >
          <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
          <span>WATCH ROBOT IN ACTION</span>
        </a>
      </div>

      {/* 7. Ultra-Smooth Bottom Transition into Solid Dark Content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-t from-[#070503] via-[#070503]/70 to-transparent pointer-events-none" />

    </section>
  );
};
