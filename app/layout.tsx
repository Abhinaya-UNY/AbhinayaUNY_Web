import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia (KRTMI)',
  description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Arsip dokumentasi lomba KRTMI 2019-2024 dan Technocorner 2026.',
  keywords: ['Abhinaya UNY', 'KRTMI', 'Kontes Robot Tematik Indonesia', 'KRI', 'UNY', 'Technocorner UGM', 'Robot Otonom', 'Mecanum'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased selection:bg-brand-orange selection:text-black bg-[#070503] text-slate-100 min-h-screen">
        <Preloader />
        <Navbar />
        <main className="min-h-[85vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
