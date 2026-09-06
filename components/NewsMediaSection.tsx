'use client';

import React from 'react';
import { Newspaper, ExternalLink, Trophy, Calendar, Sparkles, Tv, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_NEWS_ARTICLES } from '@/data/newsData';
import { SpotlightCard, DecryptedText } from '@/components/animations';

export const NewsMediaSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="berita-media" className="py-8 sm:py-10 md:py-12 relative border-b border-white/[0.06] bg-[#0B0B0E]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-orange-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header (Editorial Split Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono tracking-wider border border-orange-500/20">
              <Newspaper className="w-3.5 h-3.5 text-orange-400" />
              <span>NEWS, ARTICLES &amp; MEDIA COVERAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Liputan Berita Resmi &amp; Publikasi Media Nasional
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
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
              <SpotlightCard
                as="a"
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                spotlightColor="rgba(255, 107, 0, 0.15)"
                spotlightSize={350}
                className={`group rounded-2xl bg-[#121216] border ${
                  isFirst
                    ? 'border-orange-500/40 hover:border-orange-400/70 shadow-lg shadow-orange-500/5'
                    : 'border-white/[0.08] hover:border-orange-500/30'
                } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="space-y-4">
                  {/* 1. Pristine Thumbnail Viewport (100% Unblocked, Zero Text Over Thumbnail) */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-white/[0.08]">
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
                        <DecryptedText text={article.badge} animateOn="hover" />
                      </span>
                      <div className="flex items-center space-x-1 text-orange-400/90 text-[11px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                        <DecryptedText text={article.portal} animateOn="hover" className="text-orange-400/90 text-[11px] font-bold" />
                      </div>
                    </div>

                    {/* Date & Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-orange-400/90 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        <span>{article.date}</span>
                      </span>
                      {article.stats && (
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {article.stats}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* 3. Card Footer: Action Link */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-orange-400 transition">
                  <span className="flex items-center space-x-1">
                    <span>Baca Artikel Asli</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 group-hover:bg-orange-400 group-hover:text-black flex items-center justify-center transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};