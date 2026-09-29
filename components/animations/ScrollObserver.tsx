'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealAll = () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
    };

    if (prefersReducedMotion) {
      revealAll();
      return;
    }

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      // Refresh GSAP ScrollTrigger to ensure all section markers align with real layout
      ScrollTrigger.refresh();

      if (observer) {
        observer.disconnect();
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08,
        }
      );

      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
        observer?.observe(el);
      });
    };

    // Watch for new elements inserted into the DOM (e.g. tabs change, dynamic filters)
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
        observer?.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Handle preloader dismissal synchronization
    if ((window as any).__ABHINAYA_PRELOADER_DONE) {
      setupObserver();
    } else {
      const handleDismiss = () => {
        setTimeout(setupObserver, 80);
      };
      window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });

      // Safety fallback: if event was somehow missed, activate after 2.5s
      const fallbackTimer = setTimeout(() => {
        setupObserver();
      }, 2500);

      // Ultimate safety fallback: after 4s, ensure all elements are visible
      const ultimateTimer = setTimeout(() => {
        revealAll();
      }, 4000);

      return () => {
        window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
        clearTimeout(fallbackTimer);
        clearTimeout(ultimateTimer);
        mutationObserver.disconnect();
        observer?.disconnect();
      };
    }

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
};

export default ScrollObserver;

