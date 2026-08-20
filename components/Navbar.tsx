'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Trophy, History, Users, Instagram, Phone, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#about-tim', label: 'ABOUT US' },
    { href: '/krtmi', label: 'KRTMI ARCHIVES' },
    { href: '/divisi', label: 'DIVISI TIM' },
    { href: '/prestasi', label: 'ACHIEVEMENTS' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080503]/90 backdrop-blur-md border-b border-[#241508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Real Abhinaya Logo Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange/30 to-amber-600/20 p-1 flex items-center justify-center border border-brand-orange/40 group-hover:scale-105 transition flex-shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
              <img
                src={`${basePath}/assets/logo_abhinaya.png`}
                alt="Logo Abhinaya UNY"
                className="w-9 h-9 object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-white group-hover:text-brand-orange transition">
                ABHINAYA<span className="text-brand-orange"> UNY</span>
              </span>
              <span className="text-[10px] text-amber-200/60 font-bold uppercase tracking-wider">
                KRTMI ROBOTICS TEAM • UNY
              </span>
            </div>
          </Link>

          {/* Floating Pill Center Menu */}
          <nav className="hidden md:flex items-center space-x-1 px-4 py-2 rounded-full bg-[#140D08]/90 border border-[#2B1B10] shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider transition ${
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
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#180F08] border border-brand-orange/40 hover:border-brand-orange text-amber-300 hover:text-white flex items-center justify-center transition shadow-md group"
              title="Official Instagram @abhinaya.uny"
            >
              <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition" />
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#180F08] border border-brand-orange/40 hover:border-brand-orange text-amber-300 hover:text-white flex items-center justify-center transition shadow-md group text-xs font-black"
              title="Official TikTok @abhinaya.uny"
            >
              TT
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-[#180F08] border border-brand-orange/30 text-amber-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[#241508] bg-[#0A0704] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-xs font-black tracking-wider transition ${
                  isActive
                    ? 'bg-brand-orange text-black'
                    : 'text-slate-300 bg-[#140E09] hover:bg-[#20150D]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
