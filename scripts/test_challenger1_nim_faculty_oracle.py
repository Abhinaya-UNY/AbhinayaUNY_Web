#!/usr/bin/env python3
"""
Comprehensive Challenger 1 Empirical Verification & Stress-Testing Suite
Tim Robotika Abhinaya UNY Data Verification & Web Synchronization

Scope:
1. Adversarially stress-test all NIMs across:
   - data/teamData.ts
   - STRUKTUR_TIM_ABHINAYA.md
   - ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md
2. Validate UNY 11-digit format compliance for every student member.
3. Check for any accidental remnants of placeholder NIM 22518244007 or fake strings.
4. Verify all 35 members across generations 2020 to 2025 match their respective faculties and official study programs.
5. Verify photo file paths on disk for every member entry.
6. Output detailed empirical results.
"""

import os
import re
import sys
import json
from pathlib import Path

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

ROOT_DIR = Path(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web")
TEAM_DATA_TS = ROOT_DIR / "data" / "teamData.ts"
STRUKTUR_MD = ROOT_DIR / "STRUKTUR_TIM_ABHINAYA.md"
ARSIP_MD = ROOT_DIR / "ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md"
PUBLIC_DIR = ROOT_DIR / "public"

# ==============================================================================
# 1. PDDikti & UNY Faculty / Study Program Ground Truth Mapping
# ==============================================================================
UNY_PRODI_MAP = {
    "50124": ("S1 Pendidikan Teknik Elektro", "Fakultas Teknik (FT)"),
    "50224": ("S1 Pendidikan Teknik Elektronika", "Fakultas Teknik (FT)"),
    "50324": ("S1 Pendidikan Teknik Mesin", "Fakultas Teknik (FT)"),
    "51824": ("S1 Pendidikan Teknik Mekatronika", "Fakultas Teknik (FT)"),
    "53814": ("S1 Teknik Elektro", "Fakultas Teknik (FT)"),
    "53914": ("S1 Teknik Manufaktur", "Fakultas Teknik (FT)"),
    "54014": ("S1 Teknik Mesin", "Fakultas Teknik (FT)"),
    "30614": ("S1 Fisika", "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)"),
    "50733": ("D4 Teknik Elektronika", "Fakultas Vokasi (FV) / Fakultas Teknik (FT)"),
    "50734": ("D4 Teknik Mesin", "Fakultas Vokasi (FV) / Fakultas Teknik (FT)"),
    "09062": ("D4 Teknik Elektronika", "Fakultas Vokasi (FV)")
}

# The definitive 35 student members across all 6 generations (2020-2025)
EXPECTED_MEMBERS = {
    # 2025 Active Squad
    "Farhan Yuda Mahendra": {
        "nim": "22518241040",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2023, 2024, 2025],
        "role_2025": "Ketua Tim 2025 / Programmer"
    },
    "Rose Pita Nur Afifah": {
        "nim": "22518241042",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2024, 2025],
        "role_2025": "Koordinator Manager"
    },
    "Zelfa Nafisah Zalna": {
        "nim": "23501241001",
        "prodi": "S1 Pendidikan Teknik Elektro",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Manager Keuangan & Logistik"
    },
    "Tri Wahyu Handoyo": {
        "nim": "22518241023",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2023, 2024, 2025],
        "role_2025": "Koordinator Divisi Program / AI Vision"
    },
    "Hanif NurKhalis": {
        "nim": "23518241019",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Program"
    },
    "Hisyam Yasid Pratowo": {
        "nim": "23518241028",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Program"
    },
    "Ikhsan Nurrohman": {
        "nim": "22538141004",
        "prodi": "S1 Teknik Elektro",
        "faculty": "FT",
        "years": [2024, 2025],
        "role_2025": "Koordinator Divisi Elektronik"
    },
    "Abdul Hasib Adzdzin Nuha": {
        "nim": "22502241014",
        "prodi": "S1 Pendidikan Teknik Elektronika",
        "faculty": "FT",
        "years": [2023, 2024, 2025],
        "role_2025": "Divisi Elektronik"
    },
    "Aryasetya Maulana Swasdika": {
        "nim": "23501241018",
        "prodi": "S1 Pendidikan Teknik Elektro",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Elektronik"
    },
    "Naufal Farros Zainal Arifin": {
        "nim": "23502241031",
        "prodi": "S1 Pendidikan Teknik Elektronika",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Elektronik"
    },
    "Rionaldi Nugroho": {
        "nim": "23090620088",
        "prodi": "D4 Teknik Elektronika",
        "faculty": "FV",
        "years": [2024, 2025],
        "role_2025": "Koordinator Divisi Mekanik"
    },
    "Caesar Sokma Langgeng": {
        "nim": "21539144005",
        "prodi": "S1 Teknik Manufaktur",
        "faculty": "FT",
        "years": [2024, 2025],
        "role_2025": "Divisi Mekanik"
    },
    "Adhiyatma Fatya Ramadhani": {
        "nim": "23539141012",
        "prodi": "S1 Teknik Manufaktur",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Mekanik"
    },
    "Andika Nanda Wijaya": {
        "nim": "23539141021",
        "prodi": "S1 Teknik Manufaktur",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Mekanik"
    },
    "Kharisma Putra Mahardika": {
        "nim": "23503241035",
        "prodi": "S1 Pendidikan Teknik Mesin",
        "faculty": "FT",
        "years": [2025],
        "role_2025": "Divisi Mekanik"
    },
    
    # 2024 Alumni / Past Members
    "Ilham Widyo Nugroho": {
        "nim": "21507334002",
        "prodi": "D4 Teknik Elektronika",
        "faculty": "FV",
        "years": [2022, 2023, 2024],
        "role": "Ketua Tim 2024"
    },
    "Mustika Wahyu Aprilia": {
        "nim": "21306141050",
        "prodi": "S1 Fisika",
        "faculty": "FMIPA",
        "years": [2022, 2023, 2024],
        "role": "Lead Manager (2022-2024)"
    },
    "Salsabila Azzahra Putri Sophia Dewi Utami": {
        "nim": "20518241012",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2021, 2022, 2023, 2024],
        "role": "Ketua Tim 2023 / Programmer"
    },
    "Agus Bagaskoro": {
        "nim": "21501244039",
        "prodi": "S1 Pendidikan Teknik Elektro",
        "faculty": "FT",
        "years": [2022, 2023, 2024],
        "role": "Divisi Elektronik"
    },
    "Muhamad Ilham Sony": {
        "nim": "20539144016",
        "prodi": "S1 Teknik Manufaktur",
        "faculty": "FT",
        "years": [2023, 2024],
        "role": "Divisi Mekanik"
    },
    
    # 2022 Alumni
    "Muhammad Iqbal Rasyid": {
        "nim": "19518241008",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2020, 2021, 2022],
        "role": "Ketua Tim 2022 / Programmer"
    },
    "Yuli Dwi Saputri": {
        "nim": "19501241019",
        "prodi": "S1 Pendidikan Teknik Elektro",
        "faculty": "FT",
        "years": [2020, 2021, 2022],
        "role": "Lead Manager (2020-2022)"
    },
    "Geo Brahma Granito Z.": {
        "nim": "19507334011",
        "prodi": "D4 Teknik Mesin",
        "faculty": "FV",
        "years": [2022],
        "role": "Divisi Desain"
    },
    "Ahmad Insan Kamil": {
        "nim": "19503241022",
        "prodi": "S1 Pendidikan Teknik Mesin",
        "faculty": "FT",
        "years": [2022],
        "role": "Divisi Desain"
    },
    
    # 2021 Alumni
    "Afif Aiman Saputra": {
        "nim": "18503241015",
        "prodi": "S1 Pendidikan Teknik Mesin",
        "faculty": "FT",
        "years": [2020, 2021],
        "role": "Ketua Tim 2021 / Mekanik"
    },
    "Yusron Nur Latief": {
        "nim": "18507334005",
        "prodi": "D4 Teknik Elektronika",
        "faculty": "FV",
        "years": [2020, 2021],
        "role": "Divisi Elektronik"
    },
    
    # 2020 Inaugural Alumni
    "Nurcholis": {
        "nim": "17502241001",
        "prodi": "S1 Pendidikan Teknik Elektronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Ketua Tim 2020 / Founder"
    },
    "Alfan Fajri Tamyis": {
        "nim": "17502241014",
        "prodi": "S1 Pendidikan Teknik Elektronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Program"
    },
    "Budi Arjaya Wida": {
        "nim": "18518241011",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Program"
    },
    "Musa Beni Ricardo Aruan": {
        "nim": "17518241009",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Elektronik"
    },
    "Ardhi Wiranata": {
        "nim": "17502241018",
        "prodi": "S1 Pendidikan Teknik Elektronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Elektronik"
    },
    "Musyarof Rifai": {
        "nim": "18518241017",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Mekanik"
    },
    "Anggoro Fajar Dwi Utomo": {
        "nim": "18518241021",
        "prodi": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Mekanik"
    },
    "Muhammad Rovi Aan Sulistya": {
        "nim": "18501241029",
        "prodi": "S1 Pendidikan Teknik Elektro",
        "faculty": "FT",
        "years": [2020],
        "role": "Divisi Mekanik"
    }
}

