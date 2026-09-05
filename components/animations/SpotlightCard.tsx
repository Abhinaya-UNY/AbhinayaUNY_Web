'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;         // Radial glow color (default: 'rgba(255, 107, 0, 0.12)')
  spotlightSize?: number;          // Radius in px (default: 350)
  borderColor?: string;            // Inactive border (default: 'rgba(255, 255, 255, 0.08)')
  hoverBorderColor?: string;       // Hover border (default: 'rgba(255, 107, 0, 0.4)')
  as?: React.ElementType;          // Render as div, a, article, etc. (default: 'div')
  href?: string;
  target?: string;
  rel?: string;
}

export const SpotlightCard = forwardRef<HTMLElement, SpotlightCardProps>(({
  children,
  className = '',
  spotlightColor = 'rgba(255, 107, 0, 0.12)',
  spotlightSize = 350,
  borderColor = 'rgba(255, 255, 255, 0.08)',
  hoverBorderColor = 'rgba(255, 107, 0, 0.4)',
  as: Component = 'div',
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}, forwardedRef) => {
  const localRef = useRef<HTMLElement>(null);

  // Expose element to external ref if provided
  useImperativeHandle(forwardedRef, () => localRef.current as HTMLElement);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (localRef.current) {
      const rect = localRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      localRef.current.style.setProperty('--mouse-x', `${x}px`);
      localRef.current.style.setProperty('--mouse-y', `${y}px`);
      localRef.current.style.setProperty('--spotlight-opacity', '1');
      if (hoverBorderColor) {
        localRef.current.style.borderColor = hoverBorderColor;
      }
    }
    if (onMouseMove) {
      onMouseMove(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (localRef.current) {
      localRef.current.style.setProperty('--spotlight-opacity', '0');
      if (borderColor) {
        localRef.current.style.borderColor = borderColor;
      }
    }
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  return (
    <Component
      ref={localRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl bg-[#0B0B0E] border transition-colors duration-300 overflow-hidden ${className}`}
      style={{
        borderColor: borderColor,
        ...style,
      }}
      {...rest}
    >
      {/* Fluid Cursor-Following Spotlight Glow (Pointer-Events None, Zero Photo Obscuration) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Card Content (Positioned with relative z-index to remain fully interactive) */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </Component>
  );
});

SpotlightCard.displayName = 'SpotlightCard';

export default SpotlightCard;
