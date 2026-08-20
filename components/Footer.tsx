import React from 'react';
import Link from 'next/link';
import { Bot, Trophy, Instagram, Youtube, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#26180E] bg-[#070503] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-orange via-amber-500 to-red-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0E0B08] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-orange" />
                </div>
              </div>
              <span className="font-black text-lg text-white">
                TIM ROBOTIKA ABHINAYA UNY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              Tim Riset &amp; Pengembangan Robotika Universitas Negeri Yogyakarta pada divisi Kontes Robot Tematik Indonesia (KRTMI) — mewadahi mahasiswa berkreasi, berinovasi, dan meraih prestasi di kancah robotika nasional.
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-orange transition">
                  Beranda Tim
                </Link>
              </li>
              <li>
                <Link href="/krtmi" className="hover:text-brand-orange transition">
                  Cerita KRTMI (2019 – 2026)
                </Link>
              </li>
              <li>
                <Link href="/divisi" className="hover:text-brand-orange transition">
                  Divisi &amp; Kultur Tim
                </Link>
              </li>
              <li>
                <Link href="/prestasi" className="hover:text-brand-orange transition">
                  Prestasi Kejuaraan
                </Link>
              </li>
            </ul>
          </div>

          {/* Media Sosial & Kampus */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Media Sosial &amp; Afiliasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.instagram.com/abhinaya.uny/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition flex items-center space-x-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                  <span>Instagram @abhinaya.uny</span>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@abhinaya.uny" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition flex items-center space-x-1.5">
                  <span>TikTok @abhinaya.uny</span>
                </a>
              </li>
              <li>
                <a href="https://uny.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition flex items-center space-x-1.5">
                  <span>Universitas Negeri Yogyakarta</span>
                </a>
              </li>
              <li>
                <a href="https://pusatprestasinasional.kemdikbud.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition flex items-center space-x-1.5">
                  <span>BPTI Puspresnas</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#1C120A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Tim Robotika Abhinaya Universitas Negeri Yogyakarta.
          </div>
          <div>
            Dibuat untuk Mengenalkan Robotika Tematik UNY kepada Mahasiswa &amp; Publik
          </div>
        </div>

      </div>
    </footer>
  );
};
