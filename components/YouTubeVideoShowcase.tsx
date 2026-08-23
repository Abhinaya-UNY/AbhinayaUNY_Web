'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Youtube, Trophy, ExternalLink, X, Maximize2, MonitorPlay, Smartphone, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'action' | 'shorts';
  aspect: '16:9' | '9:16';
  url: string;
  tag: string;
  stats: string;
  badgeColor: string;
}

const SHOWCASE_VIDEOS: VideoItem[] = [
  {
    id: 'PmxwdrhpxKg',
    title: 'Laga Robot Otonom Abhinaya KRTMI Nasional',
    subtitle: 'Kontes Robot Tematik Indonesia di Universitas Muhammadiyah Surakarta',
    description: 'Saksikan manuver otonom robot Abhinaya UNY bermanuver lincah di karpet arena, mendeteksi objek dengan AI Computer Vision YOLO, dan mengeksekusi misi pemilahan sampah dengan presisi serta kecepatan tinggi.',
    type: 'action',
    aspect: '16:9',
    url: 'https://www.youtube.com/watch?v=PmxwdrhpxKg',
    tag: 'Match Action (16:9)',
    stats: '1080p 60fps • Official Match',
    badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/40',
  },
  {
    id: 'wLusNVfFFHA',
    title: 'Behind The Scenes & Paddock Tuning Abhinaya UNY',
    subtitle: 'Kalibrasi Mekatronika & Uji Kelincahan Sasis Roda Mecanum',
    description: 'Momen persiapan teknis di paddock, kalibrasi sistem kontrol mekanik & elektrik, serta uji responsivitas manuver robot sebelum melaju di laga resmi nasional.',
    type: 'shorts',
    aspect: '9:16',
    url: 'https://www.youtube.com/shorts/wLusNVfFFHA',
    tag: 'Official Shorts (9:16)',
    stats: 'Shorts HD • Paddock & Lab',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
  },
];

