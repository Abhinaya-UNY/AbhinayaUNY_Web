import os

base_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\.agents\spec_miner_guidebooks"

with open(os.path.join(base_dir, "extracted_krtmi_2024_precise.txt"), "r", encoding="utf-8") as f:
    k24 = f.read()

with open(os.path.join(base_dir, "extracted_tc26_precise.txt"), "r", encoding="utf-8") as f:
    tc26 = f.read()

print("=== KRTMI 2024 SECTIONS ===")
for line in k24.splitlines():
    if any(line.strip().startswith(x) for x in ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "Tema", "Slogan"]):
        print(line.strip())

print("\n=== TECHNOCORNER 2026 SECTIONS ===")
for line in tc26.splitlines():
    if any(line.strip().startswith(x) for x in ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "BAB", "1.", "2.", "3.", "4."]):
        print(line.strip()[:100])
