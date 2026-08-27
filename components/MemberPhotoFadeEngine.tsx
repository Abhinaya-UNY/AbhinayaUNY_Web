'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Images,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
} from 'lucide-react';

export interface BadgeStyle {
  bg?: string;
  text?: string;
  border?: string;
  accent?: string;
}

export interface MemberPhotoFadeEngineProps {
  /** Array of photo URLs or image paths */
  photos?: string[];
  /** Alias for photos */
  images?: string[];
  /** Single image fallback if photos/images not provided */
  image?: string;
  /** Full name of the team member */
  name: string;
  /** Role/Title of the member (e.g. "Ketua Tim", "Lead Programmer") */
  role?: string;
  /** Division name (e.g. "Program", "Elektronik", "Mekanik", "Manager", "Ketua Tim") */
  division?: string;
  /** Unique ID used for deterministic auto-play offset calculation */
  memberId?: string;
  id?: string;
  /** CSS Aspect Ratio class (e.g. "aspect-[3/4]", "aspect-square", "aspect-[4/5]") */
  aspectRatio?: string;
  /** Custom wrapper CSS classes */
  className?: string;
  /** Custom image CSS classes */
  imageClassName?: string;
  /** Custom overlay gradient classes */
  overlayClassName?: string;
  /** Badge color scheme */
  badgeStyle?: BadgeStyle;
  /** Enable automatic slideshow (default: true) */
  autoPlay?: boolean;
  /** Base autoPlay interval in milliseconds (default: 3500ms) */
  autoPlayInterval?: number;
  /** Subtle Ken-Burns pan/zoom effect on active photo (default: false) */
  enableKenBurns?: boolean;
  /** Whether the component is rendered inside a large modal */
  isModal?: boolean;
  /** Prioritize image loading */
  priority?: boolean;
  /** Show next/prev navigation chevron buttons (default: true if > 1 photo) */
  showControls?: boolean;
  /** Show top-right multi-photo indicator pill (default: true if > 1 photo) */
  showIndicators?: boolean;
  /** Show bottom pagination dots (default: true if > 1 photo) */
  showDots?: boolean;
  /** Next.js basePath override */
  basePath?: string;
  /** Click handler for card / modal trigger */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Callback when an image fails to load */
  onImageError?: (failedUrl: string, index: number) => void;
  /** Callback when active slide changes */
  onSlideChange?: (newIndex: number) => void;
}

/**
 * Deterministic hash generator to offset slideshow intervals per member.
 * Prevents all cards in a grid from crossfading synchronously.
 */
function getDeterministicOffset(seed: string, maxOffset: number = 1400): number {
  if (!seed) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % maxOffset;
}

/**
 * Extract clean 2-letter initials from full name, ignoring academic titles.
 */
function getMemberInitials(name: string): string {
  if (!name) return 'AB';
  const academicTitles = [
    'prof.',
    'prof',
    'ir.',
    'ir',
    'dr.',
    'dr',
    'm.t.',
    'ph.d.',
    's.t.',
    'm.cs.',
    'm.sc.',
    's.pd.',
    'm.pd.',
    'd4',
    's1',
  ];
  const cleanWords = name
    .trim()
    .split(/\s+/)
    .filter((w) => {
      const normalized = w.toLowerCase().replace(/[,.]/g, '');
      return !academicTitles.includes(normalized);
    });

  if (cleanWords.length === 0) return name.slice(0, 2).toUpperCase();
  if (cleanWords.length === 1) return cleanWords[0].slice(0, 2).toUpperCase();
  return (cleanWords[0][0] + cleanWords[1][0]).toUpperCase();
}

/**
 * Resolve absolute or relative path with Next.js basePath support.
 */
function resolveImagePath(src: string, basePath?: string): string {
  if (!src) return '';
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }

  const effectiveBasePath =
    basePath !== undefined
      ? basePath
      : process.env.NODE_ENV === 'production'
      ? '/AbhinayaUNY_Web'
      : '';

  if (effectiveBasePath && src.startsWith(effectiveBasePath)) {
    return src;
  }

  if (src.startsWith('/')) {
    return `${effectiveBasePath}${src}`;
  }

  return `${effectiveBasePath}/${src}`;
}