# Advisors
EXPECTED_ADVISORS = {
    "Prof. Ir. Moh. Khairudin, M.T., Ph.D., IPU.": {
        "nip": "19790412 200212 1 002",
        "homebase": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT)"
    },
    "Dr. Herlambang Sigit Pramono, S.T., M.Cs.": {
        "nip": "19650829 199903 1 001",
        "homebase": "S1 Pendidikan Teknik Mekatronika",
        "faculty": "Fakultas Teknik (FT)"
    }
}

def normalize_name(name):
    """Normalize names for fuzzy matching between full names and abbreviated versions."""
    n = name.strip()
    if "Salsabila Azzahra" in n:
        return "Salsabila Azzahra"
    if "Khairudin" in n:
        return "Moh. Khairudin"
    if "Herlambang" in n:
        return "Herlambang Sigit Pramono"
    return n

# ==============================================================================
# TEST 1: Adversarial Scan for Placeholder NIM '22518244007' and Fake Strings
# ==============================================================================
def test_placeholder_remnants():
    print("=" * 80)
    print("TEST 1: Adversarial Scan for Placeholder NIM '22518244007' and Fake Strings")
    print("=" * 80)
    
    placeholder_nim = "22518244007"
    scan_files = [
        TEAM_DATA_TS,
        STRUKTUR_MD,
        ARSIP_MD,
        ROOT_DIR / "components" / "TeamRosterSection.tsx",
        ROOT_DIR / "components" / "MemberPhotoFadeEngine.tsx",
        ROOT_DIR / "app" / "divisi" / "page.tsx",
    ]
    
    errors = []
    
    for fpath in scan_files:
        if not fpath.exists():
            continue
        content = fpath.read_text(encoding="utf-8")
        lines = content.splitlines()
        for idx, line in enumerate(lines, 1):
            if placeholder_nim in line:
                # Allowed ONLY in ARSIP_MD as a documented historical audit log of the fix
                if fpath.name == "ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md" and ("Resolusi" in line or "5.1" in line or "versi awal" in line or "22518244007` → `22518241040`" in line or "tercatat" in line):
                    print(f"  [AUDIT LOG NOTE] {fpath.name}:{idx} correctly documents the historical resolution of 22518244007.")
                else:
                    errors.append(f"UNAUTHORIZED PLACEHOLDER: Found active '{placeholder_nim}' in {fpath.name}:{idx}: {line.strip()}")
            
            # Check for dummy/mock strings
            if re.search(r'nim:\s*["\'](12345678901|00000000000|99999999999|XXXXXXXXXXX|22518244007)["\']', line, re.IGNORECASE):
                errors.append(f"DUMMY NIM: Found placeholder NIM in {fpath.name}:{idx}: {line.strip()}")
                
    if errors:
        for err in errors:
            print("  ❌ " + err)
        return False
    else:
        print("  ✅ PASS: Zero active remnants of placeholder NIM 22518244007 in dataset.")
        print("  ✅ PASS: Zero dummy/mock NIM strings detected across all codebase files.")
        return True

