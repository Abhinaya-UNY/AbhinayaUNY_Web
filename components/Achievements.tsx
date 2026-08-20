import React from 'react';
import { Trophy, Award, Medal, Star, ShieldCheck } from 'lucide-react';

export const Achievements: React.FC = () => {
  const awards = [
    {
      year: '2024',
      title: 'Juara 1 Regional I Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek',
      badge: '🥇 JUARA 1 REGIONAL',
      color: 'from-amber-400 to-yellow-600',
    },
    {
      year: '2024',
      title: 'Juara 2 Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek & UMS',
      badge: '🥈 JUARA 2 NASIONAL',
      color: 'from-slate-200 to-slate-400',
    },
    {
      year: '2023',
      title: 'Juara 3 Tingkat Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek',
      badge: '🥉 JUARA 3 WILAYAH',
      color: 'from-amber-600 to-orange-700',
    },
    {
      year: '2023',
      title: 'Finalis Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek & USM',
      badge: '🏅 FINALIS NASIONAL',
      color: 'from-cyan-400 to-blue-600',
    },
    {
      year: '2026',
      title: 'Peserta Tingkat Nasional Transporter',
      event: 'Technocorner 2026 Robot Competition',
      organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada',
      badge: '🤖 NASIONAL UGM',
      color: 'from-red-400 to-pink-600',
    },
  ];

  return (
    <section className="py-16 bg-[#070C16] border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-black uppercase tracking-wider border border-brand-gold/30">
            <Trophy className="w-3.5 h-3.5" />
            <span>PRESTASI RESMI TIM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Papan Kejuaraan &amp; Jejak Prestasi Nasional
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Rekam jejak dedikasi riset dan kejuaraan robotika mahasiswa Universitas Negeri Yogyakarta pada kancah nasional.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#090F1A] border border-slate-800 hover:border-brand-cyan/60 transition space-y-4 relative overflow-hidden group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 rounded-xl bg-slate-900 text-brand-cyan border border-slate-700 font-mono">
                  {item.year}
                </span>
                <span className="text-[11px] font-black text-white px-2.5 py-0.5 rounded-lg bg-gradient-to-r shadow-md">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-white group-hover:text-brand-cyan transition">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-semibold">
                  {item.event}
                </p>
                <p className="text-[11px] text-slate-400">
                  {item.organizer}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Puspresnas / Prestasi Resmi UNY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
