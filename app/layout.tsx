import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Abhinaya Robotics Team UNY — Kontes Robot Tematik Indonesia (KRTMI)',
  description: 'Portal resmi dokumentasi inovasi, riset, dan kompetisi Kontes Robot Tematik Indonesia (KRTMI) 2019 - 2024 dan Technocorner 2026 oleh Tim Robotika Abhinaya Universitas Negeri Yogyakarta.',
  keywords: ['Abhinaya UNY', 'KRTMI', 'Kontes Robot Tematik Indonesia', 'Kontes Robot Indonesia', 'KRI', 'UNY', 'Technocorner UGM 2026', 'Robot Otonom', 'Mecanum Kinematics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-brand-cyan selection:text-black">
        <Navbar />
        <main className="min-h-[85vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
