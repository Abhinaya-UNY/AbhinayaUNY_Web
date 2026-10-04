'use client';

import React, { useEffect } from 'react';

export const ScrollObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealAll = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => el.classList.add('is-revealed'));
    };

    // Fast-path fallback if IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    // Immediately reveal all elements if user prefers reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      revealAll();
      return;
    }

    // High-performance native IntersectionObserver
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '120px 0px 0px 0px',
        threshold: 0.02,
      }
    );

    const checkAndObserve = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    checkAndObserve();

    // Check again when preloader dismisses so sections below Hero reveal immediately
    const handleDismiss = () => {
      setTimeout(checkAndObserve, 50);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss);

    // Global fail-safe timeout: after 1.5s, reveal all remaining elements unconditionally
    // to guarantee no section on the website ever remains invisible or black
    const safetyTimer = setTimeout(() => {
      revealAll();
    }, 1500);

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollObserver;
