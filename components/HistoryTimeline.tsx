'use client';

import React, { useState } from 'react';
import { KRTMI_EDITIONS, KrtmiEdition } from '@/data/krtmiData';
import { Trophy, Cpu, Zap, Shield, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

export const HistoryTimeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const currentEdition = KRTMI_EDITIONS.find((e) => e.year === selectedYear) || KRTMI_EDITIONS[0];

  return (
    <section id="timeline" className="py-16 space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
          <Layers className="w-3.5 h-3.5" />
          <span>REKAPITULASI DIVISI KRTMI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Perjalanan Riset &amp; Kompetisi Tematik (2019 – 2026)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Evolusi aturan lomba, inovasi sasis, sistem kendali kinematika, dan kecerdasan buatan tim Abhinaya UNY di setiap edisi Kontes Robot Indonesia.
        </p>
      </div>

      {/* Interactive Year Selector Bar */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {KRTMI_EDITIONS.map((edition) => {
            const isSelected = edition.year === selectedYear;
            return (
              <button
                key={edition.year}
                type="button"
                onClick={() => setSelectedYear(edition.year)}
                className={`px-4 py-3 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-black border-transparent shadow-[0_0_20px_rgba(0,245,212,0.4)] scale-105'
                    : 'bg-[#0B111B] border-brand-border text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                <span>{edition.year === '2026' ? 'Technocorner 2026' : `KRTMI ${edition.year}`}</span>
                {edition.year === '2024' && <Trophy className="w-3.5 h-3.5 text-black animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Edition Deep Dive Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-sky-400 to-brand-indigo" />

          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase border ${currentEdition.badgeColor}`}>
                {currentEdition.division}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Penyelenggara: {currentEdition.organizer}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {currentEdition.title}
            </h3>
            <p className="text-sm font-semibold text-brand-cyan">
              Tema: &ldquo;{currentEdition.theme}&rdquo;
            </p>
          </div>

          {/* Achievement Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-transparent border border-brand-cyan/40 flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0 animate-bounce" />
            <div className="text-xs sm:text-sm font-black text-white font-mono">
              {currentEdition.achievements}
            </div>
          </div>

          {/* 2-Column Details: Rules vs Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Column 1: Rules & Mission Summary */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-brand-cyan" />
                <span>Ringkasan Regulasi &amp; Misi Lomba</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentEdition.rulesSummary}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Tantangan Teknis Utama:
                </div>
                <ul className="space-y-2">
                  {currentEdition.technicalChallenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Robot Architecture & Specs */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Arsitektur Robot Abhinaya</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Sistem Penggerak (Drivetrain):</div>
                  <div className="font-semibold text-white">{currentEdition.robotArchitecture.drivetrain}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Mikrokontroler &amp; Komputer:</div>
                  <div className="font-semibold text-white">{currentEdition.robotArchitecture.controller}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Sensor &amp; Visi:</div>
                  <div className="font-semibold text-brand-cyan">{currentEdition.robotArchitecture.sensors.join(' • ')}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Algoritma &amp; Kendali:</div>
                  <div className="font-semibold text-emerald-300 font-mono text-[11px]">{currentEdition.robotArchitecture.algorithm}</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
