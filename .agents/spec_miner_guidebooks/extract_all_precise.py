import os
import fitz
import json

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

def extract_pdf_pages(pdf_path, start_page, end_page, out_name):
    doc = fitz.open(pdf_path)
    extracted = []
    for p in range(start_page - 1, min(end_page, len(doc))):
        text = doc[p].get_text()
        extracted.append(f"\n--- PAGE {p+1} ---\n{text}")
    full_str = "".join(extracted)
    out_path = os.path.join(base_dir, out_name)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_str)
    print(f"Extracted {out_name}: {len(full_str)} chars from pages {start_page}-{end_page}")
    return full_str

# 2020
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Petunjuk Pelaksanaan KRI 2020.pdf", 110, 136, "extracted_krtmi_2020_precise.txt")

# 2021
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Pedoman Kontes Robot Indonesia (KRI) tahun 2021.pdf", 120, 141, "extracted_krtmi_2021_precise.txt")

# 2022
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\20220513130433-panduan-kontes-robot-indonesia-2022.pdf", 130, 146, "extracted_krtmi_2022_precise.txt")

# 2023
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya KRTMI 2023\BukuPedomanKRI2023.pdf", 124, 140, "extracted_krtmi_2023_precise.txt")

# 2024
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Abhinaya 2024\Bedah Rules\BUKU 7 Kontes Robot Tematik Indonesia (KRTMI).pdf", 1, 14, "extracted_krtmi_2024_precise.txt")

# 2026 Technocorner Transporter
extract_pdf_pages(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Lomba Technocorner UGM\02_Transporter\GUIDEBOOK TRANSPORTER TC26.pdf", 1, 31, "extracted_tc26_precise.txt")

print("All precise extractions completed!")
