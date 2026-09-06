'use client';

import React, { useEffect, useState } from 'react';

export interface AuroraProps {
  className?: string;
  intensity?: 'subtle' | 'medium';
  showVignette?: boolean;
}

export const Aurora: React.FC<AuroraProps> = ({
  className = '',
  intensity = 'subtle',
  showVignette = true,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const opacityClass = intensity === 'subtle' ? 'opacity-40' : 'opacity-65';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${opacityClass} ${className}`}
    >
      {/* Aurora Orb 1: Vibrant Cyber Orange Glow */}
      <div
        className={`absolute -top-32 left-1/4 w-[500px] sm:w-[720px] h-[350px] sm:h-[480px] rounded-full bg-orange-500/12 blur-[130px] transition-transform duration-1000 ${
          reducedMotion ? '' : 'animate-aurora-drift-1'
        }`}
      />

      {/* Aurora Orb 2: Warm Golden Amber Ambiance */}
      <div
        className={`absolute -top-20 right-1/4 w-[400px] sm:w-[620px] h-[300px] sm:h-[420px] rounded-full bg-amber-500/8 blur-[140px] transition-transform duration-1000 ${
          reducedMotion ? '' : 'animate-aurora-drift-2'
        }`}
      />

      {/* Aurora Orb 3: Bottom Grounding Ambient Light */}
      <div
        className="absolute -bottom-40 left-1/3 w-[600px] h-[300px] rounded-full bg-orange-600/5 blur-[150px]"
      />

      {/* Deep Obsidian Grounding Vignette */}
      {showVignette && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0E]/60 to-[#0B0B0E]" />
      )}
    </div>
  );
};

export default Aurora;
