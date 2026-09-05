'use client';

import React, { useState, useEffect } from 'react';
import {
  Instagram,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkles,
  Award,
  Images,
  Maximize2,
  X,
  Share2,
  CheckCircle2,
  Flame,
  MessageCircle,
} from 'lucide-react';
import {
  InstagramFeedItem,
  INSTAGRAM_FEED_ITEMS,
  INSTAGRAM_FEED_CATEGORIES,
} from '@/data/instagramFeedData';

interface InstagramFeedShowcaseProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

export const InstagramFeedShowcase: React.FC<InstagramFeedShowcaseProps> = ({
  limit,
  showHeader = true,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Feed');
  const [selectedPost, setSelectedPost] = useState<InstagramFeedItem | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState<number>(0);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  // Auto rotate images on cards with multiple photos
  useEffect(() => {
    const timer = setInterval(() => {
      setCardImageIndices((prev) => {
        const next = { ...prev };
        INSTAGRAM_FEED_ITEMS.forEach((post) => {
          if (post.images.length > 1) {
            const cur = next[post.id] || 0;
            next[post.id] = (cur + 1) % post.images.length;
          }
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Filter posts
  const filteredPosts =
    selectedCategory === 'Semua Feed'
      ? INSTAGRAM_FEED_ITEMS
      : INSTAGRAM_FEED_ITEMS.filter((p) => p.category === selectedCategory);

  const displayPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts;

  const openPostModal = (post: InstagramFeedItem) => {
    setSelectedPost(post);
    setModalImageIdx(0);
    document.body.style.overflow = 'hidden';
  };

  const closePostModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="instagram-feed" className={`py-14 sm:py-18 md:py-24 relative ${className}`}>
      {/* Background Cyber Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-brand-orange/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-10">
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono tracking-wider border border-white/10">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>OFFICIAL INSTAGRAM LIVE FEED ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Galeri &amp; Feed Instagram @abhinaya.uny
              </h2>
              <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
                Dokumentasi visual HD, liputan momen laga KRTMI, pengenalan divisi resmi, dan semangat juang kontingen robotika UNY yang terbit langsung di kanal media sosial resmi.
              </p>
            </div>

            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition hover:border-white/20 flex-shrink-0 cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Follow @abhinaya.uny</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </a>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {INSTAGRAM_FEED_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'Semua Feed'
                ? INSTAGRAM_FEED_ITEMS.length
                : INSTAGRAM_FEED_ITEMS.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-brand-orange text-black font-bold shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isActive ? 'bg-black/20 text-black font-mono font-bold' : 'bg-white/10 text-slate-400 font-mono'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayPosts.map((post) => {
            const activeIdx = cardImageIndices[post.id] || 0;
            const currentImg = post.images[activeIdx] || post.coverImage;

            return (
              <div
                key={post.id}
                onClick={() => openPostModal(post)}
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
                className="group cursor-pointer rounded-2xl bg-[#0B0B0E] border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* 1. Dedicated Card Mini-Header (Cleanly placed ABOVE photo) */}
                <div className="px-4 py-3 bg-[#0E0E12] border-b border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 p-0.5 flex items-center justify-center">
                      <Instagram className="w-3 h-3 text-pink-400" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-300">@abhinaya.uny</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[10px] font-mono font-bold border border-white/10">
                      {post.category}
                    </span>
                    {post.images.length > 1 && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-black/60 text-slate-300 text-[10px] font-mono font-bold border border-white/10">
                        <Images className="w-3 h-3 text-slate-400" />
                        <span>{activeIdx + 1}/{post.images.length}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Pristine Photo Viewport (100% Unblocked, Zero Dark Gradient, Zero Text Over Face) */}
                <div className="relative w-full aspect-square overflow-hidden bg-black">
                  {/* Render all images stacked for smooth crossfade transition */}
                  {post.images.map((imgSrc, idx) => (
                    <img
                      key={imgSrc}
                      src={`${basePath}${imgSrc}`}
                      alt={post.title}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                        idx === activeIdx
                          ? 'opacity-100 scale-100 z-10 brightness-100 contrast-105'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                      }`}
                    />
                  ))}

                  {/* Subtle expand icon visible on card hover */}
                  <div className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/75 text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 flex items-center justify-center border border-white/20 transition duration-300 backdrop-blur-sm shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. Slide Indicator Strip (Cleanly placed OUTSIDE photo canvas) */}
                {post.images.length > 1 && (
                  <div className="py-1.5 bg-[#0E0E12] border-y border-white/5 flex items-center justify-center space-x-1.5">
                    {post.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeIdx
                            ? 'w-5 bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)]'
                            : 'w-1.5 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* 4. Dedicated Card Content (Cleanly placed BELOW photo) */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-[#0B0B0E]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center space-x-1 text-slate-400 font-bold">
                        <Calendar className="w-3 h-3 text-brand-orange" />
                        <span>{post.timestamp.split(' ')[0]}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10 text-[10px]">
                        Arsip Resmi
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition line-clamp-2">
                      {post.title}
                    </h3>

                    {post.caption && (
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                        {post.caption}
                      </p>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-brand-orange transition">
                    <span className="flex items-center space-x-1">
                      <span>Buka Dokumentasi &amp; {post.images.length} Foto</span>
                    </span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Post Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={closePostModal}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0B0B0E] border border-white/15 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePostModal}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-brand-orange hover:text-black text-white flex items-center justify-center transition border border-white/20 cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Large Photo Carousel Stage */}
            <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center min-h-[320px] sm:min-h-[420px] select-none">
              <img
                src={`${basePath}${selectedPost.images[modalImageIdx] || selectedPost.coverImage}`}
                alt={`${selectedPost.title} - Slide ${modalImageIdx + 1}`}
                className="w-full h-full object-contain max-h-[70vh]"
              />

              {/* Prev / Next Buttons */}
              {selectedPost.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setModalImageIdx(
                        (prev) => (prev - 1 + selectedPost.images.length) % selectedPost.images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-brand-orange hover:text-black text-white flex items-center justify-center transition border border-white/20 shadow-lg cursor-pointer"
                    aria-label="Foto sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setModalImageIdx((prev) => (prev + 1) % selectedPost.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-brand-orange hover:text-black text-white flex items-center justify-center transition border border-white/20 shadow-lg cursor-pointer"
                    aria-label="Foto berikutnya"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slide Indicator Badge */}
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center space-x-1.5">
                    {selectedPost.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalImageIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === modalImageIdx
                            ? 'w-7 bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)]'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right: Caption & Post Metadata */}
            <div className="w-full md:w-2/5 p-6 sm:p-7 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#0E0E12] border-t md:border-t-0 md:border-l border-white/5">
              <div className="space-y-4">
                {/* Account Badge & Date */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/10 p-0.5 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        abhinaya.uny
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        UKM Rekayasa Teknologi UNY
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedPost.timestamp}
                  </span>
                </div>

                {/* Post Title & Category */}
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 text-slate-300 text-[10px] font-mono font-bold border border-white/10 inline-block">
                    {selectedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Full Instagram Caption */}
                <div className="p-4 rounded-xl bg-[#0B0B0E] border border-white/5 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-thin">
                  {selectedPost.caption || 'Tidak ada teks caption tambahan.'}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <a
                  href={selectedPost.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Buka di Instagram Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
                </a>

                <div className="text-[10px] text-center text-slate-500">
                  Foto resolusi tinggi diekstrak langsung dari Instagram @abhinaya.uny
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};