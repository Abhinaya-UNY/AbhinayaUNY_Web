'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#about-tim', label: 'ABOUT', sectionId: 'about-tim' },
    { href: '/#prestasi', label: 'PRESTASI', sectionId: 'prestasi' },
    { href: '/#kri-overview', label: 'KRI', sectionId: 'kri-overview' },
    { href: '/#krtmi-story', label: 'KRTMI', sectionId: 'krtmi-story' },
    { href: '/#berita-media', label: 'BERITA', sectionId: 'berita-media' },
    { href: '/pertandingan', label: 'LAGA' },
    { href: '/#team-roster', label: 'ROSTER', sectionId: 'team-roster' },
  ];

  // Dynamic Viewport Scroll-Spy Tracking
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['about-tim', 'prestasi', 'kri-overview', 'krtmi-story', 'berita-media', 'team-roster'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // If user is near top of home page, highlight HOME
      if (scrollY < 180) {
        setActiveSection('');
        return;
      }

      const offset = 140; // Navbar offset threshold
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - offset;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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

  const isLinkActive = (link: { href: string; sectionId?: string }) => {
    if (pathname === '/') {
      if (!link.sectionId) {
        return activeSection === '' && link.href === '/';
      }
      return activeSection === link.sectionId;
    }
    return pathname === link.href;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B0B0E]/80 border-b border-white/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 flex items-center justify-center group-hover:opacity-90 transition flex-shrink-0 shadow-md">
              <img
                src={`${basePath}/assets/logo_abhinaya.png`}
                alt="Logo Abhinaya UNY"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-orange-400 transition whitespace-nowrap leading-tight">
                ABHINAYA<span className="text-orange-400"> UNY</span>
              </span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest whitespace-nowrap leading-tight">
                KRTMI — UKM Restek UNY
              </span>
            </div>
          </Link>

          {/* Center Nav with Scroll-Spy Active Indicator */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-widest transition whitespace-nowrap flex-shrink-0 ${
                    active
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-orange-glow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Social Links Right */}
          <div className="hidden sm:flex items-center space-x-1.5 flex-shrink-0">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg text-slate-500 hover:text-pink-400 flex items-center justify-center transition"
              title="Official Instagram @abhinaya.uny"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg text-slate-500 hover:text-cyan-400 flex items-center justify-center transition"
              title="Official TikTok @abhinaya.uny"
            >
              <FaTiktok className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@AbhinayaUNY"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg text-slate-500 hover:text-red-400 flex items-center justify-center transition"
              title="Official YouTube @AbhinayaUNY"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-white/5 transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B0B0E]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn shadow-2xl">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition ${
                  active
                    ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 flex items-center justify-around border-t border-white/10">
            <a
              href="https://www.instagram.com/abhinaya.uny/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-pink-400 transition"
            >
              <FaInstagram className="w-4 h-4" />
              <span>@abhinaya.uny</span>
            </a>
            <a
              href="https://www.tiktok.com/@abhinaya.uny"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition"
            >
              <FaTiktok className="w-4 h-4" />
              <span>TikTok</span>
            </a>
            <a
              href="https://www.youtube.com/@AbhinayaUNY"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-red-400 transition"
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

export default Navbar;
