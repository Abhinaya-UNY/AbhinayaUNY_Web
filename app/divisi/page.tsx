import React from 'react';
import { TEAM_DIVISIONS } from '@/data/krtmiData';
import { Users, Wrench, Zap, Code, Sparkles, Heart, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Divisi Tim & Kultur — Tim Robotika Abhinaya UNY',
  description: 'Mengenal divisi-divisi di Tim Abhinaya UNY (Mekanik, Elektrik, Pemrograman, Manajerial) dan kultur belajar bersama di lab robotika.',
};

export default function DivisiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
          <Users className="w-4 h-4" />
          <span>DIVISI &amp; KULTUR RISET TIM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Divisi Tim Robotika Abhinaya UNY 🛠️
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Tim Abhinaya adalah wadah kolaboratif mahasiswa Universitas Negeri Yogyakarta untuk belajar, berkarya, dan berprestasi bersama. Temukan divisi yang sesuai dengan minat dan kemampuanmu!
        </p>
      </div>

      {/* 4 Divisions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TEAM_DIVISIONS.map((div) => (
          <div
            key={div.id}
            className="p-8 rounded-3xl bg-[#140E09] border-2 border-brand-orange/30 shadow-xl space-y-5"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 flex-shrink-0">
                {div.id === 'mekanik' && <Wrench className="w-7 h-7" />}
                {div.id === 'elektrik' && <Zap className="w-7 h-7" />}
                {div.id === 'programming' && <Code className="w-7 h-7" />}
                {div.id === 'manajerial' && <Users className="w-7 h-7" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  {div.name}
                </h2>
                <span className="text-xs text-amber-200/70 font-semibold uppercase">
                  Divisi Tim Abhinaya
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {div.desc}
            </p>

            <div className="pt-2 border-t border-[#26180E] space-y-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider block">
                Fokus Keahlian &amp; Praktik:
              </span>
              <div className="flex flex-wrap gap-2">
                {div.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#20150D] text-amber-200 text-xs font-semibold border border-brand-orange/30 flex items-center space-x-1.5"
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

      {/* Freshmen FAQ & Welcome Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0A06] border-2 border-brand-orange/40 space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-brand-orange">
            <Sparkles className="w-4 h-4" />
            <span>PANDUAN UNTUK MAHASISWA BARU (MABA)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Pertanyaan yang Sering Ditanyakan Mahasiswa Baru 💡
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm text-slate-300">
          <div className="p-5 rounded-2xl bg-[#171008] border border-[#2B1B10] space-y-2">
            <h3 className="font-black text-white text-sm">
              ❓ Apakah harus jago koding atau elektro dulu sebelum gabung?
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              <strong>Sama sekali tidak!</strong> Tim Abhinaya membuka pintu selebar-lebarnya untuk mahasiswa yang punya niat belajar tinggi. Semua keterampilan dari dasar akan dibimbing bersama di lab.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#171008] border border-[#2B1B10] space-y-2">
            <h3 className="font-black text-white text-sm">
              ❓ Jurusan apa saja yang bisa bergabung?
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Semua mahasiswa Fakultas Teknik (Pendidikan Teknik Mekatronika, Pendidikan Teknik Elektro, Teknik Mesin, Teknik Elektronika, Teknik Otomotif, Informatika, dll.) maupun jurusan lain di UNY yang berminat di bidang robotika dan manajerial.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#171008] border border-[#2B1B10] space-y-2">
            <h3 className="font-black text-white text-sm">
              ❓ Apa saja keuntungan bergabung dengan Abhinaya?
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Pengalaman langsung riset robotika tingkat nasional, akses fasilitas workshop, relasi luas, sertifikat kejuaraan resmi Puspresnas yang bisa dikonversi SKS kuliah (*Ekuivalensi/RPL*), serta bimbingan karir di industri teknologi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#171008] border border-[#2B1B10] space-y-2">
            <h3 className="font-black text-white text-sm">
              ❓ Di mana lokasi lab dan basecamp Tim Abhinaya?
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Workshop Robotika Fakultas Teknik Universitas Negeri Yogyakarta, Kampus Karangmalang, Yogyakarta.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
