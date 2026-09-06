import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abhinaya-uny.github.io'),
  title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia',
  description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Kontes Robot Tematik Indonesia (KRTMI). Arsip dokumentasi lomba 2019-2026.',
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
      { url: '/AbhinayaUNY_Web/favicon.png?v=4', type: 'image/png' },
      { url: '/AbhinayaUNY_Web/favicon.ico?v=4', sizes: 'any' }
    ],
    shortcut: '/AbhinayaUNY_Web/favicon.png?v=4',
    apple: '/AbhinayaUNY_Web/apple-icon.png?v=4',
  },
  openGraph: {
    title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia',
    description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Kontes Robot Tematik Indonesia (KRTMI).',
    url: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/',
    siteName: 'Abhinaya UNY Robotics Team',
    images: [
      {
        url: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image-v4.jpg',
        width: 1200,
        height: 630,
        alt: 'ABHINAYA UNY — Kontes Robot Tematik Indonesia',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia',
    description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Kontes Robot Tematik Indonesia (KRTMI).',
    images: ['https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image-v4.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/AbhinayaUNY_Web/favicon.png?v=4" type="image/png" />
        <link rel="shortcut icon" href="/AbhinayaUNY_Web/favicon.png?v=4" type="image/png" />
        <link rel="canonical" href="https://abhinaya-uny.github.io/AbhinayaUNY_Web/" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* OpenGraph & Twitter Meta for WhatsApp, Telegram, Discord, LinkedIn Preview */}
        <meta property="og:title" content="ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia" />
        <meta property="og:description" content="Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta — Kontes Robot Tematik Indonesia (KRTMI)." />
        <meta property="og:url" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image-v4.jpg" />
        <meta property="og:image:secure_url" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image-v4.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ABHINAYA UNY — Kontes Robot Tematik Indonesia" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ABHINAYA UNY — Tim Robotika Kontes Robot Tematik Indonesia" />
        <meta name="twitter:description" content="Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta." />
        <meta name="twitter:image" content="https://abhinaya-uny.github.io/AbhinayaUNY_Web/og-image-v4.jpg" />
        <meta name="theme-color" content="#0B0B0E" />

        {/* Schema.org Structured Data for Google Search Engine Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tim Robotika Abhinaya UNY',
              alternateName: ['Abhinaya UNY', 'Robotika Abhinaya UNY', 'Abhinaya KRTMI UNY', 'Abhinaya Restek UNY'],
              url: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/',
              logo: 'https://abhinaya-uny.github.io/AbhinayaUNY_Web/favicon.png',
              description: 'Portal resmi Tim Robotika Abhinaya Universitas Negeri Yogyakarta (UKM Rekayasa Teknologi UNY) — Kontes Robot Tematik Indonesia (KRTMI) & Technocorner Transporter UGM.',
              parentOrganization: {
                '@type': 'CollegeOrUniversity',
                name: 'Universitas Negeri Yogyakarta',
                alternateName: 'UNY',
                url: 'https://www.uny.ac.id',
              },
              sameAs: [
                'https://www.instagram.com/abhinaya.uny/',
                'https://www.tiktok.com/@abhinaya.uny',
                'https://www.youtube.com/@AbhinayaUNY',
                'https://github.com/Abhinaya-UNY/AbhinayaUNY_Web',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans selection:bg-orange-500 selection:text-black bg-[#0B0B0E] text-slate-100 min-h-screen">
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
