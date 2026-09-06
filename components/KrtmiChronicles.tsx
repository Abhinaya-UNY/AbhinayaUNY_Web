'use client';

import React, { useState } from 'react';
import { KRTMI_STORIES, KrtmiStory } from '@/data/krtmiData';
import { CountUp, DecryptedText } from '@/components/animations';
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
    <section id="krtmi-story" className="py-12 sm:py-16 md:py-24 space-y-8 sm:space-y-12 bg-[#0B0B0E] border-t border-white/[0.06] relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-4xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono uppercase tracking-wider border border-orange-500/20">
          <History className="w-3.5 h-3.5 text-orange-400" />
          <span>ARSIP RESMI &amp; BEDAH REGULASI LOMBA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight">
          Bedah Regulasi &amp; Panduan Kompetisi (2026 – 2019)
        </h2>
        <p className="text-xs sm:text-base text-slate-400 max-w-3xl mx-auto">
          Pelajari aturan resmi, layout arena, spesifikasi mekatronika robot, dan visual resmi buku panduan dari <strong className="text-slate-200">Technocorner 2026</strong> hingga edisi pionir <strong className="text-slate-200">KRTMI 2019</strong>.
        </p>
      </div>

      {/* Year Tabs Bar (Ordered 2026 to 2019) with Minimalist Pills */}
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
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-black font-bold border-orange-500 shadow-orange-glow-sm'
                    : 'bg-[#121216] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-orange-400'}`} />
                <span>{story.year === '2026' ? 'Technocorner 2026' : `KRTMI ${story.year}`}</span>
                {story.isChampion && <Trophy className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-amber-400'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Story Detailed Card with Official Cover Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#121216] border border-white/[0.08] shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* 1. Header Showcase: Official Competition Cover Poster + Details */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-white/[0.06] pb-8">
            
            {/* Official Tournament Cover Box */}
            <div
              onClick={() => setPreviewCover(activeStory.coverImage || null)}
              className="relative w-44 sm:w-52 md:w-60 aspect-[3/4] rounded-xl overflow-hidden border border-white/15 shadow-xl flex-shrink-0 cursor-pointer group bg-black"
              title="Klik untuk memperbesar buku panduan resmi"
            >
              {activeStory.coverImage ? (
                <img
                  src={`${basePath}${activeStory.coverImage}`}
                  alt={`Buku Panduan Resmi ${activeStory.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-95 contrast-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#18181B] text-slate-300">
                  <FileText className="w-12 h-12 text-orange-400 mb-2" />
                  <span className="text-xs font-bold">{activeStory.title}</span>
                </div>
              )}

              {/* Gradient & Overlay Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-[9px] font-mono tracking-wider uppercase border border-white/10">
                PANDUAN RESMI
              </div>

              <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[10px]">
                <span className="font-mono text-amber-300">Buku Panduan {activeStory.year}</span>
                <Maximize2 className="w-3.5 h-3.5 text-white/80 group-hover:text-orange-400 transition" />
              </div>
            </div>

            {/* Title, Badges, Tagline & Location */}
            <div className="flex-1 space-y-3.5 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Edisi {activeStory.year}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-slate-300 border border-white/10 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{activeStory.location}</span>
                </span>
                {activeStory.hostOrganizer && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-white/5 text-slate-300 border border-white/10 hidden lg:inline-flex items-center space-x-1">
                    <Info className="w-3 h-3 text-orange-400" />
                    <span>{activeStory.hostOrganizer}</span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                {activeStory.title}
              </h3>
              
              {activeStory.tagline && (
                <p className="text-sm sm:text-base font-bold text-orange-400">
                  {activeStory.tagline}
                </p>
              )}

              {activeStory.slogan && (
                <div className="text-xs font-mono italic text-slate-400">
                  Slogan: {activeStory.slogan}
                </div>
              )}

              {/* Achievement Banner */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center space-x-3 text-left">
                <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm font-bold text-white font-mono">
                  {activeStory.achievement}
                </div>
              </div>
            </div>

          </div>

          {/* Quick Key-Value Badges (Match Duration, Power Cap, Victory Condition) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <Clock className="w-3 h-3 text-orange-400" />
                <span>Durasi Match</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                <CountUp to={3} duration={1.5} /> Menit
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Batas Voltase</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-200 block">
                {activeStory.robotSpecs.power.includes('13') ? (
                  <>Maksimal <CountUp to={13.0} decimals={1} decimal="." duration={1.5} />V DC</>
                ) : activeStory.robotSpecs.power.includes('24') ? (
                  <>Maksimal <CountUp to={24.0} decimals={1} decimal="." duration={1.5} />V DC</>
                ) : (
                  '12V – 14.8V DC'
                )}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Kondisi Menang</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-orange-400 block truncate" title={activeStory.matchProcedure?.victoryCondition}>
                <DecryptedText
                  text={activeStory.year === '2024' ? '”BERSIH” Mutlak' : activeStory.year === '2023' ? '”DONE” / ”DAM”' : activeStory.year === '2026' ? 'FINISH & Poin' : 'Poin Tertinggi'}
                  animateOn="hover"
                  className="text-orange-400"
                />
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center space-x-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Sistem Robot</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 block truncate" title={activeStory.robotSpecs.robotCount || '1 Robot'}>
                <DecryptedText
                  text={activeStory.robotSpecs.autonomyMode || '100% Otonom'}
                  animateOn="hover"
                  className="text-cyan-300"
                />
              </span>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/[0.06] scrollbar-thin">
            {subTabs.map((tab) => {
              const isTabActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                    isTabActive
                      ? 'bg-orange-500 text-black font-bold shadow-orange-glow-sm'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/5 border border-white/[0.08]'
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
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] space-y-2">
                <h4 className="text-sm font-black text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Ikhtisar Tema &amp; Latar Belakang Riset</span>
                </h4>
                <p>{activeStory.storySummary}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Misi Utama yang Wajib Diselesaikan:</h4>
                <ul className="space-y-2">
                  {activeStory.missionRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-amber-400">Catatan Khusus &amp; Fakta Unik Lapangan:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStory.teamRoleAndFunFacts.map((fact, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300">
                      {fact}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Spesifikasi Arena with Vector / SVG Schematic Diagram */}
          {activeSubTab === 'arena' && (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Dedicated Vector/SVG Arena Schematic Diagram */}
              <div className="rounded-2xl bg-[#0B0B0E] border border-white/[0.08] p-4 sm:p-6 space-y-4 overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                      DIAGRAM SKEMATIK ARENA RESMI {activeStory.title.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                    Skala Standar Lapangan BPTI / KRI
                  </span>
                </div>

                <div className="w-full overflow-x-auto">
                  <div className="min-w-[620px] max-w-4xl mx-auto">
                    <svg
                      viewBox="0 0 800 460"
                      className="w-full h-auto bg-[#0E0E12] rounded-xl border border-white/10 select-none shadow-inner"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        {/* Grid Pattern */}
                        <pattern id="arenaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        </pattern>
                        {/* Hazard Stripes Pattern for Obstacles */}
                        <pattern id="hazardStripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                          <rect width="10" height="20" fill="rgba(245,158,11,0.2)" />
                          <rect x="10" width="10" height="20" fill="rgba(0,0,0,0.4)" />
                        </pattern>
                      </defs>

                      {/* Background Grid */}
                      <rect width="800" height="460" fill="url(#arenaGrid)" />

                      {/* Outer Arena Boundary (Border Line 6000 x 4000 mm scaled) */}
                      <rect x="30" y="30" width="740" height="400" rx="8" fill="none" stroke="#27272A" strokeWidth="2.5" />
                      <rect x="34" y="34" width="732" height="392" rx="6" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8,6" />

                      {/* Outer Coordinate Dimension Tags */}
                      <text x="400" y="22" textAnchor="middle" fill="#71717A" fontSize="10" fontFamily="monospace">PANJANG ARENA: 6000 mm (6.0 METER)</text>
                      <text x="18" y="230" textAnchor="middle" fill="#71717A" fontSize="10" fontFamily="monospace" transform="rotate(-90 18 230)">LEBAR: 4000 mm (4.0 M)</text>

                      {/* Autonomous Guidance Line Tape (Center & Trajectories) */}
                      <path d="M 100 350 L 100 240 L 400 240 L 400 130" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="2.5" strokeDasharray="5,4" />
                      <path d="M 700 350 L 700 240 L 400 240" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="2.5" strokeDasharray="5,4" />

                      {/* Start Box Merah (Red / Left) */}
                      <g>
                        <rect x="50" y="300" width="100" height="100" rx="6" fill="rgba(239,68,68,0.12)" stroke="#EF4444" strokeWidth="2" />
                        <text x="100" y="345" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontWeight="bold" fontFamily="monospace">START MERAH</text>
                        <text x="100" y="365" textAnchor="middle" fill="#991B1B" fontSize="9" fontFamily="monospace">500 x 500 mm</text>
                      </g>

                      {/* Start Box Biru (Blue / Right) */}
                      <g>
                        <rect x="650" y="300" width="100" height="100" rx="6" fill="rgba(59,130,246,0.12)" stroke="#3B82F6" strokeWidth="2" />
                        <text x="700" y="345" textAnchor="middle" fill="#93C5FD" fontSize="11" fontWeight="bold" fontFamily="monospace">START BIRU</text>
                        <text x="700" y="365" textAnchor="middle" fill="#1E40AF" fontSize="9" fontFamily="monospace">500 x 500 mm</text>
                      </g>

                      {/* Zona Rintangan Dinamis / Tanjakan (Center Obstacle Ramp) */}
                      <g>
                        <rect x="260" y="270" width="280" height="50" rx="6" fill="url(#hazardStripes)" stroke="#F59E0B" strokeWidth="1.5" />
                        <text x="400" y="300" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="bold" fontFamily="monospace">ZONA RINTANGAN / TANJAKAN / POLISI TIDUR</text>
                      </g>

                      {/* Zona Pengambilan Objek / Sampah (Center Field Sorting Station) */}
                      <g>
                        <rect x="270" y="150" width="260" height="85" rx="8" fill="rgba(249,115,22,0.08)" stroke="#F97316" strokeWidth="2" strokeDasharray="4,2" />
                        <text x="400" y="180" textAnchor="middle" fill="#FED7AA" fontSize="11" fontWeight="bold" fontFamily="monospace">ZONA PENGAMBILAN OBJEK TEMATIK</text>
                        {/* Object Markers inside Retrieval Zone */}
                        <circle cx="320" cy="205" r="10" fill="#F97316" />
                        <text x="320" y="209" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">1</text>
                        <circle cx="360" cy="205" r="10" fill="#F59E0B" />
                        <text x="360" y="209" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">2</text>
                        <circle cx="400" cy="205" r="10" fill="#EF4444" />
                        <text x="400" y="209" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">3</text>
                        <circle cx="440" cy="205" r="10" fill="#06B6D4" />
                        <text x="440" y="209" textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">4</text>
                        <circle cx="480" cy="205" r="10" fill="#A855F7" />
                        <text x="480" y="209" textAnchor="middle" fill="#FFF" fontSize="9" fontWeight="bold">5</text>
                      </g>

                      {/* Drop Silo / Keranjang Berjalan / Zona Sortir (Top Field) */}
                      <g>
                        {/* Silo 1 */}
                        <rect x="180" y="55" width="120" height="65" rx="6" fill="rgba(249,115,22,0.15)" stroke="#F97316" strokeWidth="1.5" />
                        <text x="240" y="85" textAnchor="middle" fill="#FED7AA" fontSize="10" fontWeight="bold" fontFamily="monospace">DROP SILO A</text>
                        <text x="240" y="102" textAnchor="middle" fill="#EA580C" fontSize="8" fontFamily="monospace">ORGANIK (+50)</text>

                        {/* Silo 2 */}
                        <rect x="340" y="55" width="120" height="65" rx="6" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="1.5" />
                        <text x="400" y="85" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="bold" fontFamily="monospace">DROP SILO B</text>
                        <text x="400" y="102" textAnchor="middle" fill="#D97706" fontSize="8" fontFamily="monospace">ANORGANIK (+80)</text>

                        {/* Silo 3 */}
                        <rect x="500" y="55" width="120" height="65" rx="6" fill="rgba(239,68,68,0.15)" stroke="#EF4444" strokeWidth="1.5" />
                        <text x="560" y="85" textAnchor="middle" fill="#FECACA" fontSize="10" fontWeight="bold" fontFamily="monospace">DROP SILO C</text>
                        <text x="560" y="102" textAnchor="middle" fill="#DC2626" fontSize="8" fontFamily="monospace">B3 / LIMBAH (+100)</text>
                      </g>

                      {/* Navigation Compass Needle Indicator */}
                      <g transform="translate(730, 80)">
                        <circle cx="0" cy="0" r="16" fill="#18181B" stroke="white" strokeOpacity="0.2" />
                        <path d="M 0 -12 L 4 0 L -4 0 Z" fill="#EF4444" />
                        <path d="M 0 12 L 4 0 L -4 0 Z" fill="#71717A" />
                        <text x="0" y="-14" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold" fontFamily="monospace">U</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Arena Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500 flex-shrink-0" />
                    <span className="text-slate-300">Start Box (Merah/Biru)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-orange-500/30 border border-orange-500 flex-shrink-0" />
                    <span className="text-slate-300">Zona Ambil Objek</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">Rintangan Tanjakan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded bg-teal-500/30 border border-teal-500 flex-shrink-0" />
                    <span className="text-slate-300">Drop Silo / Wadah Skor</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Dimensi Arena</span>
                  <p className="text-white font-bold">{activeStory.arenaSpecs.dimensions}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Permukaan Lapangan</span>
                  <p className="text-white">{activeStory.arenaSpecs.surface}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Zona Penting</span>
                  <p className="text-slate-300">{activeStory.arenaSpecs.zones}</p>
                </div>
                {activeStory.arenaSpecs.obstacles && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">Rintangan &amp; Halangan</span>
                    <p className="text-slate-300">{activeStory.arenaSpecs.obstacles}</p>
                  </div>
                )}
              </div>
              {activeStory.arenaSpecs.lightingAndCamera && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-amber-200">
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
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Jumlah Robot per Tim</span>
                  <p className="text-white font-bold">{activeStory.robotSpecs.robotCount || '1 Robot Utama'}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Batasan Dimensi Start</span>
                  <p className="text-white font-mono">{activeStory.robotSpecs.dimensions}</p>
                </div>
                {activeStory.robotSpecs.expandedDimensions && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">Dimensi Saat Berekspansi</span>
                    <p className="text-amber-200 font-mono">{activeStory.robotSpecs.expandedDimensions}</p>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">Batasan Berat Robot</span>
                  <p className="text-white font-mono">{activeStory.robotSpecs.weight}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Objek & Prosedur Lomba */}
          {activeSubTab === 'objek' && (
            <div className="space-y-4 text-xs sm:text-sm">
              {activeStory.gameObjects && (
                <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Box className="w-4 h-4 text-orange-400" />
                    <span>Objek Target Perlombaan:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStory.gameObjects.types.map((obj, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] text-slate-200 border border-white/[0.08] flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                  {activeStory.gameObjects.properties && (
                    <p className="text-xs text-slate-400 font-mono pt-1">
                      {activeStory.gameObjects.properties}
                    </p>
                  )}
                </div>
              )}

              {activeStory.matchProcedure && (
                <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] space-y-3">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Prosedur &amp; Jadwal Pertandingan:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-mono">Waktu Persiapan</span>
                      <span className="text-white font-mono font-bold">{activeStory.matchProcedure.prepTime}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-mono">Durasi Pertandingan</span>
                      <span className="text-white font-mono font-bold">{activeStory.matchProcedure.matchDuration}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase block font-mono">Kondisi Kemenangan</span>
                      <span className="text-orange-400 font-bold text-xs">{activeStory.matchProcedure.victoryCondition}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Sistem Penilaian */}
          {activeSubTab === 'skor' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.08] space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>Rincian Perhitungan Skor Resmi:</span>
                </h4>
                <div className="space-y-2">
                  {activeStory.scoringSystem.map((score, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start space-x-3 text-slate-300">
                      <Award className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Penalti & Sanksi */}
          {activeSubTab === 'penalti' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-red-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Aturan Penalti, Retry, &amp; Diskualifikasi:</span>
              </h4>
              {activeStory.penaltiesAndDisqualifications && activeStory.penaltiesAndDisqualifications.length > 0 ? (
                <div className="space-y-2">
                  {activeStory.penaltiesAndDisqualifications.map((pen, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-red-200/90 flex items-start space-x-3">
                      <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{pen}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-xs font-mono">Penalti mengacu pada buku pedoman resmi KRI.</p>
              )}
            </div>
          )}

          {/* Bottom PDF Download Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 flex-shrink-0">
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-orange-glow-sm transition"
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
            className="relative max-w-2xl w-full bg-[#121216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewCover(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-orange-500 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={`${basePath}${previewCover}`}
              alt="Buku Panduan Cover Preview"
              className="max-h-[75vh] w-auto object-contain rounded-2xl border border-orange-500/30 shadow-2xl"
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

export default KrtmiChronicles;