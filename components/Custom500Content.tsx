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
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden font-sans">
      {/* Background Ambient High-Tech Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#121216] border border-white/15 backdrop-blur-2xl shadow-2xl text-center space-y-8">
        
        {/* Telemetry Status Header */}
        <div className="flex items-center justify-between border-b border-white/8 pb-4 text-xs font-mono text-emerald-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider">STATUS // 500 FAILSAFE ENGAGED</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CORE SYSTEM INTERRUPT</span>
          </div>
        </div>

        {/* 500 Hero Showcase */}
        <div className="space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-emerald-glow">
            <AlertOctagon className="w-12 h-12" />
          </div>

          <div className="font-mono">
            <span className="text-6xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              500
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Anomali Pemrosesan Sistem Internal
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Sub-sistem telemetri mendeteksi interupsi pemrosesan instruksi. Robotika Abhinaya UNY mengaktifkan protokol failsafe otonom untuk menjaga integritas operasional.
          </p>
        </div>

        {/* Diagnostic Terminal Log Card */}
        <div className="p-4 rounded-2xl bg-[#18181B] border border-white/8 text-left font-mono text-xs space-y-1.5 text-slate-300">
          <div className="flex items-center space-x-2 text-emerald-400 text-[11px] pb-1 border-b border-white/5">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC TELEMETRY LOG // ERROR_500</span>
          </div>
          <p className="text-amber-400 font-bold">• [WARN] CORE_BUS: 500_INTERNAL_SERVER_EXCEPTION</p>
          <p className="text-slate-400">• [INFO] STACK_VECTOR: ODOMETRY_HOLD_STABILIZATION=ACTIVE</p>
          <p className="text-emerald-400">• [RECOVERY] Jalur pemulihan subsistem siap diarahkan ulang...</p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-emerald-glow transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            type="button"
            onClick={handleReload}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Telemetri</span>
          </button>

          <Link
            href="/krtmi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition"
          >
            <History className="w-4 h-4" />
            <span>Arsip KRTMI (2019–2026)</span>
          </Link>

          <Link
            href="/prestasi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition"
          >
            <Trophy className="w-4 h-4" />
            <span>Kabinet Prestasi Juara</span>
          </Link>
        </div>

        {/* Failsafe Notice */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Abhinaya UNY Failsafe Protocol • UKM Rekayasa Teknologi UNY</span>
        </div>

      </div>
    </div>
  );
}
