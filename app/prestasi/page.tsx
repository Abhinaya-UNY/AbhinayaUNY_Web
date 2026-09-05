import React from 'react';
import { Achievements } from '@/components/Achievements';
import { Trophy, Award, ShieldCheck, ExternalLink, Newspaper, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Kabinet Prestasi & Berita Resmi — Abhinaya UNY Robotics',
  description: 'Rekam jejak kejuaraan nasional KRTMI Puspresnas BPTI Kemendikbudristek, Technocorner DTETI FT UGM 2026, UNLIMITED UNDIP 2026, dan rilis pers resmi Universitas Negeri Yogyakarta untuk Tim Robotika Abhinaya UNY.',
};

export default function PrestasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-black uppercase tracking-wider border border-brand-gold/30 font-mono">
          <Trophy className="w-4 h-4" />
          <span>REKOR KEJUARAAN NASIONAL RESMI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Kabinet Juara &amp; Publikasi Prestasi UNY
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dokumentasi kejuaraan resmi divisi Kontes Robot Tematik Indonesia (KRTMI) Puspresnas BPTI Kemendikbudristek RI, Technocorner DTETI FT UGM 2026, dan UNLIMITED Robotics Competition UNDIP 2026.
        </p>
      </div>

      <Achievements />

      {/* Official Press Releases Reference Links */}
      <div className="p-8 rounded-3xl bg-[#0B0B0E] border border-white/10 space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/5 pb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Daftar Tautan Rilis Pers Humas UNY &amp; BPTI
            </h3>
            <p className="text-xs text-slate-400">
              Verifikasi keaslian berita publikasi institusional:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <a
            href="http://www.uny.ac.id/index.php/id/berita/abhinaya-raih-juara-1-di-konteks-robot-tematik-indonesia-wilayah-i-tahun-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0E0E12] border border-white/8 hover:border-white/20 transition space-y-2 group"
          >
            <div className="flex items-center justify-between text-brand-gold">
              <span>UNY News 2024</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition" />
            </div>
            <div className="font-bold text-white group-hover:text-brand-cyan transition line-clamp-2">
              Abhinaya Raih Juara 1 di KRTMI Wilayah I 2024
            </div>
            <p className="text-[10px] text-slate-400">Penyelenggara: BPTI Kemendikbudristek</p>
          </a>

          <a
            href="https://www.uny.ac.id/index.php/id/berita/abhinaya-meraih-juara-2-nasional-di-kompetisi-kri-divisi-krtmi-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0E0E12] border border-white/8 hover:border-white/20 transition space-y-2 group"
          >
            <div className="flex items-center justify-between text-brand-cyan">
              <span>UNY News 2024</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition" />
            </div>
            <div className="font-bold text-white group-hover:text-brand-cyan transition line-clamp-2">
              Abhinaya Meraih Juara 2 Nasional KRTMI 2024
            </div>
            <p className="text-[10px] text-slate-400">Edutorium Universitas Muhammadiyah Surakarta</p>
          </a>

          <a
            href="https://www.uny.ac.id/index.php/id/berita/robot-abhinaya-uny-sabet-juara-pertama-kontes-robot-tematik-indonesia"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0E0E12] border border-white/8 hover:border-brand-orange/40 transition space-y-2 group"
          >
            <div className="flex items-center justify-between text-brand-orange">
              <span>UNY News Archive</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition" />
            </div>
            <div className="font-bold text-white group-hover:text-brand-orange transition line-clamp-2">
              Robot Abhinaya UNY Sabet Prestasi Tematik
            </div>
            <p className="text-[10px] text-slate-400">Arsip Riset &amp; Publikasi Robotika UNY</p>
          </a>
        </div>
      </div>

    </div>
  );
}
