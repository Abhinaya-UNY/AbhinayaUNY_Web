import React from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight, Play, Flame, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      
      {/* 1. Background Team Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform duration-1000"
        style={{ backgroundImage: `url('${basePath}/assets/hero_abhinaya.jpg')` }}
      />

      {/* 2. Cinematic Dark Radial & Linear Vignette Overlay (Matches VI-ROSE ITS style) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/80 to-[#070503]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_rgba(7,5,3,0.92)_85%)]" />

      {/* 3. Orange Glow Highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/20 blur-[150px] pointer-events-none rounded-full" />

      {/* 4. Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        
        {/* Real Abhinaya Emblem Badge */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-brand-orange/30 to-black p-1 border-2 border-brand-orange/60 shadow-[0_0_40px_rgba(255,107,0,0.5)] flex items-center justify-center">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,107,0,0.7)]"
            />
          </div>
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#180F08]/90 border border-brand-orange/50 text-amber-300 text-xs font-black uppercase tracking-wider shadow-lg">
            <Trophy className="w-4 h-4 text-brand-gold animate-bounce" />
            <span>JUARA 1 REGIONAL I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
          </div>
        </div>

        {/* Massive Bold Title (Like VI-ROSE ITS) */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase drop-shadow-[0_5px_30px_rgba(0,0,0,0.9)]">
            ABHINAYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">UNY</span>
          </h1>
          <p className="text-sm sm:text-xl font-bold text-amber-100/90 tracking-wide uppercase max-w-2xl mx-auto drop-shadow-md">
            Kontes Robot Tematik Indonesia • Universitas Negeri Yogyakarta
          </p>
        </div>

        {/* Descriptive Intro for Freshmen & Public */}
        <p className="text-xs sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
          Wadah riset mahasiswa Fakultas Teknik UNY dalam merancang, membangun, dan memprogram robot-robot otonom cerdas untuk menjawab tantangan isu nasional di ajang <strong>Kontes Robot Indonesia (KRI Puspresnas)</strong>.
        </p>

        {/* Pill Button CTA (Like VI-ROSE ITS 'EXPLORE TEAM') */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/#krtmi-story"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_35px_rgba(255,107,0,0.5)] hover:scale-105 transition"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>EXPLORE TEAM &amp; GUIDEBOOKS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#video-aksi"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#171008]/80 hover:bg-[#251A0D] border border-brand-orange/40 text-amber-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition backdrop-blur-sm"
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
