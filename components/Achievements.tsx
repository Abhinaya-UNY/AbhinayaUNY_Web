'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, Maximize2, X, ExternalLink, Eye, Award } from 'lucide-react';
import { SpotlightCard, ShinyText, DecryptedText } from '@/components/animations';

interface AwardItem {
  year: string;
  title: string;
  event: string;
  organizer: string;
  badge: string;
  highlight: boolean;
  image: string;
  certNumber?: string;
}

export const Achievements: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';
  const [selectedCert, setSelectedCert] = useState<AwardItem | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const awards: AwardItem[] = [
    {
      year: '2026',
      title: 'Finalis Lomba Robot Kreatif Nasional',
      event: 'UNLIMITED Robotics Competition UNDIP 2026',
      organizer: 'Departemen Teknik Elektro Universitas Diponegoro',
      badge: 'FINALIS ROBOT KREATIF',
      highlight: true,
      image: '/images/news/undip-unlimited-robot-finalist.jpg',
      certNumber: 'Finalis Nasional UNLIMITED 2026',
    },
    {
      year: '2026',
      title: 'Peserta Tingkat Nasional Transporter',
      event: 'Technocorner 2026 Robot Competition',
      organizer: 'KMTETI Fakultas Teknik Universitas Gadjah Mada',
      badge: 'NASIONAL UGM',
      highlight: false,
      image: '/assets/robot_action_1.jpg',
      certNumber: 'DTETI FT UGM 2026',
    },
    {
      year: '2024',
      title: 'Juara 1 Regional I Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek',
      badge: 'JUARA 1 REGIONAL',
      highlight: true,
      image: '/images/news/uny-krtmi-juara-1-wilayah-2024.jpg',
      certNumber: '18322/BPTI/DIKTI/2024',
    },
    {
      year: '2024',
      title: 'Juara 2 Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek & UMS',
      badge: 'JUARA 2 NASIONAL',
      highlight: true,
      image: '/gallery/krtmi_podium_juara.jpg',
      certNumber: '18869/PPN/DIKTI/2024',
    },
    {
      year: '2023',
      title: 'Juara 3 Tingkat Wilayah',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek',
      badge: 'JUARA 3 WILAYAH',
      highlight: false,
      image: '/images/news/uny-kri-enam-juara-2023.jpg',
      certNumber: '17091/BPTI/DIKTI/2023',
    },
    {
      year: '2023',
      title: 'Finalis Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'Puspresnas Kemendikbudristek & USM',
      badge: 'FINALIS NASIONAL',
      highlight: false,
      image: '/gallery/krtmi_team_celebration.jpg',
      certNumber: '17819/BPTI/DIKTI/2023',
    },
  ];

  const getVerificationLabel = (organizer: string) => {
    if (organizer.includes('Diponegoro')) {
      return 'Penghargaan Resmi Teknik Elektro UNDIP';
    }
    if (organizer.includes('Gadjah Mada')) {
      return 'Dokumentasi Resmi DTETI FT UGM';
    }
    return 'Puspresnas BPTI / Penghargaan Resmi Kemendikbudristek';
  };

  return (
    <section id="prestasi" className="py-12 sm:py-16 md:py-20 border-b border-white/[0.06] relative bg-[#0B0B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header (Editorial Split Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono tracking-wider border border-orange-500/20">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL TEAM AWARDS & ACHIEVEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
              <ShinyText
                text="Dokumentasi & Prestasi Tim"
                speed={4}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
              />
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Dokumentasi panggung kejuaraan dan pencapaian resmi Tim Robotika Abhinaya UNY di arena Kontes Robot Indonesia (KRTMI) Puspresnas BPTI, Technocorner UGM, dan UNLIMITED UNDIP. Klik pada kartu untuk melihat foto dokumentasi tim.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {awards.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={item.highlight ? 'rgba(255, 107, 0, 0.20)' : 'rgba(245, 158, 11, 0.12)'}
              spotlightSize={320}
              className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border ${
                item.highlight
                  ? 'bg-[#121216] border-orange-500/30 hover:border-orange-500/60 shadow-orange-glow-sm'
                  : 'bg-[#121216] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-4">
                {/* Year and Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/5 text-orange-400 border border-white/10 font-mono">
                    <DecryptedText
                      text={item.year}
                      animateOn="hover"
                      className="text-orange-400 font-mono"
                    />
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase font-mono ${
                    item.highlight ? 'bg-orange-500 text-black font-black shadow-sm' : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}>
                    <DecryptedText
                      text={item.badge}
                      animateOn="hover"
                      className={item.highlight ? 'text-black font-black' : 'text-slate-300'}
                    />
                  </span>
                </div>

                {/* Team Documentation Image Preview */}
                <div
                  onClick={() => setSelectedCert(item)}
                  className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-orange-500/50 transition-all cursor-pointer shadow-inner"
                  title="Klik untuk melihat foto dokumentasi tim"
                >
                  <img
                    src={`${basePath}${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `${basePath}/assets/team_podium_1.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E]/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-lg bg-orange-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Lihat Dokumentasi</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                    <Eye className="w-2.5 h-2.5 text-orange-400" />
                    <span>Dokumentasi Tim</span>
                  </div>
                </div>

                {/* Text Information */}
                <div className="space-y-1.5">
                  <h3
                    onClick={() => setSelectedCert(item)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors cursor-pointer leading-snug"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {item.event}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.organizer}
                  </p>
                  {item.certNumber && (
                    <p className="text-[10px] font-mono text-orange-400/80 pt-0.5">
                      No: {item.certNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Verification Seal */}
              <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span className="truncate">{getVerificationLabel(item.organizer)}</span>
                </div>
                <button
                  onClick={() => setSelectedCert(item)}
                  className="text-orange-400 hover:text-orange-300 text-xs font-semibold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Buka</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full Certificate Inspection */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#121216] border border-white/20 rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {selectedCert.year} • {selectedCert.badge}
                  </span>
                  {selectedCert.certNumber && (
                    <span className="text-xs font-mono text-slate-400 truncate">
                      No: {selectedCert.certNumber}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedCert.event} — {selectedCert.organizer}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors shrink-0"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="flex-1 overflow-auto flex items-center justify-center bg-black/50 rounded-xl p-2 border border-white/5 min-h-[300px]">
              <img
                src={`${basePath}${selectedCert.image}`}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dokumentasi Resmi Kejuaraan Tim Robotika Abhinaya UNY</span>
              </div>
              <a
                href={`${basePath}${selectedCert.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <span>Buka Foto Penuh</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;