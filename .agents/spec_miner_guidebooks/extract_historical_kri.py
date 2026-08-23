import os
import fitz

historical_files = [
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Petunjuk Pelaksanaan KRI 2020.pdf", "KRI_2020"),
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Pedoman Kontes Robot Indonesia (KRI) tahun 2021.pdf", "KRI_2021"),
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\20220513130433-panduan-kontes-robot-indonesia-2022.pdf", "KRI_2022")
]

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

for fp, label in historical_files:
    if not os.path.exists(fp):
        print(f"[MISSING] {fp}")
        continue
    doc = fitz.open(fp)
    print(f"=== {label}: {fp} (Pages: {len(doc)}) ===")
    
    full_text = []
    for page_idx in range(len(doc)):
        text = doc[page_idx].get_text()
        full_text.append(f"\n--- PAGE {page_idx + 1} ---\n" + text)
    
    out_txt_path = os.path.join(base_dir, f"{label}_fulltext.txt")
    with open(out_txt_path, "w", encoding="utf-8") as f:
        f.write("".join(full_text))
    print(f"Saved {label} to {out_txt_path} ({len(''.join(full_text))} chars)")
