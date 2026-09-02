import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export const SocialMediaHub: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-[#0E0905] border-t border-[#2B1B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-pink-500/15 text-pink-400 text-xs font-black uppercase tracking-wider border border-pink-500/30">
            <FaInstagram className="w-3.5 h-3.5 text-pink-400" />
            <span>TERHUBUNG DENGAN TIM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight ">
            Ikuti Aktivitas &amp; Update Harian Abhinaya! 📱
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Dapatkan cuplikan di balik layar (*behind the scenes*), proses riset robotika terbaru, info open recruitment, dan dokumentasi kejuaraan di media sosial resmi kami.
          </p>
        </div>

        {/* 3 Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/abhinaya.uny/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-gradient-to-br from-[#260C1A] to-[#12070D] border-2 border-pink-500/40 hover:border-pink-400 transition space-y-4 group shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/40 group-hover:scale-110 transition">
                <FaInstagram className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                Official Instagram
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white group-hover:text-pink-300 transition">
                @abhinaya.uny
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Foto dokumentasi lomba KRI, recap kejuaraan, pengenalan robot, dan kegiatan riset workshop robotika UNY.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-pink-400 group-hover:text-pink-300">
              <span>Buka Profil Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* TikTok Card */}
          <a
            href="https://www.tiktok.com/@abhinaya.uny"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-gradient-to-br from-[#1F140A] to-[#0F0B06] border-2 border-brand-orange/40 hover:border-brand-orange transition space-y-4 group shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 group-hover:scale-110 transition">
                <FaTiktok className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30">
                Official TikTok
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition">
                @abhinaya.uny
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Video pendek seru, uji coba gerakan robot, trik mekanik &amp; koding, serta keseruan anak-anak robotika di lab.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-brand-orange group-hover:text-amber-300">
              <span>Tonton di TikTok</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* YouTube Card */}
          <a
            href="https://www.youtube.com/@AbhinayaUNY"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-gradient-to-br from-[#1A0A0A] to-[#0D0606] border-2 border-red-600/40 hover:border-red-500 transition space-y-4 group shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-600/40 group-hover:scale-110 transition">
                <FaYoutube className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold border border-red-600/30">
                Official YouTube
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition">
                @AbhinayaUNY
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Video lengkap dokumentasi laga KRI, vlog behind the scenes kompetisi, dan rekap perjalanan riset robotika dari berbagai musim.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-red-500 group-hover:text-red-400">
              <span>Tonton di YouTube</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};