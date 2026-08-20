import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Bot, Home, History, Cpu, Trophy, Terminal, Radio, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404 — Koordinat Sinyal Hilang | Abhinaya UNY Robotics',
  description: 'Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan ke sektor lain.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      
      {/* Background Cyber Grid Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[600px] h-[600px] bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#090F1C]/90 border-2 border-brand-border backdrop-blur-xl shadow-[0_0_50px_rgba(0,245,212,0.1)] text-center space-y-8 hud-corner">
        
        {/* Telemetry Status Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold uppercase tracking-wider">ERROR // STATUS 404</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-500">
            <Radio className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span>TELEMETRY SIGNAL LOST</span>
          </div>
        </div>

        {/* 404 Glitch & Icon Showcase */}
        <div className="space-y-3">
          <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
            <Bot className="w-12 h-12 animate-bounce" />
          </div>

          <div className="font-mono">
            <span className="text-6xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-red-400 via-brand-cyan to-brand-emerald bg-clip-text text-transparent">
              404
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Target Koordinat Waypoint Tidak Ditemukan
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Robot Abhinaya mendeteksi anomali navigasi. Halaman atau modul sistem yang Anda cari berada di luar zona arena KRTMI atau telah dipindahkan.
          </p>
        </div>

        {/* Diagnostic Terminal Mockup */}
        <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800 text-left font-mono text-xs space-y-1.5 text-slate-400">
          <div className="flex items-center space-x-2 text-brand-cyan text-[11px] pb-1 border-b border-slate-900">
            <Terminal className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC TELEMETRY LOG</span>
          </div>
          <p className="text-red-400 font-bold">• [WARN] HTTP_STATUS: 404_ROUTE_NOT_REGISTERED</p>
          <p className="text-slate-400">• [INFO] SENSOR_ODOMETRY: x=0.000, y=0.000, yaw=0.000 rad</p>
          <p className="text-brand-cyan">• [RECOVERY] Membuka koridor navigasi aman ke sub-sistem utama...</p>
        </div>

        {/* Navigation Corridor CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-emerald hover:from-brand-emerald hover:to-brand-cyan text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,245,212,0.4)] transition group"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/krtmi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-white hover:text-brand-cyan font-bold text-sm transition"
          >
            <History className="w-4 h-4" />
            <span>Arsip KRTMI (2019–2026)</span>
          </Link>

          <Link
            href="/teknis"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-white hover:text-brand-cyan font-bold text-sm transition"
          >
            <Cpu className="w-4 h-4" />
            <span>Lab Kinematika &amp; Specs</span>
          </Link>

          <Link
            href="/prestasi"
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-white hover:text-brand-cyan font-bold text-sm transition"
          >
            <Trophy className="w-4 h-4" />
            <span>Kabinet Prestasi Juara</span>
          </Link>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-brand-cyan transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Atau kembali ke titik awal sistem</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
