'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Layers, Play, Film } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { GALLERY_ITEMS, GALLERY_ROWS, GalleryItem } from '@/data/galleryData';

export const DocumentationGallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const handleOpenPhoto = (item: GalleryItem) => {
    const idx = GALLERY_ITEMS.findIndex((p) => p.id === item.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setSelectedPhoto(item);
  };

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const nextIdx = (prev + 1) % GALLERY_ITEMS.length;
      setSelectedPhoto(GALLERY_ITEMS[nextIdx]);
      return nextIdx;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      const prevIdx = (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setSelectedPhoto(GALLERY_ITEMS[prevIdx]);
      return prevIdx;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPhoto(null);
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

  // Helper for photo width styling based on aspect
  const getCardWidthClass = (aspect?: string) => {
    switch (aspect) {
      case 'panoramic':
        return 'w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px]';
      case 'wide':
        return 'w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px]';
      case 'square':
        return 'w-[140px] sm:w-[180px] md:w-[210px] lg:w-[240px]';
      case 'standard':
      default:
        return 'w-[200px] sm:w-[260px] md:w-[310px] lg:w-[340px]';
    }
  };

  // Reusable Photo / Video Card Renderer
  const renderPhotoCard = (item: GalleryItem, rowIdx: number, cardIdx: number) => {
    const widthClass = getCardWidthClass(item.aspect);
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
          src={`${basePath}${item.image}`}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover brightness-[0.92] contrast-[1.05] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
        />

        {/* Video badge in top-left */}
        {item.isVideo && (
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-mono font-bold tracking-wider shadow-lg border border-red-400/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{item.videoDuration || 'VIDEO'}</span>
          </div>
        )}

        {/* Center Play Button for Videos */}
        {item.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 group-hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:border-red-400 group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Subtle dark gradient overlay on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 z-20">
          <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 font-bold mb-0.5">
            <span>{item.year}</span>
            <span className="text-slate-300 truncate max-w-[130px]">{item.event}</span>
          </div>
          <p className="text-white text-xs font-bold line-clamp-1 group-hover:text-orange-300 transition">
            {item.title}
          </p>
        </div>

        {/* Hover zoom/play icon pill */}
        <div className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
          {item.isVideo ? (
            <Play className="w-3.5 h-3.5 fill-red-400 text-red-400 translate-x-0.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="galeri-foto" className="w-full bg-[#0B0B0E] relative border-b border-white/[0.06] overflow-hidden py-10 sm:py-14 select-none">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-orange-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Main Wall Container (Collapsible Multi-Row Marquee) */}
      <div className="space-y-3 sm:space-y-3.5 relative z-10 group-marquee">
        
        {/* ROW 1: Signature Title Card (Top-Left) + Drifting Photo Strip */}
        <div className="flex items-center space-x-3 sm:space-x-3.5 overflow-hidden pl-3 sm:pl-6 lg:pl-8">
          
          {/* BEHIND THE MACHINES Iconic Title Card */}
          <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[480px] h-28 sm:h-36 md:h-44 lg:h-48 rounded-2xl bg-gradient-to-br from-[#121216] via-[#18181B] to-[#0E0E12] border border-white/[0.12] p-4 sm:p-6 lg:p-7 flex flex-col justify-between flex-shrink-0 shadow-2xl relative overflow-hidden group">
            {/* Ambient orange micro-glow in title card */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-1 relative z-10">
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-orange-400 uppercase">
                <Camera className="w-3.5 h-3.5 text-orange-400" />
                <span>GALLERY</span>
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[0.85] uppercase">
                <span className="text-white block">BEHIND</span>
                <span className="text-slate-400/60 block">THE MACHINES.</span>
              </h2>
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.06] relative z-10">
              <span>ABHINAYA ROBOTICS ARCHIVE</span>
              <span className="text-orange-400 font-bold">{GALLERY_ITEMS.length}+ MOMENTS • FOTO & VIDEO</span>
            </div>
          </div>

          {/* Row 1 Photos (Drifting Left) */}
          <div className="overflow-hidden flex-1">
            <div className="animate-photo-marquee-left flex items-center space-x-3 sm:space-x-3.5">
              {GALLERY_ROWS.row1.map((item, idx) => renderPhotoCard(item, 1, idx))}
              {GALLERY_ROWS.row1.map((item, idx) => renderPhotoCard(item, 1, idx + 100))}
            </div>
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
              <div className="relative max-h-[72vh] w-auto max-w-full rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl flex items-center justify-center">
                <img
                  src={`${basePath}${selectedPhoto.image}`}
                  alt={selectedPhoto.title}
                  className="max-h-[72vh] w-auto object-contain rounded-2xl"
                />
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

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {selectedPhoto.caption}
              </p>

              {/* Action Button for Video */}
              {selectedPhoto.isVideo && selectedPhoto.youtubeId && (
                <div className="pt-1 flex items-center justify-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedPhoto.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition shadow-lg shadow-red-950/40 group cursor-pointer"
                  >
                    <FaYoutube className="w-4 h-4 text-white group-hover:scale-110 transition" />
                    <span>Tonton di YouTube ↗</span>
                  </a>
                </div>
              )}

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