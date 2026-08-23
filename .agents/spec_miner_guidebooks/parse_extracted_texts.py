import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def inspect_krtmi_2024():
    p = os.path.join(base_dir, "KRTMI_2024_Buku7_fulltext.txt")
    with open(p, "r", encoding="utf-8") as f:
        text = f.read()
    print("=================== KRTMI 2024 (BUKU 7) ===================")
    print(f"Total length: {len(text)}")
    # Print table of contents / headings
    lines = text.splitlines()
    for line in lines:
        if line.strip().startswith(("BAB", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "Pasal", "Tema", "Ukuran", "Spesifikasi", "Aturan", "Penilaian", "Waktu")):
            print(f"  [HEADING] {line.strip()[:100]}")

def inspect_technocorner_2026():
    p = os.path.join(base_dir, "Technocorner_2026_Transporter_fulltext.txt")
    with open(p, "r", encoding="utf-8") as f:
        text = f.read()
    print("\n=================== TECHNOCORNER 2026 (TRANSPORTER) ===================")
    print(f"Total length: {len(text)}")
    lines = text.splitlines()
    for line in lines:
        if line.strip().startswith(("BAB", "A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "Pasal", "Tema", "Spesifikasi", "Aturan", "Sistem", "Penilaian", "Waktu", "Arena")):
            print(f"  [HEADING] {line.strip()[:100]}")

def inspect_kri_2023_krtmi():
    p = os.path.join(base_dir, "KRI_2023_fulltext.txt")
    with open(p, "r", encoding="utf-8") as f:
        text = f.read()
    print("\n=================== KRI 2023 KRTMI SECTION ===================")
    # find KRTMI section in KRI 2023
    krtmi_idx = text.find("KONTES ROBOT TEMATIK INDONESIA")
    if krtmi_idx != -1:
        print(f"Found KRTMI at index {krtmi_idx}")
        sub = text[krtmi_idx:krtmi_idx+15000]
        for l in sub.splitlines()[:50]:
            print(f"  {l}")
    else:
        print("KRTMI not found directly by exact name, searching case-insensitive...")
        matches = [m.start() for m in re.finditer(r"tematik|krtmi", text, re.IGNORECASE)]
        print(f"Found {len(matches)} matches, first at {matches[:5]}")

inspect_krtmi_2024()
inspect_technocorner_2026()
inspect_kri_2023_krtmi()
