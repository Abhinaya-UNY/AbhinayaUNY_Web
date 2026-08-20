import React from 'react';
import { Play, Youtube, Sparkles, Trophy, ExternalLink } from 'lucide-react';

export const YouTubeVideoShowcase: React.FC = () => {
  return (
    <section id="video-aksi" className="py-16 bg-[#0E0905] border-y border-[#2B1B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-black uppercase tracking-wider border border-red-500/30">
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>VIDEO AKSI RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Lihat Robot Abhinaya UNY Beraksi di Arena! 🎬
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Saksikan bagaimana robot otonom Tim Abhinaya bermanuver lincah, mendeteksi objek dengan kamera AI, dan mengeksekusi misi lomba dengan kecepatan tinggi.
          </p>
        </div>

        {/* Video Embed Card */}
        <div className="max-w-4xl mx-auto">
          <div className="p-3 sm:p-5 rounded-3xl bg-[#171008] border-2 border-brand-orange/40 shadow-[0_0_50px_rgba(255,107,0,0.25)] space-y-4">
            
            {/* Responsive 16:9 Video Frame */}
            <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3yr5uNkxA_8?rel=0&modestbranding=1"
                title="Robot Abhinaya UNY in Action - KRTMI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Subtitle & Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#0F0B07] text-xs">
              <div className="flex items-center space-x-2 text-amber-200">
                <Trophy className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Dokumentasi Uji Coba &amp; Laga Robot Otonom Abhinaya UNY</span>
              </div>
              <a
                href="https://youtu.be/3yr5uNkxA_8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1.5 transition"
              >
                <span>Tonton di YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
