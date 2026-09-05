'use client';

import React from 'react';
import { Trophy, Award, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { SpotlightCard, ShinyText, DecryptedText } from '@/components/animations';

export const Achievements: React.FC = () => {
  const awards = [
    {
      year: '2026',
      title: 'Finalis Lomba Robot Kreatif Nasional',
      event: 'UNLIMITED Robotics Competition UNDIP 2026',
      organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
      badge: 'FINALIS ROBOT KREATIF',
      highlight: true,
    },
    {
      year: '2026',
      title: 'Peserta Tingkat Nasional Transporter',
      event: 'Technocorner 2026 Robot Competition',
      organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada',
      badge: 'NASIONAL UGM',
      highlight: false,
    },
    {
      year: '2024',
      title: 'Juara 1 Regional I Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek',
      badge: 'JUARA 1 REGIONAL',
      highlight: true,
    },
    {
      year: '2024',
      title: 'Juara 2 Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek & UMS',
      badge: 'JUARA 2 NASIONAL',
      highlight: true,
    },
    {
      year: '2023',
      title: 'Juara 3 Tingkat Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek',
      badge: 'JUARA 3 WILAYAH',
      highlight: false,
    },
    {
      year: '2023',
      title: 'Finalis Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek & USM',
      badge: 'FINALIS NASIONAL',
      highlight: false,
    },
  ];

  const getVerificationLabel = (organizer: string) => {
    if (organizer.includes('Diponegoro')) {
      return 'Penghargaan Resmi Teknik Elektro UNDIP';
    }
    if (organizer.includes('Gadjah Mada')) {
      return 'Sertifikasi Resmi DTETI FT UGM';
    }
    return 'Puspresnas BPTI / Penghargaan Resmi UNY';
  };

  return (
    <section id="prestasi" className="py-12 sm:py-16 md:py-20 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-mono tracking-wider border border-brand-orange/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>REKAM JEJAK KEJUARAAN RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            <ShinyText
              text="Kabinet Prestasi & Jejak Podium Nasional"
              speed={4}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Bukti nyata konsistensi riset dan dedikasi rekayasa teknologi mahasiswa UNY di panggung Kontes Robot Indonesia (KRTMI) Puspresnas BPTI, Technocorner UGM, dan UNLIMITED UNDIP.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {awards.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(255, 107, 0, 0.12)"
              spotlightSize={300}
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 space-y-4 relative overflow-hidden group border ${
                item.highlight
                  ? 'bg-[#0E0E12] border-brand-orange/40 hover:border-brand-orange/70 shadow-lg shadow-brand-orange/5'
                  : 'bg-[#0B0B0E] border-white/8 hover:border-white/15'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 text-brand-orange border border-white/10 font-mono">
                    <DecryptedText
                      text={item.year}
                      animateOn="hover"
                      className="text-brand-orange font-mono"
                    />
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase ${
                    item.highlight ? 'bg-brand-orange text-black font-black' : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}>
                    <DecryptedText
                      text={item.badge}
                      animateOn="hover"
                      className={item.highlight ? 'text-black font-black' : 'text-slate-300'}
                    />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {item.event}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.organizer}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center space-x-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                  <span>{getVerificationLabel(item.organizer)}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};