/**
 * MemberPhotoFadeEngine
 * High-performance, GPU-accelerated multi-photo crossfade engine with desynchronized
 * auto-play intervals, Ken-Burns zoom, slide counter pill, touch/hover navigation,
 * and robust fallback avatar generation.
 */
export const MemberPhotoFadeEngine: React.FC<MemberPhotoFadeEngineProps> = ({
  photos,
  images,
  image,
  name,
  role,
  division,
  memberId,
  id,
  aspectRatio = 'aspect-[3/4]',
  className = '',
  imageClassName = '',
  overlayClassName = '',
  badgeStyle,
  autoPlay = true,
  autoPlayInterval = 3500,
  enableKenBurns = false,
  isModal = false,
  priority = false,
  showControls = true,
  showIndicators = true,
  showDots = true,
  basePath,
  onClick,
  onImageError,
  onSlideChange,
}) => {
  // Normalize candidate photo list
  const rawCandidatePhotos = useMemo(() => {
    if (photos && photos.length > 0) return photos;
    if (images && images.length > 0) return images;
    if (image) return [image];
    return [];
  }, [photos, images, image]);

  // Clean empty/falsy strings
  const candidatePhotos = useMemo(() => {
    return rawCandidatePhotos.filter((p) => typeof p === 'string' && p.trim().length > 0);
  }, [rawCandidatePhotos]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());

  // Filter out failed photos
  const validPhotos = useMemo(() => {
    return candidatePhotos.filter((_, idx) => !failedIndices.has(idx));
  }, [candidatePhotos, failedIndices]);

  // Ensure currentIdx stays within valid range
  const safeCurrentIdx = validPhotos.length > 0 ? currentIdx % validPhotos.length : 0;

  // Next / Previous navigation handlers
  const goToNextSlide = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (validPhotos.length <= 1) return;
      setCurrentIdx((prev) => {
        const next = (prev + 1) % validPhotos.length;
        if (onSlideChange) onSlideChange(next);
        return next;
      });
    },
    [validPhotos.length, onSlideChange]
  );

  const goToPrevSlide = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (validPhotos.length <= 1) return;
      setCurrentIdx((prev) => {
        const next = (prev - 1 + validPhotos.length) % validPhotos.length;
        if (onSlideChange) onSlideChange(next);
        return next;
      });
    },
    [validPhotos.length, onSlideChange]
  );

  const goToIndex = useCallback(
    (targetIdx: number, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (targetIdx >= 0 && targetIdx < validPhotos.length) {
        setCurrentIdx(targetIdx);
        if (onSlideChange) onSlideChange(targetIdx);
      }
    },
    [validPhotos.length, onSlideChange]
  );

  // Desynchronized auto-play interval calculation
  useEffect(() => {
    if (!autoPlay || validPhotos.length <= 1 || isHovered) return;

    const seedIdentifier = memberId || id || name || 'abhinaya';
    const hashOffset = getDeterministicOffset(seedIdentifier, 1400);
    const intervalDuration = isModal
      ? 4800 + hashOffset
      : autoPlayInterval + hashOffset;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = (prev + 1) % validPhotos.length;
        if (onSlideChange) onSlideChange(next);
        return next;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [
    autoPlay,
    validPhotos.length,
    isHovered,
    memberId,
    id,
    name,
    isModal,
    autoPlayInterval,
    onSlideChange,
  ]);

  // Handle individual image load errors
  const handleImageError = (photoSrc: string, originalIdx: number) => {
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(originalIdx);
      return next;
    });
    if (onImageError) {
      onImageError(photoSrc, originalIdx);
    }
  };

  // Theming colors
  const accentColor = badgeStyle?.accent || '#FF6B00';
  const hasValidPhotos = validPhotos.length > 0;

  // Fallback avatar if no valid photos exist or all failed
  if (!hasValidPhotos) {
    const initials = getMemberInitials(name);
    return (
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        style={{
          backgroundColor: `${accentColor}12`,
          borderColor: `${accentColor}30`,
        }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {/* Subtle decorative background circles */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Initials Badge */}
        <div
          className={`${
            isModal
              ? 'w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl'
              : 'w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl'
          } rounded-3xl flex items-center justify-center font-black border-2 shadow-2xl mb-3 relative z-10 transition-transform duration-300 group-hover:scale-105`}
          style={{
            backgroundColor: `${accentColor}25`,
            borderColor: accentColor,
            color: '#FFFFFF',
            boxShadow: `0 8px 24px -4px ${accentColor}40`,
          }}
        >
          {initials}
        </div>

        {/* Member Role & Division Text */}
        {role && (
          <span className="relative z-10 text-xs font-mono font-bold text-amber-200/90 max-w-[85%] truncate">
            {role}
          </span>
        )}
        {division && (
          <span className="relative z-10 text-[10px] font-sans text-neutral-400 mt-0.5">
            {division}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl select-none group/photo-engine ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        // Resume after touch after a short pause
        setTimeout(() => setIsHovered(false), 2500);
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      aria-label={`Foto ${name}`}
    >
      {/* Absolute Stacked Image Layers */}
      {validPhotos.map((photoSrc, idx) => {
        const isCurrent = idx === safeCurrentIdx;
        const resolvedSrc = resolveImagePath(photoSrc, basePath);

        return (
          <div
            key={`${photoSrc}-${idx}`}
            className={`absolute inset-0 w-full h-full transform-gpu will-change-[opacity,transform] transition-all duration-1000 ease-in-out ${
              isCurrent
                ? 'opacity-100 scale-100 z-10 brightness-95 contrast-105'
                : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
            style={{
              willChange: 'opacity, transform',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={resolvedSrc}
              alt={`${name} - Slide ${idx + 1}`}
              onError={() => handleImageError(photoSrc, idx)}
              loading={priority && idx === 0 ? 'eager' : 'lazy'}
              className={`w-full h-full object-cover object-center transform-gpu transition-transform duration-1000 ease-out ${
                isCurrent && enableKenBurns ? 'scale-105 duration-7000' : ''
              } ${imageClassName}`}
            />
          </div>
        );
      })}

      {/* Smooth Ambient Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/25 to-transparent pointer-events-none z-10 ${overlayClassName}`}
      />

      {/* Multi-Photo Slide Counter Badge (Top Right) */}
      {showIndicators && validPhotos.length > 1 && (
        <div
          className="absolute top-3.5 right-3.5 z-20 flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-black/75 text-amber-300 text-[10px] font-mono font-bold border border-brand-orange/40 backdrop-blur-md shadow-lg pointer-events-none"
        >
          <Images className="w-3 h-3 text-brand-orange animate-pulse" />
          <span>
            {safeCurrentIdx + 1}/{validPhotos.length}
          </span>
        </div>
      )}

      {/* Interactive Navigation Chevrons (Previous / Next) */}
      {showControls && validPhotos.length > 1 && (
        <div
          className={`transition-opacity duration-300 ${
            isModal || isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 md:group-hover/photo-engine:opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={goToPrevSlide}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-brand-orange text-white hover:text-black flex items-center justify-center transition-all duration-200 border border-white/20 shadow-lg backdrop-blur-sm active:scale-95 cursor-pointer"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-brand-orange text-white hover:text-black flex items-center justify-center transition-all duration-200 border border-white/20 shadow-lg backdrop-blur-sm active:scale-95 cursor-pointer"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Interactive Pagination Dots (Bottom Center) */}
      {showDots && validPhotos.length > 1 && (
        <div className="absolute bottom-3.5 inset-x-0 z-20 flex items-center justify-center space-x-1.5 pointer-events-auto">
          {validPhotos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => goToIndex(idx, e)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === safeCurrentIdx
                  ? 'w-6 bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.9)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/75'
              }`}
              aria-label={`Pindah ke foto ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberPhotoFadeEngine;
