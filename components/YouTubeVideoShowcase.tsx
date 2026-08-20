'use client';

import React, { useState } from 'react';
import { Play, Maximize2, X, Film, Activity, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

interface ActionTimestamp {
  time: string;
  seconds: number;
  label: string;
  description: string;
}

export const YouTubeVideoShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState<number>(0);

  const videoId = '3yr5uNkxA_8';
  const youtubeUrl = 'https://youtu.be/3yr5uNkxA_8';
  const embedBaseUrl = 'https://www.youtube-nocookie.com/embed/3yr5uNkxA_8';

  const actionMarkers: ActionTimestamp[] = [
    { time: '0:05', seconds: 5, label: 'Start & Kalibrasi IMU', description: 'Inisialisasi gyroskop MPU6500 dan pembacaan posisi awal arena.' },
    { time: '0:22', seconds: 22, label: 'Navigasi Holonomik Mecanum', description: 'Manuver omnidirectional berkecepatan tinggi menuju zona pengumpan.' },
    { time: '0:48', seconds: 48, label: 'Deteksi Edge AI YOLOv8', description: 'Visi komputer mengidentifikasi botol plastik dan kaleng aluminium secara real-time.' },
    { time: '1:15', seconds: 75, label: 'Aktivasi Gripper Torsi Tinggi', description: 'Mekanisme capit mengambil objek sampah dengan kompensasi sensor jarak ToF laser.' },
    { time: '1:45', seconds: 105, label: 'Pemilahan Keranjang Cerdas', description: 'Penempatan sampah ke kompartemen target dengan akurasi 100% tanpa sampah tercecer.' },
  ];

  const getEmbedUrl = (startSeconds: number = 0) => {
    return `${embedBaseUrl}?autoplay=1&start=${startSeconds}&rel=0&modestbranding=1`;
  };

  const handleMarkerClick = (seconds: number) => {
    setActiveTimestamp(seconds);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-[#050811] relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[250px] bg-brand-cyan/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-[350px] h-[200px] bg-brand-emerald/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
            <Film className="w-3.5 h-3.5" />
            <span>DOKUMENTASI VIDEO RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Robot Abhinaya UNY in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Saksikan rekaman performa nyata robotika Abhinaya UNY dalam menuntaskan misi pemilahan sampah otonom dan navigasi arena berkecepatan tinggi.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="rounded-3xl bg-[#090F1B] border-2 border-brand-border p-5 sm:p-8 shadow-2xl space-y-6 hud-corner relative">
          
          {/* Top Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
              </span>
              <span className="text-white font-bold">TELEMETRI STREAM: ACTIVE</span>
              <span className="text-slate-500">|</span>
              <span className="text-brand-cyan">1080p60 FULL HD</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                BITRATE: 12.4 Mbps
              </span>
              <span className="px-2 py-0.5 rounded bg-brand-emerald/20 text-emerald-300 border border-brand-emerald/40 text-[10px] font-bold">
                KRTMI 2024
              </span>
            </div>
          </div>

          {/* Video Container Frame */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 group shadow-inner">
            <iframe
              className="w-full h-full object-cover"
              src={`${embedBaseUrl}?rel=0&modestbranding=1`}
              title="Official Robot Abhinaya UNY in Action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Quick Action Markers & External Trigger */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                <Activity className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Navigasi Fase &amp; Milestone Aksi:</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTimestamp(0);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs text-brand-cyan hover:text-white font-bold transition font-mono"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Tonton Fullscreen Modal</span>
                </button>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-brand-cyan transition font-mono"
                >
                  <span>Buka di YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Action Timestamp Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {actionMarkers.map((marker, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleMarkerClick(marker.seconds)}
                  className="p-3 rounded-xl bg-[#060A12] border border-slate-800 hover:border-brand-cyan/60 hover:bg-slate-900/80 transition text-left space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black font-mono text-brand-cyan group-hover:glow-cyan">
                      [{marker.time}]
                    </span>
                    <Play className="w-3 h-3 text-slate-500 group-hover:text-brand-cyan transition" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-brand-cyan transition line-clamp-1">
                    {marker.label}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                    {marker.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-[#070B14] rounded-3xl border-2 border-brand-cyan/50 p-4 sm:p-6 space-y-4 shadow-[0_0_50px_rgba(0,245,212,0.3)] animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-brand-cyan" />
                <span className="text-sm sm:text-base font-black text-white font-mono">
                  ABHINAYA UNY — ROBOT IN ACTION SHOWCASE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-brand-cyan transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(activeTimestamp)}
                title="Fullscreen Robot Abhinaya Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Channel Resmi: @abhinaya.uny</span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan hover:underline flex items-center space-x-1"
              >
                <span>Lihat langsung di YouTube ({youtubeUrl})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
