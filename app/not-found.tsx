import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Bot, Home, History, Cpu, Trophy, Terminal, Radio, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: '404 — Koordinat Sinyal Hilang | Abhinaya UNY Robotics',
  description: 'Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan ke sektor lain.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      
      {/* Background Cyber Grid Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#0B0B0E] border border-white/15 backdrop-blur-xl shadow-2xl text-center space-y-8">
        
        {/* Telemetry Status Bar */}
        <div className="flex items-center justify-between border-b border-white/8 pb-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold uppercase tracking-wider">ERROR // STATUS 404</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-500">
            <Radio className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span>TELEMETRY SIGNAL LOST</span>
          </div>
        </div>

        {/* 404 Glitch & Icon Showcase */}
        <div className="space-y-3">
          <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-lg">
            <Bot className="w-12 h-12" />
          </div>

          <div className="font-mono">
            <span className="text-6xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              404
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Target Koordinat Waypoint Tidak Ditemukan
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Robot Abhinaya mendeteksi anomali navigasi. Halaman atau modul sistem yang Anda cari berada di luar zona arena KRTMI atau telah dipindahkan.
          </p>
        </div>

        {/* Diagnostic Terminal Mockup */}
        <div className="p-4 rounded-2xl bg-[#0E0E12] border border-white/8 text-left font-mono text-xs space-y-1.5 text-slate-400">
          <div className="flex items-center space-x-2 text-brand-orange text-[11px] pb-1 border-b border-white/5">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC TELEMETRY LOG</span>
          </div>
          <p className="text-red-400 font-bold">• [WARN] HTTP_STATUS: 404_ROUTE_NOT_REGISTERED</p>
          <p className="text-slate-400">• [INFO] SENSOR_ODOMETRY: x=0.000, y=0.000, yaw=0.000 rad</p>
          <p className="text-brand-orange">• [RECOVERY] Membuka koridor navigasi aman ke sub-sistem utama...</p>
        </div>

        {/* Navigation Corridor CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-darkOrange text-black font-bold text-sm shadow-lg transition group"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/krtmi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition"
          >
            <History className="w-4 h-4" />
            <span>Arsip KRTMI (2019–2026)</span>
          </Link>

          <Link
            href="/pertandingan"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Laga &amp; Hasil Pertandingan</span>
          </Link>

          <Link
            href="/prestasi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium text-sm transition"
          >
            <Trophy className="w-4 h-4" />
            <span>Kabinet Prestasi Juara</span>
          </Link>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-brand-orange transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Atau kembali ke titik awal sistem</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
