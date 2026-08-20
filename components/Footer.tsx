import React from 'react';
import Link from 'next/link';
import { Bot, Shield, Trophy, ExternalLink, Heart, Video, Instagram, Youtube, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-border bg-[#04060B] text-slate-400 py-12 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-emerald to-sky-400 p-0.5 shadow-[0_0_20px_rgba(0,245,212,0.3)]">
                <div className="w-full h-full bg-[#070B12] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="font-black text-lg text-white font-mono">
                TIM ROBOTIKA ABHINAYA UNY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              Tim Riset dan Pengembangan Robotika Universitas Negeri Yogyakarta pada divisi Kontes Robot Tematik Indonesia (KRTMI) Puspresnas Kemendikbudristek — mengintegrasikan kecerdasan buatan, visi komputer, dan sistem kinematika otonom untuk memecahkan tantangan teknologi nasional.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/abhinaya.uny/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-400 hover:text-pink-400 transition"
                title="Instagram @abhinaya.uny"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@abhinaya.uny"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-cyan text-slate-400 hover:text-brand-cyan transition"
                title="TikTok @abhinaya.uny"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://youtu.be/3yr5uNkxA_8"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-red-400 transition"
                title="YouTube Video"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-white tracking-wider font-mono">
              Arsip &amp; Dokumentasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/krtmi" className="hover:text-brand-cyan transition">
                  Arsip Regulasi KRTMI (2019 – 2024)
                </Link>
              </li>
              <li>
                <Link href="/krtmi#technocorner2026" className="hover:text-brand-cyan transition">
                  Technocorner 2026 FT UGM
                </Link>
              </li>
              <li>
                <Link href="/teknis" className="hover:text-brand-cyan transition">
                  Laboratorium Kinematika &amp; PID
                </Link>
              </li>
              <li>
                <Link href="/prestasi" className="hover:text-brand-cyan transition">
                  Kabinet Juara Nasional &amp; Pers UNY
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institusi & Penyelenggara */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-white tracking-wider font-mono">
              Afiliasi &amp; Kompetisi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://uny.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition flex items-center space-x-1">
                  <span>Universitas Negeri Yogyakarta</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pusatprestasinasional.kemdikbud.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition flex items-center space-x-1">
                  <span>Puspresnas / BPTI Kemdikbudristek</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://ft.uny.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition flex items-center space-x-1">
                  <span>Fakultas Teknik UNY</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://kri.kemdikbud.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition flex items-center space-x-1">
                  <span>Kontes Robot Indonesia (KRI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Tim Robotika Abhinaya UNY. 100% Data Tim Resmi.
          </div>
          <div className="flex items-center space-x-1">
            <span>Dirancang untuk Riset &amp; Edukasi Robotika Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
