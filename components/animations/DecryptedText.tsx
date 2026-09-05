'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface DecryptedTextProps {
  text: string;
  speed?: number;                   // Interval (ms) per scramble frame (default: 40)
  maxIterations?: number;          // Scramble cycles before resolving character (default: 10)
  sequential?: boolean;            // Reveal sequentially (default: true)
  revealDirection?: 'start' | 'end' | 'center'; // Direction of resolution (default: 'start')
  useOriginalCharsOnly?: boolean;  // Scramble using only characters present in original text (default: false)
  characters?: string;             // Glyphs pool (default: '01#_*/[]?~!<>ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  animateOn?: 'view' | 'hover' | 'both'; // Trigger mode (default: 'hover')
  className?: string;              // Applied to final resolved text
  parentClassName?: string;        // Applied to wrapper container
  encryptedClassName?: string;     // Applied to active scrambling characters
}

const DEFAULT_CHARS = '01#_*/[]?~!<>ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  animateOn = 'hover',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-emerald-400/90 font-mono font-bold',
}) => {
  // SSR Invariant: Must initialize with literal target text so static export HTML contains target string
  const [displayText, setDisplayText] = useState<string>(text);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const iterationCountRef = useRef<number>(0);
  const hasAnimatedOnViewRef = useRef<boolean>(false);

  // Sync if text prop updates
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ').join('') || characters
    : characters;

  const startScramble = useCallback(() => {
    // Accessibility: Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        setDisplayText(text);
        setIsScrambling(false);
        return;
      }
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsScrambling(true);
    iterationCountRef.current = 0;

    const totalLen = text.length;
    // Total steps needed before fully resolving
    const totalSteps = sequential ? Math.max(totalLen * 2, maxIterations * 2) : maxIterations;

    intervalRef.current = setInterval(() => {
      iterationCountRef.current += 1;
      const currentStep = iterationCountRef.current;
      const progress = Math.min(currentStep / totalSteps, 1);

      // Determine resolved status per character index
      const chars = text.split('').map((originalChar, idx) => {
        if (originalChar === ' ') return ' ';

        let isResolved = false;

        if (sequential) {
          if (revealDirection === 'start') {
            const resolvedBoundary = Math.floor(progress * totalLen);
            isResolved = idx < resolvedBoundary;
          } else if (revealDirection === 'end') {
            const resolvedBoundary = Math.floor(progress * totalLen);
            isResolved = idx >= totalLen - resolvedBoundary;
          } else if (revealDirection === 'center') {
            const center = Math.floor(totalLen / 2);
            const radius = Math.floor(progress * (totalLen / 2 + 1));
            isResolved = Math.abs(idx - center) <= radius;
          }
        } else {
          isResolved = currentStep >= maxIterations;
        }

        if (isResolved) {
          return originalChar;
        }

        // Return pseudo-random glyph from pool
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        return availableChars[randomIndex] || originalChar;
      });

      setDisplayText(chars.join(''));

      // Check termination
      if (currentStep >= totalSteps) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed, maxIterations, sequential, revealDirection, availableChars]);

  // Viewport IntersectionObserver trigger
  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'both') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimatedOnViewRef.current) {
            hasAnimatedOnViewRef.current = true;
            startScramble();
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, startScramble]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      aria-label={text}
      className={`inline-block select-none ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover' || animateOn === 'both') {
          startScramble();
        }
      }}
    >
      <span className={isScrambling ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
};

export default DecryptedText;
