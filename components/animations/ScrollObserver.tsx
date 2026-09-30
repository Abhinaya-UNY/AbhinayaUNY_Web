'use client';

import React, { useEffect } from 'react';

export const ScrollObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    let lastScrollY = window.scrollY || 0;

    const updateReveals = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const isScrollingUp = scrollY < lastScrollY;
      const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');

      // 1. If at or near the top of the page (scrollY <= 80), keep ALL elements below Hero 100% hidden
      if (scrollY <= 80) {
        elements.forEach((el) => {
          el.classList.remove('is-revealed');
        });
        lastScrollY = scrollY;
        ticking = false;
        return;
      }

      // 2. Real-time bidirectional scroll feedback:
      // When scrolling DOWN: elements fade in once comfortably inside lower viewport (top < vh * 0.78)
      // When scrolling UP: elements fade out as soon as they slip back into the lower half (top > vh * 0.52)
      const enterThreshold = Math.min(vh * 0.78, vh - 130);
      const exitThreshold = isScrollingUp ? Math.min(vh * 0.52, vh - 260) : enterThreshold;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        let isVisible = false;
        if (isScrollingUp) {
          // When scrolling up, only elements in upper-middle viewport remain revealed;
          // as elements slide down towards the lower screen or off-screen, they smoothly fade out in realtime!
          isVisible = rect.top < exitThreshold && rect.bottom > 60;
        } else {
          // When scrolling down, elements reveal as they cross the deliberate entrance threshold
          isVisible = rect.top < enterThreshold && rect.bottom > 60;
        }

        if (isVisible) {
          el.classList.add('is-revealed');
        } else {
          el.classList.remove('is-revealed');
        }
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateReveals);
        ticking = true;
      }
    };

    // Attach scroll and resize listeners
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
