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
    <section id="dokumentasi-tim" className="py-8 sm:py-10 md:py-12 bg-[#0B0B0E] border-y border-white/[0.06] relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header Title (Editorial Split Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6 sm:pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono tracking-wider border border-orange-500/20">
              <Camera className="w-3.5 h-3.5 text-orange-400" />
              <span>DOKUMENTASI &amp; GALERI TIM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Galeri Jejak Riset &amp; Perjuangan Abhinaya
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Dokumentasi autentik di balik panggung kompetisi KRTMI dan persiapan di lab robotika UKM Rekayasa Teknologi UNY.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <div className="flex items-center space-x-1 text-slate-400 text-xs font-bold mr-2">
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            <span>Kategori:</span>
          </div>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-orange-400 text-black font-bold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
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
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#121216] border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg"
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
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between bg-[#121216]">
                <div className="space-y-2">
                  {/* Clean Meta Strip Below Photo */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono font-bold border border-white/10">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 font-mono font-bold border border-orange-500/20">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold border-t border-white/[0.06]">
                  <span className="truncate max-w-[140px]">{item.event}</span>
                  <span className="text-slate-300 group-hover:text-orange-400 font-bold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
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
            className="relative max-w-4xl w-full bg-[#121216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-orange-400 hover:text-black transition border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden max-h-[65vh] bg-black flex items-center justify-center border border-white/5">
              <img
                src={`${basePath}${selectedPhoto.image}`}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold uppercase border border-orange-500/30">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPhoto.event} • {selectedPhoto.year}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
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