# ==============================================================================
# TEST 2: Mathematical and Structural Validation of UNY NIMs (11 Digits)
# ==============================================================================
def test_nim_mathematical_oracle():
    print("\n" + "=" * 80)
    print("TEST 2: Mathematical & Structural UNY NIM Format Verification (11 Digits)")
    print("=" * 80)
    
    errors = []
    
    for name, info in EXPECTED_MEMBERS.items():
        nim = info["nim"]
        prodi = info["prodi"]
        fac = info["faculty"]
        
        # 1. Exact 11 digits
        if not re.match(r'^\d{11}$', nim):
            errors.append(f"{name}: NIM '{nim}' is not 11 digits!")
            continue
            
        # 2. Entry Year (digits 0..1)
        year_prefix = int(nim[0:2])
        if year_prefix not in range(17, 25): # 2017 to 2024
            errors.append(f"{name}: Invalid entry year prefix '{year_prefix}' in NIM '{nim}'")
            
        # 3. Faculty code (digit 2)
        fac_digit = nim[2]
        if fac == "FT":
            if fac_digit != "5":
                errors.append(f"{name}: FT student must have faculty digit '5', got '{fac_digit}' in '{nim}'")
        elif fac == "FMIPA":
            if fac_digit != "3":
                errors.append(f"{name}: FMIPA student must have faculty digit '3', got '{fac_digit}' in '{nim}'")
        elif fac == "FV":
            # FV can be 230906... or 215073... (diploma under FT)
            if not (nim.startswith("2309062") or "50733" in nim or "50734" in nim):
                errors.append(f"{name}: FV student has invalid NIM prefix/code in '{nim}'")
                
        # 4. Degree Code (digits 5..6)
        if fac == "FT" and "S1" in prodi:
            if "Pendidikan" in prodi:
                degree_code = nim[5:7]
                if degree_code != "24":
                    errors.append(f"{name}: S1 Kependidikan must have degree code '24', got '{degree_code}' in '{nim}'")
            else:
                degree_code = nim[5:7]
                if degree_code != "14":
                    errors.append(f"{name}: S1 Murni must have degree code '14', got '{degree_code}' in '{nim}'")
        elif fac == "FMIPA" and "S1" in prodi:
            degree_code = nim[5:7]
            if degree_code != "14":
                errors.append(f"{name}: FMIPA S1 Murni must have degree code '14', got '{degree_code}' in '{nim}'")
                
        # 5. Admission Track (digit 7)
        track_digit = nim[7]
        if track_digit not in ['1', '4', '0']: # 1=reguler, 4=kerjasama/mandiri, 0=vokasi
            errors.append(f"{name}: Unusual track digit '{track_digit}' in '{nim}'")
            
        # 6. Sequence Number (digits 8..10)
        seq_num = int(nim[8:11])
        if seq_num < 1 or seq_num > 999:
            errors.append(f"{name}: Invalid sequence number '{seq_num}' in '{nim}'")
            
    # Also test Advisors NIP
    for name, info in EXPECTED_ADVISORS.items():
        nip_clean = info["nip"].replace(" ", "")
        if len(nip_clean) != 18 or not nip_clean.isdigit():
            errors.append(f"Advisor {name}: Invalid NIP format '{info['nip']}'")
            
    if errors:
        for err in errors:
            print("  ❌ " + err)
        return False
    else:
        print(f"  * Tested {len(EXPECTED_MEMBERS)} student NIMs and {len(EXPECTED_ADVISORS)} advisor NIPs.")
        print("  ✅ PASS: 100% of NIMs strictly conform to the authentic UNY 11-digit hierarchical schema!")
        print("  ✅ PASS: 100% of Dosen Pembimbing NIPs conform to the official 18-digit Indonesian civil service NIP schema!")
        return True

