import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export const SocialMediaHub: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-[#050507] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono tracking-wider border border-white/10">
            <FaInstagram className="w-3.5 h-3.5 text-pink-400" />
            <span>JARINGAN MEDIA SOSIAL RESMI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ikuti Aktivitas &amp; Update Harian Abhinaya
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Simak cuplikan uji coba sirkuit, tutorial dasar robotika, vlog suasana paddock turnamen, serta informasi open recruitment anggota baru UKM Rekayasa Teknologi UNY.
          </p>
        </div>

        {/* 3 Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/abhinaya.uny/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-2xl bg-[#0B0B0E] border border-white/8 hover:border-white/20 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/5 text-pink-400 flex items-center justify-center border border-white/10 group-hover:scale-105 transition">
                <FaInstagram className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10">
                Official Instagram
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition">
                @abhinaya.uny
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Foto dokumentasi lomba KRI, recap kejuaraan, pengenalan robot, dan kegiatan riset workshop robotika UNY.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-slate-300 group-hover:text-pink-400 transition">
              <span>Buka Profil Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* TikTok Card */}
          <a
            href="https://www.tiktok.com/@abhinaya.uny"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-2xl bg-[#0B0B0E] border border-white/8 hover:border-white/20 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/5 text-brand-orange flex items-center justify-center border border-white/10 group-hover:scale-105 transition">
                <FaTiktok className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10">
                Official TikTok
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition">
                @abhinaya.uny
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Video pendek seru, uji coba gerakan robot, trik mekanik &amp; koding, serta keseruan anak-anak robotika di lab.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-slate-300 group-hover:text-brand-orange transition">
              <span>Tonton di TikTok</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* YouTube Card */}
          <a
            href="https://www.youtube.com/@AbhinayaUNY"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-2xl bg-[#0B0B0E] border border-white/8 hover:border-white/20 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/5 text-red-500 flex items-center justify-center border border-white/10 group-hover:scale-105 transition">
                <FaYoutube className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[11px] font-mono border border-white/10">
                Official YouTube
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                @AbhinayaUNY
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Video lengkap dokumentasi laga KRI, vlog behind the scenes kompetisi, dan rekap perjalanan riset robotika dari berbagai musim.
              </p>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-slate-300 group-hover:text-red-400 transition">
              <span>Tonton di YouTube</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};