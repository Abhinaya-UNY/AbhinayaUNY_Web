'use client';

import React, { useState } from 'react';
import { KRTMI_EDITIONS, KrtmiEdition } from '@/data/krtmiData';
import { Trophy, Cpu, Zap, Shield, BookOpen, Layers, CheckCircle2, ChevronRight, MapPin, Gauge, Radio, Sparkles } from 'lucide-react';
import { ArenaSchematicViewer } from '@/components/ArenaSchematicViewer';
import Link from 'next/link';

export const HistoryTimeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  const currentEdition = KRTMI_EDITIONS.find((e) => e.year === selectedYear) || KRTMI_EDITIONS[0];

  return (
    <section id="timeline" className="py-16 space-y-10 relative">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
          <Layers className="w-3.5 h-3.5" />
          <span>REKAPITULASI DIVISI KRTMI &amp; TECHNOCORNER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Perjalanan Riset &amp; Kompetisi Tematik (2019 – 2026)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Evolusi aturan lomba, inovasi sasis, sistem kendali kinematika holonomik, dan kecerdasan buatan tim Abhinaya UNY di setiap edisi kompetisi nasional.
        </p>
      </div>

      {/* Interactive Year Selector Bar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {KRTMI_EDITIONS.map((edition) => {
            const isSelected = edition.year === selectedYear;
            return (
              <button
                key={edition.year}
                type="button"
                onClick={() => setSelectedYear(edition.year)}
                className={`px-4 py-3 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center space-x-2 border flex-shrink-0 font-mono ${
                  isSelected
                    ? 'bg-brand-cyan text-black border-brand-cyan shadow-[0_0_20px_rgba(0,245,212,0.4)] scale-105'
                    : 'bg-[#090F1A] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{edition.year === '2026' ? 'Technocorner 2026' : `KRTMI ${edition.year}`}</span>
                {edition.year === '2024' && <Trophy className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Edition Deep Dive Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border shadow-2xl space-y-8 relative overflow-hidden hud-corner">
          
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-emerald-400 to-sky-400" />

          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase border font-mono ${currentEdition.badgeColor}`}>
                {currentEdition.division}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                {currentEdition.hostVenue}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                {currentEdition.date}
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
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 via-brand-emerald/20 to-transparent border border-brand-cyan/40 flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0 animate-bounce" />
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-black text-white font-mono">
                {currentEdition.achievements}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {currentEdition.officialCitation}
              </p>
            </div>
          </div>

          {/* Instant Victory Condition Card */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-black font-mono">
                ★
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Syarat Kemenangan Mutlak:
                </div>
                <div className="text-sm font-black text-white font-mono">
                  {currentEdition.instantWinCondition.name} — {currentEdition.instantWinCondition.reward}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 max-w-lg">
              {currentEdition.instantWinCondition.condition}
            </p>
          </div>

          {/* Interactive SVG Field Blueprint */}
          <ArenaSchematicViewer year={currentEdition.year} />

          {/* 2-Column Details: Rules vs Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Column 1: Rules & Mission Summary */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2 font-mono">
                <BookOpen className="w-4 h-4 text-brand-cyan" />
                <span>Regulasi, Batasan &amp; Alur Misi</span>
              </h4>
              
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white uppercase text-[10px] font-mono text-brand-cyan">Batasan Fisik Robot:</div>
                  <div className="text-[11px] text-slate-300">• Dimensi Start: {currentEdition.robotConstraints.startDimension}</div>
                  <div className="text-[11px] text-slate-300">• Ekspansi Dinamis: {currentEdition.robotConstraints.dynamicDimension}</div>
                  <div className="text-[11px] text-slate-300">• Berat &amp; Catu Daya: {currentEdition.robotConstraints.weightLimit}, {currentEdition.robotConstraints.powerSupply}</div>
                  <div className="text-[11px] text-slate-300">• Protokol Kendali: {currentEdition.robotConstraints.controlProtocol}</div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="font-bold text-white uppercase text-[10px] font-mono">Tahapan Misi Pertandingan:</div>
                  {currentEdition.missionFlow.map((step, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Robot Architecture & Specs */}
            <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2 font-mono">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Arsitektur Rekayasa Robot Abhinaya</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Sistem Penggerak (Drivetrain):</div>
                  <div className="font-semibold text-white">{currentEdition.robotArchitecture.drivetrain}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Mikrokontroler &amp; Komputer:</div>
                  <div className="font-semibold text-white">{currentEdition.robotArchitecture.controller}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Fusi Sensor:</div>
                  <div className="font-semibold text-brand-cyan">{currentEdition.robotArchitecture.sensors.join(' • ')}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Aktuator &amp; Driver:</div>
                  <div className="font-semibold text-slate-200">{currentEdition.robotArchitecture.actuators}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Algoritma &amp; Kendali:</div>
                  <div className="font-semibold text-emerald-300 font-mono text-[11px]">{currentEdition.robotArchitecture.algorithm}</div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Link to Full Archive */}
          <div className="pt-2 flex justify-end">
            <Link
              href="/krtmi"
              className="inline-flex items-center space-x-1.5 text-xs text-brand-cyan hover:underline font-mono font-bold"
            >
              <span>Buka Seluruh Dokumen Arsip 7 Edisi &amp; Kalkulator Skor &rarr;</span>
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};
