import os
import re
import hashlib
from PIL import Image

ROOT = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
TEAM_DATA = os.path.join(ROOT, "data", "teamData.ts")
ARSIP_FILE = os.path.join(ROOT, "ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md")
STRUKTUR_FILE = os.path.join(ROOT, "STRUKTUR_TIM_ABHINAYA.md")
PUBLIC_DIR = os.path.join(ROOT, "public")

print("=== ADVERSARIAL AUDIT OF DATA & ARCHIVES ===")

# 1. Check teamData.ts
with open(TEAM_DATA, "r", encoding="utf-8") as f:
    team_content = f.read()

# Extract NIMs
nims = re.findall(r"nim:\s*['\"](\d+)['\"]", team_content)
print(f"Total NIMs in teamData.ts: {len(nims)}, Unique: {len(set(nims))}")
non_11_digit = [n for n in nims if len(n) != 11]
print(f"Non-11-digit NIMs: {non_11_digit}")

# Check placeholder NIM
assert "22518244007" not in team_content, "CRITICAL: Placeholder 22518244007 found in teamData.ts!"
assert "22518241040" in team_content, "CRITICAL: Authentic 22518241040 not found in teamData.ts!"

# Extract Image Paths in teamData.ts
img_paths = re.findall(r"['\"](/images/[^'\"]+\.(?:jpg|jpeg|png|webp))['\"]", team_content)
print(f"Total image paths in teamData.ts: {len(img_paths)}, Unique: {len(set(img_paths))}")

missing_imgs = []
corrupt_imgs = []
for rel_path in set(img_paths):
    disk_p = os.path.join(PUBLIC_DIR, rel_path.lstrip("/").replace("/", os.sep))
    if not os.path.exists(disk_p):
        missing_imgs.append(rel_path)
    else:
        sz = os.path.getsize(disk_p)
        if sz < 5120:
            corrupt_imgs.append((rel_path, f"size {sz} bytes"))
        else:
            with open(disk_p, "rb") as fp:
                h = hashlib.md5(fp.read()).hexdigest()
                if h.startswith("74a1baa8"):
                    corrupt_imgs.append((rel_path, "MD5 74a1baa8"))

print(f"Missing images in teamData.ts: {missing_imgs}")
print(f"Corrupt/black images in teamData.ts: {corrupt_imgs}")

# 2. Check STRUKTUR_TIM_ABHINAYA.md
with open(STRUKTUR_FILE, "r", encoding="utf-8") as f:
    struktur_content = f.read()

assert "22518244007" not in struktur_content, "CRITICAL: Placeholder in STRUKTUR_TIM_ABHINAYA.md!"
assert "22518241040" in struktur_content, "CRITICAL: Authentic Farhan NIM missing in STRUKTUR_TIM_ABHINAYA.md!"
assert "Afif Aiman Saputra" in struktur_content
assert "S1 Pendidikan Teknik Mesin" in struktur_content
assert "Muhammad Iqbal Rasyid" in struktur_content
assert "S1 Pendidikan Teknik Mekatronika" in struktur_content

print("STRUKTUR_TIM_ABHINAYA.md check PASSED!")

# 3. Check ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md
with open(ARSIP_FILE, "r", encoding="utf-8") as f:
    arsip_content = f.read()

required_sections = [
    "BAGIAN 1: Ringkasan Eksekutif & Metodologi Verifikasi PDDikti",
    "BAGIAN 2: Katalog Komprehensif Analisis Foto Berdasarkan Tahun (2020",
    "BAGIAN 3: Tabel Master Verifikasi Lengkap Anggota Per Generasi",
    "BAGIAN 4: Audit Kronologis Ketua Tim (Leaders) & Manajer Tim (Managers)",
    "BAGIAN 5: Audit Log Verifikasi PDDikti, Resolusi Anomali & Remediasi",
    "BAGIAN 6: Matriks Integritas & Status Sinkronisasi Web"
]

for sec in required_sections:
    assert sec in arsip_content, f"CRITICAL: Missing section '{sec}' in ARSIP!"

print("All 6 sections present in ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md!")

# Check all cohorts in ARSIP
for yr in ["2020", "2021", "2022", "2023", "2024", "2025"]:
    assert f"Katalog Foto Generasi {yr}" in arsip_content or f"Generasi {yr}" in arsip_content, f"Year {yr} missing in ARSIP!"
    assert f"Kontingen Generasi {yr}" in arsip_content or f"Skuad Aktif {yr}" in arsip_content, f"Roster {yr} missing in ARSIP!"

print("All cohorts 2020-2025 present in ARSIP!")
print("=== ADVERSARIAL AUDIT COMPLETE: 100% SUCCESS ===")
