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
    // Elements fade in when entering viewport.
    // When scrolling down, elements exiting above viewport fade out smoothly (.is-scrolled-above).
    // When scrolling back up, elements re-entering viewport fade back in seamlessly.
    // When elements exit below viewport, they re-prime for future scroll down.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const rect = entry.boundingClientRect;

          if (entry.isIntersecting) {
            target.classList.add('is-revealed');
            target.classList.remove('is-scrolled-above');
          } else {
            if (rect.bottom < 0) {
              // Element is completely scrolled above the viewport -> fade out upward
              target.classList.remove('is-revealed');
              target.classList.add('is-scrolled-above');
            } else if (rect.top > window.innerHeight) {
              // Element is below the viewport -> re-prime for scrolling downward
              target.classList.remove('is-revealed');
              target.classList.remove('is-scrolled-above');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '10px 0px 10px 0px',
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
