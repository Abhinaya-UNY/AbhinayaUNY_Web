import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinaya-uny.github.io'),
  title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia (KRTMI)',
  description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Juara 1 Regional & Juara 2 Nasional KRTMI 2024. Arsip dokumentasi lomba 2019-2026.',
  keywords: [
    'Abhinaya UNY',
    'KRTMI',
    'Kontes Robot Tematik Indonesia',
    'KRI',
    'UNY',
    'Technocorner UGM',
    'Robot Otonom',
    'Mecanum',
    'Puspresnas BPTI'
  ],
  authors: [{ name: 'Tim Robotika Abhinaya UNY' }],
  icons: {
    icon: [
      { url: '/AbhinayaUNY_Web/favicon.png', type: 'image/png' },
      { url: '/AbhinayaUNY_Web/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/AbhinayaUNY_Web/favicon.png',
    apple: '/AbhinayaUNY_Web/apple-icon.png',
  },
  openGraph: {
    title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia',
    description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Juara 1 Regional & Juara 2 Nasional KRTMI 2024. Arsip dokumentasi lomba 2019-2026.',
    url: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/',
    siteName: 'Abhinaya UNY Robotics Team',
    images: [
      {
        url: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abhinaya UNY Robotics Team OpenGraph Banner',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia',
    description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Juara 1 Regional & Juara 2 Nasional KRTMI 2024.',
    images: ['https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/AbhinayaUNY_Web/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/AbhinayaUNY_Web/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/AbhinayaUNY_Web/apple-icon.png" />
        <meta property="og:image" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image.jpg" />
        <meta name="theme-color" content="#FF6B00" />
      </head>
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
