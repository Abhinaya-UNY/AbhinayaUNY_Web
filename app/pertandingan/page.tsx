'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Play,
  Youtube,
  ExternalLink,
  Flame,
  ShieldCheck,
  Cpu,
  Target,
  ArrowRight,
  ChevronRight,
  Maximize2,
  Sparkles,
  Smartphone,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  Zap,
} from 'lucide-react';
import { SpotlightCard, CountUp } from '@/components/animations';

interface MatchRound {
  id: string;
  roundName: string;
  opponent: string;
  scoreAbhinaya: number;
  scoreOpponent: number;
  status: 'WIN' | 'ADVANCE';
  summary: string;
  keyHighlights: string[];
}

const MATCH_HISTORY: MatchRound[] = [
  {
    id: 'round-1',
    roundName: 'Babak Penyisihan Grup KRTMI',
    opponent: 'Universitas Brawijaya / Tim Rival',
    scoreAbhinaya: 450,
    scoreOpponent: 280,
    status: 'WIN',
    summary: 'Robot Abhinaya langsung mendeteksi 4 objek sampah pertama dalam waktu 38 detik dan sukses memasukkan seluruh muatan ke Keranjang Cerdas tanpa penalti rotasi.',
    keyHighlights: [
      'Deteksi AI YOLOv8 dengan akurasi 98% di bawah pencahayaan dinamis',
      'Kecepatan manuver sasis mecanum 1.2 m/s di karpet arena',
      'Zero penalti collision dengan batas lintasan',
    ],
  },
  {
    id: 'round-2',
    roundName: 'Babak 8 Besar (Quarter Finals)',
    opponent: 'Institut Teknologi Sepuluh Nopember (ITS)',
    scoreAbhinaya: 520,
    scoreOpponent: 410,
    status: 'WIN',
    summary: 'Pertandingan sengit adu cepat sortir sampah botol & kaleng. Gripper 2-stage Abhinaya berhasil mengunci objek silinder licin dan melakukan docking otomatis ke keranjang digital.',
    keyHighlights: [
      'Algoritma trajectory planning menghindari rintangan statis',
      'Lead-screw lift actuator mengangkat beban botol dalam 0.8 detik',
      'Sinkronisasi ESP32 telemetri dengan juri pertandingan',
    ],
  },
  {
    id: 'round-3',
    roundName: 'Babak Semifinal & Perebutan Juara',
    opponent: 'Universitas Gadjah Mada (UGM)',
    scoreAbhinaya: 580,
    scoreOpponent: 530,
    status: 'ADVANCE',
    summary: 'Laga puncak penentuan juara nasional. Abhinaya mencatatkan rekor waktu tercepat menyelesaikan seluruh sequence arena KRTMI UMS Surakarta.',
    keyHighlights: [
      'Peringkat 1 Wilayah I KRTMI & Juara 2 Nasional KRTMI 2024',
      'Total akumulasi poin klasifikasi sampah tertinggi di turnamen',
      'Performa komputasi edge Mini PC stabil tanpa restart (100% uptime)',
    ],
  },
];

const MATCH_VIDEOS = [
  {
    id: 'PmxwdrhpxKg',
    title: 'LIVE LOMBA FULL KRTMI WILAYAH 2024 | ABHINAYA Day 2 KRI REGIONAL 2024',
    subtitle: 'Official Match Live Arena Competition • 1080P 60FPS',
    description: 'Saksikan rekaman siaran langsung pertandingan resmi robot Abhinaya UNY bertanding di arena KRTMI Wilayah 2024 Day 2: kecepatan manuver holonomik 4WD Mecanum, deteksi sampah otonom via AI YOLO, dan aksi kejar poin di arena laga.',
    badge: 'LIVE LOMBA PERTANDINGAN',
    badgeColor: 'bg-red-600/20 text-red-400 border-red-500/40',
    url: 'https://www.youtube.com/watch?v=PmxwdrhpxKg',
  },
  {
    id: '3yr5uNkxA_8',
    title: 'Abhinaya Introduction 2024 | Kontes Robot Indonesia',
    subtitle: 'Official Team & Robot Introduction • UKM Restek UNY',
    description: 'Video resmi pengenalan Tim Robotika Abhinaya UNY dan robot otonom untuk Kontes Robot Indonesia (KRTMI): perancangan mekatronika, riset 4 divisi (Mekanik, Elektrik, Programming AI, Manajerial), dan uji coba navigasi di laboratorium.',
    badge: 'PENGENALAN TIM 2024',
    badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/40',
    url: 'https://youtu.be/3yr5uNkxA_8',
  },
  {
    id: 'J5FXI2AnQxE',
    title: 'Abhinaya Introduction & Perkembangan KRTMI 2019 - 2023',
    subtitle: 'Technology Retrospective & Historical Overview • KRTMI',
    description: 'Dokumentasi perjalanan inovasi dan evolusi robot tematik Abhinaya UNY dari masa perintisan 2019 (pertanian), 2020 (disinfeksi COVID-19), 2021 (layanan medis), 2022 (limbah B3), hingga 2023 (digital twin).',
    badge: 'PERKEMBANGAN 2019-2023',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    url: 'https://youtu.be/J5FXI2AnQxE',
  },
  {
    id: 'LyP9M_uTvMk',
    title: 'ABHINAYA - UNY TEMATIK TEAM - OPREC',
    subtitle: 'Open Recruitment & Kaderisasi Anggota Baru Robotika UNY',
    description: 'Video profil ajakan bergabung bersama Tim Robotika Abhinaya UNY untuk mahasiswa baru dan calon periset mekatronika UKM Rekayasa Teknologi UNY.',
    badge: 'OPEN RECRUITMENT',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    url: 'https://www.youtube.com/watch?v=LyP9M_uTvMk',
  },
];

