'use client';

import React, { useEffect } from 'react';

export const ScrollObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!elements.length) return;

    // Fast-path fallback if IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // High-performance native IntersectionObserver
    // Trigger reveals 100px before element crosses viewport so it glides in seamlessly
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Keep revealed elements visible without un-revealing to prevent layout recalculation
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '100px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => {
      // If already in initial viewport, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollObserver;
