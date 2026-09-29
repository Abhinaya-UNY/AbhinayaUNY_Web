'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GsapRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  triggerOnce?: boolean;
  blur?: boolean;
  stagger?: number;
}

export const GsapReveal: React.FC<GsapRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 36,
  className = '',
  triggerOnce = true,
  blur = true,
  stagger = 0,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check prefers-reduced-motion
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const initAnimation = () => {
        if (!containerRef.current) return;

        ScrollTrigger.refresh();

        const targets =
          stagger > 0 && containerRef.current.children.length > 0
            ? Array.from(containerRef.current.children)
            : containerRef.current;

        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: yOffset,
            filter: blur ? 'blur(8px)' : 'none',
          },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              once: triggerOnce,
              invalidateOnRefresh: true,
            },
            opacity: 1,
            y: 0,
            filter: blur ? 'blur(0px)' : 'none',
            duration: duration,
            delay: delay,
            stagger: stagger > 0 ? stagger : undefined,
            ease: 'power3.out',
            clearProps: 'filter',
          }
        );
      };

      // Ensure preloader has finished before animating so top sections don't fire prematurely
      if (typeof window !== 'undefined' && (window as any).__ABHINAYA_PRELOADER_DONE) {
        initAnimation();
      } else if (typeof window !== 'undefined') {
        const handleDismiss = () => {
          setTimeout(initAnimation, 60);
        };
        window.addEventListener('abhinaya:preloader-dismiss', handleDismiss, { once: true });
        return () => window.removeEventListener('abhinaya:preloader-dismiss', handleDismiss);
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default GsapReveal;
