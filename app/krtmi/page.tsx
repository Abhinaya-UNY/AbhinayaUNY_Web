import React from 'react';
import { KRTMI_STORIES } from '@/data/krtmiData';
import {
  History,
  Trophy,
  MapPin,
  Sparkles,
  CheckCircle2,
  Flame,
  FileText,
  Download,
  Compass,
  Cpu,
  Layers,
  Clock,
  Zap,
  Box,
  ShieldAlert,
  AlertTriangle,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';

export const metadata = {
  title: 'Bedah Regulasi & Arsip Resmi KRTMI (2019 – 2026) — Tim Robotika Abhinaya UNY',
  description: 'Rekapitulasi lengkap sejarah lomba, spesifikasi arena, regulasi mekatronika robot, sistem penilaian, penalti, dan unduhan resmi PDF Buku Panduan KRTMI & Technocorner 2019-2026.',
};

export default function KrtmiPage() {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/15 text-orange-400 text-xs font-black uppercase tracking-wider border border-orange-500/30">
          <History className="w-4 h-4" />
          <span>ARSIP RESMI &amp; BEDAH REGULASI LOMBA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Perjalanan Lomba &amp; Buku Panduan (2026 – 2019)
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Eksplorasi mendalam regulasi teknis, layout arena bertingkat, batasan dimensi dan voltase robot, sistem penilaian, aturan diskualifikasi, serta unduh langsung dokumen PDF buku pedoman resmi dari Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek dan panitia DTETI FT UGM.
        </p>

        {/* Quick Navigation Jump Bar */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {KRTMI_STORIES.map((story) => (
            <a
              key={story.year}
              href={`#tahun-${story.year}`}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-xs font-medium transition flex items-center space-x-1.5"
            >
              <span>{story.year === '2026' ? 'Technocorner 2026' : `KRTMI ${story.year}`}</span>
              {story.isChampion && <Trophy className="w-3 h-3 text-brand-gold" />}
            </a>
          ))}
        </div>
      </div>

      {/* Stories List (2026 to 2019) */}
      <div className="space-y-16">
        {KRTMI_STORIES.map((story) => (
          <div
            key={story.year}
            id={`tahun-${story.year}`}
            className="p-6 sm:p-10 rounded-3xl bg-[#121216] border border-white/[0.08] shadow-2xl space-y-8 relative overflow-hidden scroll-mt-24"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500/60" />

            {/* Header: Official Cover Poster + Title, Badges, Location */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-white/[0.06] pb-6">
              
              {/* Official Competition Cover / Logo Thumbnail */}
              {story.coverImage && (
                <div className="relative w-40 sm:w-48 md:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg flex-shrink-0 bg-black group">
                  <img
                    src={`${basePath}${story.coverImage}`}
                    alt={`Buku Panduan Resmi ${story.title}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-orange-400 text-black text-[9px] font-bold uppercase shadow">
                    PANDUAN RESMI
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-center text-slate-300 text-[10px] font-mono font-medium">
                    Edisi {story.year}
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-orange-400 font-mono">
                    {story.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/5 text-slate-300 border border-white/10">
                    Edisi {story.year}
                  </span>
                  {story.isChampion && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center space-x-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>JUARA TINGKAT NASIONAL</span>
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {story.title}
                </h2>
                
                {story.tagline && (
                  <p className="text-xs sm:text-sm font-medium text-slate-400">
                    {story.tagline}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center space-x-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{story.location}</span>
                  </span>
                  {story.hostOrganizer && (
                    <span className="hidden sm:inline text-slate-400">• {story.hostOrganizer}</span>
                  )}
                </div>

                {story.slogan && (
                  <div className="text-[11px] font-mono italic text-slate-400">
                    Slogan Resmi: {story.slogan}
                  </div>
                )}
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="p-4 rounded-2xl bg-[#18181B] border border-white/[0.06] flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-brand-gold flex-shrink-0" />
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                {story.achievement}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>Durasi Match</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block">
                  {story.matchProcedure?.matchDuration || '3 Menit'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Batas Voltase</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 block">
                  {story.robotSpecs.power.includes('13') ? 'Maksimal 13.0V DC' : story.robotSpecs.power.includes('24') ? 'Maksimal 24.0V DC' : '12V – 14.8V DC'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                  <Award className="w-3 h-3 text-brand-gold" />
                  <span>Kondisi Kemenangan</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-orange-400 block truncate" title={story.matchProcedure?.victoryCondition}>
                  {story.year === '2024' ? '”BERSIH”' : story.year === '2023' ? '”DONE” / ”DAM”' : story.year === '2026' ? 'FINISH' : 'Poin Tertinggi'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18181B] border border-white/[0.06] text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center space-x-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>Sistem Operasi</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 block truncate" title={story.robotSpecs.robotCount || '1 Robot'}>
                  {story.year === '2024' ? 'Dual Robot' : story.year === '2026' ? 'Mecanum Transporter' : 'Cyber-Physical'}
                </span>
              </div>
            </div>

            {/* Narrative Summary */}
            <div className="p-6 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Deskripsi Misi Lomba &amp; Tema Masalah</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {story.storySummary}
              </p>
            </div>

            {/* 4-Columns Deep Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* 1. Spesifikasi Arena */}
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3 text-xs">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Compass className="w-4 h-4 text-orange-400" />
                  <span>Spesifikasi Arena</span>
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi:</span>
                    <span className="text-white font-semibold">{story.arenaSpecs.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Permukaan:</span>
                    <span className="text-slate-300">{story.arenaSpecs.surface}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Zona:</span>
                    <span className="text-slate-300">{story.arenaSpecs.zones}</span>
                  </div>
                  {story.arenaSpecs.obstacles && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Rintangan:</span>
                      <span className="text-slate-300">{story.arenaSpecs.obstacles}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Regulasi Robot */}
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3 text-xs">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-orange-400" />
                  <span>Regulasi Robot</span>
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensi Start:</span>
                    <span className="text-white font-semibold">{story.robotSpecs.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Bobot &amp; Daya:</span>
                    <span className="text-slate-300">{story.robotSpecs.weight} • {story.robotSpecs.power}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Kontroler &amp; Mekanisme:</span>
                    <span className="text-slate-300">{story.robotSpecs.controller} • {story.robotSpecs.mechanism}</span>
                  </div>
                  {story.robotSpecs.autonomyMode && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Mode Otomasi:</span>
                      <span className="text-slate-300">{story.robotSpecs.autonomyMode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Objek & Prosedur Laga */}
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3 text-xs">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Box className="w-4 h-4 text-orange-400" />
                  <span>Objek &amp; Prosedur</span>
                </h4>
                <div className="space-y-2.5">
                  {story.gameObjects && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Kategori Objek:</span>
                      <ul className="space-y-1 mt-1 text-slate-300">
                        {story.gameObjects.types.slice(0, 3).map((t, idx) => (
                          <li key={idx} className="flex items-center space-x-1">
                            <span className="text-orange-400">•</span>
                            <span className="truncate">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Pertandingan:</span>
                    <span className="text-white font-bold">{story.matchProcedure?.matchDuration || '3 Menit'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Kondisi Kemenangan:</span>
                    <span className="text-orange-400 font-bold">{story.matchProcedure?.victoryCondition}</span>
                  </div>
                </div>
              </div>

              {/* 4. Sistem Penilaian & Penalti */}
              <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3 text-xs">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span>Penilaian &amp; Penalti</span>
                </h4>
                <ul className="space-y-1.5">
                  {story.scoringSystem.slice(0, 4).map((score, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>{score}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Authentic Fun Facts & Research Notes */}
            <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Catatan Riset &amp; Peran Divisi Abhinaya UNY</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                {story.teamRoleAndFunFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start space-x-2 p-3 rounded-xl bg-[#121216] border border-white/[0.06]">
                    <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidebook Download Card */}
            <div className="p-5 rounded-2xl bg-[#18181B] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {story.pdfTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Ukuran File: {story.pdfSize} • Dokumen Resmi BPTI Kemendikbudristek / Panitia UGM
                  </div>
                </div>
              </div>
              <a
                href={`${basePath}/guidebooks/${story.pdfFile}`}
                download={story.pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-400 hover:bg-orange-300 text-black font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg whitespace-nowrap uppercase tracking-wider cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PDF Panduan</span>
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
