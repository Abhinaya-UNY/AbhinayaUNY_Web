import os
import json
import re
import sys

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def inspect_year(year, filename, out):
    p = os.path.join(base_dir, filename)
    with open(p, "r", encoding="utf-8") as f:
        txt = f.read()
    
    out.write(f"\n{'='*40} YEAR {year} {'='*40}\n")
    
    # 1. Search theme and background
    out.write("\n--- THEME & BACKGROUND ---\n")
    for m in re.finditer(r"(?:Tema|TEMA|Judul)[\s:]+([^\n\r]+)", txt):
        out.write(f"  [THEME] {m.group(0)}\n")
    
    # 2. Arena dimensions and layout
    out.write("\n--- ARENA / LAPANGAN ---\n")
    for m in re.finditer(r"(?:lapangan|arena|ukuran|dimensi|lantai|karpet|garis|zona).*?(?:cm|meter|m\b|mm)", txt, re.IGNORECASE):
        start = max(0, m.start() - 30)
        end = min(len(txt), m.end() + 100)
        out.write(f"  [ARENA] {txt[start:end].replace(chr(10), ' ')}\n")
    
    # 3. Robot specifications
    out.write("\n--- ROBOT SPECIFICATIONS ---\n")
    for m in re.finditer(r"(?:robot|dimensi|berat|ukuran|tinggi|lebar|panjang|baterai|tegangan|volt|daya|kendali|otonom|controller|komunikasi).*?(?:cm|kg|gram|volt|V\b|mah|Ah)", txt, re.IGNORECASE):
        start = max(0, m.start() - 30)
        end = min(len(txt), m.end() + 100)
        out.write(f"  [ROBOT] {txt[start:end].replace(chr(10), ' ')}\n")

    # 4. Scoring and rules
    out.write("\n--- SCORING & RULES ---\n")
    for m in re.finditer(r"(?:poin|nilai|skor|penilaian|menit|detik|diskualifikasi|pelanggaran|waktu).*?(?:poin|nilai|detik|menit)", txt, re.IGNORECASE):
        start = max(0, m.start() - 30)
        end = min(len(txt), m.end() + 100)
        out.write(f"  [SCORE] {txt[start:end].replace(chr(10), ' ')}\n")

out_path = os.path.join(base_dir, "detailed_extraction_notes.txt")
with open(out_path, "w", encoding="utf-8") as out:
    for yr, fn in [
        ("2020", "extracted_krtmi_2020_precise.txt"),
        ("2021", "extracted_krtmi_2021_precise.txt"),
        ("2022", "extracted_krtmi_2022_precise.txt"),
        ("2023", "extracted_krtmi_2023_precise.txt"),
        ("2024", "extracted_krtmi_2024_precise.txt"),
        ("2026", "extracted_tc26_precise.txt")
    ]:
        inspect_year(yr, fn, out)

print(f"Extraction written to {out_path}")
