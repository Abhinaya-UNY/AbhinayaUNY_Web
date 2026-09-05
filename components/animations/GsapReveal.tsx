'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface GsapRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const GsapReveal: React.FC<GsapRevealProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 14,
  className = '',
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
          opacity: 0,
          y: yOffset,
          duration: duration,
          delay: delay,
          ease: 'power1.out',
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
