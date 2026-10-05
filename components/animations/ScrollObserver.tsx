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

    // High-performance bidirectional native IntersectionObserver
    // Elements fade in when entering viewport and gracefully fade out when scrolled below viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            const rect = entry.boundingClientRect;
            // If element is below the viewport, re-prime it so it fades in again when scrolled down
            if (rect.top > window.innerHeight) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        }
        observer.observe(el);
      });
    };

    observeElements();

    // Check again when preloader dismisses so sections below Hero reveal smoothly
    const handleDismiss = () => {
      setTimeout(observeElements, 60);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss);

    // Watch for dynamically loaded content/tabs
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ScrollObserver;
