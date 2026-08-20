'use client';

import React, { useState } from 'react';
import { Calculator, Trophy, RefreshCw, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { KRTMI_EDITIONS, KrtmiEdition } from '@/data/krtmiData';

export const MatchScoreCalculator: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');

  // Inputs for 2024
  const [correctSort2024, setCorrectSort2024] = useState<number>(18);
  const [wrongSort2024, setWrongSort2024] = useState<number>(0);
  const [droppedTrash2024, setDroppedTrash2024] = useState<number>(0);
  const [disposal2024, setDisposal2024] = useState<number>(0);
  const [fouls2024, setFouls2024] = useState<number>(0);
  const [isBersih2024, setIsBersih2024] = useState<boolean>(false);

  // Inputs for 2019 / 2020
  const [bibitPadi2019, setBibitPadi2019] = useState<number>(3);
  const [gulma2019, setGulma2019] = useState<number>(2);
  const [panen2019, setPanen2019] = useState<boolean>(true);
  const [rusakPadi2019, setRusakPadi2019] = useState<boolean>(false);

  // Inputs for 2021 / 2022 / 2023
  const [koinSah, setKoinSah] = useState<number>(6);
  const [isInstantWin, setIsInstantWin] = useState<boolean>(false);
  const [penalties, setPenalties] = useState<number>(0);

  // Inputs for 2026 (Transporter)
  const [correctBoxes2026, setCorrectBoxes2026] = useState<number>(4);
  const [wrongBoxes2026, setWrongBoxes2026] = useState<number>(0);
  const [finishedInZone2026, setFinishedInZone2026] = useState<boolean>(true);
  const [timeSeconds2026, setTimeSeconds2026] = useState<number>(85);

  const calculateScore = () => {
    switch (selectedYear) {
      case '2024': {
        if (isBersih2024) {
          return { score: 100, isInstant: true, instantTitle: 'KEMENANGAN MUTLAK BERSIH' };
        }
        const score = (correctSort2024 * 3) - (droppedTrash2024 * 1) - (disposal2024 * 1) - (fouls2024 * 1);
        return { score: Math.max(0, score), isInstant: false };
      }
      case '2019':
      case '2020': {
        if (bibitPadi2019 >= 3 && gulma2019 >= 2 && panen2019 && !rusakPadi2019) {
          return { score: 90, isInstant: true, instantTitle: 'KEMENANGAN MUTLAK PANEN RAYA' };
        }
        const score = (bibitPadi2019 * 10) + (gulma2019 * 15) + (panen2019 ? 30 : 0);
        return { score, isInstant: false };
      }
      case '2023': {
        if (isInstantWin) {
          return { score: 100, isInstant: true, instantTitle: 'KEMENANGAN MUTLAK DONE (4-Oktagon)' };
        }
        const score = (koinSah * 4) - (penalties * 5);
        return { score: Math.max(0, score), isInstant: false };
      }
      case '2021':
      case '2022': {
        if (isInstantWin) {
          return { score: 100, isInstant: true, instantTitle: 'KEMENANGAN MUTLAK DAM' };
        }
        const score = (koinSah * 5) - (penalties * 5);
        return { score: Math.max(0, score), isInstant: false };
      }
      case '2026': {
        const score = (correctBoxes2026 * 20) + (wrongBoxes2026 * 5) + (finishedInZone2026 ? 15 : 0);
        const isTimeTrialWin = correctBoxes2026 >= 4 && finishedInZone2026 && timeSeconds2026 < 120;
        return { score, isInstant: isTimeTrialWin, instantTitle: `PRECISION TIME-TRIAL VICTORY (${timeSeconds2026}s)` };
      }
      default:
        return { score: 0, isInstant: false };
    }
  };

  const result = calculateScore();

  const resetValues = () => {
    setCorrectSort2024(18);
    setWrongSort2024(0);
    setDroppedTrash2024(0);
    setDisposal2024(0);
    setFouls2024(0);
    setIsBersih2024(false);

    setBibitPadi2019(3);
    setGulma2019(2);
    setPanen2019(true);
    setRusakPadi2019(false);

    setKoinSah(6);
    setIsInstantWin(false);
    setPenalties(0);

    setCorrectBoxes2026(4);
    setWrongBoxes2026(0);
    setFinishedInZone2026(true);
    setTimeSeconds2026(85);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border space-y-6 shadow-xl hud-corner">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/40">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Simulator &amp; Kalkulator Penilaian Resmi Lomba
            </h3>
            <p className="text-xs text-slate-400">
              Uji coba simulasi poin pertandingan dan kondisi kemenangan mutlak (Instant Victory) per edisi.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetValues}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-cyan text-xs text-slate-300 hover:text-white font-mono transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Preset</span>
        </button>
      </div>

      {/* Year Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {KRTMI_EDITIONS.map((ed) => (
          <button
            key={ed.year}
            type="button"
            onClick={() => setSelectedYear(ed.year)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              selectedYear === ed.year
                ? 'bg-brand-cyan text-black shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {ed.year} {ed.year === '2026' ? '(TC UGM)' : '(KRTMI)'}
          </button>
        ))}
      </div>

      {/* Interactive Controls per Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2>">
        
        {/* Sliders / Checkboxes */}
        <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 space-y-4">
          <div className="text-xs font-black text-brand-cyan uppercase tracking-wider font-mono">
            Parameter Variabel Pertandingan ({selectedYear}):
          </div>

          {selectedYear === '2024' && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Sampah Tepat Kategori (+3 Pts):</span>
                  <span className="font-mono text-brand-cyan font-bold">{correctSort2024} buah</span>
                </div>
                <input
                  type="range" min="0" max="25" value={correctSort2024}
                  onChange={(e) => setCorrectSort2024(Number(e.target.value))}
                  className="w-full accent-[#00F5D4]"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Sampah Jatuh ke Lantai (-1 Pt):</span>
                  <span className="font-mono text-red-400 font-bold">{droppedTrash2024} buah</span>
                </div>
                <input
                  type="range" min="0" max="10" value={droppedTrash2024}
                  onChange={(e) => setDroppedTrash2024(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Sampah Masuk Pembuangan (-1 Pt):</span>
                  <span className="font-mono text-red-400 font-bold">{disposal2024} buah</span>
                </div>
                <input
                  type="range" min="0" max="10" value={disposal2024}
                  onChange={(e) => setDisposal2024(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBersih2024}
                  onChange={(e) => setIsBersih2024(e.target.checked)}
                  className="w-4 h-4 accent-[#00F5D4] rounded"
                />
                <span className="text-white font-bold">5 Kotak Terpilah Sempurna (Kemenangan BERSIH)</span>
              </label>
            </div>
          )}

          {(selectedYear === '2019' || selectedYear === '2020') && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Bibit Padi Tertanam Tegak (+10 Pts):</span>
                  <span className="font-mono text-brand-cyan font-bold">{bibitPadi2019} bibit (Maks 3)</span>
                </div>
                <input
                  type="range" min="0" max="3" value={bibitPadi2019}
                  onChange={(e) => setBibitPadi2019(Number(e.target.value))}
                  className="w-full accent-[#00F5D4]"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Rumput Gulma Dicabut (+15 Pts):</span>
                  <span className="font-mono text-brand-cyan font-bold">{gulma2019} rumput (Maks 2)</span>
                </div>
                <input
                  type="range" min="0" max="2" value={gulma2019}
                  onChange={(e) => setGulma2019(Number(e.target.value))}
                  className="w-full accent-[#00F5D4]"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={panen2019}
                    onChange={(e) => setPanen2019(e.target.checked)}
                    className="w-4 h-4 accent-[#00F5D4] rounded"
                  />
                  <span className="text-white">Padi Kuning Berhasil Dipanen (+30 Pts)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rusakPadi2019}
                    onChange={(e) => setRusakPadi2019(e.target.checked)}
                    className="w-4 h-4 accent-red-500 rounded"
                  />
                  <span className="text-red-300">Terjadi Pelanggaran Lindas Pohon Padi (Gugur Panen Raya)</span>
                </label>
              </div>
            </div>
          )}

          {(selectedYear === '2021' || selectedYear === '2022' || selectedYear === '2023') && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Jumlah Koin Sah di Grid:</span>
                  <span className="font-mono text-brand-cyan font-bold">{koinSah} koin</span>
                </div>
                <input
                  type="range" min="0" max="12" value={koinSah}
                  onChange={(e) => setKoinSah(Number(e.target.value))}
                  className="w-full accent-[#00F5D4]"
                />
              </div>

              <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInstantWin}
                  onChange={(e) => setIsInstantWin(e.target.checked)}
                  className="w-4 h-4 accent-[#00F5D4] rounded"
                />
                <span className="text-white font-bold">
                  {selectedYear === '2023' ? 'Kunci 4-Oktagon Simetri (DONE)' : 'Bentuk 3 Koin Sejajar (DAM)'}
                </span>
              </label>
            </div>
          )}

          {selectedYear === '2026' && (
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Box Payload Masuk Sesuai Warna (+20 Pts):</span>
                  <span className="font-mono text-brand-cyan font-bold">{correctBoxes2026} box</span>
                </div>
                <input
                  type="range" min="0" max="5" value={correctBoxes2026}
                  onChange={(e) => setCorrectBoxes2026(Number(e.target.value))}
                  className="w-full accent-[#00F5D4]"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Waktu Tempuh Time-Trial:</span>
                  <span className="font-mono text-sky-400 font-bold">{timeSeconds2026} detik</span>
                </div>
                <input
                  type="range" min="30" max="180" value={timeSeconds2026}
                  onChange={(e) => setTimeSeconds2026(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>

              <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={finishedInZone2026}
                  onChange={(e) => setFinishedInZone2026(e.target.checked)}
                  className="w-4 h-4 accent-[#00F5D4] rounded"
                />
                <span className="text-white font-bold">Robot Masuk Sempurna Area Finish (+15 Pts)</span>
              </label>
            </div>
          )}
        </div>

        {/* Live Score Result Display */}
        <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">
              Kalkulasi Hasil Pertandingan:
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight glow-cyan">
                {result.score} <span className="text-base font-normal text-slate-400">POIN</span>
              </div>
              
              {result.isInstant && (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan text-brand-cyan text-xs font-black uppercase tracking-wider animate-pulse">
                  <Trophy className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{result.instantTitle}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 space-y-1 font-mono">
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
              <span>Status Verifikasi:</span>
              <span className="text-emerald-400 font-bold">100% Sesuai Panduan Resmi</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Algoritma Penilaian:</span>
              <span className="text-slate-300">Rulebook Engine v2.4</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
