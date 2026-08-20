import React from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, Play, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      
      {/* 1. Background Team Photo (Brighter & Crisp) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 transform duration-1000 brightness-95 contrast-105"
        style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
      />

      {/* 2. Balanced Transparent Vignette Overlay (Photo clearly visible like VI-ROSE ITS) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/45 to-[#070503]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(7,5,3,0.65)_85%)]" />

      {/* 3. Orange Ambient Highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/15 blur-[150px] pointer-events-none rounded-full" />

      {/* 4. Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        
        {/* Real Abhinaya Emblem Badge with Crisp White Background */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-2.5 border-2 border-brand-orange shadow-[0_0_40px_rgba(255,107,0,0.7)] flex items-center justify-center transform hover:scale-105 transition duration-300">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#180F08]/90 border border-brand-orange/60 text-amber-300 text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-brand-gold animate-bounce" />
            <span>JUARA 1 REGIONAL I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
          </div>
        </div>

        {/* Massive Bold Title with High-Contrast Drop Shadow */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)]">
            ABHINAYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
          </h1>
          <p className="text-sm sm:text-xl font-black text-white tracking-wide uppercase max-w-2xl mx-auto drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)]">
            Kontes Robot Tematik Indonesia • Universitas Negeri Yogyakarta
          </p>
        </div>

        {/* Descriptive Intro with High-Contrast Dark Backdrop Pill */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#080503]/75 border border-brand-orange/30 backdrop-blur-md shadow-2xl">
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-medium">
            Wadah riset mahasiswa Fakultas Teknik UNY dalam merancang, membangun, dan memprogram robot-robot otonom cerdas untuk menjawab tantangan isu nasional di ajang <strong>Kontes Robot Indonesia (KRI Puspresnas)</strong>.
          </p>
        </div>

        {/* Pill Button CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/#krtmi-story"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_35px_rgba(255,107,0,0.6)] hover:scale-105 transition"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#video-aksi"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#171008]/90 hover:bg-[#251A0D] border border-brand-orange/50 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-md shadow-lg"
          >
            <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span>WATCH ROBOT IN ACTION</span>
          </a>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070503] to-transparent pointer-events-none" />

    </section>
  );
};
