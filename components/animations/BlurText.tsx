'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface BlurTextProps {
  text: string;
  delay?: number;                  // Stagger delay per unit in ms (default: 60)
  className?: string;              // Base typography classes
  animateBy?: 'words' | 'letters'; // Split granularity (default: 'words')
  direction?: 'top' | 'bottom';    // Slide-in direction (default: 'top')
  threshold?: number;              // Intersection threshold (default: 0.1)
  rootMargin?: string;             // Margin around viewport (default: '0px')
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 60,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const onAnimationCompleteRef = useRef(onAnimationComplete);
  onAnimationCompleteRef.current = onAnimationComplete;

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setPrefersReducedMotion(true);
        setInView(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Callback on animation complete
  useEffect(() => {
    if (inView && onAnimationCompleteRef.current) {
      const totalDuration = prefersReducedMotion ? 0 : (elements.length - 1) * delay + 700;
      const timer = setTimeout(() => {
        onAnimationCompleteRef.current?.();
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [inView, elements.length, delay, prefersReducedMotion]);

  return (
    <span
      ref={containerRef}
      aria-label={text}
      className={`inline-flex flex-wrap items-baseline ${className}`}
    >
      {elements.map((el, i) => (
        <span key={i} className="inline-block">
          <span
            aria-hidden="true"
            className="inline-block transition-all ease-out will-change-[transform,opacity,filter]"
            style={{
              transform: inView
                ? 'translateY(0)'
                : direction === 'top'
                ? 'translateY(-14px)'
                : 'translateY(14px)',
              opacity: inView ? 1 : 0,
              filter: inView ? 'blur(0px)' : 'blur(8px)',
              transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
              transitionDelay: prefersReducedMotion ? '0ms' : `${i * delay}ms`,
            }}
          >
            {el === ' ' ? '\u00A0' : el}
          </span>
          {animateBy === 'words' && i < elements.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