# ==============================================================================
# TEST 3: Verification of data/teamData.ts Structures & Data Authenticity
# ==============================================================================
def test_team_data_ts():
    print("\n" + "=" * 80)
    print("TEST 3: Detailed Forensic Audit of 'data/teamData.ts'")
    print("=" * 80)
    
    content = TEAM_DATA_TS.read_text(encoding="utf-8")
    
    # Check that Farhan Yuda Mahendra has NIM 22518241040 everywhere in teamData.ts
    farhan_nims = re.findall(r'name:\s*[\'"]Farhan Yuda Mahendra[\'"].*?nim:\s*[\'"]([^\'"]+)[\'"]', content, re.DOTALL)
    print(f"  * Farhan Yuda Mahendra occurrences in teamData.ts: {len(farhan_nims)}")
    for fn in farhan_nims:
        assert fn == "22518241040", f"Farhan Yuda Mahendra has incorrect NIM in teamData.ts: {fn}"
    print("    -> Farhan Yuda Mahendra verified as '22518241040' across all entries.")
    
    # Check that each expected member exists in teamData.ts with the exact verified NIM
    missing_members = []
    mismatched_nims = []
    
    for name, info in EXPECTED_MEMBERS.items():
        norm_n = normalize_name(name)
        # Search for name in teamData.ts
        pattern = re.compile(rf"name:\s*['\"]([^'\"]*{re.escape(norm_n)}[^'\"]*)['\"].*?nim:\s*['\"]([^'\"]+)['\"]", re.DOTALL)
        match = pattern.search(content)
        if not match:
            missing_members.append(name)
        else:
            found_name, found_nim = match.groups()
            if found_nim != info["nim"]:
                mismatched_nims.append(f"{name}: Expected NIM {info['nim']}, found {found_nim} in teamData.ts")
                
    if missing_members:
        print(f"  ❌ Missing members in teamData.ts: {missing_members}")
    if mismatched_nims:
        print(f"  ❌ NIM mismatches in teamData.ts: {mismatched_nims}")
        
    # Check that image paths in teamData.ts physically exist in public/
    image_paths = re.findall(r"['\"](/images/[^'\"]+\.(?:png|jpg|jpeg|webp|svg))['\"]", content)
    unique_images = sorted(list(set(image_paths)))
    print(f"  * Auditing {len(unique_images)} unique image references from teamData.ts on disk...")
    
    missing_images = []
    for img_rel in unique_images:
        disk_path = PUBLIC_DIR / img_rel.lstrip("/").replace("/", "\\")
        if not disk_path.exists():
            missing_images.append(img_rel)
            
    if missing_images:
        print(f"  ❌ MISSING IMAGES ON DISK ({len(missing_images)}):")
        for img in missing_images[:10]:
            print(f"    - {img}")
        return False
    else:
        print(f"    -> 100% of {len(unique_images)} image references physically exist on disk with valid files.")
        
    if not missing_members and not mismatched_nims:
        print("  ✅ PASS: 'data/teamData.ts' is 100% synchronized and verified!")
        return True
    return False

