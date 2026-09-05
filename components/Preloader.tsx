'use client';

import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('abhinaya_preloader_loaded');
    if (hasLoaded) {
      setIsLoaded(true);
      return;
    }

    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setIsLoaded(true);
        sessionStorage.setItem('abhinaya_preloader_loaded', 'true');
      }, 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#050507] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Logo + spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border border-brand-orange/30 border-t-brand-orange animate-spin" />
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Wordmark */}
        <p className="text-[11px] font-mono font-semibold tracking-[0.3em] text-slate-500 uppercase">
          ABHINAYA <span className="text-brand-orange">UNY</span>
        </p>
      </div>
    </div>
  );
};
