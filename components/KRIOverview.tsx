import React from 'react';
import { Bot, Flame, Compass, Sparkles, Trophy, HelpCircle } from 'lucide-react';

export const KRIOverview: React.FC = () => {
  const divisions = [
    {
      code: 'KRTMI',
      name: 'Kontes Robot Tematik Indonesia',
      desc: 'Divisi kebanggaan Tim Abhinaya UNY! Misinya selalu berganti setiap tahun sesuai masalah nyata di dunia (pertanian, penanganan pandemi, pemilahan limbah/sampah). Robot harus pintar, otonom, dan bekerja sama.',
      isAbhinaya: true,
    },
    {
      code: 'KRAI',
      name: 'Kontes Robot ABU Indonesia',
      desc: 'Kompetisi internasional ABU Robocon dengan tema permainan dan mekanisme melempar/menangkap objek di arena.',
      isAbhinaya: false,
    },
    {
      code: 'KRSTI',
      name: 'Kontes Robot Seni Tari Indonesia',
      desc: 'Dua robot humanoid berkaki dua yang menari secara serentak dan luwes mengikuti irama musik tari daerah nusantara.',
      isAbhinaya: false,
    },
    {
      code: 'KRSBI-B',
      name: 'Robot Sepak Bola Beroda',
      desc: 'Pertandingan sepak bola otonom 3 lawan 3 menggunakan robot beroda dengan kamera omni dan strategi menyerang/bertahan otomatis.',
      isAbhinaya: false,
    },
    {
      code: 'KRSBI-H',
      name: 'Robot Sepak Bola Humanoid',
      desc: 'Robot berbentuk manusia berkaki dua yang menggiring bola dan menendang ke gawang seperti pesepak bola profesional.',
      isAbhinaya: false,
    },
    {
      code: 'KRSRI',
      name: 'Kontes Robot SAR Indonesia',
      desc: 'Robot penyelamat berkaki banyak (seperti laba-laba/serangga) yang menembus rintangan terjal dan memadamkan titik api.',
      isAbhinaya: false,
    },
  ];

  return (
    <section className="py-16 bg-[#0B0805] border-y border-[#26180E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>PANDUAN LOMBA UNTUK MAHASISWA &amp; MABA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight ">
            Apa Itu Kontes Robot Indonesia (KRI)? 🤖
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            KRI adalah olimpiade robotika mahasiswa tingkat nasional resmi dari Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek. Terdiri dari 6 divisi bergengsi di mana UNY selalu aktif mengirimkan tim-tim terbaiknya!
          </p>
        </div>

        {/* Division Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {divisions.map((div) => (
            <div
              key={div.code}
              className={`p-6 rounded-3xl space-y-3 transition border ${
                div.isAbhinaya
                  ? 'bg-gradient-to-b from-[#241508] to-[#140D07] border-brand-orange shadow-[0_0_35px_rgba(255,107,0,0.25)] ring-1 ring-brand-orange'
                  : 'bg-[#120D08] border-[#2B1B10] hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-black font-mono px-3 py-1 rounded-xl ${
                  div.isAbhinaya ? 'bg-brand-orange text-black' : 'bg-[#22160E] text-amber-200'
                }`}>
                  {div.code}
                </span>
                {div.isAbhinaya && (
                  <span className="text-[10px] font-black uppercase text-brand-orange tracking-wider flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                    <span>Divisi Tim Abhinaya</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-white">
                {div.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {div.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};