'use client';

import React from 'react';

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
  className = '',
  delay,
  duration,
  yOffset,
  triggerOnce,
  blur,
  stagger,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      {children}
    </div>
  );
};

export default GsapReveal;
