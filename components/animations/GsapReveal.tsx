'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface GsapRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const GsapReveal: React.FC<GsapRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  className = '',
  triggerOnce = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      if (containerRef.current) {
        gsap.from(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%', // trigger when top of element hits 85% of viewport
            once: triggerOnce, // only play once
          },
          opacity: 0,
          y: yOffset,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
          clearProps: 'all',
        });
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