const SHORTS_VIDEOS = [
  {
    id: 'wLusNVfFFHA',
    title: 'Abhinaya Recap 2023 | KRTMI (Kontes Robot Tematik Indonesia)',
    subtitle: 'Shorts Kilas Balik Kompetisi KRTMI di USM Semarang',
    badgeName: 'Recap 2023',
    url: 'https://www.youtube.com/shorts/wLusNVfFFHA',
  },
  {
    id: 'tcsBS-6qgCs',
    title: '#MulaiBikinRobot #Tinkercad #Wokwi',
    subtitle: 'Simulasi Sirkuit & Pemrograman Mikrokontroler Robotika',
    badgeName: 'Simulasi & Riset',
    url: 'https://www.youtube.com/shorts/tcsBS-6qgCs',
  },
  {
    id: 'vjxbL5MB4-4',
    title: 'Fabrikasi 3D Print Komponen Robot Abhinaya KRI 2025',
    subtitle: 'Proses Manufaktur & Cetak 3D Sparepart Mekanik',
    badgeName: '3D Print Mekanik',
    url: 'https://www.youtube.com/shorts/vjxbL5MB4-4',
  },
  {
    id: 'epyl7w6xZ6Y',
    title: 'Behind The Code: Programming Robotika di VS Code',
    subtitle: 'Coding Logika Manuver & Sensor Arena Pertandingan',
    badgeName: 'Programming Lab',
    url: 'https://www.youtube.com/shorts/epyl7w6xZ6Y',
  },
];

