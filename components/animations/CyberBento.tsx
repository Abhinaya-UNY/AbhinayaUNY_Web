'use client';

import React from 'react';

export interface CyberBentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  showCorners?: boolean;
}

export const CyberBentoCard: React.FC<CyberBentoCardProps> = ({
  children,
  className = '',
  badge,
  title,
  subtitle,
  showCorners = true,
  ...props
}) => {
  return (
    <div
      className={`group relative rounded-2xl bg-[#0B0B0E] border border-white/8 p-5 sm:p-6 transition-all duration-300 hover:border-white/16 hover:bg-[#0E0E12] overflow-hidden ${className}`}
      {...props}
    >
      {/* Decorative Technical Corner Crosshairs (21st.dev Cyber Style) */}
      {showCorners && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-2 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none group-hover:text-brand-orange/40 transition-colors"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none group-hover:text-brand-orange/40 transition-colors"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20 select-none pointer-events-none group-hover:text-brand-orange/40 transition-colors"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20 select-none pointer-events-none group-hover:text-brand-orange/40 transition-colors"
          >
            +
          </span>
        </>
      )}

      {/* Header if badge/title provided */}
      {(badge || title) && (
        <div className="mb-3 space-y-1">
          {badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange text-[10px] font-mono font-bold uppercase tracking-wider border border-brand-orange/20">
              {badge}
            </span>
          )}
          {title && <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-orange transition-colors">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CyberBentoCard;
