'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Play, Trophy, ExternalLink, X, Maximize2, MonitorPlay, Smartphone, Flame, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

interface VideoItem {
  id: string;
  title: string;
  shortTitle: string;
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
    id: '3yr5uNkxA_8',
    title: 'Abhinaya Introduction 2024 | Kontes Robot Indonesia',
    shortTitle: 'Abhinaya Intro 2024',
    subtitle: 'Official Team & Robot Introduction • KRTMI UKM Restek UNY',
    description: 'Video resmi pengenalan Tim Robotika Abhinaya UNY dan robot otonom untuk Kontes Robot Indonesia (KRTMI): visi inovasi mekatronika, sinergi 4 divisi riset (Mekanik, Elektrik, Programming AI, Manajerial), dan uji coba navigasi di laboratorium.',
    type: 'action',
    aspect: '16:9',
    url: 'https://youtu.be/3yr5uNkxA_8',
    tag: 'Official Introduction (16:9)',
    stats: '1080p 60fps • Pengenalan Tim & Robot',
    badgeColor: 'bg-brand-orange/20 text-brand-orange border-brand-orange/40',
  },
  {
    id: 'PmxwdrhpxKg',
    title: 'LIVE LOMBA FULL KRTMI WILAYAH 2024 | ABHINAYA Day 2 KRI REGIONAL 2024',
    shortTitle: 'Live Lomba KRTMI 2024',
    subtitle: 'Full Match Live Arena Competition • Kontes Robot Tematik Indonesia',
    description: 'Rekaman siaran langsung pertandingan resmi robot Abhinaya UNY bertanding di arena KRTMI Wilayah 2024 Day 2: kecepatan manuver holonomik 4WD Mecanum, deteksi sampah otonom via AI YOLO, dan aksi kejar poin di arena laga.',
    type: 'action',
    aspect: '16:9',
    url: 'https://www.youtube.com/watch?v=PmxwdrhpxKg',
    tag: 'Live Match Replay (16:9)',
    stats: '1080p 60fps • Laga Resmi KRTMI',
    badgeColor: 'bg-red-600/20 text-red-400 border-red-500/40',
  },
  {
    id: 'J5FXI2AnQxE',
    title: 'Abhinaya Introduction & Perkembangan KRTMI 2019 - 2023',
    shortTitle: 'Kilas Balik 2019–2023',
    subtitle: 'Historical Tech Retrospective • Kilas Balik Riset Robotika UNY',
    description: 'Dokumentasi perjalanan inovasi dan evolusi robot tematik Abhinaya UNY dari masa perintisan 2019 (pertanian), 2020 (disinfeksi COVID-19), 2021 (layanan medis), 2022 (limbah B3), hingga 2023 (digital twin).',
    type: 'action',
    aspect: '16:9',
    url: 'https://youtu.be/J5FXI2AnQxE',
    tag: 'Tech Retrospective (16:9)',
    stats: 'HD 60fps • Kilas Balik KRTMI',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'LyP9M_uTvMk',
    title: 'ABHINAYA - UNY TEMATIK TEAM - OPREC',
    shortTitle: 'Open Recruitment Tim',
    subtitle: 'Open Recruitment & Kaderisasi Anggota Baru Robotika UNY',
    description: 'Video profil ajakan bergabung bersama Tim Robotika Abhinaya UNY untuk mahasiswa baru dan calon periset mekatronika UKM Rekayasa Teknologi UNY.',
    type: 'action',
    aspect: '16:9',
    url: 'https://www.youtube.com/watch?v=LyP9M_uTvMk',
    tag: 'Team Recruitment (16:9)',
    stats: 'HD • Open Recruitment',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
  {
    id: 'wLusNVfFFHA',
    title: 'Abhinaya Recap 2023 | KRTMI (Kontes Robot Tematik Indonesia)',
    shortTitle: 'Recap KRTMI 2023',
    subtitle: 'Shorts Kilas Balik Kompetisi KRTMI di USM Semarang',
    description: 'Momen persiapan teknis di paddock, kalibrasi sistem kontrol mekanik & elektrik, serta uji responsivitas manuver robot saat kompetisi nasional.',
    type: 'shorts',
    aspect: '9:16',
    url: 'https://www.youtube.com/shorts/wLusNVfFFHA',
    tag: 'Official Shorts (9:16)',
    stats: 'Shorts HD • Recap 2023',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
  },
  {
    id: 'tcsBS-6qgCs',
    title: '#MulaiBikinRobot #Tinkercad #Wokwi',
    shortTitle: 'Simulasi Sirkuit & Riset',
    subtitle: 'Simulasi Sirkuit & Pemrograman Mikrokontroler Robotika',
    description: 'Cuplikan vertikal simulasi rangkaian elektronik robotika menggunakan platform Tinkercad & Wokwi untuk perancangan logika mikrokontroler.',
    type: 'shorts',
    aspect: '9:16',
    url: 'https://www.youtube.com/shorts/tcsBS-6qgCs',
    tag: 'Official Shorts (9:16)',
    stats: 'Shorts HD • Simulasi & Riset',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  },
  {
    id: 'vjxbL5MB4-4',
    title: 'Fabrikasi 3D Print Komponen Robot Abhinaya KRI 2025',
    shortTitle: 'Fabrikasi 3D Print',
    subtitle: 'Proses Manufaktur & Cetak 3D Sparepart Mekanik',
    description: 'Cuplikan proses pencetakan 3D print komponen sasis dan bracket motor robotika Abhinaya UNY untuk persiapan Kontes Robot Indonesia.',
    type: 'shorts',
    aspect: '9:16',
    url: 'https://www.youtube.com/shorts/vjxbL5MB4-4',
    tag: 'Official Shorts (9:16)',
    stats: 'Shorts HD • Fabrikasi Mekanik',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  },
  {
    id: 'epyl7w6xZ6Y',
    title: 'Behind The Code: Programming Robotika di VS Code',
    shortTitle: 'Behind The Code (AI Lab)',
    subtitle: 'Coding Logika Manuver & Sensor Arena Pertandingan',
    description: 'Cuplikan proses debugging algoritma navigasi otonom dan logika sensor arena menggunakan VS Code.',
    type: 'shorts',
    aspect: '9:16',
    url: 'https://www.youtube.com/shorts/epyl7w6xZ6Y',
    tag: 'Official Shorts (9:16)',
    stats: 'Shorts HD • Software Lab',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  },
];

