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
    <section id="dokumentasi-tim" className="py-8 sm:py-10 md:py-12 bg-[#0A0704] border-y border-[#26180E] relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto border-b border-[#26180E] pb-6 sm:pb-8">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30">
            <Camera className="w-3.5 h-3.5" />
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
            <Filter className="w-3.5 h-3.5 text-brand-orange" />
            <span>Kategori:</span>
          </div>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-orange text-black font-black shadow-[0_0_15px_rgba(255,107,0,0.5)]'
                  : 'bg-[#140E09] text-slate-300 hover:text-white hover:bg-[#22160E] border border-[#2B1B10]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140E09] border border-[#2B1B10] hover:border-brand-orange/70 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_10px_30px_rgba(255,107,0,0.2)]"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden bg-black/40">
                <img
                  src={`${basePath}${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-black text-amber-300 uppercase">
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-brand-orange/90 text-black text-[10px] font-black">
                  {item.year}
                </div>
              </div>

              <div className="p-3.5 sm:p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-orange transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[10px] text-amber-200/60 font-semibold border-t border-[#22160E]">
                  <span>{item.event}</span>
                  <span className="text-brand-orange group-hover:translate-x-0.5 transition">Lihat &rarr;</span>
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
            className="relative max-w-4xl w-full bg-[#140E09] border border-brand-orange/50 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-orange hover:text-black transition"
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
                <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange text-[10px] font-black uppercase border border-brand-orange/40">
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