import React from 'react';
import { Bot, Wrench, Zap, Code, Users, Sparkles, CheckCircle2, ArrowRight, Trophy, ShieldCheck, Camera } from 'lucide-react';
import Link from 'next/link';
import { TEAM_DIVISIONS } from '@/data/krtmiData';

export const AboutTeamSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="about-tim" className="py-10 sm:py-16 md:py-20 space-y-10 sm:space-y-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
            <Users className="w-3.5 h-3.5" />
            <span>ABOUT ABHINAYA UNY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Mengenal Tim Robotika Abhinaya UNY 🛠️
          </h2>
          <p className="text-xs sm:text-base text-slate-300">
            Tim Abhinaya adalah tim robotika resmi di bawah Fakultas Teknik Universitas Negeri Yogyakarta yang berkompetisi di divisi <strong>Kontes Robot Tematik Indonesia (KRTMI)</strong>.
          </p>
        </div>

        {/* Featured UMS 2024 Post-Match Team Photo Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-brand-orange/50 shadow-[0_0_50px_rgba(255,107,0,0.2)] bg-[#120D08] group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={`${basePath}/images/team_ums_2024_web.jpg`}
              alt="Tim Robotika Abhinaya UNY Pasca Laga KRTMI di UMS 2024"
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
              <div className="space-y-1 max-w-2xl">
                <p className="text-sm sm:text-xl font-black text-amber-300 drop-shadow-md">
                  Dokumentasi Tim Abhinaya UNY Pasca Kompetisi KRTMI Nasional 2024
                </p>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow">
                  Solidaritas seluruh kontingen divisi Mekanik, Elektrik, Programming &amp; AI, serta Manajerial setelah berjuang menorehkan prestasi membanggakan bagi Universitas Negeri Yogyakarta.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          
          <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Wadah Riset, Belajar dari Nol, &amp; Meraih Prestasi Bersama
            </h3>
            <p>
              Di lab robotika Abhinaya UNY, kami memadukan 4 pilar rekayasa: <strong>Mekanik (Desain 3D &amp; Manufaktur)</strong>, <strong>Elektrik (Sirkuit &amp; Manajemen Daya)</strong>, <strong>Pemrograman &amp; AI (Firmware &amp; Visi Komputer)</strong>, serta <strong>Manajerial &amp; Media</strong>.
            </p>
            <p>
              Mahasiswa baru dari berbagai jurusan teknik dibimbing secara bertahap mulai dari pemahaman dasar elektronika, merakit sasis mecanum, hingga memprogram algoritma otonom berbasis kecerdasan buatan.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-brand-orange font-mono text-base">7+ Periode</div>
                <div className="text-[11px] text-amber-200/70">Riset KRTMI Sejak 2019</div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-amber-400 font-mono text-base">100% Otonom</div>
                <div className="text-[11px] text-amber-200/70">Teknologi Kamera AI</div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#140E09] border border-[#2B1B10] text-xs space-y-0.5">
                <div className="font-black text-yellow-400 font-mono text-base">Puspresnas BPTI</div>
                <div className="text-[11px] text-amber-200/70">Afiliasi Resmi Kemendikbud</div>
              </div>
            </div>
          </div>

          {/* Genuine Photo Collage with WEB_5721.jpg on Left */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 shadow-xl group">
              <img
                src={`${basePath}/assets/WEB_5721.jpg`}
                alt="Robot Abhinaya di Arena KRTMI"
                className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-orange/40 shadow-xl group">
              <img
                src={`${basePath}/assets/robot_action_1.jpg`}
                alt="Tim Abhinaya Memantau Robot di Arena"
                className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>

        {/* 4 Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
          {TEAM_DIVISIONS.map((div) => (
            <div
              key={div.id}
              className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#140E09] border border-[#2B1B10] hover:border-brand-orange/60 transition space-y-3.5 shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 group-hover:scale-110 transition flex-shrink-0">
                  {div.id === 'mekanik' && <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />}
                  {div.id === 'elektrik' && <Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
                  {div.id === 'programming' && <Code className="w-5 h-5 sm:w-6 sm:h-6" />}
                  {div.id === 'manajerial' && <Users className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-brand-orange transition">
                    {div.name}
                  </h3>
                  <span className="text-[10px] text-amber-200/60 font-semibold uppercase tracking-wider">
                    Divisi Resmi Tim Abhinaya
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {div.desc}
              </p>

              <div className="pt-2 border-t border-[#26180E] space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Fokus Pembelajaran:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {div.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#20150D] text-amber-200 text-[10px] sm:text-[11px] font-semibold border border-brand-orange/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
