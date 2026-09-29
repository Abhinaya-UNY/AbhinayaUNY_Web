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

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    let observer: IntersectionObserver | null = null;
    let userHasScrolled = window.scrollY > 20;

    const setupObserver = () => {
      ScrollTrigger.refresh();

      if (observer) {
        observer.disconnect();
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // If user has not scrolled yet and is at top of page, do NOT reveal elements below the hero!
              if (!userHasScrolled && window.scrollY <= 20) {
                const rect = entry.target.getBoundingClientRect();
                if (rect.top > window.innerHeight * 0.5) {
                  return; // Keep hidden until user scrolls
                }
              }

              entry.target.classList.add('is-revealed');
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -60px 0px',
          threshold: 0.08,
        }
      );

      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
        observer?.observe(el);
      });
    };

    // On user scroll, activate check for any elements now entering viewport
    const handleScroll = () => {
      if (!userHasScrolled) {
        userHasScrolled = true;
      }
      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Only reveal if comfortably inside the viewport
        if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          observer?.unobserve(el);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Watch for new elements inserted into the DOM
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach((el) => {
        observer?.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    if ((window as any).__ABHINAYA_PRELOADER_DONE) {
      setupObserver();
    } else {
      const handleDismiss = () => {
        setTimeout(setupObserver, 80);
      };
      window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });

      return () => {
        window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
        window.removeEventListener('scroll', handleScroll);
        mutationObserver.disconnect();
        observer?.disconnect();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
};

export default ScrollObserver;


