import React from 'react';
import { Trophy, Award, ShieldCheck, Star, Sparkles } from 'lucide-react';

export const Achievements: React.FC = () => {
  const awards = [
    {
      year: '2024',
      title: 'Juara 1 Regional I Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek',
      badge: '🥇 JUARA 1 REGIONAL',
      highlight: true,
    },
    {
      year: '2024',
      title: 'Juara 2 Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek & UMS',
      badge: '🥈 JUARA 2 NASIONAL',
      highlight: true,
    },
    {
      year: '2023',
      title: 'Juara 3 Tingkat Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek',
      badge: '🥉 JUARA 3 WILAYAH',
      highlight: false,
    },
    {
      year: '2023',
      title: 'Finalis Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek & USM',
      badge: '🏅 FINALIS NASIONAL',
      highlight: false,
    },
    {
      year: '2026',
      title: 'Peserta Tingkat Nasional Transporter',
      event: 'Technocorner 2026 Robot Competition',
      organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada',
      badge: '🤖 NASIONAL UGM',
      highlight: false,
    },
  ];

  return (
    <section id="prestasi" className="py-8 sm:py-10 md:py-12 space-y-8 sm:space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>PAPAN PRESTASI RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight ">
            Jejak Kejuaraan Tim Abhinaya UNY&nbsp;🏆
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Buah dari kerja keras, dedikasi riset larut malam di lab, dan semangat inovasi mahasiswa Universitas Negeri Yogyakarta di panggung kompetisi robotika nasional.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl transition space-y-4 relative overflow-hidden group shadow-lg border ${
                item.highlight
                  ? 'bg-gradient-to-b from-[#241508] to-[#140D07] border-brand-orange shadow-[0_0_35px_rgba(255,107,0,0.25)] ring-1 ring-brand-orange/50'
                  : 'bg-[#120D08] border-[#2B1B10] hover:border-brand-orange/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#22160E] text-brand-orange border border-[#3A2617] font-mono">
                  {item.year}
                </span>
                <span className={`text-[11px] font-black px-3 py-1 rounded-lg ${
                  item.highlight ? 'bg-brand-orange text-black font-black' : 'bg-[#2A1D13] text-amber-200'
                }`}>
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-white group-hover:text-brand-orange transition">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-200/80 font-semibold">
                  {item.event}
                </p>
                <p className="text-[11px] text-slate-400">
                  {item.organizer}
                </p>
              </div>

              <div className="pt-2 border-t border-[#26180E] flex items-center space-x-2 text-[11px] text-amber-300/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Puspresnas / Penghargaan Resmi UNY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};