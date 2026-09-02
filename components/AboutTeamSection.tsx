import React from 'react';
import { Users, Trophy, Camera } from 'lucide-react';

export const AboutTeamSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="about-tim" className="py-8 sm:py-10 md:py-12 border-b border-[#1A120B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header - Wider on Laptop without awkward newlines */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
            <Users className="w-3.5 h-3.5" />
            <span>ABOUT ABHINAYA UNY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight lg:whitespace-nowrap leading-tight lg:whitespace-nowrap">
            Mengenal Tim Robotika Abhinaya UNY&nbsp;🛠️
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Tim Abhinaya adalah tim riset robotika divisi <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong> di bawah naungan <strong>UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta</strong> — unit kegiatan mahasiswa tingkat universitas yang terbuka bagi seluruh mahasiswa UNY lintas fakultas.
          </p>
        </div>

        {/* Featured UMS 2024 Post-Match Team Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-brand-orange/50 shadow-[0_0_50px_rgba(255,107,0,0.2)] bg-[#120D08] group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={`${basePath}/images/team_ums_2024_web.jpg`}
              alt="Tim Robotika Abhinaya UNY Seusai Berjuang di Ajang KRTMI UMS 2024"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0704] via-[#0A0704]/40 to-transparent" />
            
            {/* Badge Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-brand-orange/90 text-black text-xs font-black uppercase tracking-wider shadow-lg">
                <Trophy className="w-3.5 h-3.5 fill-black" />
                <span>KONTINGEN RESMI KRTMI 2024</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-black/70 text-amber-200 text-xs font-mono font-bold border border-brand-orange/30 backdrop-blur-md">
                Universitas Muhammadiyah Surakarta (UMS)
              </span>
            </div>

            {/* Bottom Caption Box */}
            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
              <div className="space-y-1 max-w-3xl">
                <p className="text-sm sm:text-lg md:text-xl font-black text-amber-300 drop-shadow-md">
                  Momen Kebersamaan Tim Abhinaya UNY Seusai Berjuang di KRTMI Nasional 2024
                </p>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow">
                  Solidaritas seluruh kontingen UKM Rekayasa Teknologi UNY divisi Mekanik, Elektrik, Programming & AI, serta Manajerial setelah berjuang menorehkan prestasi membanggakan bagi Universitas Negeri Yogyakarta.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md flex-shrink-0">
                <Camera className="w-4 h-4" />
                <span>Foto Resmi Paddock UMS 2024</span>
              </div>
            </div>
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
              <div className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-brand-orange font-mono text-base">7+ Periode</div>
                <div className="text-[11px] text-amber-200/70">Riset KRTMI Sejak 2019</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-amber-400 font-mono text-base">100% Otonom</div>
                <div className="text-[11px] text-amber-200/70">Teknologi Kamera AI</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-yellow-400 font-mono text-base">UKM Restek UNY</div>
                <div className="text-[11px] text-amber-200/70">Tingkat Universitas & BPTI</div>
              </div>
            </div>
          </div>

          {/* Genuine Photo Collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 shadow-xl group">
              <img
                src={`${basePath}/images/gallery/WEB_5721.jpg`}
                alt="Aktivitas Riset Laboratorium Abhinaya UNY"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 shadow-xl group">
              <img
                src={`${basePath}/images/gallery/WEB_5681.jpg`}
                alt="Pengujian Komponen Mekanik & Elektrik Robot"
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
