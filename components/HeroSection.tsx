import React from 'react';
import Link from 'next/link';
import { Bot, Trophy, Sparkles, ArrowRight, Play, Users, Flame, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Background Neon Orange Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Top Trophy Banner */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1A1108] border border-brand-orange/50 shadow-[0_0_25px_rgba(255,107,0,0.3)] text-amber-300 text-xs sm:text-sm font-black tracking-wide uppercase">
            <Trophy className="w-4 h-4 text-brand-gold animate-bounce" />
            <span>JUARA 1 REGIONAL I &amp; JUARA 2 NASIONAL KRTMI 2024</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            TIM ROBOTIKA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-300">
              ABHINAYA UNY
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            Selamat datang di portal resmi <strong>Tim Abhinaya Universitas Negeri Yogyakarta</strong>! Kami adalah wadah riset mahasiswa lintas jurusan yang merancang dan mengembangkan robot-robot cerdas untuk berlaga di divisi <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong> sejak tahun 2019 hingga sekarang.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/krtmi"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-black font-black text-sm flex items-center justify-center space-x-2 shadow-[0_0_35px_rgba(255,107,0,0.4)] hover:scale-105 transition"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>Jelajahi Cerita Lomba KRTMI (2019–2026)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#video-aksi"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#171008] hover:bg-[#251A0D] border border-brand-orange/40 text-amber-200 hover:text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
          >
            <Play className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span>Tonton Video Robot Beraksi</span>
          </a>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="p-5 rounded-3xl bg-[#120D08] border border-[#2B1B10] text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-brand-orange font-mono">7+ Edisi</div>
            <div className="text-xs text-amber-200/70 font-semibold uppercase">Kompetisi Robot Nasional</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#120D08] border border-[#2B1B10] text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">Juara 1 &amp; 2</div>
            <div className="text-xs text-amber-200/70 font-semibold uppercase">Tingkat Nasional 2024</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#120D08] border border-[#2B1B10] text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-yellow-400 font-mono">4 Divisi</div>
            <div className="text-xs text-amber-200/70 font-semibold uppercase">Mekanik, Elektrik, AI &amp; Media</div>
          </div>
          <div className="p-5 rounded-3xl bg-[#120D08] border border-[#2B1B10] text-center space-y-1 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-orange-400 font-mono">Puspresnas</div>
            <div className="text-xs text-amber-200/70 font-semibold uppercase">BPTI Kemendikbudristek</div>
          </div>
        </div>

      </div>
    </section>
  );
};
