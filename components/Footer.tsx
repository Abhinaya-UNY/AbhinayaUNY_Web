import React from 'react';
import Link from 'next/link';
import { Bot, Shield, Trophy, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-border bg-[#04060B] text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-indigo p-0.5">
                <div className="w-full h-full bg-[#070B12] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="font-black text-lg text-white">
                ABHINAYA ROBOTICS TEAM UNY
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              Tim Riset dan Pengembangan Robotika Universitas Negeri Yogyakarta pada divisi Kontes Robot Tematik Indonesia (KRTMI) — mengintegrasikan kecerdasan buatan, visi komputer, dan sistem kinematika otonom untuk memecahkan tantangan teknologi nasional.
            </p>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              Arsip &amp; Dokumentasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/krtmi" className="hover:text-brand-cyan transition">
                  Perjalanan KRTMI (2019 - 2024)
                </Link>
              </li>
              <li>
                <Link href="/krtmi#technocorner2026" className="hover:text-brand-cyan transition">
                  Technocorner 2026 Transporter
                </Link>
              </li>
              <li>
                <Link href="/teknis" className="hover:text-brand-cyan transition">
                  Spesifikasi &amp; Kinematika Robot
                </Link>
              </li>
              <li>
                <Link href="/prestasi" className="hover:text-brand-cyan transition">
                  Prestasi &amp; Penghargaan Nasional
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institusi & Penyelenggara */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
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
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Tim Robotika Abhinaya UNY. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center space-x-1">
            <span>Dirancang untuk Edukasi &amp; Riset Robotika Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
