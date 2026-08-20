import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HistoryTimeline } from '@/components/HistoryTimeline';
import { KRIOverview } from '@/components/KRIOverview';
import { RobotTechSpecs } from '@/components/RobotTechSpecs';
import { Achievements } from '@/components/Achievements';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <HistoryTimeline />
      <KRIOverview />
      <RobotTechSpecs />
      <Achievements />
    </div>
  );
}