export const YouTubeVideoShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'action' | 'shorts'>('action');
  const [playingInline, setPlayingInline] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);
  const [thumbError, setThumbError] = useState<Record<string, boolean>>({});

  const currentVideo = SHOWCASE_VIDEOS.find((v) => v.type === activeTab) || SHOWCASE_VIDEOS[0];

  const handleOpenModal = (video: VideoItem) => {
    setModalVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalVideo(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, handleKeyDown]);

  const getThumbnailUrl = (id: string) => {
    if (thumbError[id]) {
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  return (
    <section id="video-aksi" className="py-12 sm:py-16 md:py-20 bg-[#070503] relative border-b border-[#1A120B]">
      
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-600/15 text-red-400 text-xs font-black uppercase tracking-wider border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
            <span>OFFICIAL MULTIMEDIA &amp; YOUTUBE SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Lihat Robot Abhinaya UNY Beraksi di Arena! 🎬
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300">
            Saksikan bagaimana robot otonom Tim Abhinaya bermanuver lincah, mendeteksi objek dengan kecerdasan buatan AI, dan mengeksekusi misi lomba dengan kecepatan tinggi.
          </p>
        </div>

        {/* Dual-Mode Tab Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#140E09] border border-brand-orange/30 shadow-lg gap-2">
            <button
              onClick={() => setActiveTab('action')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                activeTab === 'action'
                  ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] scale-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MonitorPlay className="w-4 h-4" />
              <span>Match Action (16:9)</span>
            </button>
            <button
              onClick={() => setActiveTab('shorts')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                activeTab === 'shorts'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Official Shorts (9:16)</span>
            </button>
          </div>
        </div>

        {/* Video Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-6 rounded-3xl bg-[#120D08]/90 border border-brand-orange/30 shadow-[0_0_50px_rgba(255,107,0,0.15)] backdrop-blur-sm space-y-4">
            
            {/* Video Stage: 16:9 Widescreen */}
            {activeTab === 'action' && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-amber-950/60 shadow-2xl group">
                {playingInline[currentVideo.id] ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative w-full h-full cursor-pointer" onClick={() => setPlayingInline({ ...playingInline, [currentVideo.id]: true })}>
                    <img
                      src={getThumbnailUrl(currentVideo.id)}
                      alt={currentVideo.title}
                      onError={() => setThumbError({ ...thumbError, [currentVideo.id]: true })}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                    />
                    
                    {/* Vignette & Metadata Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${currentVideo.badgeColor}`}>
                        {currentVideo.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-slate-200 border border-white/10 backdrop-blur-md">
                        {currentVideo.stats}
                      </span>
                    </div>

                    {/* Centered Glowing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 p-0.5 shadow-[0_0_35px_rgba(255,107,0,0.8)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,107,0,1)] transition-all duration-300 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-[#120D08]/80 flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 text-brand-orange fill-brand-orange ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Title Bar */}
                    <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between text-white">
                      <div className="space-y-0.5">
                        <p className="text-xs sm:text-sm font-black text-amber-300 drop-shadow-md">
                          {currentVideo.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1">
                          {currentVideo.subtitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(currentVideo);
                        }}
                        title="Buka Layar Penuh"
                        className="p-2 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white hover:text-brand-orange transition"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Stage: 9:16 Vertical Shorts */}
            {activeTab === 'shorts' && (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-red-950/60 shadow-2xl group">
                  {playingInline[currentVideo.id] ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full cursor-pointer" onClick={() => setPlayingInline({ ...playingInline, [currentVideo.id]: true })}>
                      <img
                        src={getThumbnailUrl(currentVideo.id)}
                        alt={currentVideo.title}
                        onError={() => setThumbError({ ...thumbError, [currentVideo.id]: true })}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-105"
                      />
                      
                      {/* Vignette & Badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${currentVideo.badgeColor}`}>
                          {currentVideo.tag}
                        </span>
                      </div>

                      {/* Centered Glowing Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-0.5 shadow-[0_0_35px_rgba(239,68,68,0.8)] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-[#120D08]/80 flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-6 h-6 text-red-500 fill-red-500 ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                        <p className="text-xs font-black text-amber-300 line-clamp-1">
                          {currentVideo.title}
                        </p>
                        <p className="text-[10px] text-slate-300 line-clamp-2">
                          {currentVideo.subtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Video Description & Action Bar */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span>{currentVideo.subtitle}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {currentVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentVideo.description}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-950/40">
                <button
                  type="button"
                  onClick={() => handleOpenModal(currentVideo)}
                  className="px-4 py-2.5 rounded-xl bg-[#1D140D] hover:bg-[#281C12] border border-brand-orange/40 text-amber-200 hover:text-white font-bold text-xs flex items-center space-x-2 transition"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Buka Video di Layar Penuh</span>
                </button>

                <a
                  href={currentVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  <span>Tonton di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Official Channel & Social Media Hub Strip */}
        <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#170E08] via-[#1F130A] to-[#170E08] border border-brand-orange/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-white flex items-center justify-center sm:justify-start gap-1.5">
                <span>Official Channel: @AbhinayaUNY</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Subscribe untuk update dokumentasi riset, uji coba robot, dan laga Kontes Robot Indonesia.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <a
              href="https://www.youtube.com/@AbhinayaUNY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <span>Subscribe @AbhinayaUNY</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <span>Instagram @abhinaya.uny</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Modal Video Player Lightbox */}
      {isModalOpen && modalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-300 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className={`relative bg-[#0D0805] border border-brand-orange/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,107,0,0.3)] w-full ${
              modalVideo.aspect === '16:9' ? 'max-w-5xl' : 'max-w-[360px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3 sm:p-4 bg-[#140E09] border-b border-amber-950/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {modalVideo.title}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Iframe Stage */}
            <div className={`relative w-full ${modalVideo.aspect === '16:9' ? 'aspect-video' : 'aspect-[9/16]'}`}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
