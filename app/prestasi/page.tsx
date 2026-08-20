import React from 'react';
import { Achievements } from '@/components/Achievements';
import { Trophy, Award, ShieldCheck, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Prestasi Nasional — Abhinaya UNY Robotics Team',
  description: 'Papan penghargaan dan rekam jejak juara nasional tim robotika Abhinaya Universitas Negeri Yogyakarta pada ajang Kontes Robot Indonesia.',
};

export default function PrestasiPage() {
  return (
    <div className="py-12 space-y-12">
      <Achievements />
    </div>
  );
}
