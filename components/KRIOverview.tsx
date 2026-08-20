import React from 'react';
import { Bot, Flame, ShieldCheck, Cpu, Compass, Layers, CheckCircle } from 'lucide-react';

export const KRIOverview: React.FC = () => {
  const divisions = [
    {
      code: 'KRTMI',
      name: 'Kontes Robot Tematik Indonesia',
      desc: 'Divisi khusus berfokus pada pemecahan persoalan nyata nasional (pertanian, medis, lingkungan hidup, kebencanaan) menggunakan robotika otonom, visi komputer, dan sistem kolaboratif.',
      highlight: true,
    },
    {
      code: 'KRAI',
      name: 'Kontes Robot ABU Indonesia',
      desc: 'Kompetisi bertaraf internasional ABU Robocon dengan tema permainan dan mekanisme lempar/tangkap yang berganti setiap tahun.',
      highlight: false,
    },
    {
      code: 'KRSTI',
      name: 'Kontes Robot Seni Tari Indonesia',
      desc: 'Robot humanoid otonom berkaki dua yang menari secara serentak mengikuti irama musik tradisional nusantara.',
      highlight: false,
    },
    {
      code: 'KRSBI-B',
      name: 'Kontes Robot Sepak Bola Beroda',
      desc: 'Pertandingan sepak bola robot otonom beroda menggunakan visi kamera omnidirectional dan strategi kecerdasan buatan multi-agen.',
      highlight: false,
    },
    {
      code: 'KRSBI-H',
      name: 'Kontes Robot Sepak Bola Humanoid',
      desc: 'Pertandingan sepak bola robot humanoid bipedal dengan pengenalan bola dan kestabilan berjalan dinamis.',
      highlight: false,
    },
    {
      code: 'KRSRI',
      name: 'Kontes Robot SAR Indonesia',
      desc: 'Robot berkaki penyelamat korban bencana yang menavigasi labirin rintangan terjal dan memadamkan api.',
      highlight: false,
    },
  ];

  return (
    <section className="py-16 bg-[#050811] border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-blue/15 text-sky-400 text-xs font-black uppercase tracking-wider border border-brand-blue/30">
            <Compass className="w-3.5 h-3.5" />
            <span>KONTES ROBOT INDONESIA (KRI)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mengenal Divisi KRI &amp; Keunikan KRTMI
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Kontes Robot Indonesia (KRI) adalah ajang kompetisi rancang bangun dan rekayasa robotika mahasiswa paling bergengsi di Indonesia yang diselenggarakan oleh Balai Pengembangan Talenta Indonesia (BPTI) Puspresnas Kemendikbudristek.
          </p>
        </div>

        {/* Division Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {divisions.map((div) => (
            <div
              key={div.code}
              className={`p-6 rounded-3xl space-y-3 transition border ${
                div.highlight
                  ? 'bg-gradient-to-b from-[#0F192E] to-[#080D18] border-brand-cyan/60 shadow-[0_0_30px_rgba(0,245,212,0.15)] ring-1 ring-brand-cyan/40'
                  : 'bg-[#090E17] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-black font-mono px-2.5 py-1 rounded-lg ${
                  div.highlight ? 'bg-brand-cyan text-black' : 'bg-slate-800 text-slate-300'
                }`}>
                  {div.code}
                </span>
                {div.highlight && (
                  <span className="text-[10px] font-black uppercase text-brand-cyan tracking-wider flex items-center space-x-1">
                    <Flame className="w-3 h-3 text-brand-cyan" />
                    <span>Fokus Tim Abhinaya</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-white">
                {div.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {div.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
