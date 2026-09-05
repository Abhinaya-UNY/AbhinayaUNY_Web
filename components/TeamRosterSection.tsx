'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  GraduationCap,
  Briefcase,
  Code,
  Wrench,
  Zap,
  Sparkles,
  Search,
  ExternalLink,
  Mail,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Cpu,
  Layers,
  Award,
  Quote,
  Maximize2,
  CheckCircle2,
  Images,
  Crown,
  Calendar,
  Trophy,
  History,
  Compass,
  Flame,
  Star,
  BookOpen,
  LayoutGrid,
  Columns,
} from 'lucide-react';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';
import {
  DivisionType,
  TeamMember,
  LeaderHistoryItem,
  ManagerHistoryItem,
  GenerationArchive,
  DOSEN_PEMBIMBING_LIST,
  LEADERS_HALL_OF_FAME,
  MANAGERS_SHOWCASE,
  ACTIVE_TECHNICAL_SQUAD,
  ALUMNI_GENERATIONS,
  ALL_ROSTER_MEMBERS,
  DIVISION_CATEGORIES,
  DIVISION_BADGES,
  DIVISION_ORDER,
  DIVISION_INFO,
  getMembersByGeneration,
  getLeaderByYear,
  getManagersByYear,
  getActiveSquadByDivision,
  getGenerationArchive,
  getAllGenerations,
} from '@/data/teamData';
import { SpotlightCard, DecryptedText } from '@/components/animations';

interface TeamRosterSectionProps {
  initialDivision?: string;
  showHeader?: boolean;
  showAllLink?: boolean;
  className?: string;
}

/**
 * Reusable Multi-Photo Crossfade Showcase Component
 */
