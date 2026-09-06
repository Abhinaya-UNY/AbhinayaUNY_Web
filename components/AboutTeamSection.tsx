'use client';

import React from 'react';
import { Users, Trophy, Camera } from 'lucide-react';
import { SpotlightCard, CountUp } from '@/components/animations';

export const AboutTeamSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="about-tim" className="py-8 sm:py-10 md:py-12 border-b border-white/[0.06] bg-[#0B0B0E] relative">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header (Editorial Split Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono tracking-wider border border-orange-500/20">
              <Users className="w-3.5 h-3.5 text-orange-400" />
              <span>TENTANG ABHINAYA UNY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Mengenal Tim Robotika Abhinaya UNY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
            Tim Abhinaya adalah tim riset robotika divisi <strong className="text-slate-200">Kontes Robot Tematik Indonesia (KRTMI)</strong> di bawah naungan <strong className="text-slate-200">UKM Rekayasa Teknologi (Restek) UNY</strong> — unit kegiatan mahasiswa tingkat universitas yang terbuka bagi seluruh mahasiswa UNY lintas fakultas.
          </p>
        </div>

        {/* Featured Team Photo */}
        <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#121216] flex flex-col group shadow-xl">
          
          {/* Top meta bar */}
          <div className="px-5 py-3.5 sm:px-7 bg-[#18181B] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-orange-400 text-black text-[11px] font-bold uppercase tracking-wider font-mono shadow-sm">
                <Trophy className="w-3 h-3 fill-black" />
                <span>KONTINGEN RESMI KRTMI 2024</span>
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Edutorium UMS Surakarta
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
              <Camera className="w-3 h-3 text-orange-400" />
              <span>Dokumentasi Resmi Paddock Nasional</span>
            </div>
          </div>

          {/* Photo — 100% unblocked */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black">
            <img
              src={`${basePath}/images/team_ums_2024_web.jpg`}
              alt="Tim Robotika Abhinaya UNY Seusai Berjuang di Ajang KRTMI UMS 2024"
              className="w-full h-full object-cover object-top sm:object-center group-hover:scale-[1.01] transition-transform duration-700 brightness-100 contrast-105"
            />
          </div>

          {/* Caption below */}
          <div className="p-5 sm:p-7 bg-[#18181B] border-t border-white/[0.06] space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span>15 Personel Kontingen</span>
                <span className="text-white/20">|</span>
                <span>4 Divisi Teknis</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-5xl">
              Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY lintas fakultas (Mekanik, Elektrik, Pemrograman &amp; AI, serta Manajerial) seusai menuntaskan seluruh ronde pertandingan dan mempersembahkan gelar Juara 2 Nasional di Edutorium Universitas Muhammadiyah Surakarta.
            </p>
          </div>

        </div>

        {/* 2-Columns Team Story & Workshop Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Wadah Riset, Belajar dari Nol, & Meraih Prestasi Bersama
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Di lab robotika UKM Rekayasa Teknologi UNY, kami memadukan 4 pilar rekayasa: <strong className="text-slate-200">Mekanik (Desain 3D & Manufaktur)</strong>, <strong className="text-slate-200">Elektrik (Sirkuit & Manajemen Daya)</strong>, <strong className="text-slate-200">Pemrograman & AI (Firmware & Visi Komputer)</strong>, serta <strong className="text-slate-200">Manajerial & Media</strong>.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mahasiswa baru dari seluruh jurusan dan fakultas di UNY dibimbing secara bertahap mulai dari pemahaman dasar elektronika, merakit sasis mecanum, hingga memprogram algoritma otonom berbasis kecerdasan buatan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.15)"
                spotlightSize={200}
                className="p-3 rounded-xl bg-[#121216] border border-white/[0.08] text-xs space-y-0.5"
              >
                <div className="font-bold text-orange-400 font-mono text-base flex items-baseline">
                  <CountUp to={7} duration={2} />+ Periode
                </div>
                <div className="text-[11px] text-slate-500">Riset KRTMI Sejak 2019</div>
              </SpotlightCard>
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.15)"
                spotlightSize={200}
                className="p-3 rounded-xl bg-[#121216] border border-white/[0.08] text-xs space-y-0.5"
              >
                <div className="font-bold text-orange-400 font-mono text-base flex items-baseline">
                  <CountUp to={100} duration={2} />% Otonom
                </div>
                <div className="text-[11px] text-slate-500">Teknologi Kamera AI</div>
              </SpotlightCard>
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.15)"
                spotlightSize={200}
                className="p-3 rounded-xl bg-[#121216] border border-white/[0.08] text-xs space-y-0.5"
              >
                <div className="font-bold text-white font-mono text-base">UKM Restek UNY</div>
                <div className="text-[11px] text-slate-500">Tingkat Universitas & BPTI</div>
              </SpotlightCard>
            </div>
          </div>

          {/* Photo Collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl overflow-hidden border border-white/[0.08] group bg-[#121216] transition duration-300">
              <img
                src={`${basePath}/assets/WEB_5721.jpg`}
                alt="Aktivitas Riset Laboratorium Abhinaya UNY"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500 brightness-95 contrast-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${basePath}/assets/hero_abhinaya.jpg`;
                }}
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/[0.08] group bg-[#121216] transition duration-300">
              <img
                src={`${basePath}/assets/robot_action_1.jpg`}
                alt="Pengujian Komponen Mekanik & Elektrik Robot"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500 brightness-95 contrast-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${basePath}/assets/hero_abhinaya.jpg`;
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
