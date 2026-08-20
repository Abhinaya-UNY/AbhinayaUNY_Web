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
    <section className="relative min-h-[88vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden px-4">
      
      {/* 1. Responsive Background Photo: Center-Top on Mobile, Parallax Fixed on Tablet/Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center bg-no-repeat sm:bg-fixed brightness-95 contrast-105 transform will-change-transform"
        style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
      />

      {/* 2. Balanced Transparent Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/35 to-[#070503]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.1)_0%,_rgba(7,5,3,0.65)_85%)]" />

      {/* 3. Orange Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] bg-brand-orange/15 blur-[120px] sm:blur-[150px] pointer-events-none rounded-full" />

      {/* 4. Spacious & Perfectly Centered Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto py-16 sm:py-24 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        
        {/* Real Abhinaya Emblem Badge with Crisp White Background */}
        <div className="flex items-center justify-center mb-1 sm:mb-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 border-2 border-brand-orange shadow-[0_0_35px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Proportional Title with Spacious Breathing Room to Subtitle */}
        <div className="space-y-3 sm:space-y-4 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap">
            <span>ABHINAYA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
          </h1>
          {/* Elegant Subtitle with Spacious Tracking & Vertical Margin */}
          <p className="text-xs sm:text-base md:text-lg font-bold text-slate-100 tracking-[0.2em] sm:tracking-[0.28em] uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)] text-center pt-1 sm:pt-2">
            Kontes Robot Tematik Indonesia
          </p>
        </div>

        {/* Action Buttons Moved Lower for Clean, Spacious Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 pt-8 sm:pt-14 w-full max-w-sm sm:max-w-none">
          <a
            href="#krtmi-story"
            onClick={(e) => scrollToSection(e, 'krtmi-story')}
            className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:scale-105 transition cursor-pointer"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#video-aksi"
            onClick={(e) => scrollToSection(e, 'video-aksi')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#171008]/90 hover:bg-[#251A0D] border border-brand-orange/50 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-md shadow-lg cursor-pointer"
          >
            <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span>WATCH ROBOT IN ACTION</span>
          </a>
        </div>

      </div>

      {/* Smooth Bottom Transition into Solid Dark Content */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 bg-gradient-to-t from-[#070503] via-[#070503]/80 to-transparent pointer-events-none" />

    </section>
  );
};
