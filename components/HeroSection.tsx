'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Trophy, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { BlurText, ShinyText, DecryptedText, AmbientGrid, Aurora, Magnet, InteractiveCanvasDust } from '@/components/animations';

function usePreloaderComplete(): boolean {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fast-path: already dismissed in this session or flag set
    if (
      (window as any).__ABHINAYA_PRELOADER_DONE ||
      sessionStorage.getItem('abhinaya_preloader_loaded')
    ) {
      setIsComplete(true);
      return;
    }

    // Event listener for active preloader dismissal
    const handleDismiss = () => {
      setIsComplete(true);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });

    // Safety fallback timeout: never block UI if preloader is absent
    const fallbackTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return isComplete;
}

export const HeroSection: React.FC = () => {
  const isPreloaderDone = usePreloaderComplete();
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const getEntranceClass = (delayMs: number) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
      isPreloaderDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
    }`;

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
    <div className="relative w-full bg-[#0B0B0E] border-b border-white/[0.06] overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-20">
      
      {/* 1. Ambient Background Layer: Fluid Aurora Mesh + Particle Dust + Coordinate Grid */}
      <Aurora intensity="subtle" showVignette={true} className="pointer-events-none" />
      <InteractiveCanvasDust
        particleCount={28}
        gridSize={48}
        showGrid={false}
        particleColor="255, 107, 0"
        maxFps={60}
        className="pointer-events-none z-0 opacity-75"
      />
      <AmbientGrid className="pointer-events-none z-0" opacity={0.16} />

      {/* 2. Asymmetric 2-Column Split Layout: Left Text & Actions, Right Media Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Editorial Left-Aligned Content (Col 7 on Desktop) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Logo + Category Badge (Horizontal Single-Line Lockup) */}
            <div
              className={`flex items-center space-x-3 ${getEntranceClass(50)}`}
              style={{ transitionDelay: isPreloaderDone ? '50ms' : '0ms' }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-orange-500/10 border border-white/20 flex-shrink-0">
                <img
                  src={`${basePath}/assets/logo_abhinaya.png`}
                  alt="Logo Abhinaya UNY"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-orange-400 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em]">
                  <DecryptedText
                    text="TIM ROBOTIKA • UKM REKAYASA TEKNOLOGI UNY"
                    animateOn="hover"
                    className="text-orange-400 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em]"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  Universitas Negeri Yogyakarta • Riset Mandiri Sejak 2019
                </span>
              </div>
            </div>

            {/* Kinetic Title & Subtitle (Left-Aligned, No Center Pyramid) */}
            <div className="space-y-3" aria-label="ABHINAYA UNY">
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white tracking-tight uppercase flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 whitespace-normal sm:whitespace-nowrap"
                title="ABHINAYA UNY"
                aria-label="ABHINAYA UNY"
              >
                <BlurText
                  text="ABHINAYA"
                  delay={60}
                  animateBy="letters"
                  ready={isPreloaderDone}
                  className="text-white"
                />
                <BlurText
                  text="UNY"
                  delay={60}
                  animateBy="letters"
                  ready={isPreloaderDone}
                  className="text-orange-400"
                />
              </h1>

              <p
                className={`text-xs sm:text-sm md:text-base font-semibold text-slate-300 font-mono tracking-wide uppercase ${getEntranceClass(250)}`}
                style={{ transitionDelay: isPreloaderDone ? '250ms' : '0ms' }}
              >
                Divisi Kontes Robot Tematik Indonesia (KRTMI) &amp; Technocorner Transporter
              </p>

              {/* Award Badge Pill (Left-aligned) */}
              <div
                className={`pt-1 ${getEntranceClass(400)}`}
                style={{ transitionDelay: isPreloaderDone ? '400ms' : '0ms' }}
              >
                <span className="inline-flex items-center space-x-2 text-amber-400/90 text-xs sm:text-sm font-mono bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-amber-500/25 shadow-sm">
                  <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <ShinyText
                    text="JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"
                    speed={4}
                    className="text-xs sm:text-sm font-mono text-amber-300 font-semibold"
                  />
                </span>
              </div>

              {/* Friendly Description Text (Max-w-xl, Left-aligned) */}
              <p
                className={`text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl pt-1 ${getEntranceClass(550)}`}
                style={{ transitionDelay: isPreloaderDone ? '550ms' : '0ms' }}
              >
                Tim robotika mahasiswa Universitas Negeri Yogyakarta di bawah UKM Rekayasa Teknologi. Kami merancang robot otomatis dan sistem kamera cerdas untuk bertanding di ajang Kontes Robot Indonesia (KRI).
              </p>
            </div>

            {/* Refined CTA Action Buttons (Left-Aligned, clean icon, zero emoji) */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 ${getEntranceClass(700)}`}
              style={{ transitionDelay: isPreloaderDone ? '700ms' : '0ms' }}
            >
              <Magnet strength={0.25} maxDistance={10}>
                <a
                  href="#about-tim"
                  onClick={(e) => scrollToSection(e, 'about-tim')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer shadow-orange-glow hover:shadow-orange-glow-sm"
                >
                  <span>KENALAN DENGAN TIM</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </a>
              </Magnet>
              <Magnet strength={0.25} maxDistance={10}>
                <a
                  href="#video-aksi"
                  onClick={(e) => scrollToSection(e, 'video-aksi')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/10 hover:border-orange-500/40 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>TONTON AKSI ROBOT</span>
                </a>
              </Magnet>
            </div>

            {/* Quick Links (Left-Aligned Single-Line Row) */}
            <div
              className={`flex flex-wrap items-center gap-2.5 pt-1 text-xs ${getEntranceClass(850)}`}
              style={{ transitionDelay: isPreloaderDone ? '850ms' : '0ms' }}
            >
              <Link
                href="/krtmi"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-slate-400 hover:text-orange-300 border border-white/[0.08] hover:border-orange-500/30 bg-[#121216]/60 transition"
              >
                <span>Cerita Lomba KRTMI</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </Link>
              <Link
                href="/pertandingan"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-slate-400 hover:text-orange-300 border border-white/[0.08] hover:border-orange-500/30 bg-[#121216]/60 transition"
              >
                <span>Jadwal &amp; Hasil Laga</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: Studio Photography & Telemetry Showcase (Col 5 on Desktop) */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* Floating Status Telemetry Dock (2x2 on Mobile/Desktop, 1x4 on Tablet) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-orange-500/25 text-xs font-mono text-slate-300 shadow-sm ${getEntranceClass(200)}`}
                style={{ transitionDelay: isPreloaderDone ? '200ms' : '0ms' }}
              >
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
                <span className="text-[10px] text-slate-400">STATUS:</span>
                <span className="text-orange-400 font-bold truncate">OTOMATIS</span>
              </div>

              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm ${getEntranceClass(250)}`}
                style={{ transitionDelay: isPreloaderDone ? '250ms' : '0ms' }}
              >
                <Cpu className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="text-[10px] text-slate-400">PENGGERAK:</span>
                <span className="text-orange-300 font-bold truncate">4WD MECANUM</span>
              </div>

              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm ${getEntranceClass(300)}`}
                style={{ transitionDelay: isPreloaderDone ? '300ms' : '0ms' }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-[10px] text-slate-400">TARGET:</span>
                <span className="text-amber-300 font-bold truncate">SIAP KRI 2026</span>
              </div>

              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#121216]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-sm ${getEntranceClass(350)}`}
                style={{ transitionDelay: isPreloaderDone ? '350ms' : '0ms' }}
              >
                <Radio className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="text-[10px] text-slate-400">KONEKSI:</span>
                <span className="text-orange-400 font-bold truncate">WIRELESS 5.8GHz</span>
              </div>
            </div>

            {/* Cinematic Studio Frame: 100% Unblocked Photography */}
            <div
              className={`relative rounded-2xl overflow-hidden bg-[#121216] group border border-orange-500/20 hover:border-orange-500/40 shadow-2xl shadow-orange-950/20 transition-all duration-300 ${getEntranceClass(450)}`}
              style={{ transitionDelay: isPreloaderDone ? '450ms' : '0ms' }}
            >
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={`${basePath}/assets/hero_abhinaya.jpg`}
                  alt="Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional"
                  className="w-full h-full object-cover object-top sm:object-center brightness-100 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              
              {/* Bottom Meta Strip */}
              <div className="px-4 py-3 bg-[#121216] border-t border-white/[0.06] flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-slate-400 truncate">
                  Kontingen Resmi KRTMI UNY
                </span>
                <span className="text-orange-400 font-medium truncate flex-shrink-0">
                  Juara 1 Wilayah &amp; Juara 2 Nasional
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default HeroSection;
