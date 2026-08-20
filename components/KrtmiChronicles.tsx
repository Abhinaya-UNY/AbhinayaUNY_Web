'use client';

import React, { useState } from 'react';
import { KRTMI_STORIES, KrtmiStory } from '@/data/krtmiData';
import { Trophy, History, MapPin, Sparkles, CheckCircle2, Flame, ArrowRight, FileText, Download, Layers, Cpu, Compass } from 'lucide-react';
import Link from 'next/link';

export const KrtmiChronicles: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2026');

  const activeStory = KRTMI_STORIES.find((s) => s.year === activeYear) || KRTMI_STORIES[0];
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="krtmi-story" className="py-20 space-y-12 bg-[#0A0704] border-t border-[#241508]">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <History className="w-3.5 h-3.5" />
          <span>ARSIP &amp; BEDAH LOMBA KRTMI</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Bedah Regulasi Lomba (2026 ➔ 2019) 📜
        </h2>
        <p className="text-xs sm:text-base text-slate-300">
          Pelajari aturan resmi, layout arena, spesifikasi robot, dan sistem penilaian dari kompetisi terbaru <strong>Technocorner 2026</strong> hingga edisi pionir <strong>KRTMI 2019</strong>.
        </p>
      </div>

      {/* Year Tabs Bar (Ordered 2026 to 2019) */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {KRTMI_STORIES.map((story) => {
            const isSelected = story.year === activeYear;
            return (
              <button
                key={story.year}
                type="button"
                onClick={() => setActiveYear(story.year)}
                className={`px-4 py-3 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black border-transparent shadow-[0_0_25px_rgba(255,107,0,0.5)] scale-105'
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#140E09] border-2 border-brand-orange/40 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Top Orange Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400" />

          {/* Title and Location */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                Edisi {activeStory.year}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#22160E] text-amber-200 border border-[#3A2617] flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span>{activeStory.location}</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              {activeStory.title}
            </h3>
            <p className="text-sm sm:text-base font-bold text-amber-400">
              {activeStory.tagline}
            </p>
          </div>

          {/* Achievement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-orange/20 via-amber-500/10 to-transparent border border-brand-orange/40 flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0 animate-bounce" />
            <div className="text-xs sm:text-sm font-black text-white font-mono">
              {activeStory.achievement}
            </div>
          </div>

          {/* Story Narrative & Summary */}
          <div className="p-6 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>Deskripsi Tantangan &amp; Tema Lomba</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeStory.storySummary}
            </p>
          </div>

          {/* 3-Grid Detailed Guidebook Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Arena & Lapangan */}
            <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3 text-xs">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-brand-orange" />
                <span>Spesifikasi Arena</span>
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Lapangan:</span>
                  <span className="text-white font-semibold">{activeStory.arenaSpecs.dimensions}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Permukaan:</span>
                  <span className="text-slate-300">{activeStory.arenaSpecs.surface}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Pembagian Zona:</span>
                  <span className="text-amber-200">{activeStory.arenaSpecs.zones}</span>
                </div>
              </div>
            </div>

            {/* 2. Spesifikasi Robot */}
            <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3 text-xs">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-brand-orange" />
                <span>Regulasi Robot</span>
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Batasan Dimensi:</span>
                  <span className="text-white font-semibold">{activeStory.robotSpecs.dimensions}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Bobot &amp; Daya:</span>
                  <span className="text-slate-300">{activeStory.robotSpecs.weight} • {activeStory.robotSpecs.power}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Penggerak &amp; Mekanik:</span>
                  <span className="text-amber-200">{activeStory.robotSpecs.mechanism}</span>
                </div>
              </div>
            </div>

            {/* 3. Aturan Skor & Penalti */}
            <div className="p-5 rounded-2xl bg-[#0C0805] border border-[#26180E] space-y-3 text-xs">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-brand-orange" />
                <span>Sistem Penilaian</span>
              </h4>
              <ul className="space-y-1.5">
                {activeStory.scoringSystem.map((score, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{score}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                  Ukuran Dokumen: {activeStory.pdfSize} • Format Asli PDF
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
