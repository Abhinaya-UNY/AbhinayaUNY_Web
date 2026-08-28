import os
import sys
import re
import json
import hashlib
from PIL import Image, ImageStat

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
MEMBERS_DIR = os.path.join(ROOT_DIR, "public", "images", "members")
IG_DIR = os.path.join(ROOT_DIR, "public", "images", "instagram_feed")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
DATA_DIR = os.path.join(ROOT_DIR, "data")
ARSIP_FILE = os.path.join(ROOT_DIR, "ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md")
STRUKTUR_FILE = os.path.join(ROOT_DIR, "STRUKTUR_TIM_ABHINAYA.md")
TEAM_DATA_FILE = os.path.join(DATA_DIR, "teamData.ts")

print("=" * 80)
print(" FORENSIC INTEGRITY AUDIT SCRIPT - TIM ROBOTIKA ABHINAYA UNY")
print("=" * 80)

audit_results = {
    "image_health": {},
    "remediated_22_images": {},
    "pddikti_nim_checks": {},
    "arsip_integrity": {},
    "team_data_ts_integrity": {},
    "facade_checks": {},
    "violations": [],
    "clean_indicators": []
}

# -------------------------------------------------------------
# 1. FORENSIC AUDIT OF 22 REMEDIATED IMAGES & ALL MEMBER IMAGES
# -------------------------------------------------------------
print("\n[CHECK 1] Auditing Remediated Images & Member Image Assets...")

remediated_22_targets = [
    "2023_program_tri_wahyu_handoyo_01.jpg",
    "2023_programmer_tri_wahyu_handoyo_01.jpg",
    "2023_program_farhan_yuda_mahendra_01.jpg",
    "2023_programmer_farhan_yuda_mahendra_01.jpg",
    "2023_elektronik_abdul_hasib_adzdzin_nuha_01.jpg",
    "2023_elektronik_agus_bagaskoro_01.jpg",
    "2023_mekanik_muhamad_ilham_sony_01.jpg",
    "2022_manager_mustika_wahyu_aprilia_01.jpg",
    "2022_program_muhammad_iqbal_rasyid_01.jpg",
    "2022_programmer_muhammad_iqbal_rasyid_01.jpg",
    "2022_program_nurcholis_01.jpg",
    "2022_programmer_nurcholis_01.jpg",
    "2022_program_budi_arjaya_wida_01.jpg",
    "2022_programmer_budi_arjaya_wida_01.jpg",
    "2022_elektronik_agus_bagaskoro_01.jpg",
    "2022_elektronik_musa_beni_ricardo_aruan_01.jpg",
    "2022_mekanik_musyarof_rifai_01.jpg",
    "2022_mekanik_anggoro_fajar_dwi_utomo_01.jpg",
    "2022_mekanik_anggoro_fajar_dwi_s_01.jpg",
    "2022_mekanik_ilham_widyo_nugroho_01.jpg",
    "2022_desain_afif_aiman_saputra_01.jpg",
    "2022_desain_ahmad_insan_kamil_01.jpg"
]

all_member_files = [f for f in os.listdir(MEMBERS_DIR) if os.path.isfile(os.path.join(MEMBERS_DIR, f))]
print(f"Total member image files found on disk: {len(all_member_files)}")

for f in all_member_files:
    p = os.path.join(MEMBERS_DIR, f)
    sz = os.path.getsize(p)
    with open(p, "rb") as fp:
        md5 = hashlib.md5(fp.read()).hexdigest()
    
    try:
        with Image.open(p) as img:
            w, h = img.size
            fmt = img.format
            mode = img.mode
            stat = ImageStat.Stat(img)
            # Check mean and std dev across channels
            mean_val = stat.mean
            stddev_val = stat.stddev
            is_blank = all(s < 1.0 for s in stddev_val) if len(stddev_val) > 0 else True
            
            audit_results["image_health"][f] = {
                "size_bytes": sz,
                "dimensions": f"{w}x{h}",
                "format": fmt,
                "mode": mode,
                "mean": mean_val,
                "stddev": stddev_val,
                "is_blank": is_blank,
                "md5": md5
            }
            
            if sz < 1024 or is_blank:
                audit_results["violations"].append(f"Image {f} is blank or abnormally small ({sz} bytes, stddev={stddev_val})")
    except Exception as e:
        audit_results["violations"].append(f"Image {f} failed to load/parse: {e}")