export const YouTubeVideoShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'action' | 'shorts'>('action');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('3yr5uNkxA_8');
  const [playingInline, setPlayingInline] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);
  const [thumbError, setThumbError] = useState<Record<string, boolean>>({});

  const availableVideos = SHOWCASE_VIDEOS.filter((v) => v.type === activeTab);
  const currentVideo = availableVideos.find((v) => v.id === selectedVideoId) || availableVideos[0] || SHOWCASE_VIDEOS[0];

  const handleTabChange = (tab: 'action' | 'shorts') => {
    setActiveTab(tab);
    const firstOfTab = SHOWCASE_VIDEOS.find((v) => v.type === tab);
    if (firstOfTab) {
      setSelectedVideoId(firstOfTab.id);
    }
  };

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
    <section id="video-aksi" className="py-8 sm:py-10 md:py-12 bg-[#070503] relative border-b border-[#1A120B]">
      
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header - Wider on Laptop without weird emoji wrap */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
            <FaYoutube className="w-4 h-4 text-red-500 fill-red-500" />
            <span>OFFICIAL VIDEO INTRODUCTION &amp; SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight lg:whitespace-nowrap">
            Mengenal Abhinaya UNY Lewat Video Resmi!&nbsp;🎬
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Tonton video profil resmi Tim Robotika Abhinaya UNY untuk memahami dedikasi riset, kultur kolaborasi 4 divisi di bawah naungan UKM Rekayasa Teknologi (Restek) UNY, dan teknologi robot otonom kami.
          </p>
        </div>

        {/* Dual-Mode Tab Switcher */}
        <div className="flex flex-col items-center justify-center space-y-3.5">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#140E09] border border-brand-orange/30 shadow-lg gap-2">
            <button
              onClick={() => handleTabChange('action')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === 'action'
                  ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] scale-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MonitorPlay className="w-4 h-4" />
              <span>Video Laga &amp; Profil (16:9)</span>
            </button>
            <button
              onClick={() => handleTabChange('shorts')}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === 'shorts'
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Official Shorts (9:16)</span>
            </button>
          </div>

          {/* Sub Video Selector Pills - Single Row Horizontal on Laptop */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 max-w-5xl w-full px-2 overflow-x-auto py-1">
            {availableVideos.map((vid) => {
              const isSelected = vid.id === currentVideo.id;
              return (
                <button
                  key={vid.id}
                  onClick={() => setSelectedVideoId(vid.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center space-x-2 border whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-brand-orange text-amber-300 shadow-[0_0_15px_rgba(255,107,0,0.3)] scale-[1.02]'
                      : 'bg-[#180F08] border-[#3A2214] text-slate-400 hover:text-slate-200 hover:border-amber-700/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-brand-orange animate-pulse' : 'bg-slate-600'}`} />
                  <span>{vid.shortTitle || vid.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Showcase Card */}
        <div className="max-w-5xl lg:max-w-6xl w-full mx-auto px-1 sm:px-3">
          <div className="p-2.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-[#120D08]/95 border border-brand-orange/30 shadow-[0_0_50px_rgba(255,107,0,0.15)] backdrop-blur-sm space-y-4">
            
            {/* Video Stage: 16:9 Widescreen */}
            {activeTab === 'action' && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-amber-950/60 shadow-2xl group">
                {playingInline[currentVideo.id] ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={getThumbnailUrl(currentVideo.id)}
                      alt={currentVideo.title}
                      onError={() => setThumbError((prev) => ({ ...prev, [currentVideo.id]: true }))}
                      className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setPlayingInline((prev) => ({ ...prev, [currentVideo.id]: true }))}
                      className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,107,0,0.8)] group-hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                      aria-label={`Putar ${currentVideo.title}`}
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                    </button>

                    {/* Badge on Top Left */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold border backdrop-blur-md shadow-lg ${currentVideo.badgeColor}`}>
                        <Trophy className="w-3.5 h-3.5 mr-1" />
                        <span>{currentVideo.tag}</span>
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300">
                          {currentVideo.stats}
                        </span>
                        <h3 className="text-sm sm:text-base md:text-lg font-black text-white line-clamp-1">
                          {currentVideo.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleOpenModal(currentVideo)}
                        className="p-2 sm:p-2.5 rounded-xl bg-black/60 hover:bg-brand-orange text-white hover:text-black transition border border-white/20 backdrop-blur-sm cursor-pointer"
                        title="Perbesar / Fullscreen Modal"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Video Stage: 9:16 Shorts Grid Showcase */}
            {activeTab === 'shorts' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {availableVideos.map((shortVid) => {
                    const isSelected = shortVid.id === currentVideo.id;
                    return (
                      <div
                        key={shortVid.id}
                        onClick={() => setSelectedVideoId(shortVid.id)}
                        className={`group relative rounded-2xl overflow-hidden aspect-[9/16] bg-black border-2 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'border-brand-orange ring-2 ring-brand-orange/50 shadow-[0_0_25px_rgba(255,107,0,0.5)] scale-[1.02]'
                            : 'border-[#2B1B10] hover:border-brand-orange/60 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={getThumbnailUrl(shortVid.id)}
                          alt={shortVid.title}
                          onError={() => setThumbError((prev) => ({ ...prev, [shortVid.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        
                        {/* Play Icon */}
                        <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>

                        {/* Title & Badge Bottom */}
                        <div className="absolute bottom-2 inset-x-2 space-y-1">
                          <span className="text-[9px] font-mono font-bold text-amber-300 block truncate">
                            {shortVid.stats}
                          </span>
                          <p className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                            {shortVid.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Inline Player for Selected Short */}
                <div className="p-4 rounded-2xl bg-[#180F08] border border-brand-orange/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs font-bold text-brand-orange flex items-center justify-center sm:justify-start space-x-1.5">
                      <Smartphone className="w-4 h-4" />
                      <span>{currentVideo.tag}</span>
                    </span>
                    <h4 className="text-base font-black text-white">{currentVideo.title}</h4>
                    <p className="text-xs text-slate-300">{currentVideo.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(currentVideo)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-brand-orange text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:scale-105 transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Putar Video Modal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Video Narrative & Action Links */}
            {activeTab === 'action' && (
              <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-black text-white">{currentVideo.title}</h4>
                  <p className="text-xs text-amber-200/80">{currentVideo.subtitle}</p>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed pt-1">
                    {currentVideo.description}
                  </p>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0 self-end md:self-center">
                  <a
                    href={currentVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#20140A] hover:bg-red-600 text-slate-200 hover:text-white text-xs font-bold transition border border-brand-orange/30 shadow-md group"
                  >
                    <FaYoutube className="w-4 h-4 text-red-500 group-hover:text-white transition" />
                    <span>Buka di YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Lightbox / Video Modal */}
      {isModalOpen && modalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full ${
              modalVideo.aspect === '9:16' ? 'max-w-md' : 'max-w-4xl'
            } bg-[#140E09] border-2 border-brand-orange/50 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-brand-orange/20 space-y-4`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#24170E] hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition border border-[#3A2214] z-30 cursor-pointer"
              aria-label="Tutup modal video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pr-10">
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${modalVideo.badgeColor}`}>
                <span>{modalVideo.tag}</span>
              </span>
              <h3 className="text-base sm:text-xl font-black text-white">{modalVideo.title}</h3>
            </div>

            {/* Modal Embed Iframe */}
            <div className={`relative w-full ${modalVideo.aspect === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} rounded-2xl overflow-hidden bg-black border border-[#2B1B10] shadow-inner`}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Info */}
            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span className="font-mono font-bold text-amber-300">{modalVideo.stats}</span>
              <a
                href={modalVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange hover:underline flex items-center space-x-1"
              >
                <span>Tonton di YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
