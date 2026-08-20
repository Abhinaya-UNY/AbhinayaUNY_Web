'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Trophy, History, Users, Youtube, Instagram, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Bot },
    { href: '/krtmi', label: 'Cerita KRTMI (2019–2026)', icon: History },
    { href: '/divisi', label: 'Divisi Tim', icon: Users },
    { href: '/prestasi', label: 'Prestasi Juara', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A1D13] bg-[#0A0704]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-orange via-amber-500 to-red-600 p-0.5 shadow-[0_0_25px_rgba(255,107,0,0.45)] group-hover:scale-105 transition flex-shrink-0">
              <div className="w-full h-full bg-[#0E0B08] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-brand-orange" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-brand-orange transition">
                  ABHINAYA<span className="text-brand-orange">.UNY</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                  KRTMI UNY
                </span>
              </div>
              <span className="text-[10px] text-amber-200/60 font-semibold tracking-wider uppercase">
                Kontes Robot Tematik Indonesia • FT UNY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/50 shadow-[0_0_20px_rgba(255,107,0,0.25)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Social Badges Right */}
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1A120B] border border-brand-orange/30 hover:border-brand-orange text-amber-200 hover:text-white text-xs font-bold transition"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>@abhinaya.uny</span>
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1A120B] border border-brand-orange/30 hover:border-brand-orange text-amber-200 hover:text-white text-xs font-bold transition"
            >
              <span>TikTok</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-[#1A120B] border border-brand-orange/30 text-amber-200 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[#2A1D13] bg-[#0A0704] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-xl text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40'
                    : 'text-slate-300 bg-slate-900/50 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-brand-orange" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 flex gap-2">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl bg-[#1A120B] border border-brand-orange/30 text-xs font-bold text-amber-300"
            >
              Instagram @abhinaya.uny
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl bg-[#1A120B] border border-brand-orange/30 text-xs font-bold text-amber-300"
            >
              TikTok
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