# Check specifically the 22 remediated images
print(f"\nVerifying specific 22 remediated images:")
remediated_pass_count = 0
for target in remediated_22_targets:
    target_path = os.path.join(MEMBERS_DIR, target)
    if not os.path.exists(target_path):
        audit_results["violations"].append(f"Remediated target {target} does NOT exist on disk!")
        print(f"  [FAIL] {target} MISSING")
    else:
        info = audit_results["image_health"].get(target)
        if info and not info["is_blank"] and info["size_bytes"] > 5000:
            remediated_pass_count += 1
            print(f"  [PASS] {target}: {info['dimensions']}, {info['size_bytes']} bytes, stddev={info['stddev'][:2]}")
        else:
            audit_results["violations"].append(f"Remediated target {target} failed health checks: {info}")
            print(f"  [FAIL] {target}: {info}")

print(f"Remediated 22 Images Result: {remediated_pass_count}/{len(remediated_22_targets)} passed.")

# -------------------------------------------------------------
# 2. FORENSIC AUDIT OF ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md
# -------------------------------------------------------------
print("\n[CHECK 2] Auditing ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md...")
if not os.path.exists(ARSIP_FILE):
    audit_results["violations"].append("ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md missing!")
else:
    arsip_size = os.path.getsize(ARSIP_FILE)
    with open(ARSIP_FILE, "r", encoding="utf-8", errors="ignore") as fp:
        arsip_text = fp.read()
    
    arsip_lines = arsip_text.splitlines()
    print(f"Archive file size: {arsip_size} bytes, {len(arsip_lines)} lines.")
    
    # Check for placeholder markers
    placeholders = re.findall(r"(TODO|TBD|PLACEHOLDER|Lorem ipsum|\[\.\.\.\])", arsip_text, re.IGNORECASE)
    if placeholders:
        audit_results["violations"].append(f"Found placeholder tokens in ARSIP: {set(placeholders)}")
        print(f"  [FAIL] Placeholder tokens found: {set(placeholders)}")
    else:
        print("  [PASS] Zero placeholder tokens found.")
    
    # Check coverage of years
    years_found = [yr for yr in [2020, 2021, 2022, 2023, 2024, 2025] if f"202" in arsip_text and str(yr) in arsip_text]
    print(f"  Years referenced: {years_found}")
    
    # Check key sections
    has_photo_cat = "Katalog Foto" in arsip_text or "Katalog" in arsip_text or "Foto" in arsip_text
    has_member_roster = "Tabel Anggota" in arsip_text or "Anggota Terverifikasi" in arsip_text or "Struktur" in arsip_text
    has_leader_audit = "Ketua" in arsip_text or "Leader" in arsip_text or "Manajer" in arsip_text
    has_pddikti_log = "PDDikti" in arsip_text or "NIM" in arsip_text
    
    print(f"  Section checks - Photo Catalog: {has_photo_cat}, Member Roster: {has_member_roster}, Leadership Audit: {has_leader_audit}, PDDikti: {has_pddikti_log}")

# -------------------------------------------------------------
# 3. FORENSIC AUDIT OF data/teamData.ts
# -------------------------------------------------------------
print("\n[CHECK 3] Auditing data/teamData.ts for NIM validity, real data structures, and image links...")
with open(TEAM_DATA_FILE, "r", encoding="utf-8") as fp:
    team_data_text = fp.read()

# Extract all NIM values
nim_matches = re.findall(r'nim:\s*["\']([^"\']+)["\']', team_data_text)
print(f"Total NIM fields extracted from teamData.ts: {len(nim_matches)}")

