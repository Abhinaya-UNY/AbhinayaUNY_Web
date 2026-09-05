'use client';

import React from 'react';
import { Users, Trophy, Camera } from 'lucide-react';
import { SpotlightCard, CountUp } from '@/components/animations';

export const AboutTeamSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="about-tim" className="py-8 sm:py-10 md:py-12 border-b border-[#1A120B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header - Wider on Laptop without awkward newlines */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            <span>TENTANG ABHINAYA UNY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight  leading-tight ">
            Mengenal Tim Robotika Abhinaya UNY&nbsp;🛠️
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Tim Abhinaya adalah tim riset robotika divisi <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong> di bawah naungan <strong>UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta</strong> — unit kegiatan mahasiswa tingkat universitas yang terbuka bagi seluruh mahasiswa UNY lintas fakultas.
          </p>
        </div>

        {/* Featured UMS 2024 Post-Match Team Photo Showcase (Decoupled 3-Part Unblocked Architecture) */}
        <div className="rounded-3xl overflow-hidden border-2 border-brand-orange/40 bg-[#120D08] shadow-[0_0_50px_rgba(255,107,0,0.18)] flex flex-col group">
          
          {/* 1. Top Meta Header Bar (Cleanly placed ABOVE photo) */}
          <div className="px-5 py-3.5 sm:px-7 sm:py-4 bg-[#140E09] border-b border-[#2A180E] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black text-xs font-black uppercase tracking-wider shadow-sm">
                <Trophy className="w-3.5 h-3.5 fill-black" />
                <span>KONTINGEN RESMI KRTMI 2024</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#1C130B] text-amber-300 text-xs font-mono font-bold border border-brand-orange/30">
                Edutorium UMS Surakarta
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300/90 bg-[#1C130B] px-3 py-1 rounded-xl border border-brand-orange/20">
              <Camera className="w-3.5 h-3.5 text-brand-orange" />
              <span>Dokumentasi Resmi Paddock Nasional</span>
            </div>
          </div>

          {/* 2. Pristine Photo Viewport (100% Unblocked, Natural Aspect Ratio, Zero Text Over Faces/Robots) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black">
            <img
              src={`${basePath}/images/team_ums_2024_web.jpg`}
              alt="Tim Robotika Abhinaya UNY Seusai Berjuang di Ajang KRTMI UMS 2024"
              className="w-full h-full object-cover object-top sm:object-center group-hover:scale-102 transition-transform duration-700 brightness-100 contrast-105"
            />
          </div>

          {/* 3. Dedicated Caption & Story Panel (Cleanly placed BELOW photo) */}
          <div className="p-5 sm:p-7 bg-[#0D0906] border-t border-[#2A180E] space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="text-base sm:text-xl font-black text-amber-300">
                Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#1C130B] text-amber-400 border border-brand-orange/20">
                  15 Personel Kontingen
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#1C130B] text-amber-300 border border-amber-500/20">
                  4 Divisi Teknis
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-5xl">
              Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY lintas fakultas (Mekanik, Elektrik, Pemrograman &amp; AI, serta Manajerial) seusai menuntaskan seluruh ronde pertandingan dan mempersembahkan gelar Juara 2 Nasional di Edutorium Universitas Muhammadiyah Surakarta.
            </p>
          </div>

        </div>

        {/* 2-Columns Team Story & Workshop Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">
              Wadah Riset, Belajar dari Nol, & Meraih Prestasi Bersama
            </h3>
            <p>
              Di lab robotika UKM Rekayasa Teknologi UNY, kami memadukan 4 pilar rekayasa: <strong>Mekanik (Desain 3D & Manufaktur)</strong>, <strong>Elektrik (Sirkuit & Manajemen Daya)</strong>, <strong>Pemrograman & AI (Firmware & Visi Komputer)</strong>, serta <strong>Manajerial & Media</strong>.
            </p>
            <p>
              Mahasiswa baru dari seluruh jurusan dan fakultas di UNY dibimbing secara bertahap mulai dari pemahaman dasar elektronika, merakit sasis mecanum, hingga memprogram algoritma otonom berbasis kecerdasan buatan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.18)"
                spotlightSize={200}
                className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5"
              >
                <div className="font-black text-brand-orange font-mono text-base flex items-baseline">
                  <CountUp to={7} duration={2} />+ Periode
                </div>
                <div className="text-[11px] text-amber-200/70">Riset KRTMI Sejak 2019</div>
              </SpotlightCard>
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.18)"
                spotlightSize={200}
                className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5"
              >
                <div className="font-black text-amber-400 font-mono text-base flex items-baseline">
                  <CountUp to={100} duration={2} />% Otonom
                </div>
                <div className="text-[11px] text-amber-200/70">Teknologi Kamera AI</div>
              </SpotlightCard>
              <SpotlightCard
                spotlightColor="rgba(255, 107, 0, 0.18)"
                spotlightSize={200}
                className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5"
              >
                <div className="font-black text-yellow-400 font-mono text-base">UKM Restek UNY</div>
                <div className="text-[11px] text-amber-200/70">Tingkat Universitas &amp; BPTI</div>
              </SpotlightCard>
            </div>
          </div>

          {/* Genuine Photo Collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 hover:border-brand-orange/70 shadow-xl group bg-[#160E08] transition duration-300">
              <img
                src={`${basePath}/assets/WEB_5721.jpg`}
                alt="Aktivitas Riset Laboratorium Abhinaya UNY"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500 brightness-95 contrast-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${basePath}/assets/hero_abhinaya.jpg`;
                }}
              />
            </div>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 hover:border-brand-orange/70 shadow-xl group bg-[#160E08] transition duration-300">
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