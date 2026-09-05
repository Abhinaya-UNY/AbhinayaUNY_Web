---
description: Universal UI/UX Invariant - Modern Minimalist Dark Mode without Generic AI Aesthetic
globs: ["app/**/*.tsx", "components/**/*.tsx", "app/globals.css"]
always_on: true
---

# Modern Minimalist & Non-AI Design Invariants

1. **Obsidian Palette vs Muddy Brown**:
   - DILARANG menggunakan background cokelat/amber berlumpur (#171008, #140E09, #26180E, #2B1B10).
   - WAJIB gunakan Obsidian Carbon: `#050507` (canvas), `#0B0B0E` (cards), `#0E0E12` (sub-containers).

2. **Micro-Borders vs Thick AI Borders**:
   - DILARANG menggunakan border tebal 2px oranye menyala yang mencolok (`border-brand-orange/40` pada container besar).
   - WAJIB gunakan micro-borders ultra-halus: `border-white/8` atau `border-white/10`, dengan hover border halus `border-white/16`.

3. **Zero Emoji Policy**:
   - DILARANG menaruh emoji Unicode pada heading, badge, atau tombol. Seluruh ikon visual wajib menggunakan SVG semantik via `lucide-react`.

4. **100% Data & Evidence Preservation**:
   - DILARANG menghapus atau memotong data riwayat kompetisi, guidebook PDF, NIM asli PDDikti, nama anggota, dan rilis pers Humas.
