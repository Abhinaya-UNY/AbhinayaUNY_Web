'use client';

import React, { useEffect, useState } from 'react';

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;              // Disable animation (default: false)
  speed?: number;                 // Animation duration in seconds (default: 4)
  className?: string;             // Container typography classes
  shimmerColor?: string;          // Optional custom highlight shine color
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerColor,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  const isAnimated = !disabled && !prefersReducedMotion;

  // Custom inline background if shimmerColor specified
  const customGradientStyle = shimmerColor
    ? {
        backgroundImage: `linear-gradient(90deg, #10B981 0%, ${shimmerColor} 50%, #10B981 100%)`,
        backgroundSize: '250% 100%',
        animationDuration: `${speed}s`,
      }
    : {
        animationDuration: `${speed}s`,
      };

  return (
    <span
      className={`relative inline-block ${
        !isAnimated
          ? 'text-emerald-400 font-bold'
          : 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-100 to-emerald-400 bg-[length:250%_100%] animate-shimmer'
      } ${className}`}
      style={isAnimated ? customGradientStyle : undefined}
    >
      {text}
    </span>
  );
};

export default ShinyText;
