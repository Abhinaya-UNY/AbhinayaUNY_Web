'use client';

import React from 'react';
import Link from 'next/link';
import { AlertOctagon, RefreshCw, Home, History, Trophy, Terminal, Radio, ShieldAlert } from 'lucide-react';

interface Custom500ContentProps {
  reset?: () => void;
}

export default function Custom500Content({ reset }: Custom500ContentProps) {
  const handleReload = () => {
    if (reset) {
      reset();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#070503] text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden font-sans">
      {/* Background Ambient High-Tech Orange Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[650px] h-[650px] bg-brand-orange/15 rounded-full blur-[140px] animate-pulse" />
        <div className="w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[100px] absolute" />
      </div>

      <div className="relative z-10 max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#120D08]/90 border-2 border-brand-orange/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,107,0,0.15)] text-center space-y-8">
        
        {/* Telemetry Status Header */}
        <div className="flex items-center justify-between border-b border-[#2A180E] pb-4 text-xs font-mono text-brand-orange/90">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
            <span className="text-brand-orange font-bold uppercase tracking-wider">STATUS // 500 FAILSAFE ENGAGED</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>CORE SYSTEM INTERRUPT</span>
          </div>
        </div>

        {/* 500 Hero Showcase */}
        <div className="space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange shadow-[0_0_30px_rgba(255,107,0,0.25)]">
            <AlertOctagon className="w-12 h-12 animate-pulse" />
          </div>

          <div className="font-mono">
            <span className="text-6xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              500
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Anomali Pemrosesan Sistem Internal
          </h1>

          <p className="text-sm sm:text-base text-amber-100/80 max-w-lg mx-auto leading-relaxed">
            Sub-sistem telemetri mendeteksi interupsi pemrosesan instruksi. Robotika Abhinaya UNY mengaktifkan protokol failsafe otonom untuk menjaga integritas operasional.
          </p>
        </div>

        {/* Diagnostic Terminal Log Card */}
        <div className="p-4 rounded-2xl bg-[#070503] border border-[#2A180E] text-left font-mono text-xs space-y-1.5 text-slate-300">
          <div className="flex items-center space-x-2 text-brand-orange text-[11px] pb-1 border-b border-[#2A180E]">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC TELEMETRY LOG // ERROR_500</span>
          </div>
          <p className="text-amber-400 font-bold">• [WARN] CORE_BUS: 500_INTERNAL_SERVER_EXCEPTION</p>
          <p className="text-slate-400">• [INFO] STACK_VECTOR: ODOMETRY_HOLD_STABILIZATION=ACTIVE</p>
          <p className="text-brand-orange">• [RECOVERY] Jalur pemulihan subsistem siap diarahkan ulang...</p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-sm shadow-[0_0_25px_rgba(255,107,0,0.35)] transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            type="button"
            onClick={handleReload}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-[#140E09] border border-brand-orange/40 hover:border-brand-orange text-white hover:text-amber-300 font-bold text-sm transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Telemetri</span>
          </button>

          <Link
            href="/krtmi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-[#140E09] border border-[#2A180E] hover:border-brand-orange/60 text-slate-300 hover:text-amber-300 font-bold text-sm transition"
          >
            <History className="w-4 h-4" />
            <span>Arsip KRTMI (2019–2026)</span>
          </Link>

          <Link
            href="/prestasi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-[#140E09] border border-[#2A180E] hover:border-brand-orange/60 text-slate-300 hover:text-amber-300 font-bold text-sm transition"
          >
            <Trophy className="w-4 h-4" />
            <span>Kabinet Prestasi Juara</span>
          </Link>
        </div>

        {/* Failsafe Notice */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-orange" />
          <span>Abhinaya UNY Failsafe Protocol • UKM Rekayasa Teknologi UNY</span>
        </div>

      </div>
    </div>
  );
}
