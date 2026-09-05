'use client';

import React, { useState } from 'react';
import { KRTMI_STORIES, KrtmiStory } from '@/data/krtmiData';
import {
  Trophy,
  History,
  MapPin,
  Sparkles,
  CheckCircle2,
  Flame,
  ArrowRight,
  FileText,
  Download,
  Layers,
  Cpu,
  Compass,
  Clock,
  Box,
  Zap,
  ShieldAlert,
  AlertTriangle,
  Award,
  ChevronRight,
  ExternalLink,
  Info,
  Maximize2,
  X,
} from 'lucide-react';

type SubTab = 'ringkasan' | 'arena' | 'robot' | 'objek' | 'skor' | 'penalti';

export const KrtmiChronicles: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2026');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('ringkasan');
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  const activeStory = KRTMI_STORIES.find((s) => s.year === activeYear) || KRTMI_STORIES[0];
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const subTabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'ringkasan', label: 'Ikhtisar & Misi', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'arena', label: 'Spesifikasi Arena', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'robot', label: 'Regulasi Robot', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'objek', label: 'Objek & Prosedur', icon: <Box className="w-3.5 h-3.5" /> },
    { id: 'skor', label: 'Sistem Penilaian', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'penalti', label: 'Penalti & Sanksi', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="krtmi-story" className="py-12 sm:py-16 md:py-24 space-y-8 sm:space-y-12 bg-[#0A0704] border-t border-[#241508] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-3 max-w-5xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <History className="w-3.5 h-3.5" />
          <span>ARSIP RESMI &amp; BEDAH REGULASI LOMBA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Bedah Regulasi &amp; Logo Kompetisi (2026 ➔ 2019)&nbsp;📜
        </h2>
        <p className="text-xs sm:text-base text-slate-300">
          Pelajari aturan resmi, layout arena, spesifikasi mekatronika robot, dan visual resmi buku panduan dari <strong>Technocorner 2026</strong> hingga edisi pionir <strong>KRTMI 2019</strong>.
        </p>
      </div>

      {/* Year Tabs Bar (Ordered 2026 to 2019) with Logo Badges */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-start lg:justify-center space-x-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {KRTMI_STORIES.map((story) => {
            const isSelected = story.year === activeYear;
            return (
              <button
                key={story.year}
                type="button"
                onClick={() => {
                  setActiveYear(story.year);
                }}
                className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black border-transparent shadow-[0_0_25px_rgba(255,107,0,0.5)] scale-105 font-extrabold'
                    : 'bg-[#140E09] border-[#2A1B10] text-amber-200/70 hover:text-white hover:border-brand-orange/50'
                }`}
              >
                {/* Mini Year Icon / Logo indicator */}
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span>{story.year === '2026' ? 'Technocorner 2026' : `KRTMI ${story.year}`}</span>
                {story.isChampion && <Trophy className="w-3.5 h-3.5 text-black animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Story Detailed Card with Official Cover Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#140E09] border-2 border-brand-orange/40 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Top Orange Gradient Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400" />

          {/* 1. Header Showcase: Official Competition Cover Poster + Details */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-[#2A1B10] pb-6">
            
            {/* Official Tournament Cover Box */}
            <div
              onClick={() => setPreviewCover(activeStory.coverImage || null)}
              className="relative w-44 sm:w-52 md:w-60 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-brand-orange/50 shadow-[0_0_30px_rgba(255,107,0,0.25)] flex-shrink-0 cursor-pointer group bg-black"
              title="Klik untuk memperbesar buku panduan resmi"
            >
              {activeStory.coverImage ? (
                <img
                  src={`${basePath}${activeStory.coverImage}`}
                  alt={`Buku Panduan Resmi ${activeStory.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500 brightness-95 contrast-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#1C120A] text-amber-200">
                  <FileText className="w-12 h-12 text-brand-orange mb-2" />
                  <span className="text-xs font-bold">{activeStory.title}</span>
                </div>
              )}

              {/* Gradient & Overlay Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-brand-orange text-black text-[9px] font-black uppercase shadow">
                LOGO &amp; PANDUAN RESMI
              </div>

              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[10px]">
                <span className="font-mono font-bold text-amber-300">Buku Panduan {activeStory.year}</span>
                <Maximize2 className="w-3.5 h-3.5 text-white/80 group-hover:text-brand-orange transition" />
              </div>
            </div>

            {/* Title, Badges, Tagline & Location */}
            <div className="flex-1 space-y-3.5 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                  Edisi {activeStory.year}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#22160E] text-amber-200 border border-[#3A2617] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{activeStory.location}</span>
                </span>
                {activeStory.hostOrganizer && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#1a120b] text-slate-300 border border-[#342214] hidden lg:inline-flex items-center space-x-1">
                    <Info className="w-3 h-3 text-amber-400" />
                    <span>{activeStory.hostOrganizer}</span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {activeStory.title}
              </h3>
              
              {activeStory.tagline && (
                <p className="text-sm sm:text-base font-bold text-amber-400">
                  {activeStory.tagline}
                </p>
              )}

              {activeStory.slogan && (
                <div className="text-xs font-mono italic text-amber-300/80">
                  Slogan: {activeStory.slogan}
                </div>
              )}

              {/* Achievement Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-orange/20 via-amber-500/10 to-transparent border border-brand-orange/40 flex items-center space-x-3 text-left">
                <Trophy className="w-5 h-5 text-brand-gold flex-shrink-0 animate-bounce" />
                <div className="text-xs sm:text-sm font-black text-white font-mono">
                  {activeStory.achievement}
                </div>
              </div>
            </div>

          </div>

          {/* Quick Key-Value Badges (Match Duration, Power Cap, Victory Condition) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0C0805] border border-[#26180E] space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                <Clock className="w-3 h-3 text-brand-orange" />
                <span>Durasi Match</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-white block">
                {activeStory.matchProcedure?.matchDuration || '3 Menit'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0C0805] border border-[#26180E] space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Batas Voltase</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-200 block">
                {activeStory.robotSpecs.power.includes('13') ? 'Maksimal 13.0V DC' : activeStory.robotSpecs.power.includes('24') ? 'Maksimal 24.0V DC' : '12V – 14.8V DC'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0C0805] border border-[#26180E] space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                <Award className="w-3 h-3 text-brand-gold" />
                <span>Kondisi Menang</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-brand-orange block truncate" title={activeStory.matchProcedure?.victoryCondition}>
                {activeStory.year === '2024' ? '”BERSIH” Mutlak' : activeStory.year === '2023' ? '”DONE” / ”DAM”' : activeStory.year === '2026' ? 'FINISH & Poin' : 'Poin Tertinggi'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0C0805] border border-[#26180E] space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Sistem Robot</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-cyan-200 block truncate" title={activeStory.robotSpecs.robotCount || '1 Robot'}>
                {activeStory.robotSpecs.autonomyMode || '100% Otonom'}
              </span>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-[#2A1B10] scrollbar-thin scrollbar-thumb-brand-orange/30">
            {subTabs.map((tab) => {
              const isTabActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                    isTabActive
                      ? 'bg-brand-orange text-black font-extrabold shadow-md'
                      : 'bg-[#1C120B] text-slate-300 hover:text-white hover:bg-[#25180E] border border-[#2A1B10]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Ringkasan & Misi */}
          {activeSubTab === 'ringkasan' && (
            <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-2">
                <h4 className="text-sm font-black text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>Ikhtisar Tema &amp; Latar Belakang Riset</span>
                </h4>
                <p>{activeStory.storySummary}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black text-white">Misi Utama yang Wajib Diselesaikan:</h4>
                <ul className="space-y-2">
                  {activeStory.missionRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-amber-400">Catatan Khusus &amp; Fakta Unik Lapangan:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStory.teamRoleAndFunFacts.map((fact, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#1A1009] border border-[#2B1B10] text-xs">
                      {fact}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Spesifikasi Arena */}
          {activeSubTab === 'arena' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Dimensi Arena</span>
                  <p className="text-white font-bold">{activeStory.arenaSpecs.dimensions}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Permukaan Lapangan</span>
                  <p className="text-white">{activeStory.arenaSpecs.surface}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Zona Penting</span>
                  <p className="text-slate-300">{activeStory.arenaSpecs.zones}</p>
                </div>
                {activeStory.arenaSpecs.obstacles && (
                  <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Rintangan &amp; Halangan</span>
                    <p className="text-slate-300">{activeStory.arenaSpecs.obstacles}</p>
                  </div>
                )}
              </div>
              {activeStory.arenaSpecs.lightingAndCamera && (
                <div className="p-4 rounded-2xl bg-[#1C120B] border border-amber-900/30 text-xs text-amber-200">
                  <span className="font-bold text-white block mb-1">Kondisi Pencahayaan &amp; Sensor Arena:</span>
                  {activeStory.arenaSpecs.lightingAndCamera}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Regulasi Robot */}
          {activeSubTab === 'robot' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Jumlah Robot per Tim</span>
                  <p className="text-white font-bold">{activeStory.robotSpecs.robotCount || '1 Robot Utama'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Batasan Dimensi Start</span>
                  <p className="text-white font-mono">{activeStory.robotSpecs.dimensions}</p>
                </div>
                {activeStory.robotSpecs.expandedDimensions && (
                  <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Dimensi Saat Berekspansi</span>
                    <p className="text-amber-200 font-mono">{activeStory.robotSpecs.expandedDimensions}</p>
                  </div>
                )}
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Bobot Sasis Robot</span>
                  <p className="text-white">{activeStory.robotSpecs.weight}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Catu Daya / Baterai</span>
                  <p className="text-amber-300 font-mono font-bold">{activeStory.robotSpecs.power}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Sistem Kontroler &amp; Komputasi</span>
                  <p className="text-white">{activeStory.robotSpecs.controller}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider">Mekanisme Penggerak &amp; Gripper</span>
                  <p className="text-slate-300">{activeStory.robotSpecs.mechanism}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Objek & Prosedur Lomba */}
          {activeSubTab === 'objek' && (
            <div className="space-y-4 text-xs sm:text-sm">
              {activeStory.gameObjects && (
                <div className="p-5 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-3">
                  <h4 className="text-sm font-black text-white flex items-center space-x-2">
                    <Box className="w-4 h-4 text-brand-orange" />
                    <span>Objek Target Perlombaan:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStory.gameObjects.types.map((obj, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#20150D] text-slate-200 border border-brand-orange/20 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-brand-orange" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStory.matchProcedure && (
                <div className="p-5 rounded-2xl bg-[#170E08] border border-[#2B1B10] space-y-3">
                  <h4 className="text-sm font-black text-amber-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Prosedur &amp; Jadwal Match:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#20150D] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Waktu Persiapan (Setting)</span>
                      <span className="text-white font-mono font-bold">{activeStory.matchProcedure.prepTime}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#20150D] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Waktu Pertandingan</span>
                      <span className="text-white font-mono font-bold">{activeStory.matchProcedure.matchDuration}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#20150D] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Kondisi Kemenangan</span>
                      <span className="text-brand-orange font-bold">{activeStory.matchProcedure.victoryCondition}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Sistem Penilaian */}
          {activeSubTab === 'skor' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="text-sm font-black text-white">Rincian Perhitungan Skor Resmi:</h4>
              <div className="space-y-2">
                {activeStory.scoringSystem.map((score, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#170E08] border border-[#2B1B10] flex items-start space-x-3 text-slate-300">
                    <Award className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>{score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Penalti & Sanksi */}
          {activeSubTab === 'penalti' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="text-sm font-black text-red-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Aturan Penalti, Retry, &amp; Diskualifikasi:</span>
              </h4>
              {activeStory.penaltiesAndDisqualifications && activeStory.penaltiesAndDisqualifications.length > 0 ? (
                <div className="space-y-2">
                  {activeStory.penaltiesAndDisqualifications.map((pen, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#1A0B0B] border border-red-900/40 text-red-200/90 flex items-start space-x-3">
                      <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{pen}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs">Penalti mengacu pada buku pedoman resmi KRI.</p>
              )}
            </div>
          )}

          {/* Bottom PDF Download Bar */}
          <div className="pt-6 border-t border-[#26180E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-11 h-11 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{activeStory.pdfTitle}</span>
                <span className="text-[11px] text-slate-400 font-mono">Ukuran: {activeStory.pdfSize} • Dokumen Resmi BPTI / DTETI</span>
              </div>
            </div>

            <a
              href={`${basePath}/guidebooks/${activeStory.pdfFile}`}
              download={activeStory.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-darkOrange text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-brand-orange/20 hover:scale-105 transition"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Unduh Buku Panduan PDF</span>
            </a>
          </div>

        </div>
      </div>

      {/* Cover Preview Modal */}
      {previewCover && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewCover(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#140E09] border-2 border-brand-orange/50 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewCover(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-orange hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={`${basePath}${previewCover}`}
              alt="Buku Panduan Cover Preview"
              className="max-h-[75vh] w-auto object-contain rounded-2xl border border-brand-orange/30 shadow-2xl"
            />
            <span className="text-xs font-mono font-bold text-amber-300">
              Dokumen Resmi Buku Pedoman {activeStory.title}
            </span>
          </div>
        </div>
      )}

    </section>
  );
};