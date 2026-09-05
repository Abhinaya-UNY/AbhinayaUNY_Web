'use client';

import React, { useEffect, useRef } from 'react';

export interface InteractiveCanvasDustProps {
  className?: string;
  particleCount?: number;
  gridSize?: number;
  showGrid?: boolean;
  particleColor?: string; // RGB format e.g. '16, 185, 129' (Emerald)
  gridColor?: string;     // RGB format e.g. '255, 255, 255'
  maxFps?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export const InteractiveCanvasDust: React.FC<InteractiveCanvasDustProps> = ({
  className = '',
  particleCount = 35,
  gridSize = 44,
  showGrid = true,
  particleColor = '16, 185, 129', // Emerald
  gridColor = '255, 255, 255',
  maxFps = 60,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number | null = null;
    let isVisible = false;
    let isReducedMotion = false;
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let lastTime = 0;

    // Determine target FPS: clamp to 30 on mobile / touch, up to maxFps on desktop
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const targetFps = isTouch ? Math.min(maxFps, 30) : maxFps;
    const frameInterval = 1000 / targetFps;

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion = motionQuery.matches;

    // Initialize Particles
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = Math.random() * 0.22 + 0.08;
        particles.push({
          x: Math.random() * (width || 100),
          y: Math.random() * (height || 100),
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.5 + 0.75,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    // Static Frame Render (used when reduced-motion is requested)
    const renderStatic = () => {
      if (!ctx || width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      // Grid dots
      if (showGrid) {
        ctx.fillStyle = `rgba(${gridColor}, 0.04)`;
        for (let x = 0; x < width; x += gridSize) {
          for (let y = 0; y < height; y += gridSize) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.baseAlpha})`;
        ctx.fill();
      });
    };

    // Resize Handler with DPR capping
    const handleResize = () => {
      if (!container || !canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      initParticles();

      if (isReducedMotion) {
        renderStatic();
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer Tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (isReducedMotion || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Animation Loop with FPS Clamping & Delta Timing
    const loop = (timestamp: number) => {
      if (!isVisible || isReducedMotion) return;

      const elapsed = timestamp - lastTime;
      if (elapsed > frameInterval) {
        lastTime = timestamp - (elapsed % frameInterval);

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Subtle Grid with Cursor Interaction
        if (showGrid) {
          for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
              const dx = x - mouseX;
              const dy = y - mouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 120) {
                const proximityGlow = (1 - dist / 120) * 0.18;
                ctx.fillStyle = `rgba(${particleColor}, ${proximityGlow})`;
                ctx.fillRect(x - 0.5, y - 0.5, 2, 2);
              } else {
                ctx.fillStyle = `rgba(${gridColor}, 0.04)`;
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }
        }

        // 2. Update & Draw Particles with Proximity Reaction
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle cursor proximity reaction
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let alpha = p.baseAlpha;

          if (dist < 140 && dist > 0) {
            const proximity = 1 - dist / 140;
            alpha = p.baseAlpha + proximity * 0.35;
            // Smooth repulsion
            p.x += (dx / dist) * 0.35;
            p.y += (dy / dist) * 0.35;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
          ctx.fill();
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    // IntersectionObserver: Pause rendering completely when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isReducedMotion) {
          lastTime = performance.now();
          if (!rafId) {
            rafId = requestAnimationFrame(loop);
          }
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(container);

    // Page Visibility API: Pause when browser tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (isVisible && !isReducedMotion) {
        lastTime = performance.now();
        if (!rafId) {
          rafId = requestAnimationFrame(loop);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Reduced motion media query change listener
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        renderStatic();
      } else if (isVisible) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, [particleCount, gridSize, showGrid, particleColor, gridColor, maxFps]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default InteractiveCanvasDust;