export const MemberPhotoFadeShowcase: React.FC<{
  member: TeamMember | LeaderHistoryItem | ManagerHistoryItem;
  basePath: string;
  badgeStyle: { bg: string; text: string; border: string; accent: string };
  isModal?: boolean;
  onImageError?: (id: string) => void;
  hasError?: boolean;
}> = ({ member, basePath, badgeStyle, isModal = false, onImageError, hasError }) => {
  const images =
    member.images && member.images.length > 0
      ? member.images
      : member.photos && member.photos.length > 0
      ? member.photos
      : [member.image];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slideshow every 3.6s-4.5s if multiple images exist
  useEffect(() => {
    if (images.length <= 1) return;

    const seed = member.id ? member.id.charCodeAt(0) % 5 : 0;
    const intervalTime = isModal ? 4500 : 3600 + seed * 200;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [images.length, isModal, member.id]);

  const hasCustomPhoto =
    images.length > 0 &&
    !images[0].includes('logo_abhinaya') &&
    !hasError;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!hasCustomPhoto) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-white/[0.03] to-transparent">
        <div
          className={`${
            isModal ? 'w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl' : 'w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl'
          } rounded-2xl flex items-center justify-center font-bold bg-white/[0.06] border border-white/10 text-white mb-2 transition-transform duration-300 group-hover:scale-105 font-mono`}
        >
          {member.name
            .split(' ')
            .filter((w) => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.') && !w.startsWith('Dr.'))
            .slice(0, 2)
            .map((n) => n[0])
            .join('')}
        </div>
        <span className="text-xs font-mono font-medium text-slate-300">
          {member.role}
        </span>
        {member.division && (
          <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {member.division}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stack of absolute images with smooth opacity & scale crossfade */}
      {images.map((imgSrc, idx) => {
        const isCurrent = idx === currentIdx;
        const resolvedSrc = imgSrc.startsWith('http') || imgSrc.startsWith('/') ? `${basePath}${imgSrc}` : `${basePath}/${imgSrc}`;

        return (
          <img
            key={`${imgSrc}-${idx}`}
            src={resolvedSrc}
            alt={`${member.name} - Foto ${idx + 1}`}
            onError={() => onImageError && onImageError(member.id)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
              isCurrent
                ? 'opacity-100 scale-100 z-10 brightness-95 contrast-105'
                : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          />
        );
      })}

      {/* 0% Dark Gradient Haze - Clean, Unobstructed Natural Headshot Viewport */}

      {/* Multiple Photos Slide Counter & Nav Arrows if > 1 photo */}
      {images.length > 1 && (
        <>
          {/* Unobtrusive Bottom-Left Slide Indicator (Non-Obstructing) */}
          <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-black/80 text-amber-300 text-[10px] font-mono font-bold border border-brand-orange/40 backdrop-blur-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Images className="w-3 h-3 text-brand-orange animate-pulse" />
            <span>
              {currentIdx + 1}/{images.length}
            </span>
          </div>

          {/* Interactive Arrow Buttons on Modal or Hover */}
          {(isModal || isHovered) && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-brand-orange text-white hover:text-black flex items-center justify-center transition duration-200 border border-white/20 shadow-lg backdrop-blur-sm cursor-pointer"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-brand-orange text-white hover:text-black flex items-center justify-center transition duration-200 border border-white/20 shadow-lg backdrop-blur-sm cursor-pointer"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-3.5 inset-x-0 z-20 flex items-center justify-center space-x-1.5 pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIdx
                    ? 'w-6 bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.9)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/75'
                }`}
                aria-label={`Lihat foto ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Reusable Horizontal Scrollable Track Container Component
 */
export const HorizontalScrollMemberTrack: React.FC<{
  title?: string;
  subtitle?: string;
  count?: number;
  icon?: React.ReactNode;
  accentColor?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  headerBadge?: React.ReactNode;
  customHeader?: React.ReactNode;
}> = ({
  title,
  subtitle,
  count,
  icon,
  accentColor = '#FF6B00',
  children,
  actionButton,
  headerBadge,
  customHeader,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = Math.min(scrollRef.current.clientWidth * 0.82, 380);
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-3 relative">
      {/* Custom or Default Section Header Banner */}
      {customHeader ? (
        customHeader
      ) : title ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#0B0B0E] border border-white/8 shadow-lg relative overflow-hidden">
          {/* Left Accent Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accentColor }} />

          <div className="flex items-center space-x-3.5 pl-2">
            {icon && (
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border shadow-md flex-shrink-0"
                style={{
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>{title}</span>
                </h3>
                {count !== undefined && (
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-mono font-medium text-slate-300 border border-white/10">
                    {count} Anggota
                  </span>
                )}
                {headerBadge}
              </div>
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2.5 pl-2 sm:pl-0 self-end sm:self-center">
            {/* Desktop / Laptop Left-Right Navigation Controls */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                  canScrollLeft
                    ? 'bg-white/10 hover:bg-brand-orange text-white hover:text-black cursor-pointer shadow-md'
                    : 'text-slate-600 cursor-not-allowed opacity-40'
                }`}
                aria-label="Geser daftar ke kiri"
                title="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                  canScrollRight
                    ? 'bg-white/10 hover:bg-brand-orange text-white hover:text-black cursor-pointer shadow-md'
                    : 'text-slate-600 cursor-not-allowed opacity-40'
                }`}
                aria-label="Geser daftar ke kanan"
                title="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {actionButton}
          </div>
        </div>
      ) : null}

      {/* Horizontal Scroll Track Wrapper */}
      <div className="relative group/track">
        {/* Mobile Swipe Hint Badge */}
        <div className="sm:hidden flex items-center justify-between text-[11px] text-slate-400 px-2 py-0.5 font-mono">
          <span>Geser horizontal untuk melihat daftar anggota</span>
          {count && <span>({count})</span>}
        </div>

        {/* Scroll Container with Smooth Touch / Snap Support */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-3 pt-1 px-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-brand-orange/40 scroll-smooth overscroll-x-contain select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const TeamRosterSection: React.FC<TeamRosterSectionProps> = ({
  initialDivision = 'All',
  showHeader = true,
  showAllLink = false,
  className = '',
}) => {
  // Navigation & View Mode State
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'leaders' | 'managers' | 'alumni'>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | LeaderHistoryItem | ManagerHistoryItem | null>(null);
  const [selectedAlumniYear, setSelectedAlumniYear] = useState<number>(2024);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [viewLayout, setViewLayout] = useState<'grid' | 'carousel'>('grid');
  const basePath = process.env.NODE_ENV === 'production' ? '/AbhinayaUNY_Web' : '';

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  // Filter members
  const isSearching = searchQuery.trim().length > 0;

  const matchesSearch = (member: TeamMember | LeaderHistoryItem | ManagerHistoryItem) => {
    if (!isSearching) return true;
    const q = searchQuery.toLowerCase();
    const specs = member.specialization ? member.specialization.some((s) => s.toLowerCase().includes(q)) : false;
    const skills = member.skills ? member.skills.some((s) => s.toLowerCase().includes(q)) : false;
    const achievements = member.achievements ? member.achievements.some((a) => a.toLowerCase().includes(q)) : false;
    return (
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      (member.nim?.toLowerCase() || '').includes(q) ||
      member.division.toLowerCase().includes(q) ||
      (member.badge?.toLowerCase() || '').includes(q) ||
      (member.studyProgram?.toLowerCase() || '').includes(q) ||
      specs ||
      skills ||
      achievements ||
      (member.quote && member.quote.toLowerCase().includes(q))
    );
  };

  const getDivisionIcon = (id: string, sizeClass = 'w-4 h-4') => {
    switch (id) {
      case 'Pembimbing':
        return <GraduationCap className={sizeClass} />;
      case 'Ketua Tim':
        return <Award className={sizeClass} />;
      case 'Manager':
      case 'Manajemen & Administrasi':
      case 'Manajerial & Media':
        return <Briefcase className={sizeClass} />;
      case 'Program':
      case 'Programming & AI':
        return <Code className={sizeClass} />;
      case 'Elektronik':
      case 'Elektrik':
        return <Zap className={sizeClass} />;
      case 'Mekanik':
        return <Wrench className={sizeClass} />;
      default:
        return <Users className={sizeClass} />;
    }
  };

  // Render individual member card
  const renderMemberCard = (
    member: TeamMember | LeaderHistoryItem | ManagerHistoryItem,
    customTheme?: { border?: string; accent?: string; badgeText?: string },
    layoutMode: 'grid' | 'carousel' = 'grid'
  ) => {
    const badgeStyle = DIVISION_BADGES[member.division] || DIVISION_BADGES['Mekanik'];
    const isAdvisor = member.division === 'Pembimbing';
    const isLeader = member.division === 'Ketua Tim' || member.isLeader;
    const isManager = member.division === 'Manager' || member.isManager;

    const accentColor = customTheme?.accent || badgeStyle.accent;

    const memberImagesCount =
      member.images && member.images.length > 0
        ? member.images.length
        : member.photos && member.photos.length > 0
        ? member.photos.length
        : member.image
        ? 1
        : 0;

    return (
      <SpotlightCard
        key={`${member.id}-${member.generationYear || 'roster'}`}
        onClick={() => setSelectedMember(member)}
        spotlightColor="rgba(255, 107, 0, 0.12)"
        spotlightSize={320}
        className={`group cursor-pointer relative rounded-2xl bg-[#0B0B0E] hover:bg-[#0E0E12] border ${
          customTheme?.border
            ? customTheme.border
            : isLeader
            ? 'border-amber-500/30 hover:border-amber-400/60'
            : isManager
            ? 'border-emerald-500/30 hover:border-emerald-400/60'
            : isAdvisor
            ? 'border-purple-500/30 hover:border-purple-400/60'
            : 'border-white/8 hover:border-brand-orange/40'
        } transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${
          layoutMode === 'grid' ? 'w-full' : 'w-[280px] sm:w-[310px] flex-shrink-0 snap-start'
        }`}
      >
        <div className="w-full h-full flex flex-col justify-between p-2.5 sm:p-3 pb-4 sm:pb-5">
          {/* 1. Portrait Photo Viewport with Floating Glassmorphism Pills */}
          <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-black/80 border border-white/5 group/photo">
            <MemberPhotoFadeShowcase
              member={member}
              basePath={basePath}
              badgeStyle={badgeStyle}
              hasError={imgErrors[member.id]}
              onImageError={(id) => setImgErrors((prev) => ({ ...prev, [id]: true }))}
            />

            {/* Floating Top Division Pill */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-white">
              {isLeader ? (
                <Crown className="w-3 h-3 text-amber-400" />
              ) : isManager ? (
                <Briefcase className="w-3 h-3 text-emerald-400" />
              ) : (
                getDivisionIcon(member.division, 'w-3 h-3')
              )}
              <DecryptedText
                text={member.division}
                animateOn="hover"
                className="font-medium uppercase"
              />
            </div>

            {/* Floating Top Right Era / Multi-photo Pill */}
            {member.generationYear && (
              <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-amber-300 text-[10px] font-mono">
                <span>Era {member.generationYear}</span>
              </div>
            )}

            {/* Bottom-right Quick Zoom Icon */}
            <div className="absolute bottom-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-black/60 border border-white/20 text-slate-300 group-hover:scale-110 flex items-center justify-center transition backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none">
              <Maximize2 className="w-3 h-3" />
            </div>
          </div>

          {/* 2. Card Body Content */}
          <div className="px-1.5 pt-3.5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-brand-orange/90 mt-0.5">
                  {member.role}
                </p>
                {member.nim && (
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {member.nim}
                  </p>
                )}
              </div>

              {/* Academic Info */}
              <div className="text-[11px] text-slate-400 space-y-0.5 font-mono">
                <div className="truncate">
                  {member.studyProgram || member.prodi || 'Universitas Negeri Yogyakarta'}
                </div>
              </div>

              {/* Specialization Tags */}
              {member.specialization && member.specialization.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {member.specialization.slice(0, 2).map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px] font-mono border border-white/8 truncate max-w-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {member.specialization.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] font-mono border border-white/8">
                      +{member.specialization.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer: Detail Button */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-brand-orange transition-colors">
              <span className="text-[11px] font-mono tracking-wider uppercase">Profil &amp; Rekam Jejak</span>
              <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </SpotlightCard>
    );
  };

  // Active generation archive object
  const currentGenArchive = getGenerationArchive(selectedAlumniYear) || ALUMNI_GENERATIONS[0];

  return (
    <section id="team-roster" className={`py-12 sm:py-16 md:py-20 relative border-b border-white/5 ${className}`}>
      {/* Background Subtle Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8 sm:space-y-10">
        {/* Section Header */}
        {showHeader && (
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-mono tracking-wider border border-brand-orange/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL TEAM ROSTER &amp; HISTORICAL ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Susunan Anggota &amp; Arsip Generasi Tim Abhinaya UNY
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Daftar resmi kontingen riset robotika Abhinaya UNY di bawah naungan <strong className="text-slate-200">UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta</strong>. Menampilkan skuad teknis aktif divisi, baris kehormatan Ketua Tim (2020–2025), Manajerial Tim (2020–2025), serta penjelajah alumni lintas generasi KRI.
            </p>
          </div>
        )}

        {/* Navigation View Mode Hub */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-2 rounded-2xl bg-[#0B0B0E] border border-white/10 shadow-xl max-w-5xl mx-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand-orange text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Semua Roster &amp; Arsip</span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'active'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Skuad Teknis Aktif</span>
          </button>

          <button
            onClick={() => setActiveTab('leaders')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leaders'
                ? 'bg-amber-400 text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaders Hall of Fame</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] font-mono font-bold">6</span>
          </button>

          <button
            onClick={() => setActiveTab('managers')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'managers'
                ? 'bg-emerald-400 text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Managers Showcase</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] font-mono font-bold">4</span>
          </button>

          <button
            onClick={() => setActiveTab('alumni')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'alumni'
                ? 'bg-purple-400 text-black font-bold shadow-md'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Arsip Alumni (2020–2025)</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 1 (FIRST): CURRENT ACTIVE TECHNICAL SQUAD & DIVISIONS (R3)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'active') && (
          <div className="space-y-6 pt-2">
            {/* Division Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0B0B0E] p-3 sm:p-4 rounded-2xl border border-white/10 shadow-xl">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
                {DIVISION_CATEGORIES.map((cat) => {
                  const isActive = selectedDivision === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedDivision(cat.id);
                        setSearchQuery('');
                      }}
                      className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-brand-orange text-black font-bold shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/8'
                      }`}
                    >
                      {getDivisionIcon(cat.id, 'w-3.5 h-3.5')}
                      <span>{cat.label}</span>
                      <span
                        className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                          isActive
                            ? 'bg-black/30 text-black font-mono font-bold'
                            : 'bg-white/10 text-slate-400 font-mono'
                        }`}
                      >
                        {cat.id === 'All'
                          ? ALL_ROSTER_MEMBERS.length
                          : ALL_ROSTER_MEMBERS.filter((m) => m.division === cat.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Controls Group: Layout Mode Switcher & Search Box */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                {/* View Layout Toggle: Responsive Grid vs Horizontal Carousel */}
                <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewLayout('grid')}
                    className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      viewLayout === 'grid'
                        ? 'bg-brand-orange text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Tata Letak Grid Responsif"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewLayout('carousel')}
                    className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      viewLayout === 'carousel'
                        ? 'bg-brand-orange text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Tata Letak Carousel Geser"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Carousel</span>
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama, NIM, skill, quote..."
                    className="w-full bg-[#0E0E12] text-xs text-white placeholder-slate-500 pl-9 pr-8 py-2.5 rounded-xl border border-white/10 focus:border-white/20 focus:outline-none transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Member Cards Layout: Responsive Grid or Carousel */}
            {isSearching ? (
              // Search Results View
              <div>
                {ALL_ROSTER_MEMBERS.filter(matchesSearch).length === 0 ? (
                  <div className="p-10 text-center rounded-2xl bg-[#0B0B0E] border border-white/8 space-y-3">
                    <Users className="w-10 h-10 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Tidak Ada Anggota Ditemukan</h3>
                    <p className="text-xs text-slate-400">
                      Coba sesuaikan kata kunci pencarian Anda (nama, keahlian, nomor induk, peran).
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold border border-white/10 hover:bg-brand-orange hover:text-black transition cursor-pointer"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-bold text-brand-orange font-mono">
                      <span>Hasil Pencarian:</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-brand-orange font-mono border border-brand-orange/20">
                        {ALL_ROSTER_MEMBERS.filter(matchesSearch).length} anggota ditemukan
                      </span>
                    </div>
                    {/* Responsive Multi-Device CSS Grid Layout: Mobile (1 col), Tablet (2 cols), Desktop (3 cols), Wide (4 cols) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {ALL_ROSTER_MEMBERS.filter(matchesSearch).map((member) => renderMemberCard(member, undefined, 'grid'))}
                    </div>
                  </div>
                )}
              </div>
            ) : selectedDivision === 'All' ? (
              // All Divisions View: Responsive Multi-Device CSS Grid or Carousel Tracks
              <div className="space-y-6 sm:space-y-8">
                {DIVISION_ORDER.map((divKey) => {
                  const membersInDiv = ALL_ROSTER_MEMBERS.filter((m) => m.division === divKey);
                  if (membersInDiv.length === 0) return null;

                  const divInfo = DIVISION_INFO[divKey];
                  const badgeStyle = DIVISION_BADGES[divKey] || DIVISION_BADGES['Mekanik'];

                  return viewLayout === 'grid' ? (
                    <div key={divKey} className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-[#0B0B0E] border border-white/8 shadow-lg relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: badgeStyle.accent }} />
                        <div className="flex items-center space-x-3.5 pl-2">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border shadow-md flex-shrink-0"
                            style={{
                              backgroundColor: `${badgeStyle.accent}15`,
                              borderColor: `${badgeStyle.accent}40`,
                              color: badgeStyle.accent,
                            }}
                          >
                            {getDivisionIcon(divKey, 'w-5 h-5 sm:w-6 sm:h-6')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                                <span>{divInfo.title}</span>
                              </h3>
                              <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-mono font-medium text-slate-300 border border-white/10">
                                {membersInDiv.length} Anggota
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{divInfo.subtitle}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedDivision(divKey)}
                          className="text-xs font-bold text-slate-300 hover:text-brand-orange flex items-center space-x-1 pl-2 sm:pl-0 transition cursor-pointer"
                        >
                          <span>Fokus Divisi</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Responsive Multi-Device CSS Grid Layout: Mobile (1 col), Tablet (2 cols), Desktop (3 cols), Wide (4 cols) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {membersInDiv.map((member) => renderMemberCard(member, undefined, 'grid'))}
                      </div>
                    </div>
                  ) : (
                    <HorizontalScrollMemberTrack
                      key={divKey}
                      title={divInfo.title}
                      subtitle={divInfo.subtitle}
                      count={membersInDiv.length}
                      icon={getDivisionIcon(divKey, 'w-5 h-5 sm:w-6 sm:h-6')}
                      accentColor={badgeStyle.accent}
                      actionButton={
                        <button
                          onClick={() => setSelectedDivision(divKey)}
                          className="text-xs font-bold text-brand-orange hover:text-amber-300 flex items-center space-x-1 pl-2 transition cursor-pointer"
                        >
                          <span>Fokus Divisi</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      }
                    >
                      {membersInDiv.map((member) => renderMemberCard(member, undefined, 'carousel'))}
                    </HorizontalScrollMemberTrack>
                  );
                })}
              </div>
            ) : (
              // Single Division Filtered View: Responsive Multi-Device CSS Grid or Carousel Tracks
              <div className="space-y-4">
                {DIVISION_INFO[selectedDivision as TeamMember['division']] && (
                  viewLayout === 'grid' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0B0B0E] border border-white/10 shadow-lg relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1.5"
                          style={{
                            backgroundColor: (DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']).accent,
                          }}
                        />
                        <div className="flex items-center space-x-3.5 pl-2">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-md flex-shrink-0"
                            style={{
                              backgroundColor: `${(DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']).accent}20`,
                              borderColor: `${(DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']).accent}50`,
                              color: (DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']).accent,
                            }}
                          >
                            {getDivisionIcon(selectedDivision, 'w-5 h-5 sm:w-6 sm:h-6')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                                <span>{DIVISION_INFO[selectedDivision as TeamMember['division']].title}</span>
                              </h3>
                              <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-mono font-medium text-slate-300 border border-white/10">
                                {ALL_ROSTER_MEMBERS.filter((m) => m.division === selectedDivision).length} Anggota
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {DIVISION_INFO[selectedDivision as TeamMember['division']].subtitle}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedDivision('All')}
                          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition border border-white/10 cursor-pointer"
                        >
                          Tampilkan Semua Divisi
                        </button>
                      </div>

                      {/* Responsive Multi-Device CSS Grid Layout: Mobile (1 col), Tablet (2 cols), Desktop (3 cols), Wide (4 cols) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {ALL_ROSTER_MEMBERS.filter((m) => m.division === selectedDivision).map((member) =>
                          renderMemberCard(member, undefined, 'grid')
                        )}
                      </div>
                    </div>
                  ) : (
                    <HorizontalScrollMemberTrack
                      title={DIVISION_INFO[selectedDivision as TeamMember['division']].title}
                      subtitle={DIVISION_INFO[selectedDivision as TeamMember['division']].subtitle}
                      count={ALL_ROSTER_MEMBERS.filter((m) => m.division === selectedDivision).length}
                      icon={getDivisionIcon(selectedDivision, 'w-5 h-5 sm:w-6 sm:h-6')}
                      accentColor={(DIVISION_BADGES[selectedDivision as DivisionType] || DIVISION_BADGES['Mekanik']).accent}
                      actionButton={
                        <button
                          onClick={() => setSelectedDivision('All')}
                          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition border border-white/10 cursor-pointer"
                        >
                          Tampilkan Semua Divisi
                        </button>
                      }
                    >
                      {ALL_ROSTER_MEMBERS.filter((m) => m.division === selectedDivision).map((member) =>
                        renderMemberCard(member, undefined, 'carousel')
                      )}
                    </HorizontalScrollMemberTrack>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 2 (BELOW SQUAD): ALL-ERA LEADERS HALL OF FAME (2020 – 2025)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'leaders') && (
          <div className="space-y-4 pt-4 border-t border-white/5">
            <HorizontalScrollMemberTrack
              accentColor="#EAB308"
              customHeader={
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0E] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5 relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                          CHRONOLOGICAL LEADERSHIP TIMELINE
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
                          2020 – 2025
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white">
                        Leaders Hall of Fame
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Deretan seluruh Ketua Tim Robotika Abhinaya UNY lintas generasi dari masa perintisan otonom hingga era AI Computer Vision.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 self-stretch md:self-auto justify-center">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>6 Era Kepemimpinan Resmi</span>
                  </div>
                </div>
              }
            >
              {LEADERS_HALL_OF_FAME.map((leader) =>
                renderMemberCard(
                  leader,
                  {
                    border: 'border-white/10 hover:border-amber-400/40',
                    accent: '#EAB308',
                  },
                  'carousel'
                )
              )}
            </HorizontalScrollMemberTrack>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 3 (BELOW LEADERS): ALL-ERA MANAGERS SHOWCASE (2020 – 2025)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'managers') && (
          <div className="space-y-4 pt-4 border-t border-white/5">
            <HorizontalScrollMemberTrack
              accentColor="#10B981"
              customHeader={
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0E] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5 relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                          OPERATIONAL &amp; MEDIA EXCELLENCE
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                          2020 – 2025
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white">
                        Managers Showcase
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pilar manajerial, penganggaran riset, administrasi birokrasi Puspresnas, logistik akomodasi, dan branding resmi @abhinaya.uny.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 self-stretch md:self-auto justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Tata Kelola Kontingen Mandiri</span>
                  </div>
                </div>
              }
            >
              {MANAGERS_SHOWCASE.map((manager) =>
                renderMemberCard(
                  manager,
                  {
                    border: 'border-white/10 hover:border-emerald-400/40',
                    accent: '#10B981',
                  },
                  'carousel'
                )
              )}
            </HorizontalScrollMemberTrack>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 4 (BOTTOM): INTERACTIVE ALUMNI & GENERATION EXPLORER (2020–2025)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'alumni') && (
          <div className="space-y-6 pt-4 border-t border-white/5">
            {/* Alumni Explorer Section Title */}
            <div className="p-5 rounded-2xl bg-[#0B0B0E] border border-white/10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                        ALUMNI &amp; GENERATIONS ARCHIVE
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono border border-purple-500/20">
                        2020 – 2025
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">
                      Penjelajah Kontingen Alumni Robotika
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Eksplorasi kontingen resmi, struktur kepengurusan, divisi teknis, dan torehan prestasi kompetisi KRTMI Puspresnas per tahun generasi.
                    </p>
                  </div>
                </div>

                {/* Year Tabs Selector */}
                <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 self-stretch md:self-auto justify-center">
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => {
                    const isSelected = selectedAlumniYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedAlumniYear(year)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Generation Detail Banner & Horizontal Scroll Track */}
            {currentGenArchive && (
              <div className="p-5 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/20">
                        GENERASI {currentGenArchive.year}
                      </span>
                      <span className="text-xs text-amber-300 font-bold">
                        {currentGenArchive.tournament}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-xl font-bold text-white">
                      {currentGenArchive.contingentName}
                    </h4>
                    <p className="text-xs text-slate-300">
                      <strong>Tema Robot:</strong> {currentGenArchive.theme}
                    </p>
                  </div>

                  {/* Achievements Badge */}
                  <div className="flex flex-col gap-1 self-stretch md:self-auto">
                    {currentGenArchive.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white/5 text-amber-300 text-xs font-medium border border-white/10 flex items-center space-x-2"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contingent Members Horizontal Scroll Track */}
                <HorizontalScrollMemberTrack
                  title={`Daftar Anggota Kontingen Generasi ${currentGenArchive.year}`}
                  subtitle="Anggota kontingen resmi kompetisi KRI / KRTMI"
                  count={currentGenArchive.members.length}
                  icon={<Users className="w-5 h-5 text-purple-400" />}
                  accentColor="#A855F7"
                >
                  {currentGenArchive.members.map((member) => renderMemberCard(member, undefined, 'carousel'))}
                </HorizontalScrollMemberTrack>
              </div>
            )}
          </div>
        )}

        {/* Optional Link to Division Detail */}
        {showAllLink && (
          <div className="text-center pt-2">
            <a
              href={`${basePath}/divisi`}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#0B0B0E] border border-white/10 hover:border-white/20 text-white text-xs sm:text-sm font-medium hover:bg-white/5 transition shadow-lg"
            >
              <Layers className="w-4 h-4 text-brand-orange" />
              <span>Pelajari Seluruh Divisi &amp; Kultur Riset Abhinaya</span>
              <ChevronRight className="w-4 h-4 text-brand-orange" />
            </a>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          INTERACTIVE DETAIL LIGHTBOX MODAL (R5)
          ══════════════════════════════════════════════════════════════════════ */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0B0B0E] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition border border-white/10 z-30 cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Top Showcase */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pt-1">
              {/* Large Photo Frame in Modal */}
              <div
                className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 relative bg-black group"
                style={{
                  borderColor: (
                    DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']
                  ).accent,
                }}
              >
                <MemberPhotoFadeShowcase
                  member={selectedMember}
                  basePath={basePath}
                  badgeStyle={DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']}
                  isModal={true}
                  hasError={imgErrors[selectedMember.id]}
                  onImageError={(id) => setImgErrors((prev) => ({ ...prev, [id]: true }))}
                />
              </div>

              {/* Name, Division & Quote */}
              <div className="flex-1 space-y-2.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-xl text-[11px] font-bold uppercase border ${
                      (DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']).bg
                    } ${
                      (DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']).text
                    } ${
                      (DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']).border
                    }`}
                  >
                    {getDivisionIcon(selectedMember.division, 'w-3.5 h-3.5')}
                    <span>{selectedMember.division}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-xl bg-white/5 text-slate-300 text-xs font-mono font-medium border border-white/10">
                    {selectedMember.badge}
                  </span>

                  {selectedMember.generationYear && (
                    <span className="px-2 py-0.5 rounded-xl bg-purple-500/10 text-purple-300 text-xs font-mono font-medium border border-purple-500/20">
                      Era {selectedMember.generationYear}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                    {selectedMember.role}
                  </p>
                </div>

                {/* Quote Banner */}
                {selectedMember.quote && (
                  <div className="p-3 rounded-2xl bg-[#0E0E12] border border-white/8 text-xs text-slate-300 italic flex items-center space-x-2.5 text-left">
                    <Quote className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    <span className="font-medium">"{selectedMember.quote}"</span>
                  </div>
                )}
              </div>
            </div>

            {/* Academic & Role Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#0E0E12] border border-white/8 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Nomor Induk (NIM / NIDN)
                </span>
                <span className="text-white font-mono font-semibold">{selectedMember.nim}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Status / Angkatan
                </span>
                <span className="text-slate-200 font-semibold">
                  {selectedMember.generation || 'Mahasiswa Aktif Universitas Negeri Yogyakarta'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Program Studi
                </span>
                <span className="text-white font-semibold">{selectedMember.studyProgram || selectedMember.prodi}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Fakultas / Kampus
                </span>
                <span className="text-slate-200 font-semibold">{selectedMember.faculty}</span>
              </div>
            </div>

            {/* SubRole Details if present */}
            {selectedMember.subRole && (
              <div className="p-3 rounded-xl bg-[#0E0E12] border border-white/8 text-xs">
                <span className="text-brand-orange font-bold uppercase text-[10px] tracking-wider block mb-1">
                  Tanggung Jawab Teknis Spesifik:
                </span>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {selectedMember.subRole}
                </p>
              </div>
            )}

            {/* Bio Narrative */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-brand-orange" />
                <span>Deskripsi Kontribusi Riset:</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0E0E12] p-3.5 rounded-2xl border border-white/8">
                {selectedMember.bio}
              </p>
            </div>

            {/* Technical Specialization Pills */}
            {selectedMember.specialization && selectedMember.specialization.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-brand-orange" />
                  <span>Keahlian &amp; Penguasaan Teknologi:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.specialization.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-200 text-xs font-medium border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements List in Modal if present */}
            {selectedMember.achievements && selectedMember.achievements.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center space-x-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Penghargaan &amp; Prestasi Kejuaraan:</span>
                </span>
                <div className="space-y-1">
                  {selectedMember.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-amber-200 text-xs font-medium flex items-center space-x-2"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links & Official Record Confirmation */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>Data Terverifikasi UKM Rekayasa Teknologi Universitas Negeri Yogyakarta</span>
              </div>

              {selectedMember.socials && (
                <div className="flex items-center space-x-2">
                  {selectedMember.socials.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
                      title="GitHub"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#0A66C2] text-slate-300 hover:text-white transition border border-white/10"
                      title="LinkedIn"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.instagram && (
                    <a
                      href={selectedMember.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] text-slate-300 hover:text-white transition border border-white/10"
                      title="Instagram"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.tiktok && (
                    <a
                      href={selectedMember.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition border border-white/10"
                      title="TikTok"
                    >
                      <FaTiktok className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.youtube && (
                    <a
                      href={selectedMember.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#FF0000] text-slate-300 hover:text-white transition border border-white/10"
                      title="YouTube"
                    >
                      <FaYoutube className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.twitter && (
                    <a
                      href={selectedMember.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#1DA1F2] text-slate-300 hover:text-white transition border border-white/10"
                      title="Twitter / X"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};