'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Cpu, Trophy, History, BookOpen, Menu, X, ExternalLink, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Bot },
    { href: '/krtmi', label: 'Perjalanan KRTMI (2019-2026)', icon: History },
    { href: '/teknis', label: 'Spesifikasi & Kinematika', icon: Cpu },
    { href: '/prestasi', label: 'Prestasi Nasional', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-[#070B12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-indigo p-0.5 shadow-[0_0_20px_rgba(0,245,212,0.4)] group-hover:scale-105 transition flex-shrink-0">
              <div className="w-full h-full bg-[#070B12] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-brand-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-brand-cyan transition">
                  ABHINAYA<span className="text-brand-cyan">.UNY</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
                  ROBOTICS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Kontes Robot Tematik Indonesia • UNY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40 shadow-[0_0_15px_rgba(0,245,212,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://github.com/Abhinaya-UNY/AbhinayaUNY_Web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-slate-300 hover:text-white text-xs font-bold transition"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-cyan" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-border bg-[#070B12] px-4 py-4 space-y-2">
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
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40'
                    : 'text-slate-300 bg-slate-900/50 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-brand-cyan" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
