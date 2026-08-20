'use client';

import React, { useState } from 'react';
import { KRTMI_STORIES, KrtmiStory } from '@/data/krtmiData';
import { Trophy, History, MapPin, Sparkles, CheckCircle2, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const KrtmiChronicles: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2024');

  const activeStory = KRTMI_STORIES.find((s) => s.year === activeYear) || KRTMI_STORIES[0];

  return (
    <section id="krtmi-story" className="py-16 space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <History className="w-3.5 h-3.5" />
          <span>CERITA PERJALANAN LOMBA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Cerita KRTMI dari Tahun ke Tahun (2019 – 2026) 📜
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Apa sih sebenarnya Kontes Robot Tematik Indonesia (KRTMI) itu? Mengapa temanya selalu berganti setiap tahun? Yuk jelajahi kisah seru dan tantangan robot Abhinaya di setiap musim kejuaraan!
        </p>
      </div>

      {/* Year Tabs Bar */}
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
                    ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black border-transparent shadow-[0_0_25px_rgba(255,107,0,0.45)] scale-105'
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#140E09] border-2 border-brand-orange/40 shadow-2xl space-y-7 relative overflow-hidden">
          
          {/* Top Orange Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400" />

          {/* Title and Tagline */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                Edisi {activeStory.year}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#22160E] text-amber-200 border border-[#3A2617] flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-brand-orange" />
                <span>{activeStory.location}</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {activeStory.title}
            </h3>
            <p className="text-sm font-bold text-amber-400">
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

          {/* 2-Columns: Story Summary vs How the Robot Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            
            {/* Story Summary */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#0C0805] border border-[#26180E]">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>Misi &amp; Cerita Lomba</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStory.storySummary}
              </p>
              
              <div className="pt-2 space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                  Kisah Seru Tim:
                </span>
                <ul className="space-y-2">
                  {activeStory.teamRoleAndFunFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How the Robot Works */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#0C0805] border border-[#26180E]">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                <span>Cara Kerja Robot Abhinaya di Arena</span>
              </h4>
              <ul className="space-y-3">
                {activeStory.howItWorks.map((work, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-[#171009] border border-[#2F1F13] text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-white block">{work}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Link to Full Archive */}
          <div className="pt-2 text-center">
            <Link
              href="/krtmi"
              className="inline-flex items-center space-x-2 text-xs font-bold text-brand-orange hover:text-amber-300 transition"
            >
              <span>Baca Rincian Lengkap Seluruh Edisi KRTMI (2019 – 2026)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};
