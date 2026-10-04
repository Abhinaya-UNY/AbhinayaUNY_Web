'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Trophy, Sparkles } from 'lucide-react';
import { BlurText, ShinyText, DecryptedText, AmbientGrid, Aurora, Magnet, InteractiveCanvasDust } from '@/components/animations';

function usePreloaderComplete(): boolean {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fast-path: already dismissed in this session or flag set
    try {
      if (
        (window as any).__ABHINAYA_PRELOADER_DONE ||
        (window.sessionStorage && window.sessionStorage.getItem('abhinaya_preloader_loaded'))
      ) {
        setIsComplete(true);
        return;
      }
    } catch {
      // Insecure storage fallback
    }

    // Event listener for active preloader dismissal
    const handleDismiss = () => {
      setIsComplete(true);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });

    // Safety fallback timeout: fail-open quickly so UI is never stuck invisible
    const fallbackTimer = setTimeout(() => {
      setIsComplete(true);
    }, 800);

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return isComplete;
}

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  scope: string;
  achievement: string;
  badge: string;
  objectPosition?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'krtmi-2024-nasional',
    image: '/assets/hero_abhinaya.jpg',
    alt: 'Kontingen Tim Robotika Abhinaya UNY di Panggung Kejuaraan Nasional',
    scope: 'Kontingen Resmi KRTMI UNY',
    achievement: 'Juara 1 Wilayah & Juara 2 Nasional',
    badge: 'KRTMI NASIONAL 2024',
    objectPosition: 'object-top sm:object-center',
  },
  {
    id: 'undip-2026-juara-1',
    image: '/gallery/unlimited_undip/undip_juara_1_robot_creative.webp',
    alt: 'Tim Robotika Abhinaya UNY Juara 1 Robot Kreatif UNLIMITED UNDIP 2026 Environmental Monitoring & Waste Management',
    scope: 'UNLIMITED UNDIP 2026',
    achievement: 'Juara 1 Robot Kreatif • Environmental Monitoring & Waste Management',
    badge: 'JUARA 1 ROBOT KREATIF',
    objectPosition: 'object-center',
  },
];

export const HeroSection: React.FC = () => {
  const isPreloaderDone = usePreloaderComplete();
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
  }, []);

  const handleSelectSlide = useCallback(
    (nextIdx: number) => {
      setCurrentSlide(nextIdx);
      resetTimer();
    },
    [resetTimer]
  );

  // Persistent auto-play loop with visibility change & focus listeners
  useEffect(() => {
    // 1. Pre-warm and lock both hero images into browser decode memory
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = `${basePath}${slide.image}`;
    });

    const handleVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        resetTimer();
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    resetTimer();

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', resetTimer);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibility);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', resetTimer);
      }
    };
  }, [basePath, resetTimer]);

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
              {/* Award Badge Pill (Left-aligned, synced with active hero slide) */}
              <div
                className={`pt-1 ${getEntranceClass(400)}`}
                style={{ transitionDelay: isPreloaderDone ? '400ms' : '0ms' }}
              >
                <div className="relative inline-flex items-center min-h-[34px]">
                  {/* Slide 0 Badge (KRTMI 2024) */}
                  <span
                    className={`inline-flex items-center space-x-2 text-amber-400/90 text-xs sm:text-sm font-mono bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-amber-500/25 shadow-sm transition-all duration-700 ${
                      currentSlide === 0
                        ? 'opacity-100 scale-100 relative z-10'
                        : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <ShinyText
                      text="JUARA 1 WILAYAH I & JUARA 2 NASIONAL KRTMI 2024"
                      speed={4}
                      className="text-xs sm:text-sm font-mono text-amber-300 font-semibold"
                    />
                  </span>

                  {/* Slide 1 Badge (UNLIMITED UNDIP 2026) */}
                  <span
                    className={`inline-flex items-center space-x-2 text-orange-400/90 text-xs sm:text-sm font-mono bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-orange-500/30 shadow-sm transition-all duration-700 ${
                      currentSlide === 1
                        ? 'opacity-100 scale-100 relative z-10'
                        : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <ShinyText
                      text="JUARA 1 ROBOT KREATIF • UNLIMITED UNDIP 2026"
                      speed={4}
                      className="text-xs sm:text-sm font-mono text-orange-300 font-semibold"
                    />
                  </span>
                </div>
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

          {/* RIGHT COLUMN: Studio Photography & Championship Showcase (Col 5 on Desktop) */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Cinematic Studio Frame: 100% Unblocked Photography Slideshow */}
            <div
              className={`relative rounded-2xl overflow-hidden bg-[#121216] group border border-orange-500/20 hover:border-orange-500/40 shadow-2xl shadow-orange-950/20 transition-all duration-300 ${getEntranceClass(450)}`}
              style={{ transitionDelay: isPreloaderDone ? '450ms' : '0ms' }}
            >
              {/* Photo Viewport with Smooth Crossfade */}
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-[#18181B] relative">
                {HERO_SLIDES.map((slide, idx) => (
                  <img
                    key={slide.id}
                    src={`${basePath}${slide.image}`}
                    alt={slide.alt}
                    loading="eager"
                    decoding="sync"
                    className={`absolute inset-0 w-full h-full object-cover ${slide.objectPosition || 'object-center'} brightness-100 contrast-105 group-hover:scale-[1.02] transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                      currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  />
                ))}

                {/* Floating Trophy Pill on Top-Right */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-orange-300 shadow-lg pointer-events-none">
                  <Trophy className="w-3 h-3 text-amber-400 flex-shrink-0 animate-pulse" />
                  <span className="font-bold tracking-wider">{HERO_SLIDES[currentSlide].badge}</span>
                </div>

                {/* Manual Navigation Controls (Left & Right Arrow Buttons on hover) */}
                <div className="absolute inset-y-0 inset-x-2 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={() => handleSelectSlide(currentSlide === 0 ? HERO_SLIDES.length - 1 : currentSlide - 1)}
                    aria-label="Slide sebelumnya"
                    className="w-7 h-7 rounded-full bg-black/70 hover:bg-orange-500/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-orange-400 transition pointer-events-auto shadow-lg cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSlide((currentSlide + 1) % HERO_SLIDES.length)}
                    aria-label="Slide berikutnya"
                    className="w-7 h-7 rounded-full bg-black/70 hover:bg-orange-500/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:border-orange-400 transition pointer-events-auto shadow-lg cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              {/* Bottom Meta Strip with Interactive Slide Dots */}
              <div className="px-4 py-3 bg-[#121216] border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11px] font-mono relative z-20">
                <div className="flex items-center space-x-2.5 min-w-0">
                  {/* Slide Indicators */}
                  <div className="flex items-center space-x-1.5 flex-shrink-0" role="tablist" aria-label="Slide foto kejuaraan">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        aria-label={`Lihat slide kejuaraan ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlide === idx
                            ? 'w-5 bg-orange-400 shadow-sm shadow-orange-500/50'
                            : 'w-1.5 bg-white/20 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-400 truncate transition-opacity duration-300">
                    {HERO_SLIDES[currentSlide].scope}
                  </span>
                </div>
                <span className="text-orange-400 font-semibold truncate flex-shrink-0 transition-opacity duration-300">
                  {HERO_SLIDES[currentSlide].achievement}
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
