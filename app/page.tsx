import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { YouTubeVideoShowcase } from '@/components/YouTubeVideoShowcase';
import { AboutTeamSection } from '@/components/AboutTeamSection';
import { TeamRosterSection } from '@/components/TeamRosterSection';
import { NewsMediaSection } from '@/components/NewsMediaSection';
import { InstagramFeedShowcase } from '@/components/InstagramFeedShowcase';
import { DocumentationGallerySection } from '@/components/DocumentationGallerySection';
import { KrtmiChronicles } from '@/components/KrtmiChronicles';
import { KRIOverview } from '@/components/KRIOverview';
import { Achievements } from '@/components/Achievements';
import { SocialMediaHub } from '@/components/SocialMediaHub';
import { GsapReveal } from '@/components/animations/GsapReveal';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      
      <GsapReveal>
        <YouTubeVideoShowcase />
      </GsapReveal>
      
      <GsapReveal>
        <AboutTeamSection />
      </GsapReveal>
      
      <GsapReveal>
        <Achievements />
      </GsapReveal>
      
      <GsapReveal>
        <KRIOverview />
      </GsapReveal>
      
      <GsapReveal>
        <KrtmiChronicles />
      </GsapReveal>
      
      <GsapReveal>
        <NewsMediaSection />
      </GsapReveal>
      
      <GsapReveal>
        <DocumentationGallerySection />
      </GsapReveal>

      <GsapReveal>
        <InstagramFeedShowcase />
      </GsapReveal>
      
      <GsapReveal>
        <TeamRosterSection showAllLink={true} />
      </GsapReveal>
      
      <GsapReveal>
        <SocialMediaHub />
      </GsapReveal>
    </div>
  );
}
