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
} from 'lucide-react';

type SubTab = 'ringkasan' | 'arena' | 'robot' | 'objek' | 'skor' | 'penalti';

export const KrtmiChronicles: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2026');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('ringkasan');

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
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <History className="w-3.5 h-3.5" />
          <span>ARSIP &amp; BEDAH REGULASI LOMBA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Bedah Regulasi Lomba (2026 ➔ 2019) 📜
        </h2>
        <p className="text-xs sm:text-base text-slate-300">
          Pelajari aturan resmi, layout arena, spesifikasi mekatronika robot, dan sistem penilaian dari kompetisi terbaru <strong>Technocorner 2026</strong> hingga edisi pionir <strong>KRTMI 2019</strong>.
        </p>
      </div>

      {/* Year Tabs Bar (Ordered 2026 to 2019) */}
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
                className={`px-4 py-3 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black border-transparent shadow-[0_0_25px_rgba(255,107,0,0.5)] scale-105 font-extrabold'
                    : 'bg-[#140E09] border-[#2A1B10] text-amber-200/70 hover:text-white hover:border-brand-orange/50'
                }`}
              >
                <span>{story.year === '2026' ? 'Technocorner 2026' : `KRTMI ${story.year}`}</span>
                {story.isChampion && <Trophy className="w-3.5 h-3.5 text-black animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Story Detailed Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#140E09] border-2 border-brand-orange/40 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Top Orange Gradient Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400" />

          {/* Title, Badges, and Location */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                Edisi {activeStory.year}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#22160E] text-amber-200 border border-[#3A2617] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span>{activeStory.location}</span>
              </span>
              {activeStory.hostOrganizer && (
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#1a120b] text-slate-300 border border-[#342214] hidden md:inline-flex items-center space-x-1">
                  <Info className="w-3 h-3 text-amber-400" />
                  <span>{activeStory.hostOrganizer}</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
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
          </div>

          {/* Achievement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-orange/20 via-amber-500/10 to-transparent border border-brand-orange/40 flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0 animate-bounce" />
            <div className="text-xs sm:text-sm font-black text-white font-mono">
              {activeStory.achievement}
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
                {activeStory.year === '2024' ? 'Dual Robot (Pemilah + Feeder)' : activeStory.year === '2026' ? 'Mecanum Transporter' : 'Mobile Cyber-Physical'}
              </span>
            </div>
          </div>

          {/* Interactive Sub-Tabs for Deep Inspection */}
          <div className="border-b border-[#26180E] pb-2">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
              {subTabs.map((tab) => {
                const isTabActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 flex-shrink-0 cursor-pointer ${
                      isTabActive
                        ? 'bg-brand-orange text-black font-extrabold shadow-md'
                        : 'bg-[#0E0906] text-slate-300 hover:text-white hover:bg-[#1E1208]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Tab Content Sections */}
          <div className="space-y-6">
            
            {/* 1. Ringkasan & Misi */}
            {activeSubTab === 'ringkasan' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3">
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    <span>Deskripsi Tema &amp; Latar Belakang Lomba</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeStory.storySummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Alur Misi */}
                  <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <ChevronRight className="w-4 h-4 text-brand-orange" />
                      <span>Tahapan &amp; Alur Misi</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {activeStory.missionRules.map((rule, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Catatan Riset & Fun Facts */}
                  <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Flame className="w-4 h-4 text-brand-orange" />
                      <span>Catatan Riset &amp; Cerita Abhinaya UNY</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {activeStory.teamRoleAndFunFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-brand-orange font-mono font-bold">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Spesifikasi Arena */}
            {activeSubTab === 'arena' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Compass className="w-4 h-4 text-brand-orange" />
                    <span>Tata Letak &amp; Dimensi Lapangan</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Arena:</span>
                      <span className="text-white font-semibold">{activeStory.arenaSpecs.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Permukaan &amp; Lantai:</span>
                      <span className="text-slate-300">{activeStory.arenaSpecs.surface}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Pembagian Zona:</span>
                      <span className="text-amber-200">{activeStory.arenaSpecs.zones}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-brand-orange" />
                    <span>Rintangan, Dinding &amp; Kamera</span>
                  </h4>
                  <div className="space-y-3">
                    {activeStory.arenaSpecs.obstacles && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Rintangan Fisik:</span>
                        <span className="text-amber-300 font-medium">{activeStory.arenaSpecs.obstacles}</span>
                      </div>
                    )}
                    {activeStory.arenaSpecs.borderWall && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Dinding &amp; Garis Batas:</span>
                        <span className="text-slate-300">{activeStory.arenaSpecs.borderWall}</span>
                      </div>
                    )}
                    {activeStory.arenaSpecs.lightingAndCamera && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Penerangan &amp; Kamera:</span>
                        <span className="text-slate-300">{activeStory.arenaSpecs.lightingAndCamera}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Regulasi Robot */}
            {activeSubTab === 'robot' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Cpu className="w-4 h-4 text-brand-orange" />
                    <span>Dimensi &amp; Konstruksi Mekanik</span>
                  </h4>
                  <div className="space-y-3">
                    {activeStory.robotSpecs.robotCount && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Jumlah Robot:</span>
                        <span className="text-brand-orange font-bold">{activeStory.robotSpecs.robotCount}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Start:</span>
                      <span className="text-white font-semibold">{activeStory.robotSpecs.dimensions}</span>
                    </div>
                    {activeStory.robotSpecs.expandedDimensions && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Ekspansi Dimensi:</span>
                        <span className="text-slate-300">{activeStory.robotSpecs.expandedDimensions}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Batasan Bobot:</span>
                      <span className="text-slate-300">{activeStory.robotSpecs.weight}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Mekanisme Penggerak &amp; Gripper:</span>
                      <span className="text-amber-200">{activeStory.robotSpecs.mechanism}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-brand-orange" />
                    <span>Elektrik, AI &amp; Sistem Kontrol</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Catu Daya &amp; Baterai:</span>
                      <span className="text-amber-300 font-bold">{activeStory.robotSpecs.power}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Mikrokontroler &amp; Edge SoC:</span>
                      <span className="text-white">{activeStory.robotSpecs.controller}</span>
                    </div>
                    {activeStory.robotSpecs.maxSpeed && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Batas Kecepatan:</span>
                        <span className="text-cyan-300 font-semibold">{activeStory.robotSpecs.maxSpeed}</span>
                      </div>
                    )}
                    {activeStory.robotSpecs.autonomyMode && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Mode Otomasi &amp; Kontrol:</span>
                        <span className="text-slate-300">{activeStory.robotSpecs.autonomyMode}</span>
                      </div>
                    )}
                    {activeStory.robotSpecs.communications && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Komunikasi Data:</span>
                        <span className="text-slate-300">{activeStory.robotSpecs.communications}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Objek & Prosedur */}
            {activeSubTab === 'objek' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Box className="w-4 h-4 text-brand-orange" />
                    <span>Objek Game &amp; Material</span>
                  </h4>
                  {activeStory.gameObjects ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Daftar Objek:</span>
                        <ul className="space-y-1 mt-1">
                          {activeStory.gameObjects.types.map((t, idx) => (
                            <li key={idx} className="text-slate-200 flex items-center space-x-1.5">
                              <span className="text-brand-orange font-bold">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {activeStory.gameObjects.dimensions && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Objek:</span>
                          <span className="text-white">{activeStory.gameObjects.dimensions}</span>
                        </div>
                      )}
                      {activeStory.gameObjects.quantity && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Jumlah per Ronde:</span>
                          <span className="text-amber-300 font-semibold">{activeStory.gameObjects.quantity}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-400">Data objek game terintegrasi dalam skenario lomba.</p>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3 text-xs">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-brand-orange" />
                    <span>Prosedur &amp; Waktu Pertandingan</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Pertandingan:</span>
                      <span className="text-white font-bold">{activeStory.matchProcedure?.matchDuration || '3 Menit'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Persiapan:</span>
                      <span className="text-slate-300">{activeStory.matchProcedure?.prepTime || '1 Menit'}</span>
                    </div>
                    {activeStory.matchProcedure?.teamQuota && (
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Kuota Tim:</span>
                        <span className="text-slate-300">{activeStory.matchProcedure.teamQuota}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Kondisi Kemenangan Mutlak:</span>
                      <span className="text-brand-orange font-bold">{activeStory.matchProcedure?.victoryCondition}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Sistem Penilaian */}
            {activeSubTab === 'skor' && (
              <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-brand-orange" />
                  <span>Formula Poin &amp; Kemenangan Mutlak</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    {activeStory.scoringSystem.slice(0, Math.ceil(activeStory.scoringSystem.length / 2)).map((score, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{score}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {activeStory.scoringSystem.slice(Math.ceil(activeStory.scoringSystem.length / 2)).map((score, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 6. Penalti & Sanksi */}
            {activeSubTab === 'penalti' && (
              <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-4 text-xs">
                <h4 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Pelanggaran &amp; Aturan Diskualifikasi</span>
                </h4>
                {activeStory.penaltiesAndDisqualifications && activeStory.penaltiesAndDisqualifications.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    {activeStory.penaltiesAndDisqualifications.map((pen, idx) => (
                      <li key={idx} className="flex items-start space-x-2 p-2 rounded-lg bg-[#140a08] border border-red-950/40">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{pen}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">Penalti mengacu pada sanksi pengurangan poin standar BPTI KRI.</p>
                )}
              </div>
            )}

          </div>

          {/* Guidebook PDF Download Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1E1107] to-[#120A04] border-2 border-brand-orange/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40 flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-white">
                  {activeStory.pdfTitle}
                </div>
                <div className="text-xs text-amber-200/70 font-semibold">
                  Ukuran Dokumen: {activeStory.pdfSize} • Format Asli PDF BPTI / Panitia
                </div>
              </div>
            </div>
            <a
              href={`${basePath}/guidebooks/${activeStory.pdfFile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-orange-500 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-lg whitespace-nowrap hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>UNDUH BUKU PANDUAN PDF</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
