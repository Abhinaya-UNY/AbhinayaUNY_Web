import React from 'react';
import { KRTMI_EDITIONS } from '@/data/krtmiData';
import { History, Trophy, Cpu, BookOpen, CheckCircle2, Award, ArrowRight, ShieldCheck, MapPin, Gauge, Activity } from 'lucide-react';
import Link from 'next/link';
import { ArenaSchematicViewer } from '@/components/ArenaSchematicViewer';
import { MatchScoreCalculator } from '@/components/MatchScoreCalculator';

export const metadata = {
  title: 'Arsip Regulasi & Sejarah KRTMI (2019–2026) — Abhinaya UNY',
  description: 'Dokumentasi lengkap regulasi resmi, dimensi arena pertandingan, tantangan teknis, arsitektur robot, dan pencapaian kejuaraan Kontes Robot Tematik Indonesia (KRTMI) dan Technocorner UGM.',
};

export default function KrtmiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
          <History className="w-4 h-4" />
          <span>DOKUMENTASI LENGKAP 7 EDISI KOMPETISI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Evolusi Regulasi, Arena &amp; Teknologi (2019 – 2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Kontes Robot Tematik Indonesia (KRTMI) Puspresnas Kemendikbudristek dan Technocorner FT UGM menghadirkan tantangan berbeda di setiap periodenya. Berikut adalah rekapitulasi aturan resmi lomba, dimensi arena, arsitektur robot, dan prestasi tim Robotika Abhinaya UNY.
        </p>
      </div>

      {/* Interactive Match Score Calculator */}
      <MatchScoreCalculator />

      {/* Editions List */}
      <div className="space-y-16">
        {KRTMI_EDITIONS.map((edition) => (
          <div
            key={edition.year}
            id={edition.year === '2026' ? 'technocorner2026' : `krtmi-${edition.year}`}
            className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border shadow-2xl space-y-8 relative overflow-hidden hud-corner"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl sm:text-4xl font-black text-brand-cyan font-mono">
                  {edition.year}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {edition.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                    <span>{edition.hostVenue}</span>
                    <span>•</span>
                    <span className="text-brand-cyan font-mono">{edition.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase border font-mono ${edition.badgeColor}`}>
                {edition.division}
              </span>
            </div>

            {/* Achievement Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 via-brand-emerald/20 to-transparent border border-brand-cyan/40 flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0 animate-bounce" />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-black text-white font-mono">
                  {edition.achievements}
                </div>
                <p className="text-[11px] text-slate-300">
                  {edition.officialCitation}
                </p>
              </div>
            </div>

            {/* Instant Victory Requirement Box */}
            <div className="p-4 rounded-2xl bg-[#060A12] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Kemenangan Mutlak:</span>
                <div className="text-sm font-black text-brand-cyan">
                  {edition.instantWinCondition.name} ({edition.instantWinCondition.reward})
                </div>
              </div>
              <p className="text-xs text-slate-300 font-sans max-w-xl">
                {edition.instantWinCondition.condition}
              </p>
            </div>

            {/* Arena Schematic Blueprint */}
            <ArenaSchematicViewer year={edition.year} />

            {/* 2-Column Content Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Rules & Challenges */}
              <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
                <h3 className="text-xs font-black text-brand-cyan uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <BookOpen className="w-4 h-4" />
                  <span>Batasan Teknis &amp; Alur Pertandingan</span>
                </h3>
                
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono text-slate-300">
                  <div className="text-brand-cyan font-bold uppercase text-[10px]">Spesifikasi Batasan Fisik Robot:</div>
                  <div>• Dimensi Awal: {edition.robotConstraints.startDimension}</div>
                  <div>• Ekspansi Dinamis: {edition.robotConstraints.dynamicDimension}</div>
                  <div>• Batas Berat: {edition.robotConstraints.weightLimit}</div>
                  <div>• Batas Catu Daya: {edition.robotConstraints.powerSupply}</div>
                  <div>• Protokol Komunikasi: {edition.robotConstraints.controlProtocol}</div>
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Alur Misi Lomba:</span>
                  <div className="space-y-1.5">
                    {edition.missionFlow.map((step, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 text-[11px]">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scoring Rules Matrix */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Sistem Poin Resmi:</span>
                  <div className="space-y-1 font-mono text-[11px]">
                    {edition.scoringRules.map((rule, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                        <span className="text-slate-300 text-[10px]">{rule.item}</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          rule.type === 'bonus' ? 'bg-brand-cyan/15 text-brand-cyan' :
                          rule.type === 'instant_win' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {rule.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hardware & Software Architecture */}
              <div className="space-y-4 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
                <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>Arsitektur Rekayasa Robot Abhinaya</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Penggerak (Drivetrain):</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.drivetrain}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Kontroler Utama:</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.controller}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Fusi Sensor:</span>
                    <span className="text-brand-cyan font-semibold">{edition.robotArchitecture.sensors.join(', ')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Aktuator &amp; Driver:</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.actuators}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Algoritma Kendali:</span>
                    <span className="text-emerald-300 font-mono text-[11px]">{edition.robotArchitecture.algorithm}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Fokus Pengujian Riset:</span>
                  <ul className="space-y-1.5">
                    {edition.technicalChallenges.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