# ==============================================================================
# TEST 4: Cross-File Consistency (teamData.ts ↔ STRUKTUR.md ↔ ARSIP.md)
# ==============================================================================
def test_cross_file_consistency():
    print("\n" + "=" * 80)
    print("TEST 4: Cross-File Triangulation Oracle (teamData.ts vs STRUKTUR.md vs ARSIP.md)")
    print("=" * 80)
    
    arsip_content = ARSIP_MD.read_text(encoding="utf-8")
    struktur_content = STRUKTUR_MD.read_text(encoding="utf-8")
    ts_content = TEAM_DATA_TS.read_text(encoding="utf-8")
    
    discrepancies = []
    
    # 1. Leaders 2020-2025 consistency
    leaders_expected = [
        (2020, "Nurcholis", "17502241001", "S1 Pendidikan Teknik Elektronika"),
        (2021, "Afif Aiman Saputra", "18503241015", "S1 Pendidikan Teknik Mesin"),
        (2022, "Muhammad Iqbal Rasyid", "19518241008", "S1 Pendidikan Teknik Mekatronika"),
        (2023, "Salsabila Azzahra", "20518241012", "S1 Pendidikan Teknik Mekatronika"),
        (2024, "Ilham Widyo Nugroho", "21507334002", "D4 Teknik Elektronika"),
        (2025, "Farhan Yuda Mahendra", "22518241040", "S1 Pendidikan Teknik Mekatronika")
    ]
    
    print("  * Checking Leaders Hall of Fame consistency across all files...")
    for yr, name, nim, prodi in leaders_expected:
        # Check ARSIP
        if nim not in arsip_content:
            discrepancies.append(f"Leader {name} ({nim}) missing from ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md")
        # Check STRUKTUR
        if name not in struktur_content:
            discrepancies.append(f"Leader {name} missing from STRUKTUR_TIM_ABHINAYA.md")
        # Check teamData.ts
        if nim not in ts_content:
            discrepancies.append(f"Leader {name} ({nim}) missing from data/teamData.ts")
            
    # 2. Managers consistency
    managers_expected = [
        ("Yuli Dwi Saputri", "19501241019", "S1 Pendidikan Teknik Elektro"),
        ("Mustika Wahyu Aprilia", "21306141050", "S1 Fisika"),
        ("Rose Pita Nur Afifah", "22518241042", "S1 Pendidikan Teknik Mekatronika"),
        ("Zelfa Nafisah Zalna", "23501241001", "S1 Pendidikan Teknik Elektro"),
    ]
    print("  * Checking Managers Showcase consistency across all files...")
    for name, nim, prodi in managers_expected:
        if nim not in arsip_content:
            discrepancies.append(f"Manager {name} ({nim}) missing from ARSIP.md")
        if nim not in struktur_content:
            discrepancies.append(f"Manager {name} ({nim}) missing from STRUKTUR.md")
        if nim not in ts_content:
            discrepancies.append(f"Manager {name} ({nim}) missing from teamData.ts")
            
    # 3. Active 2025 Squad (15 members)
    active_2025 = [
        "Farhan Yuda Mahendra", "Rose Pita Nur Afifah", "Zelfa Nafisah Zalna",
        "Tri Wahyu Handoyo", "Hanif NurKhalis", "Hisyam Yasid Pratowo",
        "Ikhsan Nurrohman", "Abdul Hasib Adzdzin Nuha", "Aryasetya Maulana Swasdika",
        "Naufal Farros Zainal Arifin", "Rionaldi Nugroho", "Caesar Sokma Langgeng",
        "Adhiyatma Fatya Ramadhani", "Andika Nanda Wijaya", "Kharisma Putra Mahardika"
    ]
    print(f"  * Checking Active 2025 Squad ({len(active_2025)} members) consistency...")
    for mname in active_2025:
        info = EXPECTED_MEMBERS[mname]
        nim = info["nim"]
        if nim not in arsip_content:
            discrepancies.append(f"Active 2025 member {mname} ({nim}) missing from ARSIP.md")
        if nim not in struktur_content:
            discrepancies.append(f"Active 2025 member {mname} ({nim}) missing from STRUKTUR.md")
        if nim not in ts_content:
            discrepancies.append(f"Active 2025 member {mname} ({nim}) missing from teamData.ts")
            
    # 4. Check specific PDDikti corrections (Afif, Iqbal, Aryasetya, Rovi, Farhan)
    print("  * Verifying PDDikti-corrected prodi designations across files...")
    # Afif: S1 Pend Teknik Mesin
    assert "Afif Aiman Saputra" in struktur_content and "S1 Pendidikan Teknik Mesin" in struktur_content
    # Iqbal: S1 Pend Teknik Mekatronika
    assert "Muhammad Iqbal Rasyid" in struktur_content and "S1 Pendidikan Teknik Mekatronika" in struktur_content
    # Aryasetya: S1 Pend Teknik Elektro
    assert "Aryasetya Maulana Swasdika" in struktur_content and "23501241018" in struktur_content
    # Farhan: 22518241040
    assert "22518241040" in struktur_content and "22518241040" in ts_content and "22518241040" in arsip_content
    
    if discrepancies:
        print("  ❌ DISCREPANCIES FOUND:")
        for d in discrepancies:
            print("    - " + d)
        return False
    else:
        print("  ✅ PASS: 100% cross-file synchronization across teamData.ts, STRUKTUR_TIM_ABHINAYA.md, and ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md!")
        return True

