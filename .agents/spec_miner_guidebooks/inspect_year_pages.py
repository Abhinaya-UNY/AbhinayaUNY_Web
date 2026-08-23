import os
import re

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def inspect_year(filename, label):
    with open(os.path.join(base_dir, filename), "r", encoding="utf-8") as f:
        txt = f.read()
    print(f"=== {label} ({filename}) ===")
    pages = txt.split("--- PAGE ")
    print(f"Total pages: {len(pages)}")
    for i, p in enumerate(pages):
        if any(w in p.upper() for w in ["KRTMI", "TEMATIK", "BUKU 7", "BUKU 6", "BUKU 5"]):
            lines = [line.strip() for line in p.splitlines() if line.strip()]
            first_line = lines[0] if lines else ""
            print(f"  Page {i}: {first_line[:80]} | Keywords: {[w for w in ['KRTMI', 'TEMATIK', 'BUKU 7', 'BUKU 6', 'BUKU 5'] if w in p.upper()]}")

inspect_year("KRI_2021_fulltext.txt", "2021")
inspect_year("KRI_2022_fulltext.txt", "2022")
