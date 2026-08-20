'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { History, ArrowRight, Loader2 } from 'lucide-react';

export default function ArchiveAliasPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediate client-side routing to /krtmi
    const timer = setTimeout(() => {
      router.replace('/krtmi');
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border text-center space-y-6 hud-corner shadow-2xl">
        <div className="inline-flex p-4 rounded-2xl bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40">
          <History className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-white">
            Mengalihkan ke Arsip KRTMI...
          </h1>
          <p className="text-xs text-slate-300">
            Membuka modul arsip regulasi, dimensi arena, dan riwayat kompetisi 2019–2026.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-brand-cyan font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Navigasi Otomatis Aktif</span>
        </div>

        <Link
          href="/krtmi"
          className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-brand-cyan hover:bg-brand-emerald text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,245,212,0.4)] transition"
        >
          <span>Klik di sini jika tidak beralih otomatis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
