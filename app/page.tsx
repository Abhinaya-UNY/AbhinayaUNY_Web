import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { YouTubeVideoShowcase } from '@/components/YouTubeVideoShowcase';
import { AboutTeamSection } from '@/components/AboutTeamSection';
import { DocumentationGallerySection } from '@/components/DocumentationGallerySection';
import { KrtmiChronicles } from '@/components/KrtmiChronicles';
import { KRIOverview } from '@/components/KRIOverview';
import { Achievements } from '@/components/Achievements';
import { SocialMediaHub } from '@/components/SocialMediaHub';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <YouTubeVideoShowcase />
      <AboutTeamSection />
      <DocumentationGallerySection />
      <KrtmiChronicles />
      <KRIOverview />
      <Achievements />
      <SocialMediaHub />
    </div>
  );
}
