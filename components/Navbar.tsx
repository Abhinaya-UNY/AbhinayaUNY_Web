'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Trophy, Newspaper } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#about-tim', label: 'ABOUT US' },
    { href: '/#team-roster', label: 'ROSTER ANGGOTA' },
    { href: '/#prestasi', label: 'ACHIEVEMENTS' },
    { href: '/#berita-media', label: 'BERITA & MEDIA' },
    { href: '/pertandingan', label: 'MATCH & LAGA' },
    { href: '/krtmi', label: 'KRTMI ARCHIVES' },
    { href: '/divisi', label: 'DIVISI TIM' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const topOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080503]/95 backdrop-blur-md border-b border-[#241508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Real Abhinaya Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white p-1 flex items-center justify-center border-2 border-brand-orange group-hover:scale-105 transition flex-shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.5)]">
              <img
                src={`${basePath}/assets/logo_abhinaya.png`}
                alt="Logo Abhinaya UNY"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-orange transition">
                ABHINAYA<span className="text-brand-orange"> UNY</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-200/60 font-bold uppercase tracking-wider">
                KRTMI ROBOTICS TEAM • UNY
              </span>
            </div>
          </Link>

          {/* Floating Pill Center Menu */}
          <nav className="hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#140D08]/90 border border-[#2B1B10] shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1 rounded-full text-xs font-black tracking-wider transition ${
                    isActive
                      ? 'bg-brand-orange text-black shadow-[0_0_15px_rgba(255,107,0,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-[#20150D]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Contact / Social Action Right */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#180F08] border border-brand-orange/40 hover:border-pink-400 text-pink-400 hover:text-white flex items-center justify-center transition shadow-md group"
              title="Official Instagram @abhinaya.uny"
            >
              <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition" />
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#180F08] border border-brand-orange/40 hover:border-cyan-400 text-cyan-400 hover:text-white flex items-center justify-center transition shadow-md group"
              title="Official TikTok @abhinaya.uny"
            >
              <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition" />
            </a>
            <a
              href="https://www.youtube.com/@AbhinayaUNY"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#180F08] border border-brand-orange/40 hover:border-red-500 text-red-500 hover:text-white flex items-center justify-center transition shadow-md group"
              title="Official YouTube @AbhinayaUNY"
            >
              <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-[#140D08] text-brand-orange border border-[#2B1B10] hover:bg-brand-orange hover:text-black transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#0C0704] border-b border-[#241508] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-black tracking-wider transition ${
                  isActive
                    ? 'bg-brand-orange text-black'
                    : 'text-slate-200 hover:text-white hover:bg-[#1E120A]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 flex items-center justify-around border-t border-[#241508]">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-bold text-pink-400"
            >
              <FaInstagram className="w-4 h-4" />
              <span>@abhinaya.uny</span>
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-bold text-cyan-400"
            >
              <FaTiktok className="w-4 h-4" />
              <span>TikTok</span>
            </a>
            <a
              href="https://www.youtube.com/@AbhinayaUNY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-bold text-red-500"
            >
              <FaYoutube className="w-4 h-4" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
