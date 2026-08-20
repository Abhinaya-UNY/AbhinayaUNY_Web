'use client';

import React, { useState } from 'react';
import { Layers, MapPin, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface ArenaSchematicProps {
  year: string;
}

export const ArenaSchematicViewer: React.FC<ArenaSchematicProps> = ({ year }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const getSchematicContent = () => {
    switch (year) {
      case '2024':
        return {
          title: 'Arena Pemilah Sampah Otonom KRTMI 2024 (6.0m × 6.0m)',
          description: 'Arena simetris Tim Merah vs Tim Biru dengan Konveyor Getar dan Zona Umum di pusat lapangan.',
          zones: [
            { id: 'start_red', name: 'Zona Start Tim Merah (100×100 cm)', info: 'Posisi awal robot pengumpan dan pemilah Tim Merah.' },
            { id: 'start_blue', name: 'Zona Start Tim Biru (100×100 cm)', info: 'Posisi awal robot pengumpan dan pemilah Tim Biru.' },
            { id: 'neutral', name: 'Zona Umum Tengah (200×200 cm)', info: 'Area 5 Kotak Sampah tematik. Maksimal idle 10 detik.' },
            { id: 'conveyor_red', name: 'Konveyor Getar Tim Merah (150×40 cm)', info: 'Mendistribusikan sampah menuju jangkauan kamera AI pemilah.' },
            { id: 'conveyor_blue', name: 'Konveyor Getar Tim Biru (150×40 cm)', info: 'Mendistribusikan sampah menuju jangkauan kamera AI pemilah.' },
            { id: 'bins', name: 'Kotak Pemilahan 4 Kompartemen', info: 'Target sortir botol plastik, kaleng, kertas, dan organik (+3 Pts).' },
          ],
          svg: (
            <svg viewBox="0 0 600 600" className="w-full h-full">
              {/* Field Base */}
              <rect x="10" y="10" width="580" height="580" fill="#060B14" stroke="#1E293B" strokeWidth="4" rx="12" />
              {/* Grid Lines */}
              <line x1="300" y1="10" x2="300" y2="590" stroke="#1E293B" strokeDasharray="6 6" strokeWidth="2" />
              <line x1="10" y1="300" x2="590" y2="300" stroke="#1E293B" strokeDasharray="6 6" strokeWidth="2" />
              
              {/* Neutral Center Zone */}
              <rect
                x="200" y="200" width="200" height="200"
                fill={selectedZone === 'neutral' ? '#00F5D433' : '#0B1528'}
                stroke="#00F5D4" strokeWidth="2" strokeDasharray="4 4"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('neutral')}
              />
              <text x="300" y="295" fill="#00F5D4" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ZONA UMUM (TENGAH)</text>
              <text x="300" y="315" fill="#94A3B8" fontSize="10" textAnchor="middle">5 Kotak Sampah</text>

              {/* Red Team Start & Conveyor (Left) */}
              <rect
                x="30" y="40" width="100" height="100"
                fill={selectedZone === 'start_red' ? '#EF444455' : '#1E1420'}
                stroke="#EF4444" strokeWidth="2" rx="8"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('start_red')}
              />
              <text x="80" y="95" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">START MERAH</text>

              <rect
                x="150" y="70" width="120" height="40"
                fill={selectedZone === 'conveyor_red' ? '#F59E0B55' : '#171B26'}
                stroke="#F59E0B" strokeWidth="2" rx="4"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('conveyor_red')}
              />
              <text x="210" y="95" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">KONVEYOR MERAH</text>

              {/* Blue Team Start & Conveyor (Right) */}
              <rect
                x="470" y="460" width="100" height="100"
                fill={selectedZone === 'start_blue' ? '#3B82F655' : '#101B2E'}
                stroke="#3B82F6" strokeWidth="2" rx="8"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('start_blue')}
              />
              <text x="520" y="515" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">START BIRU</text>

              <rect
                x="330" y="490" width="120" height="40"
                fill={selectedZone === 'conveyor_blue' ? '#F59E0B55' : '#171B26'}
                stroke="#F59E0B" strokeWidth="2" rx="4"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('conveyor_blue')}
              />
              <text x="390" y="515" fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">KONVEYOR BIRU</text>

              {/* Sorting Bins */}
              <rect
                x="50" y="240" width="50" height="120"
                fill={selectedZone === 'bins' ? '#10B98155' : '#0B231B'}
                stroke="#10B981" strokeWidth="2" rx="6"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('bins')}
              />
              <text x="75" y="305" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">BIN MERAH</text>

              <rect
                x="500" y="240" width="50" height="120"
                fill={selectedZone === 'bins' ? '#10B98155' : '#0B231B'}
                stroke="#10B981" strokeWidth="2" rx="6"
                className="cursor-pointer transition"
                onClick={() => setSelectedZone('bins')}
              />
              <text x="525" y="305" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">BIN BIRU</text>
            </svg>
          ),
        };

      case '2026':
        return {
          title: 'Arena Transporter Technocorner 2026 FT UGM (3.0m × 3.0m)',
          description: 'Arena uji kecepatan dan presisi penempatan balok kubus ke Drop Zone dengan balok rintangan merah.',
          zones: [
            { id: 'start', name: 'Area Start Hijau (40×40 cm)', info: 'Posisi awal robot transporter dengan batasan dimensi sasis 20×20 cm.' },
            { id: 'finish', name: 'Area Finish Biru Muda (50×50 cm)', info: 'Zona akhir wajib dimasuki seluruh roda robot sebelum batas waktu.' },
            { id: 'payload', name: 'Box Payload (10×10×10 cm)', info: 'Balok kubus non-magnetis pasangan warna Jingga, Pink, Biru Tua, Ungu, Kuning (+20 Pts).' },
            { id: 'dropzone', name: 'Drop Zone (12×12×5 cm)', info: 'Wadah target penempatan balok kubus sesuai pasangan warna.' },
            { id: 'obstacles', name: 'Obstacle Box Merah (10×10×10 cm)', info: 'Rintangan penghalang jalur (2 di 8 Besar/Semi; 3 di Grand Final).' },
          ],
          svg: (
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <rect x="10" y="10" width="480" height="480" fill="#060B14" stroke="#1E293B" strokeWidth="4" rx="12" />
              
              {/* Start Area */}
              <rect
                x="30" y="390" width="80" height="80"
                fill={selectedZone === 'start' ? '#10B98166' : '#064E3B'}
                stroke="#10B981" strokeWidth="2" rx="6"
                className="cursor-pointer"
                onClick={() => setSelectedZone('start')}
              />
              <text x="70" y="435" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle">AREA START</text>

              {/* Finish Area */}
              <rect
                x="390" y="30" width="80" height="80"
                fill={selectedZone === 'finish' ? '#38BDF866' : '#0C4A6E'}
                stroke="#38BDF8" strokeWidth="2" rx="6"
                className="cursor-pointer"
                onClick={() => setSelectedZone('finish')}
              />
              <text x="430" y="75" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">AREA FINISH</text>

              {/* Drop Zones */}
              <g className="cursor-pointer" onClick={() => setSelectedZone('dropzone')}>
                <rect x="160" y="60" width="40" height="40" fill="#EA580C" stroke="#FED7AA" strokeWidth="1.5" rx="4" />
                <rect x="230" y="60" width="40" height="40" fill="#DB2777" stroke="#FCE7F3" strokeWidth="1.5" rx="4" />
                <rect x="300" y="60" width="40" height="40" fill="#2563EB" stroke="#BFDBFE" strokeWidth="1.5" rx="4" />
                <text x="250" y="125" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle">DROP ZONES (Jingga, Pink, Biru)</text>
              </g>

              {/* Obstacles */}
              <g className="cursor-pointer" onClick={() => setSelectedZone('obstacles')}>
                <rect x="200" y="240" width="30" height="30" fill="#DC2626" stroke="#F87171" strokeWidth="2" rx="3" />
                <rect x="280" y="240" width="30" height="30" fill="#DC2626" stroke="#F87171" strokeWidth="2" rx="3" />
                <text x="255" y="295" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle">OBSTACLE BOX MERAH</text>
              </g>

              {/* Payload Boxes */}
              <g className="cursor-pointer" onClick={() => setSelectedZone('payload')}>
                <rect x="150" y="380" width="25" height="25" fill="#EA580C" rx="2" />
                <rect x="200" y="380" width="25" height="25" fill="#DB2777" rx="2" />
                <rect x="250" y="380" width="25" height="25" fill="#2563EB" rx="2" />
                <text x="220" y="430" fill="#CBD5E1" fontSize="10" textAnchor="middle">PAYLOAD CUBES (10×10×10 cm)</text>
              </g>
            </svg>
          ),
        };

      case '2019':
      case '2020':
        return {
          title: `Arena Robot Pertanian KRTMI ${year} (4.0m × 3.0m)`,
          description: 'Miniatur sawah berlumpur busa dengan 3 zona berurutan: Zona Tanam, Zona Penyiangan Gulma, dan Zona Panen Padi.',
          zones: [
            { id: 'start', name: 'Zona Awal (500×500 mm)', info: 'Area start robot dan penampungan 6 bibit padi.' },
            { id: 'tanam', name: 'Zona Tanam (1500×1000 mm)', info: 'Simulasi sawah busa. Wajib menanam minimal 3 bibit padi tegak (+10 Pts/bibit).' },
            { id: 'siang', name: 'Zona Penyiangan (1500×1000 mm)', info: 'Mencabut 2 gulma rumput tanpa merusak padi muda (+15 Pts/rumput).' },
            { id: 'panen', name: 'Zona Panen (1000×1000 mm)', info: 'Memotong dan mengangkat 1 batang padi kuning (+30 Pts / PANEN RAYA).' },
          ],
          svg: (
            <svg viewBox="0 0 500 400" className="w-full h-full">
              <rect x="10" y="10" width="480" height="380" fill="#0A120D" stroke="#1E293B" strokeWidth="4" rx="12" />
              
              {/* Start */}
              <rect
                x="30" y="270" width="80" height="80"
                fill={selectedZone === 'start' ? '#10B98155' : '#042F2E'}
                stroke="#10B981" strokeWidth="2" rx="6"
                className="cursor-pointer"
                onClick={() => setSelectedZone('start')}
              />
              <text x="70" y="315" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle">ZONA AWAL</text>

              {/* Tanam */}
              <rect
                x="140" y="40" width="130" height="320"
                fill={selectedZone === 'tanam' ? '#84CC1644' : '#14290A'}
                stroke="#84CC16" strokeWidth="2" rx="8"
                className="cursor-pointer"
                onClick={() => setSelectedZone('tanam')}
              />
              <text x="205" y="195" fill="#A3E635" fontSize="11" fontWeight="bold" textAnchor="middle">1. ZONA TANAM</text>
              <text x="205" y="215" fill="#CBD5E1" fontSize="9" textAnchor="middle">3 Bibit Padi Tegak</text>

              {/* Penyiangan */}
              <rect
                x="290" y="40" width="100" height="320"
                fill={selectedZone === 'siang' ? '#EAB30844' : '#261E0A'}
                stroke="#EAB308" strokeWidth="2" rx="8"
                className="cursor-pointer"
                onClick={() => setSelectedZone('siang')}
              />
              <text x="340" y="195" fill="#FACC15" fontSize="11" fontWeight="bold" textAnchor="middle">2. PENYIANGAN</text>
              <text x="340" y="215" fill="#CBD5E1" fontSize="9" textAnchor="middle">2 Gulma Rumput</text>

              {/* Panen */}
              <rect
                x="405" y="40" width="70" height="320"
                fill={selectedZone === 'panen' ? '#F9731644' : '#2B1607'}
                stroke="#F97316" strokeWidth="2" rx="8"
                className="cursor-pointer"
                onClick={() => setSelectedZone('panen')}
              />
              <text x="440" y="195" fill="#FB923C" fontSize="10" fontWeight="bold" textAnchor="middle">3. PANEN</text>
              <text x="440" y="215" fill="#CBD5E1" fontSize="8" textAnchor="middle">Padi Kuning</text>
            </svg>
          ),
        };

      default: // 2021, 2022, 2023 Digital Twin
        return {
          title: `Arena Cyber-Physical Digital Twin KRTMI ${year} (3.0m × 4.0m)`,
          description: 'Green Screen karpet hijau fisik terintegrasi sistem kamera atas juri dan representasi matriks digital twin virtual.',
          zones: [
            { id: 'greenscreen', name: 'Karpet Hijau Fisik (300×400 cm)', info: 'Area gerak robot berkamuflase hijau dengan limit kecepatan maks 40 cm/s.' },
            { id: 'coinrack', name: 'Rak Koin Permainan (23 Slot)', info: 'Penyimpanan koin styrofoam permainan tematik.' },
            { id: 'digitaltwin', name: 'Proyeksi Digital Twin', info: year === '2023' ? 'Simulasi Roda Gigi Planet (DONE 4-Oktagon)' : 'Matriks Dam-daman 3-in-a-row (DAM Instant Victory)' },
          ],
          svg: (
            <svg viewBox="0 0 500 400" className="w-full h-full">
              <rect x="10" y="10" width="480" height="380" fill="#031F14" stroke="#059669" strokeWidth="3" rx="12" />
              
              {/* Overhead Cam Reticle */}
              <circle cx="250" cy="200" r="140" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 5" />
              <circle cx="250" cy="200" r="90" fill="none" stroke="#10B981" strokeWidth="1" />
              <circle cx="250" cy="200" r="40" fill="#05966933" stroke="#00F5D4" strokeWidth="2" />
              
              {/* Digital Grid Nodes */}
              <line x1="250" y1="60" x2="250" y2="340" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="110" y1="200" x2="390" y2="200" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 3" />

              <text x="250" y="195" fill="#00F5D4" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                {year === '2023' ? 'PLANETARY GEAR MESH' : 'DIGITAL TWIN DAM-DAMAN'}
              </text>
              <text x="250" y="215" fill="#94A3B8" fontSize="9" textAnchor="middle">
                Speed Limit: 40 cm/s
              </text>

              {/* Coin Rack */}
              <rect x="30" y="30" width="440" height="25" fill="#064E3B" stroke="#34D399" strokeWidth="1.5" rx="4" />
              <text x="250" y="47" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">RAK KOIN TEMATIK (PHYSICAL RACK)</text>
            </svg>
          ),
        };
    }
  };

  const schematic = getSchematicContent();

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-[#070D18] border border-brand-border space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-brand-cyan" />
          <h4 className="text-xs sm:text-sm font-black text-white font-mono">
            {schematic.title}
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          Klik elemen visual untuk membaca detail zona
        </span>
      </div>

      <p className="text-xs text-slate-300">
        {schematic.description}
      </p>

      {/* SVG Canvas Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl bg-slate-950 border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
        {schematic.svg}
      </div>

      {/* Zone Detail Inspector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
        {schematic.zones.map((zone) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => setSelectedZone(zone.id)}
            className={`p-2.5 rounded-xl text-left border text-xs transition ${
              selectedZone === zone.id
                ? 'bg-brand-cyan/15 border-brand-cyan text-white shadow-sm'
                : 'bg-[#060A12] border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="font-mono text-brand-cyan text-[11px]">{zone.name}</span>
              {selectedZone === zone.id && <CheckCircle2 className="w-3 h-3 text-brand-cyan" />}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              {zone.info}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
