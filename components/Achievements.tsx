'use client';

import React from 'react';
import { Trophy, Award, Medal, Star, ShieldCheck, ExternalLink, Newspaper, CheckCircle2 } from 'lucide-react';

export const Achievements: React.FC = () => {
  const awards = [
    {
      year: '2024',
      title: 'Juara 1 Tingkat Wilayah (Wilayah I)',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) Seleksi Wilayah I 2024',
      organizer: 'Balai Pengembangan Talenta Indonesia (BPTI) Puspresnas Kemendikbudristek',
      badge: '🥇 JUARA 1 WILAYAH I',
      color: 'from-amber-400 to-yellow-600',
      pressHeadline: 'Abhinaya Raih Juara 1 di Kontes Robot Tematik Indonesia Wilayah I Tahun 2024',
      pressUrl: 'http://www.uny.ac.id/index.php/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024',
      quote: 'Tim Robotika Abhinaya Universitas Negeri Yogyakarta berhasil meraih peringkat pertama pada seleksi Wilayah I KRTMI 2024 dan mengamankan tiket menuju putaran final nasional.',
    },
    {
      year: '2024',
      title: 'Juara 2 Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) Tingkat Nasional 2024',
      organizer: 'BPTI Puspresnas Kemendikbudristek & Universitas Muhammadiyah Surakarta (UMS)',
      badge: '🥈 JUARA 2 NASIONAL',
      color: 'from-slate-200 to-slate-400',
      pressHeadline: 'Abhinaya Meraih Juara 2 Nasional di Kompetisi KRI Divisi KRTMI 2024',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024',
      quote: 'Abhinaya UNY sukses mengukir prestasi gemilang dengan meraih Juara 2 Nasional di Edutorium UMS melalui inovasi robot pemilah sampah otonom berbasis kecerdasan buatan.',
    },
    {
      year: '2023',
      title: 'Juara 3 Tingkat Wilayah & Finalis Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2023',
      organizer: 'BPTI Puspresnas Kemendikbudristek & Universitas Semarang (USM)',
      badge: '🥉 JUARA 3 WILAYAH',
      color: 'from-amber-600 to-orange-700',
      pressHeadline: 'Inovasi Robot Tematik Digital Twin Abhinaya UNY di USM Semarang',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita',
      quote: 'Keberhasilan menembus babak finalis nasional KRTMI 2023 dengan implementasi sistem gerak omnidirectional Kiwi drive 3 roda.',
    },
    {
      year: '2022',
      title: 'Finalis Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) 2022',
      organizer: 'BPTI Puspresnas Kemendikbudristek & Institut Teknologi Sepuluh Nopember (ITS)',
      badge: '🏅 FINALIS NASIONAL',
      color: 'from-blue-400 to-cyan-600',
      pressHeadline: 'Partisipasi Abhinaya UNY dalam KRI Nasional di Kampus ITS Surabaya',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita',
      quote: 'Pengembangan robot otonom cyber-physical digital twin dengan batasan kecepatan gerak 40 cm/s dan kamuflase chromakey hijau.',
    },
    {
      year: '2021',
      title: 'Finalis Daring Tingkat Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) Daring 2021',
      organizer: 'Puspresnas Kemdikbudristek & Universitas Gadjah Mada (UGM)',
      badge: '🏅 FINALIS NASIONAL',
      color: 'from-cyan-400 to-blue-600',
      pressHeadline: 'Abhinaya UNY Bertanding di Ajang KRI Daring Nasional UGM',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita',
      quote: 'Implementasi teleoperasi low-latency WebRTC dan papan permainan digital twin di masa pembatasan fisik pandemi.',
    },
    {
      year: '2020',
      title: 'Peserta & Finalis Daring Nasional',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) Daring 2020',
      organizer: 'Puspresnas Kemdikbud & Institut Teknologi Bandung (ITB)',
      badge: '🎖️ FINALIS NASIONAL',
      color: 'from-purple-400 to-indigo-600',
      pressHeadline: 'Adaptasi Robotika UNY dalam Kompetisi Daring Perdana KRI 2020',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita',
      quote: 'Adaptasi sistem kendali teleoperasi daring dengan live streaming dual kamera juri pada simulasi disinfeksi dan pertanian.',
    },
    {
      year: '2019',
      title: 'Juara 2 Tingkat Nasional (Edisi Perdana)',
      event: 'Kontes Robot Tematik Indonesia (KRTMI) Nasional 2019',
      organizer: 'Direktorat Jenderal Belmawa Kemenristekdikti & UDINUS Semarang',
      badge: '🥈 JUARA 2 NASIONAL',
      color: 'from-yellow-400 to-amber-600',
      pressHeadline: 'Juara II Divisi KRTMI dalam Laporan Pelaksanaan Program UNY 2019 (Hal. 41)',
      pressUrl: 'https://www.uny.ac.id/index.php/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia',
      quote: 'Juara II Divisi Kontes Robot Tematik Indonesia (KRTMI) Tingkat Nasional Tahun 2019 di Universitas Dian Nuswantoro Semarang (Laporan Pelaksanaan Program UNY 2019).',
    },
    {
      year: '2026',
      title: 'Peserta Tingkat Nasional Transporter',
      event: 'Technocorner 2026 Transporter Robot Competition',
      organizer: 'Departemen Teknik Elektro & TI FT Universitas Gadjah Mada',
      badge: '🤖 NASIONAL FT UGM',
      color: 'from-red-400 to-pink-600',
      pressHeadline: 'Abhinaya UNY Transporter Challenge di Technocorner 2026 UGM',
      pressUrl: 'https://ugm.ac.id',
      quote: 'Uji ketangkasan pemindahan muatan berkecepatan tinggi dengan sasis 4WD Mecanum dan gripper presisi dual lead-screw.',
    },
  ];

  return (
    <section className="py-16 bg-[#070C16] border-t border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-black uppercase tracking-wider border border-brand-gold/30 font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>KABINET PENGHARGAAN &amp; PRESS RELEASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Papan Kejuaraan &amp; Jejak Prestasi Nasional
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Rekam jejak dedikasi riset dan kejuaraan robotika mahasiswa Universitas Negeri Yogyakarta pada kancah nasional berdasarkan rilis berita resmi dan laporan institusional.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#090F1B] border-2 border-slate-800 hover:border-brand-cyan/60 transition duration-300 space-y-4 relative overflow-hidden group shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1 rounded-xl bg-slate-900 text-brand-cyan border border-slate-700 font-mono">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-black text-white px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700 font-mono">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white group-hover:text-brand-cyan transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-cyan font-semibold font-mono">
                    {item.event}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.organizer}
                  </p>
                </div>

                {/* Press Quote */}
                <div className="p-3 rounded-xl bg-[#050811] border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase">
                    <Newspaper className="w-3 h-3 text-brand-cyan" />
                    <span>Kutipan Resmi Berita:</span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Puspresnas / UNY</span>
                </div>
                <a
                  href={item.pressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-cyan hover:underline flex items-center space-x-1 font-mono font-bold"
                >
                  <span>Lihat Rilis Berita</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Data Integrity Attestation */}
        <div className="p-6 rounded-3xl bg-[#050811] border border-brand-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-black text-sm">
                100% ATTESTASI INTEGRITAS DATA TIM ROBOTIKA
              </div>
              <div className="text-slate-400 text-[11px]">
                Seluruh data prestasi dan riset mewakili entitas resmi Tim Robotika Abhinaya UNY (Mekanik, Elektronika, Pemrograman).
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 font-bold whitespace-nowrap">
            OFFICIAL TEAM VERIFIED
          </span>
        </div>

      </div>
    </section>
  );
};
