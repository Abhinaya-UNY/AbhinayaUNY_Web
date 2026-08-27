'use client';

import React, { useState, useEffect } from 'react';
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
  Github,
  Linkedin,
  Instagram,
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
} from 'lucide-react';
import {
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

interface TeamRosterSectionProps {
  initialDivision?: string;
  showHeader?: boolean;
  showAllLink?: boolean;
  className?: string;
}

/**
 * Reusable Multi-Photo Crossfade Showcase Component
 * GPU-accelerated transition engine with slide indicators, manual controls, and monogram fallback
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

    // Slight offset per member id to prevent synchronized jumping
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
      <div
        className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none"
        style={{ backgroundColor: `${badgeStyle.accent}15` }}
      >
        <div
          className={`${
            isModal ? 'w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl' : 'w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl'
          } rounded-3xl flex items-center justify-center font-black border-2 shadow-2xl mb-2 transition-transform duration-300 group-hover:scale-105`}
          style={{
            backgroundColor: `${badgeStyle.accent}30`,
            borderColor: badgeStyle.accent,
            color: '#FFFFFF',
            boxShadow: `0 8px 24px -4px ${badgeStyle.accent}40`,
          }}
        >
          {member.name
            .split(' ')
            .filter((w) => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.') && !w.startsWith('Dr.'))
            .slice(0, 2)
            .map((n) => n[0])
            .join('')}
        </div>
        <span className="text-xs font-mono font-bold text-amber-200/80">
          {member.role}
        </span>
        {member.division && (
          <span className="text-[10px] text-slate-400 mt-0.5">
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

      {/* Smooth Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#130E09] via-[#130E09]/25 to-transparent pointer-events-none z-10" />

      {/* Multiple Photos Slide Counter & Nav Arrows if > 1 photo */}
      {images.length > 1 && (
        <>
          {/* Top-Right Multi-Photo Indicator Badge */}
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-black/75 text-amber-300 text-[10px] font-mono font-bold border border-brand-orange/40 backdrop-blur-md shadow-lg pointer-events-none">
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

export const TeamRosterSection: React.FC<TeamRosterSectionProps> = ({
  initialDivision = 'All',
  showHeader = true,
  showAllLink = false,
  className = '',
}) => {
  // Navigation & View Mode State
  const [activeTab, setActiveTab] = useState<'all' | 'leaders' | 'managers' | 'active' | 'alumni'>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | LeaderHistoryItem | ManagerHistoryItem | null>(null);
  const [selectedAlumniYear, setSelectedAlumniYear] = useState<number>(2024);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

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
    customTheme?: { border?: string; accent?: string; badgeText?: string }
  ) => {
    const badgeStyle = DIVISION_BADGES[member.division] || DIVISION_BADGES['Mekanik'];
    const isAdvisor = member.division === 'Pembimbing';
    const isLeader = member.division === 'Ketua Tim' || member.isLeader;
    const isManager = member.division === 'Manager' || member.isManager;

    const accentColor = customTheme?.accent || badgeStyle.accent;

    return (
      <div
        key={`${member.id}-${member.generationYear || 'roster'}`}
        onClick={() => setSelectedMember(member)}
        className={`group cursor-pointer relative rounded-3xl bg-[#130E09] border ${
          customTheme?.border
            ? customTheme.border
            : isLeader
            ? 'border-amber-500/40 hover:border-amber-400 bg-gradient-to-b from-[#1C140A] to-[#120D08]'
            : isManager
            ? 'border-emerald-500/40 hover:border-emerald-400 bg-gradient-to-b from-[#0A1A14] to-[#0A100E]'
            : isAdvisor
            ? 'border-purple-500/50 bg-[#160B1E]/60'
            : 'border-[#2B1B10] hover:border-brand-orange/80'
        } transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition z-20"
          style={{ backgroundColor: accentColor }}
        />

        {/* 1. Large Top Photo Banner / Showcase with Auto Crossfade */}
        <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-[#180F08] border-b border-[#24170E]">
          <MemberPhotoFadeShowcase
            member={member}
            basePath={basePath}
            badgeStyle={badgeStyle}
            hasError={imgErrors[member.id]}
            onImageError={(id) => setImgErrors((prev) => ({ ...prev, [id]: true }))}
          />

          {/* Top Left Division / Leadership Badge Floating */}
          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none flex flex-col gap-1.5">
            <span
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
            >
              {isLeader ? (
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              ) : isManager ? (
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                getDivisionIcon(member.division, 'w-3.5 h-3.5')
              )}
              <span>{member.division}</span>
            </span>

            {member.generationYear && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-black/80 text-amber-300 text-[10px] font-mono font-bold border border-white/10 backdrop-blur-md self-start">
                <Calendar className="w-3 h-3 text-brand-orange" />
                <span>Era {member.generationYear}</span>
              </span>
            )}
          </div>

          {/* Bottom-right Quick Zoom Icon */}
          <div className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white/80 group-hover:text-brand-orange group-hover:border-brand-orange group-hover:scale-110 flex items-center justify-center transition backdrop-blur-md shadow-lg">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* 2. Card Body Content */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Name, Role & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-brand-orange transition line-clamp-1">
                  {member.name}
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-[#25180E] text-brand-orange text-[10px] font-mono font-bold border border-brand-orange/30 flex-shrink-0">
                  {member.badge}
                </span>
              </div>
              <p className="text-xs font-bold text-amber-300/95 leading-tight mt-0.5">
                {member.role}
              </p>
              {member.nim && (
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {member.nim}
                </p>
              )}
            </div>

            {/* Quote Bubble if present */}
            {member.quote && (
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#1C120A] border border-amber-900/40 text-xs text-amber-200 italic flex items-start space-x-2.5 shadow-inner">
                <Quote className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">"{member.quote}"</span>
              </div>
            )}

            {/* Academic Info */}
            <div className="p-3 rounded-xl bg-[#1A1009] border border-[#2B1B10] text-xs space-y-1">
              <div className="text-slate-300 truncate">
                <span className="text-slate-400 font-medium">Prodi:</span> {member.studyProgram || member.prodi || 'Universitas Negeri Yogyakarta'}
              </div>
              <div className="text-slate-400 text-[11px] truncate">
                <span>Fakultas:</span> {member.faculty || 'Fakultas Teknik (FT)'}
              </div>
            </div>

            {/* Specialization Tags */}
            {member.specialization && member.specialization.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-brand-orange" />
                  <span>Fokus Keahlian:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialization.slice(0, 3).map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#24170D] text-amber-100 text-[10px] font-semibold border border-brand-orange/20 truncate max-w-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {member.specialization.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-[#1C120A] text-amber-300/80 text-[10px] font-mono">
                      +{member.specialization.length - 3} lagi
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Achievements Pill (if present) */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200 flex items-center space-x-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">{member.achievements[0]}</span>
              </div>
            )}
          </div>

          {/* Card Footer: Detail Button */}
          <div className="pt-4 border-t border-[#24170E] flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-brand-orange">
            <span className="text-xs flex items-center space-x-1.5">
              <span>Buka Profil Lengkap</span>
            </span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition duration-300" />
          </div>
        </div>
      </div>
    );
  };

  // Active generation archive object
  const currentGenArchive = getGenerationArchive(selectedAlumniYear) || ALUMNI_GENERATIONS[0];

  return (
    <section id="team-roster" className={`py-12 sm:py-16 md:py-20 relative ${className}`}>
      {/* Background Cyber Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12 sm:space-y-16">
        {/* Section Header */}
        {showHeader && (
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL TEAM ROSTER &amp; HISTORICAL ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Susunan Anggota &amp; Arsip Generasi Tim Abhinaya UNY 🤖
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Daftar resmi kontingen riset robotika Abhinaya UNY di bawah naungan <strong>UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta</strong>. Menampilkan baris kehormatan Ketua Tim (2020–2025), Manajerial Tim (2020–2025), skuad teknis aktif, serta penjelajah alumni lintas generasi KRI.
            </p>
          </div>
        )}

        {/* Navigation View Mode Hub */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-[#120D08]/90 border border-brand-orange/25 backdrop-blur-md shadow-xl max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-brand-orange to-brand-darkOrange text-white shadow-lg shadow-brand-orange/30'
                : 'bg-[#1C130B] text-slate-300 hover:text-white hover:bg-[#281B0F]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Semua Roster &amp; Arsip</span>
          </button>

          <button
            onClick={() => setActiveTab('leaders')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'leaders'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-[#1C130B] text-amber-200/80 hover:text-amber-100 hover:bg-[#281B0F]'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaders Hall of Fame</span>
            <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono font-bold">6</span>
          </button>

          <button
            onClick={() => setActiveTab('managers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'managers'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-[#1C130B] text-emerald-200/80 hover:text-emerald-100 hover:bg-[#281B0F]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>Managers Showcase</span>
            <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono font-bold">6</span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'active'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-[#1C130B] text-cyan-200/80 hover:text-cyan-100 hover:bg-[#281B0F]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Skuad Teknis Aktif</span>
          </button>

          <button
            onClick={() => setActiveTab('alumni')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'alumni'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-[#1C130B] text-purple-200/80 hover:text-purple-100 hover:bg-[#281B0F]'
            }`}
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Arsip Alumni (2020–2025)</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 2: ALL-ERA LEADERS HALL OF FAME (2020 – 2025) (R2)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'leaders') && (
          <div className="space-y-6 pt-2">
            {/* Gold Themed Header Banner */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#201507] via-[#1A1005] to-[#120B03] border-2 border-amber-500/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/50 flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-mono">
                      CHRONOLOGICAL LEADERSHIP TIMELINE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      2020 – 2025
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Leaders Hall of Fame 👑
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
                    Deretan seluruh Ketua Tim Robotika Abhinaya UNY lintas generasi dari masa perintisan otonom hingga era AI Computer Vision.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 bg-[#2A1B0A] px-3.5 py-1.5 rounded-xl border border-amber-500/30 self-stretch md:self-auto justify-center">
                <Award className="w-4 h-4 text-amber-400" />
                <span>6 Era Kepemimpinan Resmi</span>
              </div>
            </div>

            {/* Leaders Grid (Chronological 2020 -> 2025) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {LEADERS_HALL_OF_FAME.map((leader) =>
                renderMemberCard(leader, {
                  border: 'border-amber-500/40 hover:border-amber-400 shadow-amber-500/10',
                  accent: '#EAB308',
                })
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 3: ALL-ERA MANAGERS SHOWCASE (2020 – 2025) (R2)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'managers') && (
          <div className="space-y-6 pt-4">
            {/* Emerald Themed Header Banner */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#071A12] via-[#05140E] to-[#030E0A] border-2 border-emerald-500/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/50 flex-shrink-0 shadow-lg shadow-emerald-500/20">
                  <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 font-mono">
                      OPERATIONAL &amp; MEDIA EXCELLENCE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      2020 – 2025
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Managers Showcase 💼
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200/70 mt-0.5">
                    Pilar manajerial, penganggaran riset, administrasi birokrasi Puspresnas, logistik akomodasi, dan branding resmi @abhinaya.uny.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-[#0C241A] px-3.5 py-1.5 rounded-xl border border-emerald-500/30 self-stretch md:self-auto justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tata Kelola Kontingen Mandiri</span>
              </div>
            </div>

            {/* Managers Grid (Chronological 2020 -> 2025) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {MANAGERS_SHOWCASE.map((manager) =>
                renderMemberCard(manager, {
                  border: 'border-emerald-500/40 hover:border-emerald-400 shadow-emerald-500/10',
                  accent: '#10B981',
                })
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 4: CURRENT ACTIVE TECHNICAL SQUAD & DIVISION FILTERS (R3)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'active') && (
          <div className="space-y-8 pt-4">
            {/* Division Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#120D08]/90 p-3 sm:p-4 rounded-3xl border border-brand-orange/25 backdrop-blur-md shadow-xl">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-brand-orange/30">
                {DIVISION_CATEGORIES.map((cat) => {
                  const isActive = selectedDivision === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedDivision(cat.id);
                        setSearchQuery('');
                      }}
                      className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-orange to-brand-darkOrange text-white shadow-lg shadow-brand-orange/30 scale-[1.02]'
                          : 'bg-[#1C130B] text-slate-300 hover:text-white hover:bg-[#281B0F] border border-[#2B1B10]'
                      }`}
                    >
                      {getDivisionIcon(cat.id, 'w-3.5 h-3.5')}
                      <span>{cat.label}</span>
                      <span
                        className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                          isActive
                            ? 'bg-black/30 text-white font-mono font-bold'
                            : 'bg-black/50 text-amber-200/70 font-mono'
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

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama, NIM, skill, quote..."
                  className="w-full bg-[#180F08] text-xs text-white placeholder-slate-400 pl-9 pr-8 py-2.5 rounded-xl border border-[#2B1B10] focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange transition"
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

            {/* Grouped Division Rows Structure */}
            {isSearching ? (
              // Search Results View
              <div>
                {ALL_ROSTER_MEMBERS.filter(matchesSearch).length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-[#120D08] border border-[#2B1B10] space-y-3">
                    <Users className="w-10 h-10 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Tidak Ada Anggota Ditemukan</h3>
                    <p className="text-xs text-slate-400">
                      Coba sesuaikan kata kunci pencarian Anda (nama, keahlian, nomor induk, peran).
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-xl bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30 hover:bg-brand-orange hover:text-white transition cursor-pointer"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                      <span>Hasil Pencarian:</span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-orange/20 text-brand-orange font-mono">
                        {ALL_ROSTER_MEMBERS.filter(matchesSearch).length} anggota ditemukan
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                      {ALL_ROSTER_MEMBERS.filter(matchesSearch).map((member) => renderMemberCard(member))}
                    </div>
                  </div>
                )}
              </div>
            ) : selectedDivision === 'All' ? (
              // Neat Row-by-Row Division Sections
              <div className="space-y-12 sm:space-y-16">
                {DIVISION_ORDER.map((divKey) => {
                  const membersInDiv = ALL_ROSTER_MEMBERS.filter((m) => m.division === divKey);
                  if (membersInDiv.length === 0) return null;

                  const divInfo = DIVISION_INFO[divKey];
                  const badgeStyle = DIVISION_BADGES[divKey] || DIVISION_BADGES['Mekanik'];

                  return (
                    <div key={divKey} className="space-y-6">
                      {/* Division Section Header Banner */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#140E09] border border-[#2B1B10] shadow-lg relative overflow-hidden">
                        {/* Left Accent Stripe */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1.5"
                          style={{ backgroundColor: badgeStyle.accent }}
                        />

                        <div className="flex items-center space-x-3.5 pl-2">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-md flex-shrink-0"
                            style={{
                              backgroundColor: `${badgeStyle.accent}20`,
                              borderColor: `${badgeStyle.accent}50`,
                              color: badgeStyle.accent,
                            }}
                          >
                            {getDivisionIcon(divKey, 'w-5 h-5 sm:w-6 sm:h-6')}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                              <span>{divInfo.title}</span>
                              <span className="px-2 py-0.5 rounded-md bg-black/60 text-xs font-mono font-bold text-amber-300 border border-white/10">
                                {membersInDiv.length} Anggota
                              </span>
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {divInfo.subtitle}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedDivision(divKey)}
                          className="text-xs font-bold text-amber-400 hover:text-brand-orange flex items-center space-x-1 pl-2 sm:pl-0 transition cursor-pointer"
                        >
                          <span>Fokus Divisi Ini</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Members Grid for this Division */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {membersInDiv.map((member) => renderMemberCard(member))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Single Division Filtered Grid View
              <div className="space-y-6">
                {/* Division Banner */}
                {DIVISION_INFO[selectedDivision as TeamMember['division']] && (
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#140E09] border border-brand-orange/30 shadow-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-brand-orange/20 text-brand-orange flex items-center justify-center border border-brand-orange/40 flex-shrink-0">
                        {getDivisionIcon(selectedDivision, 'w-5 h-5')}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl font-black text-white">
                          {DIVISION_INFO[selectedDivision as TeamMember['division']].title}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {DIVISION_INFO[selectedDivision as TeamMember['division']].subtitle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedDivision('All')}
                      className="px-3 py-1.5 rounded-xl bg-[#20150D] hover:bg-brand-orange text-amber-200 hover:text-black text-xs font-bold transition border border-brand-orange/30 cursor-pointer"
                    >
                      Tampilkan Semua Divisi
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {ALL_ROSTER_MEMBERS.filter((m) => m.division === selectedDivision).map((member) =>
                    renderMemberCard(member)
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURE 5: INTERACTIVE ALUMNI & GENERATION EXPLORER (2020–2025) (R4)
            ══════════════════════════════════════════════════════════════════════ */}
        {(activeTab === 'all' || activeTab === 'alumni') && (
          <div className="space-y-8 pt-6 border-t border-[#26180E]">
            {/* Alumni Explorer Section Title */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#170B24] via-[#10071A] to-[#0A0410] border-2 border-purple-500/40 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/50 flex-shrink-0 shadow-lg shadow-purple-500/20">
                    <History className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-purple-400 font-mono">
                        ALUMNI &amp; GENERATIONS ARCHIVE
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        2020 – 2025
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                      Penjelajah Kontingen Alumni Robotika 🎓
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/70 mt-0.5">
                      Eksplorasi kontingen resmi, struktur kepengurusan, divisi teknis, dan torehan prestasi kompetisi KRTMI Puspresnas per tahun generasi.
                    </p>
                  </div>
                </div>

                {/* Year Tabs Selector */}
                <div className="flex flex-wrap items-center gap-2 bg-black/50 p-2 rounded-2xl border border-purple-500/30 self-stretch md:self-auto justify-center">
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => {
                    const isSelected = selectedAlumniYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedAlumniYear(year)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/40 scale-105'
                            : 'bg-[#1C1226] text-purple-200 hover:text-white hover:bg-purple-900/40'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Generation Detail Banner */}
            {currentGenArchive && (
              <div className="p-6 rounded-3xl bg-[#140E1B] border border-purple-500/30 space-y-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 text-xs font-mono font-black border border-purple-500/40">
                        GENERASI {currentGenArchive.year}
                      </span>
                      <span className="text-xs text-amber-300 font-bold">
                        {currentGenArchive.tournament}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-2xl font-black text-white">
                      {currentGenArchive.contingentName}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Tema Robot:</strong> {currentGenArchive.theme}
                    </p>
                  </div>

                  {/* Achievements Badge */}
                  <div className="flex flex-col gap-1.5 self-stretch md:self-auto">
                    {currentGenArchive.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-950/40 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center space-x-2"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contingent Members Grid for this generation */}
                <div className="space-y-4">
                  <h5 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>Daftar Anggota Kontingen Resmi Generasi {currentGenArchive.year}:</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {currentGenArchive.members.map((member) => renderMemberCard(member))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Optional Link to Division Detail */}
        {showAllLink && (
          <div className="text-center pt-4">
            <a
              href={`${basePath}/divisi`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#170E08] border border-brand-orange/40 hover:border-brand-orange text-white text-xs sm:text-sm font-black hover:bg-brand-orange/20 transition shadow-lg"
            >
              <Layers className="w-4 h-4 text-brand-orange" />
              <span>Pelajari Seluruh Divisi &amp; Kultur Riset Abhinaya</span>
              <ChevronRight className="w-4 h-4 text-brand-orange" />
            </a>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURE 6: INTERACTIVE DETAIL LIGHTBOX MODAL (R5)
          ══════════════════════════════════════════════════════════════════════ */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#140E09] border-2 border-brand-orange/50 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-brand-orange/20 space-y-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#24170E] hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition border border-[#3A2214] z-30 cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Top Showcase: Large Photo Carousel & Identity */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pt-2">
              {/* Large Photo Frame in Modal */}
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 shadow-2xl flex-shrink-0 relative bg-[#1B1109] group"
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
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase border ${
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

                  <span className="px-2.5 py-1 rounded-xl bg-[#25180E] text-brand-orange text-xs font-mono font-black border border-brand-orange/30">
                    {selectedMember.badge}
                  </span>

                  {selectedMember.generationYear && (
                    <span className="px-2.5 py-1 rounded-xl bg-purple-950 text-purple-300 text-xs font-mono font-bold border border-purple-500/40">
                      Era {selectedMember.generationYear}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">
                    {selectedMember.role}
                  </p>
                </div>

                {/* Quote Banner */}
                {selectedMember.quote && (
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#1F130B] border border-brand-orange/30 text-xs sm:text-sm text-amber-200 italic flex items-center space-x-3 shadow-inner text-left">
                    <Quote className="w-5 h-5 text-brand-orange flex-shrink-0" />
                    <span className="font-medium">"{selectedMember.quote}"</span>
                  </div>
                )}
              </div>
            </div>

            {/* Academic & Role Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#1B120A] border border-[#2B1B10] text-xs">
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
                <span className="text-amber-200 font-semibold">
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
              <div className="p-3.5 rounded-xl bg-[#1F140C] border border-brand-orange/20 text-xs">
                <span className="text-amber-400 font-black uppercase text-[10px] tracking-wider block mb-1">
                  Tanggung Jawab Teknis Spesifik:
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {selectedMember.subRole}
                </p>
              </div>
            )}

            {/* Bio Narrative */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-brand-orange" />
                <span>Deskripsi Kontribusi Riset:</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#190F09] p-4 rounded-2xl border border-[#2B1B10]">
                {selectedMember.bio}
              </p>
            </div>

            {/* Technical Specialization Pills */}
            {selectedMember.specialization && selectedMember.specialization.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-brand-orange" />
                  <span>Keahlian &amp; Penguasaan Teknologi:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialization.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#24170E] text-amber-100 text-xs font-semibold border border-brand-orange/30 shadow-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements List in Modal if present */}
            {selectedMember.achievements && selectedMember.achievements.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center space-x-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Penghargaan &amp; Prestasi Kejuaraan:</span>
                </span>
                <div className="space-y-1.5">
                  {selectedMember.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 rounded-xl bg-[#221508] border border-amber-500/30 text-amber-200 text-xs font-medium flex items-center space-x-2"
                    >
                      <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links & Official Record Confirmation */}
            <div className="pt-4 border-t border-[#26180E] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Data Terverifikasi UKM Rekayasa Teknologi Universitas Negeri Yogyakarta</span>
              </div>

              {selectedMember.socials && (
                <div className="flex items-center space-x-2.5">
                  {selectedMember.socials.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#20150D] hover:bg-brand-orange text-slate-300 hover:text-white transition border border-[#3A2214]"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#20150D] hover:bg-brand-orange text-slate-300 hover:text-white transition border border-[#3A2214]"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.instagram && (
                    <a
                      href={selectedMember.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#20150D] hover:bg-brand-orange text-slate-300 hover:text-white transition border border-[#3A2214]"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="p-2 rounded-xl bg-[#20150D] hover:bg-brand-orange text-slate-300 hover:text-white transition border border-[#3A2214]"
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
