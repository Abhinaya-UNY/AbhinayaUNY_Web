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

      // 1. If user is at or near the top of the page (scrollY <= 60), keep ALL elements below Hero hidden
      if (scrollY <= 60) {
        elements.forEach((el) => {
          el.classList.remove('is-revealed');
        });
        ticking = false;
        return;
      }

      // 2. Deliberate entrance threshold:
      // Elements only reveal when they have entered comfortably into view (approx 15-20% into viewport from bottom)
      // and haven't completely scrolled past the top of the screen.
      const triggerThreshold = Math.min(vh * 0.82, vh - 120);

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < triggerThreshold && rect.bottom > 50;

        if (isVisible) {
          el.classList.add('is-revealed');
        } else {
          // Real-time fade out when leaving viewport or scrolling back up
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
