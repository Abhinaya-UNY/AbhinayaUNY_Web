'use client';

import React, { useState, useEffect, useRef } from 'react';

// Safe Session Storage wrapper to handle Incognito / Private Browsing & WebView restrictions
const safeSession = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // Insecure/denied storage access in private modes
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch {
      // Ignore quota or security errors
    }
  },
};

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';
  const dismissedRef = useRef(false);

  useEffect(() => {
    // 1. Fast-path: already loaded in this session
    const hasLoaded = safeSession.getItem('abhinaya_preloader_loaded');
    if (hasLoaded) {
      dismissedRef.current = true;
      setIsLoaded(true);
      if (typeof window !== 'undefined') {
        (window as any).__ABHINAYA_PRELOADER_DONE = true;
        window.dispatchEvent(new CustomEvent('abhinaya:preloader-dismiss'));
      }
      return;
    }

    // Dismissal coordinator: safe, single-execution, fail-open
    const completeDismissal = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;

      if (typeof window !== 'undefined') {
        (window as any).__ABHINAYA_PRELOADER_DONE = true;
        try {
          window.dispatchEvent(new CustomEvent('abhinaya:preloader-dismiss'));
        } catch {
          // Fallback if custom events error
        }
        safeSession.setItem('abhinaya_preloader_loaded', 'true');
      }

      setOpacity(0);
      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    };

    // 2. Hard absolute safety timer (max 1800ms) - guarantees screen is NEVER stuck black
    const safetyTimer = setTimeout(() => {
      completeDismissal();
    }, 1800);

    // 3. Dynamic loading progression
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 10) + 6;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeDismissal();
        }, 150);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
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
      className={`fixed inset-0 z-[9999] bg-[#0B0B0E] flex flex-col items-center justify-center transition-opacity duration-400 select-none ${
        opacity === 0 ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
      style={{ opacity }}
    >
      {/* Subtle ambient orange glow */}
      <div className="absolute w-72 h-72 bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs w-full px-4">
        {/* Clean Logo Stage */}
        <div className="relative w-16 h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-2xl border border-white/20">
          <img
            src={`${basePath}/assets/logo_abhinaya.png`}
            alt="Logo Abhinaya UNY"
            className="w-full h-full object-contain brightness-105"
          />
        </div>

        {/* Brand Wordmark & Telemetry */}
        <div className="text-center space-y-1">
          <p className="text-xs font-mono font-bold tracking-[0.3em] text-white uppercase">
            ABHINAYA <span className="text-orange-400">UNY</span>
          </p>
          <p className="text-[10px] font-mono text-slate-400 tracking-wider">
            {getStatusText()}
          </p>
        </div>

        {/* Sleek Linear Progress Bar with Orange Gradient */}
        <div className="w-full space-y-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-300 rounded-full transition-all duration-100 ease-out shadow-orange-glow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>KRTMI ROBOTICS PORTAL</span>
            <span className="text-orange-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