export default function PertandinganPage() {
  const [selectedMatchVideoId, setSelectedMatchVideoId] = useState('PmxwdrhpxKg');
  const [selectedShortsId, setSelectedShortsId] = useState('wLusNVfFFHA');
  const [isPlayingMain, setIsPlayingMain] = useState(false);
  const [isPlayingShorts, setIsPlayingShorts] = useState(false);

  const activeMainVideo = MATCH_VIDEOS.find((v) => v.id === selectedMatchVideoId) || MATCH_VIDEOS[0];
  const activeShortsVideo = SHORTS_VIDEOS.find((v) => v.id === selectedShortsId) || SHORTS_VIDEOS[0];

  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 relative overflow-hidden py-8 sm:py-12 md:py-16">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Page Breadcrumb & Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-orange-400 transition">HOME</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-bold">MATCH &amp; LAGA ARENA</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20 shadow-md">
            <Trophy className="w-4 h-4 fill-orange-400" />
            <span>OFFICIAL MATCH &amp; ARENA COMPETITION SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Laga &amp; Pertandingan Robot <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-teal-300 to-amber-300">Abhinaya UNY</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Saksikan rekaman video resmi pertandingan dan laga robot otonom Tim Abhinaya UNY pada Kontes Robot Tematik Indonesia (KRTMI) tingkat Nasional di Universitas Muhammadiyah Surakarta (UMS). Analisis strategi manuver, akurasi visi AI YOLO, dan alur klasifikasi sampah pintar di arena kompetisi.
          </p>
        </div>

        {/* Video Selector Sub-Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 rounded-2xl bg-[#121216] border border-white/[0.08] shadow-lg">
          {MATCH_VIDEOS.map((v) => {
            const isSelected = v.id === selectedMatchVideoId;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedMatchVideoId(v.id);
                  setIsPlayingMain(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Youtube className={`w-4 h-4 ${isSelected ? 'fill-white' : 'fill-red-500'}`} />
                <span>{v.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Main Match Video Stage */}
        <div className="p-4 sm:p-7 rounded-3xl bg-[#121216] border border-white/[0.08] shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div className="space-y-1">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border inline-flex items-center space-x-1.5 ${activeMainVideo.badgeColor}`}>
                <Youtube className="w-3.5 h-3.5 fill-current" />
                <span>{activeMainVideo.badge} • {activeMainVideo.subtitle}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeMainVideo.title}
              </h2>
            </div>

            <a
              href={activeMainVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-2 transition shadow-md"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Buka di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 16:9 Video Player Box */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
            {isPlayingMain ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeMainVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={activeMainVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => setIsPlayingMain(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${activeMainVideo.id}/maxresdefault.jpg`}
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault is missing
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${activeMainVideo.id}/hqdefault.jpg`;
                  }}
                  alt={activeMainVideo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                />
                
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Glowing Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-orange p-1 shadow-[0_0_40px_rgba(255,107,0,0.7)] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#0B0B0E] flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-10 h-10 text-brand-orange fill-brand-orange ml-1" />
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 text-white space-y-1">
                  <span className="px-2.5 py-1 rounded-md bg-brand-orange text-black text-xs font-mono font-bold">
                    FULL MATCH FOOTAGE
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white drop-shadow">
                    Klik untuk memutar video pertandingan langsung di halaman ini
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Match Tech Telemetry Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <SpotlightCard
              spotlightColor="rgba(255, 107, 0, 0.15)"
              spotlightSize={200}
              className="p-3.5 rounded-2xl bg-[#18181B] border border-white/[0.06] text-xs space-y-1"
            >
              <span className="text-slate-400 font-mono text-[11px] block">Sistem Kendali</span>
              <span className="font-bold text-orange-400 text-sm sm:text-base flex items-baseline">
                <CountUp to={100} duration={1.5} />% Otonom
              </span>
              <span className="text-[10px] text-slate-400 block">AI Vision + Odometry</span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(255, 107, 0, 0.15)"
              spotlightSize={200}
              className="p-3.5 rounded-2xl bg-[#18181B] border border-white/[0.06] text-xs space-y-1"
            >
              <span className="text-slate-400 font-mono text-[11px] block">Kecepatan Sasis</span>
              <span className="font-bold text-orange-400 text-sm sm:text-base flex items-baseline">
                <CountUp to={1.4} decimals={1} decimal="." duration={1.5} />&nbsp;m/s Max
              </span>
              <span className="text-[10px] text-slate-400 block">4WD Mecanum Holonomic</span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(255, 107, 0, 0.15)"
              spotlightSize={200}
              className="p-3.5 rounded-2xl bg-[#18181B] border border-white/[0.06] text-xs space-y-1"
            >
              <span className="text-slate-400 font-mono text-[11px] block">Waktu Siklus Sortir</span>
              <span className="font-bold text-orange-400 text-sm sm:text-base flex items-baseline">
                &lt;&nbsp;<CountUp to={12} duration={1.5} />&nbsp;Detik
              </span>
              <span className="text-[10px] text-slate-400 block">Pick &amp; Smart Docking</span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(255, 107, 0, 0.15)"
              spotlightSize={200}
              className="p-3.5 rounded-2xl bg-[#18181B] border border-white/[0.06] text-xs space-y-1"
            >
              <span className="text-slate-400 font-mono text-[11px] block">Akurasi Deteksi AI</span>
              <span className="font-bold text-cyan-400 text-sm sm:text-base flex items-baseline">
                <CountUp to={98.4} decimals={1} decimal="." duration={1.5} />% Precision
              </span>
              <span className="text-[10px] text-slate-400 block">YOLOv8 Edge Compute</span>
            </SpotlightCard>
          </div>

        </div>

        {/* 4-Stage Autonomous Match Strategy Flow */}
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Alur Misi Otonom Robot di Karpet Arena
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Tahapan eksekusi program robot Abhinaya dari garis start hingga penyelesaian seluruh tugas klasifikasi sampah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-3 relative group hover:border-orange-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-mono font-bold text-sm border border-orange-500/20">
                01
              </div>
              <h4 className="text-base font-bold text-white">Start &amp; Lokalisasi</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Robot menerima sinyal start juri, kamera AI aktif memindai marker arena, dan sistem odometri mengunci koordinat awal robot.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-3 relative group hover:border-orange-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-300 flex items-center justify-center font-mono font-bold text-sm border border-orange-500/20">
                02
              </div>
              <h4 className="text-base font-bold text-white">Deteksi &amp; Tracking Objek</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algoritma visi komputer YOLO mendeteksi posisi botol &amp; kaleng secara real-time, mengarahkan sasis mecanum tepat di depan target.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-3 relative group hover:border-orange-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-300 flex items-center justify-center font-mono font-bold text-sm border border-orange-500/20">
                03
              </div>
              <h4 className="text-base font-bold text-white">Gripping 2-Stage &amp; Angkut</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mekanisme capit 2-tingkat mengunci objek sampah dengan presisi tanpa slip, mengangkatnya ke kompartemen aman sebelum bermanuver.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] space-y-3 relative group hover:border-orange-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-300 flex items-center justify-center font-mono font-bold text-sm border border-orange-500/20">
                04
              </div>
              <h4 className="text-base font-bold text-white">Docking Keranjang Cerdas</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Robot melakukan docking presisi ke keranjang pemilah digital sesuai kategori sampah, mencatatkan poin sempurna tanpa sentuhan manual.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Columns: Match History Log & Behind-the-Scenes Shorts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Match History Table / Cards (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
                <span>Catatan Hasil Pertandingan KRTMI 2024</span>
              </h3>
              <p className="text-xs text-slate-400">
                Rekapitulasi babak pertandingan dan performa robot Abhinaya di kejuaraan nasional.
              </p>
            </div>

            <div className="space-y-4">
              {MATCH_HISTORY.map((match) => (
                <div
                  key={match.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#121216] border border-white/[0.08] hover:border-orange-500/40 transition space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-orange-400">
                        KONTES ROBOT TEMATIK INDONESIA
                      </span>
                      <h4 className="text-base font-bold text-white">{match.roundName}</h4>
                      <p className="text-xs text-slate-400">Lawan: {match.opponent}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-400 font-mono">
                          {match.scoreAbhinaya} - {match.scoreOpponent}
                        </div>
                        <span className="text-[9px] uppercase font-mono font-bold text-amber-400">
                          {match.status === 'WIN' ? 'MENANG' : 'LOLOS FINAL'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {match.summary}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Highlight Teknis:
                    </span>
                    <div className="space-y-1">
                      {match.keyHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paddock & Speed Test Shorts (1 Col) */}
          <div className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-red-500" />
                <span>Shorts &amp; Aksi Vertikal</span>
              </h3>
              <p className="text-xs text-slate-300">
                Speed test manuver dan behind the scenes di arena.
              </p>
            </div>

            {/* Shorts Sub-Selector Pills */}
            <div className="grid grid-cols-2 gap-2">
              {SHORTS_VIDEOS.map((s) => {
                const isSelected = s.id === selectedShortsId;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedShortsId(s.id);
                      setIsPlayingShorts(false);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all cursor-pointer text-center truncate ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-md font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s.badgeName}
                  </button>
                );
              })}
            </div>

            <div className="p-4 sm:p-5 rounded-3xl bg-[#121216] border border-white/[0.08] shadow-xl space-y-4">
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 group">
                {isPlayingShorts ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeShortsVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeShortsVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setIsPlayingShorts(true)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${activeShortsVideo.id}/hqdefault.jpg`}
                      alt={activeShortsVideo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 p-1 shadow-[0_0_30px_rgba(220,38,38,0.8)] group-hover:scale-110 transition flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold uppercase">
                        SHORTS (9:16)
                      </span>
                      <p className="text-xs font-bold text-slate-200">
                        {activeShortsVideo.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href={activeShortsVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-red-600/80 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center space-x-2 border border-white/10 hover:border-red-500/50 transition"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Buka Shorts di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Navigation Quick Links Footer Strip */}
        <div className="p-6 rounded-3xl bg-[#121216] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">Ingin Mempelajari Data Teknis &amp; Arsip Panduan Lomba?</h4>
            <p className="text-xs text-slate-300">
              Akses dokumentasi buku pedoman KRTMI 2019–2026, bedah aturan arena, atau profil seluruh divisi tim.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/krtmi"
              className="px-4 py-2.5 rounded-xl bg-orange-400 hover:bg-orange-300 text-black font-bold text-xs flex items-center space-x-1.5 shadow-lg transition"
            >
              <span>Arsip KRTMI (2019-2026)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/divisi"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition"
            >
              <span>Struktur 4 Divisi</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
