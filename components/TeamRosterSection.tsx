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
  ShieldCheck,
  Cpu,
  Layers,
  Award,
  Quote,
  Maximize2,
} from 'lucide-react';
import {
  TeamMember,
  ALL_ROSTER_MEMBERS,
  DIVISION_CATEGORIES,
  DIVISION_BADGES,
} from '@/data/teamData';

interface TeamRosterSectionProps {
  initialDivision?: string;
  showHeader?: boolean;
  showAllLink?: boolean;
  className?: string;
}

export const TeamRosterSection: React.FC<TeamRosterSectionProps> = ({
  initialDivision = 'All',
  showHeader = true,
  showAllLink = false,
  className = '',
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
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

  // Filter members by division and search query
  const filteredMembers = ALL_ROSTER_MEMBERS.filter((member) => {
    const matchesDivision =
      selectedDivision === 'All' ? true : member.division === selectedDivision;

    const matchesSearch =
      searchQuery.trim() === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.nim?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      member.studyProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.quote && member.quote.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDivision && matchesSearch;
  });

  const getDivisionIcon = (id: string, sizeClass = 'w-4 h-4') => {
    switch (id) {
      case 'Pembimbing':
        return <GraduationCap className={sizeClass} />;
      case 'Manajerial & Media':
        return <Briefcase className={sizeClass} />;
      case 'Programming & AI':
        return <Code className={sizeClass} />;
      case 'Mekanik':
        return <Wrench className={sizeClass} />;
      case 'Elektrik':
        return <Zap className={sizeClass} />;
      default:
        return <Users className={sizeClass} />;
    }
  };

  return (
    <section id="team-roster" className={`py-12 sm:py-16 md:py-20 relative ${className}`}>
      {/* Background Cyber Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-10 sm:space-y-12">
        {/* Section Header */}
        {showHeader && (
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-black uppercase tracking-wider border border-brand-orange/30 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL TEAM ROSTER &amp; STRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Susunan Anggota Tim Abhinaya UNY 🤖
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Daftar resmi kontingen riset robotika Abhinaya UNY di bawah naungan UKM Rekayasa Teknologi (Restek) Universitas Negeri Yogyakarta. Sinergi 4 divisi keteknikan dan pembimbing ahli.
            </p>
          </div>
        )}

        {/* Division Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#120D08]/90 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-brand-orange/25 backdrop-blur-md shadow-xl">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-brand-orange/30">
            {DIVISION_CATEGORIES.map((cat) => {
              const isActive = selectedDivision === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedDivision(cat.id)}
                  className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
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
              placeholder="Cari nama, NIM, divisi, quote..."
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

        {/* Member Cards Grid */}
        {filteredMembers.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#120D08] border border-[#2B1B10] space-y-3">
            <Users className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Tidak Ada Anggota Ditemukan</h3>
            <p className="text-xs text-slate-400">
              Coba sesuaikan kata kunci pencarian atau ganti filter divisi.
            </p>
            <button
              onClick={() => {
                setSelectedDivision('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30 hover:bg-brand-orange hover:text-white transition"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredMembers.map((member) => {
              const badgeStyle = DIVISION_BADGES[member.division] || DIVISION_BADGES['Mekanik'];
              const isAdvisor = member.division === 'Pembimbing';
              const hasCustomPhoto = member.image && !member.image.includes('logo_abhinaya') && !imgErrors[member.id];

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`group cursor-pointer relative rounded-3xl bg-[#130E09] border ${
                    isAdvisor ? 'border-purple-500/50 bg-[#160B1E]/60' : 'border-[#2B1B10]'
                  } hover:border-brand-orange/80 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition z-20"
                    style={{ backgroundColor: badgeStyle.accent }}
                  />

                  {/* 1. Large Top Photo Banner / Showcase */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-[#180F08] border-b border-[#24170E]">
                    {hasCustomPhoto ? (
                      <img
                        src={`${basePath}${member.image}`}
                        alt={member.name}
                        onError={() => setImgErrors((prev) => ({ ...prev, [member.id]: true }))}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 contrast-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                        style={{
                          backgroundColor: `${badgeStyle.accent}15`,
                        }}
                      >
                        <div
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center font-black text-3xl sm:text-4xl border-2 shadow-2xl mb-2"
                          style={{
                            backgroundColor: `${badgeStyle.accent}30`,
                            borderColor: badgeStyle.accent,
                            color: '#FFFFFF',
                          }}
                        >
                          {member.name
                            .split(' ')
                            .filter((w) => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.'))
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-200/80">
                          {member.role}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay for Smooth Transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130E09] via-[#130E09]/20 to-transparent pointer-events-none" />

                    {/* Top Left Division Badge Floating */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                      >
                        {getDivisionIcon(member.division, 'w-3.5 h-3.5')}
                        <span>{member.division}</span>
                      </span>
                    </div>

                    {/* Top Right Role Badge Floating */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-1 rounded-xl bg-black/70 text-amber-300 text-[10px] font-mono font-bold border border-brand-orange/30 backdrop-blur-md shadow-lg">
                        {member.badge}
                      </span>
                    </div>

                    {/* Bottom-right Quick Zoom Icon */}
                    <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white/80 group-hover:text-brand-orange group-hover:border-brand-orange group-hover:scale-110 flex items-center justify-center transition backdrop-blur-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* 2. Card Body Content */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      {/* Name & Role */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-brand-orange transition line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-xs font-bold text-amber-300/95 leading-tight mt-0.5">
                          {member.role}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {member.nim}
                        </p>
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
                          <span className="text-slate-400 font-medium">Prodi:</span> {member.studyProgram}
                        </div>
                        <div className="text-slate-400 text-[11px] truncate">
                          <span>Fakultas:</span> {member.faculty}
                        </div>
                      </div>

                      {/* Specialization Tags */}
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
            })}
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

      {/* Profile Detail Modal with Large Photo Showcase */}
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
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#24170E] hover:bg-brand-orange text-slate-300 hover:text-white flex items-center justify-center transition border border-[#3A2214] z-20"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Top Showcase: Large Photo & Identity */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pt-2">
              {/* Large Photo in Modal */}
              <div
                className="w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-3xl overflow-hidden border-2 shadow-2xl flex-shrink-0 relative bg-[#1B1109] group"
                style={{
                  borderColor: (
                    DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']
                  ).accent,
                }}
              >
                {selectedMember.image && !selectedMember.image.includes('logo_abhinaya') && !imgErrors[selectedMember.id] ? (
                  <img
                    src={`${basePath}${selectedMember.image}`}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
                    style={{
                      backgroundColor: `${
                        (DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']).accent
                      }25`,
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl border-2 mb-2"
                      style={{
                        borderColor: (
                          DIVISION_BADGES[selectedMember.division] || DIVISION_BADGES['Mekanik']
                        ).accent,
                        color: '#FFFFFF',
                      }}
                    >
                      {selectedMember.name
                        .split(' ')
                        .filter((w) => !w.startsWith('Prof') && !w.startsWith('Ir') && !w.startsWith('M.') && !w.startsWith('Ph.'))
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                )}
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
                <span className="text-white font-semibold">{selectedMember.studyProgram}</span>
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
