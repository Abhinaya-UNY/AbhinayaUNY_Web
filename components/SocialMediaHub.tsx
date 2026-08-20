'use client';

import React from 'react';
import { Instagram, Play, ExternalLink, Share2, Sparkles, ShieldCheck, Heart, MessageSquare, Video } from 'lucide-react';

export const SocialMediaHub: React.FC = () => {
  const socialChannels = [
    {
      name: 'Instagram',
      handle: '@abhinaya.uny',
      url: 'https://www.instagram.com/abhinaya.uny/',
      badge: 'VERIFIED TEAM HUB',
      icon: Instagram,
      accentBg: 'from-pink-500/20 via-purple-500/20 to-brand-cyan/20',
      borderColor: 'hover:border-pink-500/60',
      stats: 'Dokumentasi Riset, Match Highlights & Pengumuman Resmi',
      highlights: [
        { title: 'Behind-The-Scenes Perakitan Mecanum Sasis CNC', tag: 'Reels' },
        { title: 'Live Update KRI Nasional 2024 di Edutorium UMS', tag: 'Story' },
        { title: 'Uji Coba Visi Komputer YOLOv8 Klasifikasi Sampah', tag: 'Feed' },
      ],
      ctaText: 'Kunjungi Instagram @abhinaya.uny',
    },
    {
      name: 'TikTok',
      handle: '@abhinaya.uny',
      url: 'https://www.tiktok.com/@abhinaya.uny',
      badge: 'OFFICIAL SHORT LABS',
      icon: Video,
      accentBg: 'from-cyan-500/20 via-blue-500/20 to-teal-500/20',
      borderColor: 'hover:border-cyan-400/60',
      stats: 'Eksperimen Gerak Cepat, Vlog Arena & Demo Torsi Gripper',
      highlights: [
        { title: 'Uji Torsi Gripper Lead-Screw Angkat Balok Transporter', tag: 'VT' },
        { title: 'Manuver 360° Holonomic Strafe 4WD Mecanum di Lapangan', tag: 'VT' },
        { title: 'Deteksi Multi-Objek Berkecepatan 30+ FPS Edge AI', tag: 'VT' },
      ],
      ctaText: 'Follow TikTok @abhinaya.uny',
    },
  ];

  return (
    <section className="py-16 bg-[#070B14] border-t border-brand-border relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-brand-cyan/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-black uppercase tracking-wider border border-pink-500/30">
            <Share2 className="w-3.5 h-3.5" />
            <span>JARINGAN MEDIA SOSIAL RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hub Sosial &amp; Dokumentasi Riset Tim
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ikuti kabar terkini seputar riset teknologi, uji coba laboratorium robotika, dan liputan langsung pertandingan nasional melalui kanal resmi Tim Robotika Abhinaya UNY.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {socialChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-slate-800 ${channel.borderColor} transition-all duration-300 space-y-6 shadow-xl relative overflow-hidden group`}
              >
                {/* Top Info */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-brand-cyan group-hover:scale-105 transition shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-black text-white">
                          {channel.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-cyan">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                    {channel.badge}
                  </span>
                </div>

                {/* Subtitle / Focus */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {channel.stats}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Sorotan Konten &amp; Riset Terbaru:
                  </div>
                  <div className="space-y-2">
                    {channel.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-[#050811] border border-slate-800/80 flex items-center justify-between text-xs text-slate-300"
                      >
                        <span className="truncate pr-2 font-medium">{h.title}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 flex-shrink-0">
                          {h.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Action Button */}
                <div className="pt-2">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-brand-cyan hover:to-teal-400 hover:text-black text-white border border-slate-700 hover:border-brand-cyan font-black text-xs flex items-center justify-center space-x-2 transition duration-200 shadow-md font-mono"
                  >
                    <span>{channel.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
