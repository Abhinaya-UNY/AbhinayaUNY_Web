'use client';

import React from 'react';
import { Newspaper, ExternalLink, Trophy, Calendar, Sparkles, Tv, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_NEWS_ARTICLES } from '@/data/newsData';

export const NewsMediaSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="berita-media" className="py-8 sm:py-10 md:py-12 relative border-b border-emerald-950/60 bg-[#070b09]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header with Full Width on Laptop */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30 shadow-sm">
            <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
            <span>NEWS, ARTICLES &amp; MEDIA COVERAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight ">
            Liputan Berita Resmi &amp; Publikasi Media Nasional 📰
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Kumpulan siaran pers resmi Universitas Negeri Yogyakarta (UNY), liputan video televisi nasional ANTARA News, dan publikasi Puspresnas Kemendikbudristek atas torehan prestasi kontingen robotika Abhinaya UNY.
          </p>
        </div>

        {/* Featured News Grid (Decoupled Unblocked Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {OFFICIAL_NEWS_ARTICLES.map((article, idx) => {
            const isFirst = idx === 0;
            const resolvedImg = article.image.startsWith('http') || article.image.startsWith('/')
              ? `${basePath}${article.image}`
              : `${basePath}/${article.image}`;

            return (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-3xl bg-[#0c1411] border ${
                  isFirst
                    ? 'border-emerald-500/50 hover:border-emerald-400 bg-gradient-to-b from-[#11221a] to-[#0c1411] shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                    : 'border-emerald-950/80 hover:border-emerald-500/70'
                } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Top Accent Stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isFirst ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400' : 'bg-emerald-500/50'
                  }`}
                />

                <div className="space-y-4">
                  {/* 1. Pristine Thumbnail Viewport (100% Unblocked, Zero Text Over Thumbnail) */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-emerald-950/80">
                    <img
                      src={resolvedImg}
                      alt={article.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 brightness-100 contrast-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `${basePath}/assets/hero_abhinaya.jpg`;
                      }}
                    />
                  </div>

                  {/* 2. Dedicated Meta Strip (Cleanly placed in Card Body BELOW the thumbnail) */}
                  <div className="space-y-2.5">
                    {/* Badge & Source Portal Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${article.badgeColor}`}>
                        <span>{article.badge}</span>
                      </span>
                      <div className="flex items-center space-x-1 text-emerald-300/90 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{article.portal}</span>
                      </div>
                    </div>

                    {/* Date & Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-emerald-400/90 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{article.date}</span>
                      </span>
                      {article.stats && (
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {article.stats}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* 3. Card Footer: Action Link */}
                <div className="pt-4 mt-4 border-t border-emerald-950/70 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-emerald-200">
                  <span className="flex items-center space-x-1">
                    <span>Baca Artikel Asli</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#13231c] group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};