'use client';

import React from 'react';
import {
  Bot,
  Flame,
  Compass,
  Sparkles,
  Trophy,
  Cpu,
  Layers,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  Zap,
} from 'lucide-react';

export const KRIOverview: React.FC = () => {
  const krtmiPillars = [
    {
      title: 'Misi Tematik Kontekstual',
      icon: <Target className="w-5 h-5 text-brand-orange" />,
      desc: 'Berbeda dari divisi lain yang temanya statis, tema KRTMI selalu berganti setiap tahun mengikuti permasalahan nyata nasional (pertanian, medis COVID-19, limbah B3, hingga pemilahan sampah cerdas berbasis AI).',
    },
    {
      title: 'Kecerdasan Artifisial & Computer Vision',
      icon: <Eye className="w-5 h-5 text-cyan-400" />,
      desc: 'Robot dituntut mengenali objek arena secara otonom secara real-time menggunakan kamera mikrokontroler/kamera industri, model deteksi objek YOLO, dan algoritma segmentasi warna.',
    },
    {
      title: 'Navigasi Otonom & Holonomik 4WD',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: 'Pergerakan robot mengadopsi 4 roda Mecanum atau Omni-wheel berpenggerak independen dengan kendali PID tertutup dan path planning presisi untuk manuver cepat tanpa delay.',
    },
    {
      title: 'Sinergi Mekatronika 4 Divisi',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      desc: 'KRTMI adalah kawah candradimuka riset rekayasa yang memadukan 4 pilar sekaligus: Mekanik (3D CAD & manufaktur), Elektrik (PCB & catu daya), Pemrograman (AI & firmware), serta Manajerial.',
    },
  ];

  const otherDivisions = [
    {
      code: 'KRAI',
      name: 'Kontes Robot ABU Indonesia',
      desc: 'Mengadopsi tema internasional ABU Robocon dengan fokus mekanisme pelontar/pelempar objek di arena bertingkat.',
    },
    {
      code: 'KRSTI',
      name: 'Kontes Robot Seni Tari Indonesia',
      desc: 'Sepasang robot humanoid berkaki dua yang menari secara serentak dan luwes mengikuti irama musik tari tradisional daerah.',
    },
    {
      code: 'KRSBI-B',
      name: 'Robot Sepak Bola Beroda',
      desc: 'Pertandingan sepak bola otonom 3 lawan 3 menggunakan robot beroda dengan kamera omni-directional dan strategi otomatis.',
    },
    {
      code: 'KRSBI-H',
      name: 'Robot Sepak Bola Humanoid',
      desc: 'Robot berbentuk anatomi manusia berkaki dua yang menggiring bola dan menendang ke gawang secara mandiri.',
    },
    {
      code: 'KRSRI',
      name: 'Kontes Robot SAR Indonesia',
      desc: 'Robot penyelamat berkaki banyak (seperti laba-laba) yang menembus medan terjal berbahaya dan memadamkan titik api.',
    },
    {
      code: 'KRTMI',
      name: 'Kontes Robot Tematik Indonesia',
      desc: 'Divisi kebanggaan Tim Abhinaya UNY! Fokus riset robotika tematik adaptif, pemilahan otonom, dan kecerdasan buatan.',
      isHighlight: true,
    },
  ];

  return (
    <section id="kri-overview" className="py-8 sm:py-10 md:py-12 bg-[#080503] border-t border-[#1C120A] relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>PANDUAN LOMBA ROBOTIKA RESMI KEMENDIKBUDRISTEK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Mengenal Kontes Robot Indonesia (KRI) &amp; Divisi KRTMI&nbsp;🤖
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Kontes Robot Indonesia (KRI) adalah ajang kompetisi rekayasa robotika mahasiswa paling bergengsi tingkat nasional yang diselenggarakan oleh <strong>Balai Pengembangan Talenta Indonesia (BPTI) / Puspresnas Kemendikbudristek RI</strong>.
          </p>
        </div>

        {/* 🌟 SPOTLIGHT UTAMA: KRTMI (KONTES ROBOT TEMATIK INDONESIA) */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#1C120A] via-[#140D08] to-[#0D0805] border-2 border-brand-orange/50 shadow-[0_0_50px_rgba(255,107,0,0.2)] space-y-6 relative overflow-hidden">
          
          {/* Top Decorative Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-500" />

          {/* Header Showcase KRTMI */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2D1B10] pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-xl bg-brand-orange text-black font-black text-xs uppercase tracking-wider font-mono">
                  DIVISI SPESIALISASI ABHINAYA UNY
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  <span>Juara 1 Wilayah &amp; Juara 2 Nasional</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Apa Itu KRTMI (Kontes Robot Tematik Indonesia)?
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/90 max-w-3xl leading-relaxed">
                KRTMI adalah salah satu divisi resmi KRI yang menguji kemampuan tim dalam menciptakan robot beroda otonom cerdas untuk menyelesaikan misi bertema khusus (*thematic mission*) yang relevan dengan kebutuhan industri dan kemanusiaan.
              </p>
            </div>

            <a
              href="#krtmi-story"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-orange hover:bg-amber-400 text-black font-black text-xs tracking-wider transition shadow-lg shadow-brand-orange/30 hover:scale-105 flex-shrink-0 cursor-pointer"
            >
              <span>Lihat Bedah Regulasi KRTMI (2019–2026)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Pilar Keunggulan KRTMI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {krtmiPillars.map((p, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-[#170E08] border border-brand-orange/30 hover:border-brand-orange transition space-y-2.5 shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#24160C] flex items-center justify-center border border-brand-orange/30 group-hover:scale-110 transition">
                  {p.icon}
                </div>
                <h4 className="text-sm font-black text-white">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Kronologi Singkat Perjalanan Tema KRTMI */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#110B07] border border-[#2B1B10] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <Trophy className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Evolusi Tema KRTMI:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-slate-300 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2019: Panen Padi</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2020: Disinfeksi COVID-19</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2021: Rawat Pasien Medis</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2022: Limbah B3 RS</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-amber-200 border border-[#3A2214]">2023: Pemilah Sampah</span>
              <span>➔</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#20140A] text-brand-orange font-bold border border-brand-orange/40">2024: AI Sorting</span>
            </div>
          </div>

        </div>

        {/* Divisi KRI Lainnya */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg sm:text-xl font-black text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-brand-orange" />
              <span>Daftar Seluruh Divisi Kontes Robot Indonesia (KRI)</span>
            </h4>
            <span className="text-xs text-amber-300/80 font-mono hidden sm:inline">6 Divisi Resmi Puspresnas / BPTI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherDivisions.map((div) => (
              <div
                key={div.code}
                className={`p-5 rounded-2xl space-y-2.5 transition border ${
                  div.isHighlight
                    ? 'bg-gradient-to-b from-[#241508] to-[#140D07] border-brand-orange shadow-[0_0_25px_rgba(255,107,0,0.2)] ring-1 ring-brand-orange'
                    : 'bg-[#120D08] border-[#2B1B10] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black font-mono px-3 py-1 rounded-xl ${
                      div.isHighlight ? 'bg-brand-orange text-black' : 'bg-[#22160E] text-amber-200 border border-[#3A2214]'
                    }`}
                  >
                    {div.code}
                  </span>
                  {div.isHighlight && (
                    <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                      <span>Fokus Tim Abhinaya</span>
                    </span>
                  )}
                </div>

                <h5 className="text-sm font-black text-white">{div.name}</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{div.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
