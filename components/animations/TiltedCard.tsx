'use client';

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface TiltedCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;      // Maximum rotation in degrees (default: 8)
  scale?: number;        // Scale on hover (default: 1.015)
  perspective?: number;  // Perspective depth in px (default: 1000)
  glare?: boolean;       // Enable subtle cursor-following glare (default: true)
  glareColor?: string;   // Glare gradient color (default: 'rgba(16, 185, 129, 0.12)')
  as?: React.ElementType; // Render element tag (default: 'div')
}

export const TiltedCard = forwardRef<HTMLElement, TiltedCardProps>(({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.015,
  perspective = 1000,
  glare = true,
  glareColor = 'rgba(16, 185, 129, 0.12)',
  as: Component = 'div',
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...rest
}, forwardedRef) => {
  const localRef = useRef<HTMLElement>(null);
  useImperativeHandle(forwardedRef, () => localRef.current as HTMLElement);

  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    setTransformStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <Component
      ref={localRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl will-change-transform overflow-hidden ${className}`}
      style={{
        ...transformStyle,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...rest}
    >
      {/* Glare Lighting Overlay */}
      {glare && !reducedMotion && isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 75%)`,
          }}
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </Component>
  );
});

TiltedCard.displayName = 'TiltedCard';

export default TiltedCard;
