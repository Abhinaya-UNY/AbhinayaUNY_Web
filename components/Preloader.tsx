'use client';

import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('abhinaya_preloader_loaded');
    if (hasLoaded) {
      setIsLoaded(true);
      return;
    }

    // Dynamic loading progression from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => {
              setIsLoaded(true);
              sessionStorage.setItem('abhinaya_preloader_loaded', 'true');
            }, 500);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 9) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  const getStatusText = () => {
    if (progress < 30) return 'INITIALIZING CORE TELEMETRY';
    if (progress < 70) return 'SYNCHRONIZING KRTMI DATA ARCHIVES';
    if (progress < 100) return 'CALIBRATING MECANUM KINEMATICS';
    return 'ALL SYSTEMS READY';
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center transition-opacity duration-500 select-none"
      style={{ opacity }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute w-72 h-72 bg-brand-orange/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs w-full px-4">
        {/* Clean Logo Stage (NO rotating ketupat spinner) */}
        <div className="relative w-16 h-16 rounded-2xl bg-[#0B0B0E] border border-white/10 p-2 flex items-center justify-center shadow-2xl">
          <img
            src={`${basePath}/assets/logo_abhinaya.png`}
            alt="Logo Abhinaya UNY"
            className="w-full h-full object-contain brightness-105"
          />
        </div>

        {/* Brand Wordmark & Telemetry */}
        <div className="text-center space-y-1">
          <p className="text-xs font-mono font-bold tracking-[0.3em] text-white uppercase">
            ABHINAYA <span className="text-brand-orange">UNY</span>
          </p>
          <p className="text-[10px] font-mono text-slate-500 tracking-wider">
            {getStatusText()}
          </p>
        </div>

        {/* Sleek Linear Progress Bar + Numeric Counter */}
        <div className="w-full space-y-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/8">
            <div
              className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>KRTMI ROBOTICS PORTAL</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

