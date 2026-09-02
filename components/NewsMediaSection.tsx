'use client';

import React from 'react';
import { Newspaper, ExternalLink, Trophy, Calendar, Sparkles, Tv, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_NEWS_ARTICLES } from '@/data/newsData';

export const NewsMediaSection: React.FC = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  return (
    <section id="berita-media" className="py-8 sm:py-10 md:py-12 relative border-b border-[#1A120B]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header with Full Width on Laptop */}
        <div className="text-center space-y-2.5 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
            <Newspaper className="w-3.5 h-3.5" />
            <span>NEWS, ARTICLES &amp; MEDIA COVERAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Liputan Berita Resmi &amp; Publikasi Media Nasional 📰
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-4xl mx-auto">
            Kumpulan siaran pers resmi Universitas Negeri Yogyakarta (UNY), liputan video televisi nasional ANTARA News, dan publikasi Puspresnas Kemendikbudristek atas torehan prestasi kontingen robotika Abhinaya UNY.
          </p>
        </div>

        {/* Featured News Grid */}
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
                className={`group rounded-3xl bg-[#130E09] border ${
                  isFirst
                    ? 'border-amber-500/50 hover:border-amber-400 bg-gradient-to-b from-[#1C130A] to-[#120D08] shadow-[0_0_30px_rgba(255,107,0,0.15)] ring-1 ring-amber-500/30'
                    : 'border-[#2B1B10] hover:border-brand-orange/80'
                } p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Top Accent Stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isFirst ? 'bg-gradient-to-r from-amber-400 via-brand-orange to-yellow-500' : 'bg-brand-orange/60'
                  }`}
                />

                <div className="space-y-4">
                  {/* Thumbnail Image Frame */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#180F08] border border-[#2B1B10]">
                    <img
                      src={resolvedImg}
                      alt={article.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 brightness-95 contrast-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `${basePath}/assets/hero_abhinaya.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Top Left */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border backdrop-blur-md shadow-md ${article.badgeColor}`}>
                        <span>{article.badge}</span>
                      </span>
                    </div>

                    {/* Portal Tag Bottom Left */}
                    <div className="absolute bottom-2.5 left-3 flex items-center space-x-1 text-white text-[11px] font-bold drop-shadow">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{article.portal}</span>
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-amber-300/90 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{article.date}</span>
                      </span>
                      {article.stats && (
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {article.stats}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-brand-orange transition line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Action Link */}
                <div className="pt-4 mt-4 border-t border-[#24170E] flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-brand-orange">
                  <span className="flex items-center space-x-1">
                    <span>Baca Artikel Asli</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1F140C] group-hover:bg-brand-orange group-hover:text-black flex items-center justify-center transition">
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
