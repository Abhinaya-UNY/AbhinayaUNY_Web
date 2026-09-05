'use client';

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface MagnetProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;      // Pull strength factor (0.1 to 0.5, default: 0.3)
  maxDistance?: number;   // Maximum translation in px (default: 12)
  as?: React.ElementType; // Render element tag (default: 'div')
}

export const Magnet = forwardRef<HTMLElement, MagnetProps>(({
  children,
  className = '',
  strength = 0.3,
  maxDistance = 12,
  as: Component = 'div',
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}, forwardedRef) => {
  const localRef = useRef<HTMLElement>(null);
  useImperativeHandle(forwardedRef, () => localRef.current as HTMLElement);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !localRef.current) {
      if (onMouseMove) onMouseMove(e);
      return;
    }

    const rect = localRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rawDx = (e.clientX - centerX) * strength;
    const rawDy = (e.clientY - centerY) * strength;

    // Clamp translation to maxDistance
    const dx = Math.max(-maxDistance, Math.min(maxDistance, rawDx));
    const dy = Math.max(-maxDistance, Math.min(maxDistance, rawDy));

    setPosition({ x: dx, y: dy });
    setIsHovered(true);

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    if (onMouseLeave) onMouseLeave(e);
  };

  const transformStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        transform: `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
      };

  return (
    <Component
      ref={localRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{
        ...transformStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Magnet.displayName = 'Magnet';

export default Magnet;
