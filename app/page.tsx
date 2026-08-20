import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { YouTubeVideoShowcase } from '@/components/YouTubeVideoShowcase';
import { SocialMediaHub } from '@/components/SocialMediaHub';
import { HistoryTimeline } from '@/components/HistoryTimeline';
import { KinematicsLab } from '@/components/KinematicsLab';
import { KRIOverview } from '@/components/KRIOverview';
import { RobotTechSpecs } from '@/components/RobotTechSpecs';
import { Achievements } from '@/components/Achievements';
import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Official YouTube Showcase */}
      <YouTubeVideoShowcase />

      {/* 3. Social Media Hub (@abhinaya.uny Instagram & TikTok) */}
      <SocialMediaHub />

      {/* 4. 2019-2026 Historical & Rulebook Timeline */}
      <HistoryTimeline />

      {/* 5. Interactive Kinematics Lab Preview */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
              INTERACTIVE LABORATORY PREVIEW
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Laboratorium Kinematika Vektor &amp; Kendali
            </h2>
          </div>
          <Link
            href="/teknis"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-xs font-mono text-brand-cyan font-bold transition"
          >
            <span>Buka Seluruh Lab (PID &amp; FreeRTOS)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <KinematicsLab />
      </section>

      {/* 6. KRI Divisions Overview */}
      <KRIOverview />

      {/* 7. Engineering Specs Pillars */}
      <RobotTechSpecs />

      {/* 8. Official Achievements & Press Releases */}
      <Achievements />
    </div>
  );
}
