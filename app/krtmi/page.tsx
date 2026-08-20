import React from 'react';
import { KRTMI_STORIES } from '@/data/krtmiData';
import { History, Trophy, MapPin, Sparkles, CheckCircle2, Flame, FileText, Download } from 'lucide-react';

export const metadata = {
  title: 'Cerita & Buku Panduan KRTMI (2019 – 2026) — Tim Robotika Abhinaya UNY',
  description: 'Rekapitulasi lengkap sejarah lomba, misi arena, kisah seru tim Abhinaya UNY, dan unduhan resmi PDF Buku Panduan KRTMI 2019-2026.',
};

export default function KrtmiPage() {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <History className="w-4 h-4" />
          <span>ARSIP RESMI &amp; GUIDEBOOK KRTMI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Perjalanan Lomba &amp; Buku Panduan KRTMI (2019 – 2026) 📜
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Pelajari aturan resmi, layout arena, mekanisme penilaian, dan unduh dokumen PDF buku pedoman resmi dari Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek untuk setiap edisi lomba!
        </p>
      </div>

      {/* Stories List */}
      <div className="space-y-12">
        {KRTMI_STORIES.map((story) => (
          <div
            key={story.year}
            id={`tahun-${story.year}`}
            className="p-6 sm:p-10 rounded-3xl bg-[#140E09] border-2 border-brand-orange/30 shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A1B10] pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl sm:text-4xl font-black text-brand-orange font-mono">
                  {story.year}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {story.title}
                  </h2>
                  <p className="text-xs font-semibold text-amber-200/70 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    <span>{story.location}</span>
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                Edisi {story.year}
              </span>
            </div>

            {/* Achievement Badge */}
            <div className="p-4 rounded-2xl bg-[#0C0805] border border-brand-orange/40 flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <div className="text-xs sm:text-sm font-black text-white font-mono">
                {story.achievement}
              </div>
            </div>

            {/* Story Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Mission and Narrative */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0A0704] border border-[#241508]">
                <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>Misi Lomba &amp; Tema Masalah</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {story.storySummary}
                </p>
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    Kisah Tim di Balik Layar:
                  </span>
                  <ul className="space-y-1.5">
                    {story.teamRoleAndFunFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <Flame className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Robot Mechanism */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#0A0704] border border-[#241508]">
                <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <span>Cara Robot Bekerja Menyelesaikan Misi</span>
                </h3>
                <ul className="space-y-2.5">
                  {story.howItWorks.map((work, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#140E09] border border-[#26170B] text-xs text-slate-300 space-y-1">
                      <span className="font-semibold text-white block">{work}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Guidebook Download Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0C0805] border border-brand-orange/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">
                    {story.pdfTitle}
                  </div>
                  <div className="text-[11px] text-amber-200/60 font-semibold">
                    Ukuran File: {story.pdfSize} • Dokumen Resmi BPTI / Panitia
                  </div>
                </div>
              </div>
              <a
                href={`${basePath}/guidebooks/${story.pdfFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs flex items-center justify-center space-x-2 transition shadow-md whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PDF Panduan Resmi</span>
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
