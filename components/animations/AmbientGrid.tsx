'use client';

import React, { useEffect, useState } from 'react';

export interface AmbientGridProps {
  className?: string;
  gridSize?: number;               // Pixel spacing of grid units (default: 40)
  gridColor?: string;              // Stroke line color (default: 'rgba(255, 107, 0, 0.05)')
  dotColor?: string;               // Dot intersection color (default: 'rgba(255, 107, 0, 0.12)')
  showScanLine?: boolean;          // Display scanning sweep beam (default: true)
  showGlow?: boolean;              // Background radial amber spotlight (default: true)
  scanSpeed?: number;              // Scanline cycle speed in seconds (default: 6)
  opacity?: number;                // Overall opacity (default: 1)
}

export const AmbientGrid: React.FC<AmbientGridProps> = ({
  className = '',
  gridSize = 40,
  gridColor = 'rgba(255, 107, 0, 0.05)',
  dotColor = 'rgba(255, 107, 0, 0.12)',
  showScanLine = true,
  showGlow = true,
  scanSpeed = 6,
  opacity = 1,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
      style={{ opacity }}
    >
      {/* SVG Micro-Grid Coordinates */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="abhinaya-grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.5" fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#abhinaya-grid-pattern)" />
      </svg>

      {/* Subtle Ambient Radial Lighting Spotlight */}
      {showGlow && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255, 107, 0, 0.08) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Vignette Edge Mask (Soft fade towards dark borders) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 35%, transparent 30%, #070503 100%)',
        }}
      />

      {/* Subtle Laser / Radar Scanning Line */}
      {showScanLine && !prefersReducedMotion && (
        <div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent animate-pulse-glow"
          style={{
            top: '25%',
            animationDuration: `${scanSpeed}s`,
          }}
        />
      )}
    </div>
  );
};

export default AmbientGrid;
