import React from 'react';
import { Bot, Wrench, Zap, Code, Users, Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TEAM_DIVISIONS } from '@/data/krtmiData';

export const AboutTeamSection: React.FC = () => {
  return (
    <section id="divisi-tim" className="py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
            <Users className="w-3.5 h-3.5" />
            <span>MENGENAL KELUARGA ABHINAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Bagaimana Kami Berkolaborasi di Lab Robotika? 🛠️
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Membangun robot juara tidak dikerjakan sendirian. Tim Abhinaya terdiri dari 4 divisi utama yang saling melengkapi, tempat mahasiswa belajar dari nol hingga mahir membuat robot.
          </p>
        </div>

        {/* 4 Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_DIVISIONS.map((div) => (
            <div
              key={div.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#140E09] border border-[#2B1B10] hover:border-brand-orange/60 transition space-y-4 shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 group-hover:scale-110 transition flex-shrink-0">
                  {div.id === 'mekanik' && <Wrench className="w-6 h-6" />}
                  {div.id === 'elektrik' && <Zap className="w-6 h-6" />}
                  {div.id === 'programming' && <Code className="w-6 h-6" />}
                  {div.id === 'manajerial' && <Users className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-brand-orange transition">
                    {div.name}
                  </h3>
                  <span className="text-[10px] text-amber-200/60 font-semibold uppercase tracking-wider">
                    Divisi Resmi Tim Abhinaya
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {div.desc}
              </p>

              <div className="pt-2 border-t border-[#26180E] space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Hal Seru yang Dipelajari:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {div.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#20150D] text-amber-200 text-[11px] font-semibold border border-brand-orange/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Culture Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1F1206] via-[#150D06] to-[#0A0704] border-2 border-brand-orange/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1 text-xs font-black uppercase text-brand-orange">
              <Sparkles className="w-4 h-4" />
              <span>Kultur Belajar Terbuka</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Belum Punya Pengalaman Robotika? Tenang, Semua Diajari dari Nol!
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Di Abhinaya UNY, kami mengutamakan rasa ingin tahu, kemauan belajar, dan kekompakan tim. Dari desain baut pertama sampai robot bergerak sendiri, semua proses dipelajari bersama kakak-kakak tingkat yang suportif.
            </p>
          </div>
          <Link
            href="/divisi"
            className="px-6 py-3.5 rounded-xl bg-brand-orange text-black font-black text-xs hover:bg-amber-400 transition whitespace-nowrap flex items-center space-x-2 flex-shrink-0"
          >
            <span>Kenali Lebih Dekat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