# Verify all NIMs match 11 digits
invalid_nims = []
valid_nims = []
for nim in nim_matches:
    if re.match(r"^\d{11}$", nim):
        valid_nims.append(nim)
    else:
        invalid_nims.append(nim)

print(f"Valid 11-digit NIMs count: {len(valid_nims)}")
if invalid_nims:
    print(f"  [FAIL] Invalid NIMs found: {invalid_nims}")
    audit_results["violations"].append(f"Invalid NIM formats in teamData.ts: {invalid_nims}")
else:
    print("  [PASS] All NIMs strictly adhere to 11-digit UNY format.")

# Check specific key NIMs from ORIGINAL_REQUEST.md
key_nims = {
    "Farhan Yuda Mahendra": "22518241040",
    "Tri Wahyu Handoyo": "22518241023",
    "Rose Pita Nur Afifah": "22518241042",
    "Zelfa Nafisah Zalna": "23501241001",
    "Mustika Wahyu Aprilia": "21306141050",
    "Yuli Dwi Saputri": "19501241019"
}

for name, expected_nim in key_nims.items():
    if expected_nim in team_data_text:
        print(f"  [PASS] Key student '{name}' has expected NIM '{expected_nim}'.")
    else:
        print(f"  [FAIL] Key student '{name}' missing expected NIM '{expected_nim}'.")
        audit_results["violations"].append(f"Missing expected NIM {expected_nim} for {name}")

# Check Farhan Yuda Mahendra's old incorrect NIM (22518241041)
if "22518241041" in team_data_text:
    print("  [FAIL] Detected deprecated placeholder NIM 22518241041 for Farhan Yuda Mahendra!")
    audit_results["violations"].append("Detected deprecated placeholder NIM 22518241041 in teamData.ts")
else:
    print("  [PASS] Deprecated NIM 22518241041 successfully eliminated.")

# Check all image references in teamData.ts
image_refs = re.findall(r'["\'](/images/[^"\']+\.(?:jpg|jpeg|png|webp))["\']', team_data_text)
print(f"Total image paths in teamData.ts: {len(image_refs)}")
broken_image_refs = []
for ref in set(image_refs):
    local_path = os.path.join(PUBLIC_DIR, ref.lstrip("/").replace("/", os.sep))
    if not os.path.exists(local_path):
        broken_image_refs.append(ref)
    else:
        sz = os.path.getsize(local_path)
        if sz < 1024:
            broken_image_refs.append(f"{ref} (size {sz}B)")

if broken_image_refs:
    print(f"  [FAIL] Broken image references: {broken_image_refs}")
    audit_results["violations"].append(f"Broken image references in teamData.ts: {broken_image_refs}")
else:
    print(f"  [PASS] All {len(set(image_refs))} unique image references exist on disk and are healthy.")

# -------------------------------------------------------------
# 4. FACADE / HARDCODED TEST DETECTION
# -------------------------------------------------------------
print("\n[CHECK 4] Auditing test files for dummy assertions / facades...")
test_dir = os.path.join(ROOT_DIR, "tests")
facade_flags = []
for root, _, files in os.walk(test_dir):
    for f in files:
        if f.endswith(".js") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8", errors="ignore") as fobj:
                txt = fobj.read()
                # Check if file has real assertions or only return true
                has_assert = "assert" in txt or "expect" in txt or "===" in txt or "includes" in txt
                if not has_assert and "console.log" in txt:
                    facade_flags.append(f"{f}: Has logs but no assertions")

print(f"Facade check in tests/: {len(facade_flags)} suspicious test files.")
if facade_flags:
    for flag in facade_flags:
        print(f"  - {flag}")

print("\n" + "=" * 80)
print(f"AUDIT SUMMARY: Total Violations = {len(audit_results['violations'])}")
print("=" * 80)
for v in audit_results["violations"]:
    print(f"  ❌ {v}")

if not audit_results["violations"]:
    print("VERDICT: CLEAN (No integrity violations detected)")
else:
    print("VERDICT: INTEGRITY VIOLATION")
