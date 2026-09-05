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
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-brand-orange/15 text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-500/30 shadow-sm">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>OFFICIAL INSTAGRAM LIVE FEED ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight ">
                Galeri &amp; Feed Instagram @abhinaya.uny 📸
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                Dokumentasi visual HD, liputan momen laga KRTMI, pengenalan divisi resmi, dan semangat juang kontingen robotika UNY yang terbit langsung di kanal media sosial resmi.
              </p>
            </div>

            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white text-xs font-black transition shadow-lg shadow-pink-600/20 hover:scale-105 flex-shrink-0"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @abhinaya.uny</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
            </a>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-orange/30">
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 text-black shadow-lg shadow-brand-orange/25 scale-[1.02]'
                    : 'bg-[#140E09] text-slate-300 hover:text-white hover:bg-[#1E140C] border border-[#2A180E]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-black/20 text-black font-mono font-black' : 'bg-black/50 text-amber-300/70 font-mono'
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
                className="group cursor-pointer rounded-3xl bg-[#120D08] border border-[#2A180E] hover:border-brand-orange/60 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/15 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* 1. Dedicated Card Mini-Header (Cleanly placed ABOVE photo) */}
                <div className="px-4 py-3 bg-[#180F09] border-b border-[#2A180E] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <Instagram className="w-3 h-3 text-pink-400" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-200">@abhinaya.uny</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#221309] text-amber-300 text-[10px] font-mono font-bold border border-brand-orange/25">
                      {post.category}
                    </span>
                    {post.images.length > 1 && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-black/60 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/20">
                        <Images className="w-3 h-3 text-amber-400" />
                        <span>{activeIdx + 1}/{post.images.length}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Pristine Photo Viewport (100% Unblocked, Zero Dark Gradient, Zero Text Over Face) */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#0A0704]">
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
                  <div className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/75 text-amber-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 flex items-center justify-center border border-brand-orange/40 transition duration-300 backdrop-blur-sm shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* 3. Slide Indicator Strip (Cleanly placed OUTSIDE photo canvas) */}
                {post.images.length > 1 && (
                  <div className="py-1.5 bg-[#140E09] border-y border-[#2A180E] flex items-center justify-center space-x-1.5">
                    {post.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeIdx
                            ? 'w-5 bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)]'
                            : 'w-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* 4. Dedicated Card Content (Cleanly placed BELOW photo) */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-[#120D08]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center space-x-1 text-brand-orange font-bold">
                        <Calendar className="w-3 h-3 text-brand-orange" />
                        <span>{post.timestamp.split(' ')[0]}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#1C130B] text-amber-300/90 border border-brand-orange/20 text-[10px]">
                        Arsip Resmi
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white group-hover:text-amber-300 transition line-clamp-2">
                      {post.title}
                    </h3>

                    {post.caption && (
                      <p className="text-xs text-slate-300/90 line-clamp-3 leading-relaxed font-sans">
                        {post.caption}
                      </p>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-[#2A180E] flex items-center justify-between text-xs font-bold text-brand-orange group-hover:text-amber-300">
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
            className="relative w-full max-w-4xl bg-[#140E09] border-2 border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 max-h-[92vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePostModal}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/80 hover:bg-pink-600 text-white flex items-center justify-center transition border border-white/20"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-pink-600 text-white flex items-center justify-center transition border border-white/20 shadow-lg"
                    aria-label="Foto sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setModalImageIdx((prev) => (prev + 1) % selectedPost.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-pink-600 text-white flex items-center justify-center transition border border-white/20 shadow-lg"
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
                            ? 'w-7 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.9)]'
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
            <div className="w-full md:w-2/5 p-6 sm:p-7 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#160E08] border-t md:border-t-0 md:border-l border-[#2B1B10]">
              <div className="space-y-4">
                {/* Account Badge & Date */}
                <div className="flex items-center justify-between pb-3 border-b border-[#2B1B10]">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-pink-400" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block leading-tight">
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
                  <span className="px-2.5 py-0.5 rounded-lg bg-pink-950/40 text-pink-300 text-[10px] font-mono font-bold border border-pink-500/30 inline-block">
                    {selectedPost.category}
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Full Instagram Caption */}
                <div className="p-4 rounded-2xl bg-[#1A1009] border border-[#2B1B10] text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500/30">
                  {selectedPost.caption || 'Tidak ada teks caption tambahan.'}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-3 border-t border-[#26170E]">
                <a
                  href={selectedPost.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white text-xs font-black flex items-center justify-center space-x-2 transition shadow-lg shadow-pink-600/20"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Buka di Instagram Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <div className="text-[10px] text-center text-slate-400">
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