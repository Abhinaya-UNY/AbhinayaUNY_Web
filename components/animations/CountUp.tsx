'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface CountUpProps {
  to: number;                      // Target number
  from?: number;                   // Starting number (default: 0)
  direction?: 'up' | 'down';       // Count direction (default: 'up')
  delay?: number;                  // Delay before counting begins in seconds (default: 0)
  duration?: number;               // Total animation duration in seconds (default: 2)
  className?: string;              // Typography classes
  startWhen?: boolean;             // Custom conditional trigger (default: true)
  separator?: string;              // Thousands separator (e.g. '.' or ',')
  decimals?: number;               // Decimal precision (default: 0)
  decimal?: string;                // Decimal symbol (default: ',')
  prefix?: string;                 // e.g. ''
  suffix?: string;                 // e.g. '+', '%', 's'
}

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  decimals = 0,
  decimal = ',',
  prefix = '',
  suffix = '',
}) => {
  const [currentValue, setCurrentValue] = useState<number>(from);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  const formatNumber = useCallback((val: number): string => {
    const fixed = val.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const formattedInt = separator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : intPart;
    return decPart !== undefined && decimals > 0
      ? `${formattedInt}${decimal}${decPart}`
      : formattedInt;
  }, [decimals, separator, decimal]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setCurrentValue(to);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && startWhen && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime: number | null = null;
          const startVal = direction === 'down' ? to : from;
          const endVal = direction === 'down' ? from : to;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000 - delay;

            if (elapsed <= 0) {
              rafRef.current = requestAnimationFrame(step);
              return;
            }

            const progress = Math.min(elapsed / Math.max(duration, 0.01), 1);
            const easedProgress = easeOutExpo(progress);
            const nextVal = startVal + (endVal - startVal) * easedProgress;

            setCurrentValue(nextVal);

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(step);
            } else {
              setCurrentValue(endVal);
              rafRef.current = null;
            }
          };

          rafRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [to, from, direction, delay, duration, startWhen]);

  return (
    <span ref={containerRef} className={`font-mono inline-block tabular-nums ${className}`}>
      {prefix}
      {formatNumber(currentValue)}
      {suffix}
    </span>
  );
};

export default CountUp;
