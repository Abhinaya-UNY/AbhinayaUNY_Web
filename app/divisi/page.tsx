import React from 'react';
import { TEAM_DIVISIONS } from '@/data/krtmiData';
import { TeamRosterSection } from '@/components/TeamRosterSection';
import { InstagramFeedShowcase } from '@/components/InstagramFeedShowcase';
import { Users, Wrench, Zap, Code, Sparkles, Heart, CheckCircle2, Trophy, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Divisi Tim & Roster Anggota — Tim Robotika Abhinaya UNY',
  description: 'Mengenal divisi-divisi di Tim Abhinaya UNY (Mekanik, Elektrik, Programming & AI, Manajerial) di bawah naungan UKM Rekayasa Teknologi UNY dan susunan resmi anggota kontingen KRI.',
};

export default function DivisiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
          <Users className="w-4 h-4" />
          <span>DIVISI &amp; KULTUR RISET TIM • UKM REKAYASA TEKNOLOGI UNY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Struktur Divisi &amp; Roster Anggota
        </h1>
        <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
          Tim Abhinaya adalah divisi riset robotika di bawah naungan <strong>UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta</strong> — wadah kolaboratif tingkat universitas bagi mahasiswa lintas fakultas untuk belajar, bereksperimen, dan berprestasi bersama di ajang Kontes Robot Indonesia (KRI) Puspresnas BPTI.
        </p>
      </div>

      {/* 4 Divisions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {TEAM_DIVISIONS.map((div) => (
          <div
            key={div.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-5 hover:border-brand-orange/40 transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center border border-brand-orange/20 flex-shrink-0">
                {div.id === 'mekanik' && <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />}
                {div.id === 'elektrik' && <Zap className="w-6 h-6 sm:w-7 sm:h-7" />}
                {div.id === 'programming' && <Code className="w-6 h-6 sm:w-7 sm:h-7" />}
                {div.id === 'manajerial' && <Users className="w-6 h-6 sm:w-7 sm:h-7" />}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {div.name}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  Divisi Tim Abhinaya • UKM Restek UNY
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {div.desc}
            </p>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-xs font-mono uppercase text-brand-orange tracking-wider block">
                Fokus Keahlian &amp; Praktik:
              </span>
              <div className="flex flex-wrap gap-2">
                {div.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-mono border border-white/10 flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Official Instagram Media Feed */}
      <InstagramFeedShowcase />

      {/* Interactive Team Roster Showcase */}
      <div className="border-t border-white/5 pt-12">
        <TeamRosterSection showHeader={true} showAllLink={false} />
      </div>

      {/* Freshmen FAQ & Welcome Section */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-brand-orange">
            <Sparkles className="w-4 h-4" />
            <span>PANDUAN UNTUK MAHASISWA BARU (MABA)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Pertanyaan yang Sering Ditanyakan Mahasiswa Baru
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 text-xs sm:text-sm text-slate-300">
          <div className="p-5 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Apakah harus jago koding atau elektro dulu sebelum gabung?
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>Sama sekali tidak!</strong> Sebagian besar anggota kami memulai tanpa pengalaman robotika sebelumnya. Di UKM Restek UNY, kami menyediakan kurikulum pelatihan bertahap—mulai dari dasar logika pemrograman mikrokontroler, pengenalan sirkuit elektronika, hingga dasar mekanik 3D CAD.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Jurusan apa saja yang bisa bergabung?
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>Terbuka untuk seluruh mahasiswa UNY dari semua fakultas dan jurusan!</strong> Karena berada di bawah naungan UKM Rekayasa Teknologi (UKM umum tingkat universitas), anggota Abhinaya berasal dari berbagai jurusan (FT, FMIPA, FV, FIKK, FEB, dll.) baik program diploma maupun sarjana.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Apa saja keuntungan bergabung dengan Abhinaya?
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Pengalaman riset hands-on di kompetisi bergengsi Kemendikbudristek, akses lengkap ke mesin dan fasilitas workshop lab robotika UNY, konversi prestasi ke SKS perkuliahan (Ekuivalensi/Rekognisi Pembelajaran Lampau), serta portofolio rekayasa yang sangat diminati industri manufaktur dan teknologi.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/3 border border-white/5 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Di mana lokasi lab dan basecamp Tim Abhinaya?
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs">
              Laboratorium &amp; Workshop Robotika UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta, Kampus Karangmalang, Sleman, D.I. Yogyakarta.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
