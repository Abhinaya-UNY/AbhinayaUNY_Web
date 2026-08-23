import os
import fitz

pdf_2019 = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek\Penerimaan Anggota Baru (PAB) 2023\Skill Test Program\Panduan_KRTMI2019.pdf"
base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

doc = fitz.open(pdf_2019)
print(f"Panduan_KRTMI2019.pdf - Pages: {len(doc)}")
extracted = []
for i in range(len(doc)):
    extracted.append(f"\n--- PAGE {i+1} ---\n" + doc[i].get_text())

full_text = "".join(extracted)
out_path = os.path.join(base_dir, "extracted_krtmi_2019_precise.txt")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(full_text)

print(f"Saved 2019 precise text: {len(full_text)} chars to {out_path}")
print("Sample:\n", full_text[:1200])
