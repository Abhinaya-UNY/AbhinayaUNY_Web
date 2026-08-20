import React from 'react';
import { KRTMI_EDITIONS } from '@/data/krtmiData';
import { History, Trophy, Cpu, BookOpen, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function KrtmiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
          <History className="w-4 h-4" />
          <span>DOKUMENTASI LENGKAP DIVISI KRTMI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Evolusi Regulasi &amp; Teknologi KRTMI (2019 – 2026)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Kontes Robot Tematik Indonesia (KRTMI) menghadirkan tantangan berbeda di setiap periodenya. Berikut adalah rekapitulasi aturan resmi lomba, arsitektur robot, dan pencapaian tim Abhinaya UNY.
        </p>
      </div>

      {/* Editions List */}
      <div className="space-y-12">
        {KRTMI_EDITIONS.map((edition) => (
          <div
            key={edition.year}
            id={edition.year === '2026' ? 'technocorner2026' : `krtmi-${edition.year}`}
            className="p-6 sm:p-10 rounded-3xl bg-[#090F1A] border-2 border-brand-border shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-brand-cyan font-mono">
                  {edition.year}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {edition.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400">
                    {edition.organizer}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${edition.badgeColor}`}>
                {edition.division}
              </span>
            </div>

            {/* Achievement Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-brand-cyan/40 flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-brand-gold flex-shrink-0" />
              <div className="text-xs sm:text-sm font-black text-white font-mono">
                {edition.achievements}
              </div>
            </div>

            {/* Content Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Rules & Challenges */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
                <h3 className="text-xs font-black text-brand-cyan uppercase tracking-wider flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Regulasi &amp; Tantangan Lomba</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {edition.rulesSummary}
                </p>
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Fokus Pengujian:</span>
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

              {/* Hardware & Software Architecture */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#060A12] border border-slate-800">
                <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Arsitektur Sistem Robot</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Penggerak (Drivetrain):</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.drivetrain}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Kontroler Utama:</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.controller}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Fusi Sensor:</span>
                    <span className="text-brand-cyan font-semibold">{edition.robotArchitecture.sensors.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Aktuator:</span>
                    <span className="text-slate-200 font-semibold">{edition.robotArchitecture.actuators}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Algoritma Kendali:</span>
                    <span className="text-emerald-300 font-mono text-[11px]">{edition.robotArchitecture.algorithm}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
