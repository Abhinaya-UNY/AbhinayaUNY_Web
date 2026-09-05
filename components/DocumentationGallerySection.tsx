'use client';

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Filter, Sparkles, X } from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from '@/data/galleryData';

export const DocumentationGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const filteredItems = activeCategory === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="dokumentasi-tim" className="py-8 sm:py-10 md:py-12 bg-[#070b09] border-y border-emerald-950/60 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto border-b border-emerald-950/60 pb-6 sm:pb-8">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>DOKUMENTASI &amp; GALERI TIM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight ">
            Galeri Jejak Riset &amp; Perjuangan Abhinaya 📸
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Dokumentasi autentik di balik panggung kompetisi KRTMI dan persiapan di lab robotika UKM Rekayasa Teknologi UNY.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <div className="flex items-center space-x-1 text-slate-400 text-xs font-bold mr-2">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kategori:</span>
          </div>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-[#0d1612] text-slate-300 hover:text-white hover:bg-[#14241d] border border-emerald-950/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Unblocked 4:3 Natural Aspect Ratio & Decoupled Meta) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c1411] border border-emerald-950/80 hover:border-emerald-500/70 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
            >
              {/* 1. Pristine Photo Viewport (100% Unblocked, 4:3 Natural Ratio, Zero Badges Over Photo) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={`${basePath}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-100 contrast-105"
                />
              </div>

              {/* 2. Dedicated Card Body with Meta on Top */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between bg-[#0a120f]">
                <div className="space-y-2">
                  {/* Clean Meta Strip Below Photo */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#13231c] text-emerald-300 font-mono font-bold border border-emerald-500/25">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-black">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-200/70 font-semibold border-t border-emerald-950/70">
                  <span className="truncate max-w-[140px]">{item.event}</span>
                  <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                    <span>Buka</span> &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0c1411] border border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-black transition border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden max-h-[65vh] bg-black flex items-center justify-center">
              <img
                src={`${basePath}${selectedPhoto.image}`}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/40">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  {selectedPhoto.event} • {selectedPhoto.year}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};