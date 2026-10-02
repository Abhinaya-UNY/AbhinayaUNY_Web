'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Layers, Play, Film } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { GALLERY_ITEMS, GALLERY_ROWS, GalleryItem } from '@/data/galleryData';

export const DocumentationGallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isHdLoaded, setIsHdLoaded] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  // Performance: Pause infinite marquee animations when gallery is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: '350px 0px 350px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleOpenPhoto = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setIsHdLoaded(false);
    setSelectedPhoto(item);
  };

  const handleNext = useCallback(() => {
    setIsHdLoaded(false);
    setSelectedIndex((prev) => {
      const nextIdx = (prev + 1) % GALLERY_ITEMS.length;
      setSelectedPhoto(GALLERY_ITEMS[nextIdx]);
      return nextIdx;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setIsHdLoaded(false);
    setSelectedIndex((prev) => {
      const prevIdx = (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setSelectedPhoto(GALLERY_ITEMS[prevIdx]);
      return prevIdx;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPhoto(null);
    setIsHdLoaded(false);
  }, []);

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto, handleNext, handlePrev, handleClose]);

  // Helper for photo width styling based on authentic physical aspect ratio
  // Heights: h-28 (112px mobile) | sm:h-36 (144px) | md:h-44 (176px) | lg:h-48 (192px)
  const getCardWidthClass = (aspect?: string) => {
    switch (aspect) {
      case 'tall':
        // ~9:16 vertical ratio (Shorts, smartphone full vertical portraits)
        return 'w-[64px] sm:w-[82px] md:w-[100px] lg:w-[110px]';
      case 'portrait':
        // ~3:4 or 4:5 vertical ratio (Instagram vertical, squad member & trophy portraits)
        return 'w-[86px] sm:w-[110px] md:w-[134px] lg:w-[146px]';
      case 'square':
        // 1:1 square ratio
        return 'w-28 sm:w-36 md:w-44 lg:w-48';
      case 'standard':
        // 4:3 standard landscape ratio
        return 'w-[150px] sm:w-[192px] md:w-[236px] lg:w-[256px]';
      case 'wide':
        // 16:9 widescreen landscape ratio (YouTube videos, arena matches)
        return 'w-[200px] sm:w-[256px] md:w-[314px] lg:w-[342px]';
      case 'panoramic':
      default:
        // 21:9 panoramic / ultra-wide ratio (broad stage celebration, banner photos)
        return 'w-[260px] sm:w-[336px] md:w-[410px] lg:w-[448px]';
    }
  };

  // Reusable Photo / Video Card Renderer
  const renderPhotoCard = (item: GalleryItem, rowIdx: number, cardIdx: number) => {
    const widthClass = getCardWidthClass(item.aspect);
    const isVertical = item.aspect === 'tall' || item.aspect === 'portrait';
    const previewSrc = item.thumbnail ? `${basePath}${item.thumbnail}` : `${basePath}${item.image}`;

    return (
      <div
        key={`${item.id}-${rowIdx}-${cardIdx}`}
        onClick={() => handleOpenPhoto(item)}
        className={`group relative ${widthClass} h-28 sm:h-36 md:h-44 lg:h-48 rounded-2xl overflow-hidden bg-[#18181B] border ${
          item.isVideo
            ? 'border-red-500/30 hover:border-red-500/80 shadow-red-950/20'
            : 'border-white/[0.08] hover:border-orange-500/50'
        } shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex-shrink-0 select-none`}
      >
        <img
          src={previewSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full ${
            isVertical ? 'object-cover object-top' : 'object-cover object-center'
          } brightness-[0.92] contrast-[1.05] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 pointer-events-none`}
        />

        {/* Video badge in top-left */}
        {item.isVideo && (
          <div className="absolute top-2 left-2 z-20 flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-mono font-bold tracking-wider shadow-lg border border-red-400/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className={item.aspect === 'tall' ? 'hidden sm:inline' : 'inline'}>
              {item.videoDuration || 'VIDEO'}
            </span>
          </div>
        )}

        {/* Center Play Button for Videos */}
        {item.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 group-hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:border-red-400 group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <Play className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Subtle dark gradient overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-3 z-20">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-orange-400 font-bold mb-0.5">
            <span>{item.year}</span>
            <span className="text-slate-300 truncate max-w-[80px] sm:max-w-[120px]">{item.event}</span>
          </div>
          <p className="text-white text-[10px] sm:text-xs font-bold line-clamp-1 group-hover:text-orange-300 transition">
            {item.title}
          </p>
        </div>

        {/* Hover zoom/play icon pill */}
        <div className="absolute top-2 right-2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
          {item.isVideo ? (
            <Play className="w-3 h-3 fill-red-400 text-red-400 translate-x-0.5" />
          ) : (
            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="galeri-foto" className="w-full bg-[#0B0B0E] relative border-b border-white/[0.06] overflow-hidden py-10 sm:py-14 select-none">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-orange-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Standalone Section Header (Outside of photo lines so text is never clipped) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono tracking-wider border border-white/10">
              <Camera className="w-3.5 h-3.5 text-orange-400" />
              <span>DOKUMENTASI &amp; ARSIP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Galeri Abhinaya
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            <p className="flex-1">
              Dokumentasi perjalanan riset, persiapan teknis, suasana paddock, dan momen perjuangan tim robotika Abhinaya UNY di arena Kontes Robot Indonesia.
            </p>
            <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold whitespace-nowrap self-start sm:self-auto">
              {GALLERY_ITEMS.length}+ MOMEN • FOTO &amp; VIDEO
            </div>
          </div>
        </div>
      </div>

      {/* Main Wall Container (Collapsible Multi-Row Marquee) */}
      <div className={`space-y-3 sm:space-y-3.5 relative z-10 group-marquee ${isInViewport ? '' : 'marquee-paused'}`}>
        
        {/* ROW 1: Dokumentasi Laga & Momen Emas (Drifting Left) */}
        <div className="overflow-hidden">
          <div className="animate-photo-marquee-left flex items-center space-x-3 sm:space-x-3.5">
            {GALLERY_ROWS.row1.map((item, idx) => renderPhotoCard(item, 1, idx))}
            {GALLERY_ROWS.row1.map((item, idx) => renderPhotoCard(item, 1, idx + 100))}
          </div>
        </div>

        {/* ROW 2: Arena Lomba & Holonomic Match (Drifting Right) */}
        <div className="overflow-hidden">
          <div className="animate-photo-marquee-right flex items-center space-x-3 sm:space-x-3.5">
            {GALLERY_ROWS.row2.map((item, idx) => renderPhotoCard(item, 2, idx))}
            {GALLERY_ROWS.row2.map((item, idx) => renderPhotoCard(item, 2, idx + 100))}
          </div>
        </div>

        {/* ROW 3: Paddock, Tuning & Scrutineering (Drifting Left Fast) */}
        <div className="overflow-hidden">
          <div className="animate-photo-marquee-left-fast flex items-center space-x-3 sm:space-x-3.5">
            {GALLERY_ROWS.row3.map((item, idx) => renderPhotoCard(item, 3, idx))}
            {GALLERY_ROWS.row3.map((item, idx) => renderPhotoCard(item, 3, idx + 100))}
          </div>
        </div>

        {/* ROW 4: Riset Divisi & Kehidupan Lab Robotika (Drifting Right) */}
        <div className="overflow-hidden">
          <div className="animate-photo-marquee-right flex items-center space-x-3 sm:space-x-3.5">
            {GALLERY_ROWS.row4.map((item, idx) => renderPhotoCard(item, 4, idx))}
            {GALLERY_ROWS.row4.map((item, idx) => renderPhotoCard(item, 4, idx + 100))}
          </div>
        </div>

        {/* ROW 5: Kilas Balik Historis & Persaudaraan Tim (Drifting Left) */}
        <div className="overflow-hidden">
          <div className="animate-photo-marquee-left flex items-center space-x-3 sm:space-x-3.5">
            {GALLERY_ROWS.row5.map((item, idx) => renderPhotoCard(item, 5, idx))}
            {GALLERY_ROWS.row5.map((item, idx) => renderPhotoCard(item, 5, idx + 100))}
          </div>
        </div>

      </div>

      {/* Footer Bar (Exact match to reference banner: Year / Brand - Continuous Archive - Instagram Link) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-white font-bold tracking-wider">2026 - ROBOTIKA UNY</span>
        </div>

        <div className="text-[11px] tracking-[0.25em] text-slate-400 uppercase hidden md:inline">
          CONTINUOUS • IMMERSIVE • ARCHIVE
        </div>

        <a
          href="https://www.instagram.com/abhinaya.uny/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-orange-400 hover:text-white transition font-bold tracking-wider group cursor-pointer"
        >
          <span>INSTAGRAM @ABHINAYA.UNY</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </a>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-orange-500 text-white hover:text-black transition border border-white/20 cursor-pointer shadow-lg"
            aria-label="Tutup pratinjau foto"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/75 hover:bg-orange-500 text-white hover:text-black transition border border-white/20 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/75 hover:bg-orange-500 text-white hover:text-black transition border border-white/20 cursor-pointer shadow-xl hidden sm:flex items-center justify-center"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Box */}
          <div className="max-w-5xl w-full flex flex-col items-center space-y-4">
            {/* Media Stage: Video or Image */}
            {selectedPhoto.isVideo && selectedPhoto.youtubeId ? (
              <div
                className={`relative ${
                  selectedPhoto.aspect === 'square'
                    ? 'w-[300px] sm:w-[360px] aspect-[9/16]'
                    : 'w-full max-w-4xl aspect-video'
                } max-h-[72vh] rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl mx-auto flex items-center justify-center`}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedPhoto.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedPhoto.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative max-h-[72vh] w-auto max-w-full rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl flex items-center justify-center min-h-[240px]">
                {/* Instant thumbnail preview while HD image loads */}
                {selectedPhoto.thumbnail && !isHdLoaded && (
                  <img
                    src={`${basePath}${selectedPhoto.thumbnail}`}
                    alt={selectedPhoto.title}
                    className="max-h-[72vh] w-auto object-contain rounded-2xl blur-[1px] scale-100 opacity-90 transition-opacity duration-300"
                  />
                )}
                {/* Full HD original image */}
                <img
                  src={`${basePath}${selectedPhoto.image}`}
                  alt={selectedPhoto.title}
                  onLoad={() => setIsHdLoaded(true)}
                  decoding="async"
                  className={`max-h-[72vh] w-auto object-contain rounded-2xl transition-opacity duration-500 ${
                    isHdLoaded ? 'opacity-100' : selectedPhoto.thumbnail ? 'opacity-0 absolute inset-0 m-auto' : 'opacity-100'
                  }`}
                />

                {/* HD Loading Telemetry Indicator */}
                {!isHdLoaded && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-orange-400 text-[10px] font-mono border border-orange-500/30 flex items-center space-x-1.5 shadow-lg animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    <span>Memuat HD...</span>
                  </div>
                )}
                {isHdLoaded && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-emerald-400 text-[10px] font-mono border border-emerald-500/30 flex items-center space-x-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>HD Siap</span>
                  </div>
                )}
              </div>
            )}

            {/* Photo / Video Metadata Card */}
            <div className="w-full max-w-2xl bg-[#121216]/90 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md space-y-2.5 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                  {selectedPhoto.year}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold border ${
                    selectedPhoto.isVideo
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}
                >
                  {selectedPhoto.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 font-bold">{selectedPhoto.event}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                {selectedPhoto.title}
              </h3>

              {/* Action Button for Video or HD Photo */}
              <div className="pt-1 flex items-center justify-center gap-2">
                {selectedPhoto.isVideo && selectedPhoto.youtubeId ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedPhoto.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition shadow-lg shadow-red-950/40 group cursor-pointer"
                  >
                    <FaYoutube className="w-4 h-4 text-white group-hover:scale-110 transition" />
                    <span>Tonton di YouTube ↗</span>
                  </a>
                ) : (
                  <a
                    href={`${basePath}${selectedPhoto.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                    <span>Lihat Gambar Asli HD</span>
                  </a>
                )}
              </div>

              <div className="pt-1 text-[10px] font-mono text-slate-500">
                Item {selectedIndex + 1} dari {GALLERY_ITEMS.length} • Gunakan tombol panah keyboard ← → untuk navigasi
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default DocumentationGallerySection;