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
import { SpotlightCard, DecryptedText } from '@/components/animations';

export const KRIOverview: React.FC = () => {
  const krtmiPillars = [
    {
      title: 'Misi Tematik Dinamis & Kontekstual',
      icon: <Target className="w-5 h-5 text-brand-orange" />,
      desc: 'Tidak seperti divisi lain bertema tetap, KRTMI menguji adaptabilitas rekayasa dengan tema misi yang berganti tiap tahun merefleksikan persoalan nasional: otomasi pascapanen, sterilisasi medis COVID-19, limbah B3 rumah sakit, hingga sortir sampah otonom.',
    },
    {
      title: 'Visi Komputer AI & Deteksi Real-Time',
      icon: <Eye className="w-5 h-5 text-cyan-400" />,
      desc: 'Robot memproses visual arena secara otonom tanpa campur tangan manusia. Algoritma deteksi YOLOv8 dan segmentasi HSV mengekstrak koordinat objek dalam hitungan milidetik guna memandu mekanisme gripper/feeder.',
    },
    {
      title: 'Kinematika Holonomik 4WD Mecanum',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: 'Sasis berpenggerak empat roda Mecanum independen memungkinkan translasi omni-directional dan rotasi simultan. Kendali Closed-Loop PID dengan encoder optik presisi tinggi menjaga stabilitas manuver di atas karpet arena.',
    },
    {
      title: 'Integrasi 4 Pilar Mekatronika Terpadu',
      icon: <Cpu className="w-5 h-5 text-brand-orange" />,
      desc: 'KRTMI menuntut integrasi tanpa celah antara rancang bangun sasis mekanik (CAD/CAM & 3D print), keandalan distribusi daya elektrik (PCB & baterai LiFePO4), ketangguhan firmware embedded sistem, dan ketertiban tata kelola manajerial.',
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
    <section id="kri-overview" className="py-8 sm:py-10 md:py-12 bg-[#050507] border-t border-white/5 relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono tracking-wider border border-white/10">
            <Compass className="w-3.5 h-3.5 text-brand-orange" />
            <span>DIVISI RESMI KONTES ROBOT INDONESIA (KRI)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Mengenal Kontes Robot Indonesia (KRI) &amp; Divisi KRTMI
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-4xl mx-auto">
            Kontes Robot Indonesia (KRI) adalah ajang kompetisi rekayasa robotika mahasiswa paling bergengsi tingkat nasional yang diselenggarakan oleh <strong className="text-slate-200">Balai Pengembangan Talenta Indonesia (BPTI) / Puspresnas Kemendikbudristek RI</strong>.
          </p>
        </div>

        {/* SPOTLIGHT UTAMA: KRTMI (KONTES ROBOT TEMATIK INDONESIA) */}
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0B0B0E] border border-white/8 space-y-6 relative overflow-hidden">
          {/* Header Showcase KRTMI */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-brand-orange text-black font-bold text-xs uppercase tracking-wider font-mono">
                  DIVISI SPESIALISASI ABHINAYA UNY
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 font-bold text-xs border border-white/10 flex items-center space-x-1 font-mono">
                  <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  <span>Juara 1 Wilayah &amp; Juara 2 Nasional</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Apa Itu KRTMI (Kontes Robot Tematik Indonesia)?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                KRTMI adalah salah satu divisi resmi KRI yang menguji kemampuan tim dalam menciptakan robot beroda otonom cerdas untuk menyelesaikan misi bertema khusus (*thematic mission*) yang relevan dengan kebutuhan industri dan kemanusiaan.
              </p>
            </div>

            <a
              href="#krtmi-story"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-amber-400 text-black font-bold text-xs tracking-wider transition shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>Lihat Bedah Regulasi KRTMI (2019–2026)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Pilar Keunggulan KRTMI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {krtmiPillars.map((p, i) => (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(255, 107, 0, 0.12)"
                spotlightSize={250}
                className="p-4 sm:p-5 rounded-2xl bg-[#0E0E12] border border-white/8 hover:border-white/20 transition space-y-2.5 group"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Kronologi Singkat Perjalanan Tema KRTMI */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0E12] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-amber-300 font-bold">
              <Trophy className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Evolusi Tema KRTMI:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-slate-300 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">2019: Panen Padi</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">2020: Disinfeksi COVID-19</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">2021: Rawat Pasien Medis</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">2022: Limbah B3 RS</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">2023: Digital Twin Cyber-Physical</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-brand-orange font-bold border border-brand-orange/40">2024: Pemilah Sampah Cerdas</span>
              <ArrowRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-cyan-400 font-bold border border-cyan-400/40">2026: Technocorner &amp; UNDIP</span>
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
              <SpotlightCard
                key={div.code}
                spotlightColor="rgba(255, 107, 0, 0.12)"
                spotlightSize={280}
                className={`p-5 rounded-2xl space-y-2.5 transition border ${
                  div.isHighlight
                    ? 'bg-[#0E0E12] border-brand-orange/40 shadow-lg shadow-brand-orange/5'
                    : 'bg-[#0E0E12] border-white/8 hover:border-white/20'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold font-mono px-3 py-1 rounded-lg ${
                        div.isHighlight ? 'bg-brand-orange text-black' : 'bg-white/5 text-slate-300 border border-white/10'
                      }`}
                    >
                      <DecryptedText
                        text={div.code}
                        animateOn="hover"
                        className={div.isHighlight ? 'text-black font-mono font-bold' : 'text-slate-300 font-mono font-bold'}
                      />
                    </span>
                    {div.isHighlight && (
                      <span className="text-[10px] font-bold uppercase text-brand-orange tracking-wider flex items-center space-x-1 font-mono">
                        <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                        <span>Fokus Tim Abhinaya</span>
                      </span>
                    )}
                  </div>

                  <h5 className="text-sm font-bold text-white">{div.name}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">{div.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