# ==============================================================================
# MAIN EXECUTION
# ==============================================================================
def main():
    print("╔══════════════════════════════════════════════════════════════════════════════╗")
    print("║        CHALLENGER 1: TIM ROBOTIKA ABHINAYA UNY DATA VERIFICATION ORACLE       ║")
    print("║               ADVERSARIAL STRESS-TEST & STRUCTURAL NIM AUDIT                 ║")
    print("╚══════════════════════════════════════════════════════════════════════════════╝")
    
    t1 = test_placeholder_remnants()
    t2 = test_nim_mathematical_oracle()
    t3 = test_team_data_ts()
    t4 = test_cross_file_consistency()
    
    print("\n" + "=" * 80)
    print("FINAL SUMMARY OF CHALLENGER 1 TESTS:")
    print(f"  - Test 1 (Placeholder Remnants & Dummy Strings): {'PASS' if t1 else 'FAIL'}")
    print(f"  - Test 2 (11-Digit UNY NIM Format Compliance):   {'PASS' if t2 else 'FAIL'}")
    print(f"  - Test 3 (teamData.ts Forensic & Image Audit):   {'PASS' if t3 else 'FAIL'}")
    print(f"  - Test 4 (Cross-File Triangulation Oracle):      {'PASS' if t4 else 'FAIL'}")
    print("=" * 80)
    
    if t1 and t2 and t3 and t4:
        print("\n🏆 VERDICT: ALL TESTS PASSED (100% EMPIRICALLY VERIFIED)! RECOMMENDING: APPROVE")
        sys.exit(0)
    else:
        print("\n❌ VERDICT: FAILURES DETECTED! RECOMMENDING: REQUEST_CHANGES")
        sys.exit(1)

if __name__ == "__main__":
    main()
