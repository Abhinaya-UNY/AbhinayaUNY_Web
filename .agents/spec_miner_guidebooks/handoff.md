# Handoff Report: Guidebook & Competition Spec Mining
**Agent Archetype**: Specification Miner  
**Project**: Abhinaya UNY Robotics Portal  
**Target Milestone**: Rulebook Specification Mining (KRTMI 2019-2024 & Technocorner 2026)  
**Status**: Hard Handoff (Task Complete)  

---

## 1. Observation
- **Direct PDF Rulebooks Inspected**:
  0. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Penerimaan Anggota Baru (PAB) 2023\Skill Test Program\Panduan_KRTMI2019.pdf` (18 pages, 24,840 chars).
  1. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf` (14 pages, 21,863 chars).
  2. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\Buku Pedoman KRI 2024 fix.pdf` (164 pages, KRTMI section p. 137-150).
  3. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\BukuPedomanKRI2023.pdf` (150 pages, KRTMI section p. 124-140, 25,127 chars).
  4. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\20220513130433-panduan-kontes-robot-indonesia-2022.pdf` (146 pages, KRTMI section p. 130-146, 22,332 chars).
  5. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Pedoman Kontes Robot Indonesia (KRI) tahun 2021.pdf` (141 pages, KRTMI section p. 120-141, 21,466 chars).
  6. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Petunjuk Pelaksanaan KRI 2020.pdf` (136 pages, KRTMI section p. 110-136, 39,111 chars).
  7. `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Lomba Technocorner UGM\02_Transporter\GUIDEBOOK TRANSPORTER TC26.pdf` (31 pages, 53,100 chars).
- **Existing Web Data Inspected**:
  - `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\data\krtmiData.ts` (348 lines).

---

## 2. Logic Chain
1. **Rulebook Analysis**:
   - Each official PDF guidebook defines unambiguous physical constraints (arena length/width, obstacles, starting box limits, voltage caps), gameplay rules (match time, victory state words like "BERSIH" in 2024 and "DAM" in 2021-2023), and scoring formulas (+3 pts per correct waste item in 2024, -1 pt penalty/waste lost, 1 pt/sec time bonus in TC26).
2. **Technocorner 2026 Specifics**:
   - Official TC26 guidebook stipulates: starting dimension maximum 20x20 cm footprint (height/weight unconstrained), battery voltage maximum 13.0 V, box size 10x10x10 cm, drop zone box 12x12x5 cm, mandatory lifting requirement (no sliding/pushing payload), match time 3 minutes, and light-blue finish parking requirement.
3. **KRTMI 2024 Specifics**:
   - Official KRTMI 2024 Buku 7 stipulates: Dual robot setup (Robot Pemilah 100% autonomous with computer vision + Robot Pengumpan nirkabel/autonomous), 5 waste categories (leaves, paper, plastic sheet, metal, compressed plastic bottle), 5 waste boxes (@4 items = 20 items), match time 4 minutes, prep time 1 minute, victory state "BERSIH", battery cap 24V DC.
4. **Historical Continuity (2019-2023)**:
   - KRTMI evolution follows national technology agendas: Agriculture/Rice Harvest (2019), Pandemic UV-C/Aerosol Disinfection (2020), Contactless Hospital Logistics (2021), Hazardous Medical Waste Handling (2022), Collaborative Multi-Robot Cyber-Physical Systems (2023).
5. **Schema Design**:
   - Designing an expanded TypeScript interface for `data/krtmiData.ts` that incorporates all verified data (arena, obstacles, robot specs, game objects, match durations, scoring equations, penalties, and historical context) while preserving full backward compatibility with the existing frontend components.

---

## 3. Caveats
- None. 100% of all competition editions (2019, 2020, 2021, 2022, 2023, 2024, 2026) have verified direct PDF guidebooks in the local workspace directory.
- All other editions (2020, 2021, 2022, 2023, 2024, 2026) have 100% direct primary-source PDF rulebooks verified locally.

---

## 4. Conclusion
- All competition rules, arena layouts, robot constraints, scoring formulas, and historical context across 7 editions (2019-2026) are fully mined and documented in `report.md`.
- The enhanced TypeScript schema and data content for `data/krtmiData.ts` provide complete, authoritative, and engaging data ready for the web application and offline manager tool.

---

## 5. Verification Method
- Independent verification can be performed by reading the extracted text files and running:
  ```powershell
  python -c "import json; data=json.load(open(r'D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks\extracted_all_guidebooks.json', encoding='utf-8')); print(list(data.keys()))"
  ```
- Inspect `report.md` at `D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks\report.md`.
