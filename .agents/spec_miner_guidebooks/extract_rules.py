import os
import fitz

files = [
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf", "KRTMI_2024_Buku7"),
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\Buku Pedoman KRI 2024 fix.pdf", "KRI_2024_Fix"),
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\BukuPedomanKRI2023.pdf", "KRI_2023"),
    (r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Lomba Technocorner UGM\02_Transporter\GUIDEBOOK TRANSPORTER TC26.pdf", "Technocorner_2026_Transporter")
]

for fp, label in files:
    if not os.path.exists(fp):
        print(f"[MISSING] {fp}")
        continue
    print(f"\n=======================================================")
    print(f"=== {label} : {fp} ===")
    print(f"=======================================================")
    doc = fitz.open(fp)
    print(f"Total Pages: {len(doc)}")
    meta = doc.metadata
    print(f"Metadata: {meta}")
    
    # Extract full text
    full_text = []
    for page_idx in range(len(doc)):
        text = doc[page_idx].get_text()
        full_text.append(f"\n--- PAGE {page_idx + 1} ---\n" + text)
    
    out_txt_path = f"D:/Data_Lokal/Kuliah/Tri Wahyu (22518241023)/AbhinayaUNY_Web/.agents/spec_miner_guidebooks/{label}_fulltext.txt"
    with open(out_txt_path, "w", encoding="utf-8") as f:
        f.write("".join(full_text))
    print(f"Saved full text to: {out_txt_path} ({len(''.join(full_text))} chars)")
