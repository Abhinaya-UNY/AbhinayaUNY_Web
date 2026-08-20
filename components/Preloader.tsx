'use client';

import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  useEffect(() => {
    // Check if session has already loaded preloader
    const hasLoaded = sessionStorage.getItem('abhinaya_preloader_loaded');
    if (hasLoaded) {
      setIsLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            sessionStorage.setItem('abhinaya_preloader_loaded', 'true');
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070503] flex flex-col items-center justify-center p-4 transition-opacity duration-700">
      
      {/* Background Neon Blurs */}
      <div className="absolute w-[500px] h-[300px] bg-brand-orange/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-md w-full text-center">
        
        {/* Real Logo with Clean White Background & Animated Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute -inset-1.5 rounded-3xl border-2 border-brand-orange/40 border-t-brand-orange animate-spin" />
          <div className="w-24 h-24 rounded-2xl bg-white p-2 flex items-center justify-center shadow-[0_0_35px_rgba(255,107,0,0.8)]">
            <img
              src={`${basePath}/assets/logo_abhinaya.png`}
              alt="Logo Abhinaya UNY"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white">
            ABHINAYA<span className="text-brand-orange"> UNY</span>
          </h2>
          <p className="text-[11px] font-semibold text-amber-200/70 uppercase tracking-widest">
            Kontes Robot Tematik Indonesia • FT UNY
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2">
          <div className="w-full h-2 bg-[#171009] rounded-full overflow-hidden border border-brand-orange/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-300 rounded-full transition-all duration-150 shadow-[0_0_15px_rgba(255,107,0,0.8)]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-amber-300">
            <span>MEMUAT ARSIP &amp; ASSET ROBOTIKA...</span>
            <span className="font-black">{Math.min(progress, 100)}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
