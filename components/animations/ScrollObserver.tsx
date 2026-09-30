'use client';

import React, { useEffect } from 'react';

export const ScrollObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateReveals = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');

      // 1. If at the absolute top of the page (scrollY <= 30), keep ALL elements below Hero 100% hidden
      if (scrollY <= 30) {
        elements.forEach((el) => {
          el.classList.remove('is-revealed');
        });
        ticking = false;
        return;
      }

      // 2. Real-time bidirectional scroll feedback:
      // Fade in when entering viewport, fade out when scrolling past or leaving viewport
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Visible when element's top is comfortably inside the screen and hasn't completely scrolled off top
        const isVisible = rect.top < vh - 60 && rect.bottom > 40;

        if (isVisible) {
          el.classList.add('is-revealed');
        } else {
          // Real-time fade out when leaving viewport or scrolling back up!
          el.classList.remove('is-revealed');
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateReveals);
        ticking = true;
      }
    };

    // Attach scroll and resize listeners unconditionally
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check on mount
    updateReveals();

    // Check again when preloader dismisses
    const handleDismiss = () => {
      setTimeout(updateReveals, 50);
    };
    window.addEventListener('abhinaya:preloader-dismiss', handleDismiss);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
    };
  }, []);

  return null;
};

export default ScrollObserver;
