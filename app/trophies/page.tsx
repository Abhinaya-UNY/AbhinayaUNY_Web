'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trophy, ArrowRight, Loader2 } from 'lucide-react';

export default function TrophiesAliasPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediate client-side routing to /prestasi
    const timer = setTimeout(() => {
      router.replace('/prestasi');
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border text-center space-y-6 hud-corner shadow-2xl">
        <div className="inline-flex p-4 rounded-2xl bg-brand-gold/15 text-brand-gold border border-brand-gold/40">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-white">
            Mengalihkan ke Kabinet Prestasi...
          </h1>
          <p className="text-xs text-slate-300">
            Membuka modul rekor kejuaraan nasional, sertifikat Puspresnas, dan rilis pers resmi UNY.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-brand-gold font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Navigasi Otomatis Aktif</span>
        </div>

        <Link
          href="/prestasi"
          className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-brand-gold hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] transition"
        >
          <span>Klik di sini jika tidak beralih otomatis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
