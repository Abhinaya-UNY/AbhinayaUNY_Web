import os

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"
with open(os.path.join(base_dir, "extracted_krtmi_2019_precise.txt"), "r", encoding="utf-8") as f:
    txt = f.read()

print("=== KRTMI 2019 SPECS ===")
for heading in ["2. Konsep dari Kontes", "4. Aturan Kontes", "4.1", "4.2", "4.2.1", "4.2.2", "4.2.3", "4.2.4", "4.2.5", "4.2.6", "4.2.7", "4.2.8", "4.2.9", "4.2.10", "Arena Kontes"]:
    idx = txt.find(heading)
    if idx != -1:
        print(f"\n--- {heading} ---")
        print(txt[idx:idx+800].replace('\n', ' '))
