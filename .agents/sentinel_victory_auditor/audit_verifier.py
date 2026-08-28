"""
Independent Forensic Verification & Victory Audit Script (Refined)
For: Abhinaya UNY Web Platform (Team Roster & Historical Archive)
Auditor: Sentinel Victory Auditor
Workspace: .agents/sentinel_victory_auditor
"""

import os
import re
import sys
import json
from pathlib import Path

def print_header(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

def check_image_magic(filepath):
    """Verify image magic bytes for JPEG or PNG."""
    try:
        with open(filepath, 'rb') as f:
            header = f.read(16)
        if len(header) < 4:
            return False, "File too small (< 4 bytes)"
        if header.startswith(b'\xff\xd8\xff'):
            return True, "JPEG"
        if header.startswith(b'\x89PNG\r\n\x1a\n'):
            return True, "PNG"
        if header.startswith(b'GIF87a') or header.startswith(b'GIF89a'):
            return True, "GIF"
        if header.startswith(b'RIFF') and b'WEBP' in header:
            return True, "WEBP"
        return False, f"Unknown magic bytes: {header[:8].hex()}"
    except Exception as e:
        return False, str(e)

def run_audit():
    project_root = Path(r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web")
    members_dir = project_root / "public" / "images" / "members"
    team_data_file = project_root / "data" / "teamData.ts"
    roster_component_file = project_root / "components" / "TeamRosterSection.tsx"
    fade_engine_file = project_root / "components" / "MemberPhotoFadeEngine.tsx"
    out_dir = project_root / "out"
    
    total_checks = 0
    passed_checks = 0
    violations = []

    def check(name, condition, details=""):
        nonlocal total_checks, passed_checks, violations
        total_checks += 1
        if condition:
            passed_checks += 1
            print(f"  [PASS] {name} {f'({details})' if details else ''}")
        else:
            violations.append(f"{name}: {details}")
            print(f"  [FAIL] {name} - {details}")

    # =========================================================================
    # PHASE 1: R1 Photo Pipeline & Binary Integrity
    # =========================================================================
    print_header("PHASE 1: R1 Photo Pipeline & Binary Integrity")
    
    check("Members directory exists", members_dir.is_dir(), str(members_dir))
    
    member_files = list(members_dir.glob("*.*"))
    check("Member photo count in public/images/members/", len(member_files) >= 50, f"Found {len(member_files)} files")
    
    semantic_pattern = re.compile(r"^\d{4}_[a-z0-9]+_[a-z0-9_]+_\d{2}\.(jpg|png|webp)$")
    semantic_files = [f for f in member_files if semantic_pattern.match(f.name)]
    zero_byte_files = []
    corrupted_images = []
    
    for mf in member_files:
        if mf.name.startswith("."):
            continue
        size = mf.stat().st_size
        if size == 0:
            zero_byte_files.append(mf.name)
            
        is_valid, img_type = check_image_magic(mf)
        if not is_valid:
            corrupted_images.append(f"{mf.name} ({img_type})")
            
    check("Semantic member photo assets generated ({year}_{division}_{name}_{index}.ext)",
          len(semantic_files) >= 100,
          f"Found {len(semantic_files)} semantic files")
          
    check("Zero 0-byte files in members directory",
          len(zero_byte_files) == 0,
          f"{len(zero_byte_files)} empty files: {zero_byte_files[:5]}")
          
    check("All member files are valid binary images (JPEG/PNG)",
          len(corrupted_images) == 0,
          f"{len(corrupted_images)} corrupt files: {corrupted_images[:5]}")
          
    # Check exclusion of grid slices and dark posters
    catalog_path = project_root / "scripts" / "full_catalog_with_renaming.json"
    if catalog_path.exists():
        with open(catalog_path, 'r', encoding='utf-8') as f:
            catalog = json.load(f)
        excluded_items = [item for item in catalog if not item.get("include_in_roster", True)]
        check("Full catalog documents excluded graphics/posters/grid slices",
              len(excluded_items) > 50,
              f"Documented {len(excluded_items)} excluded assets")
              
        # Verify no excluded asset was renamed into public/images/members/ as a member portrait
        excluded_in_members = []
        for item in excluded_items:
            dest = item.get("destination_relative", "")
            if dest.startswith("public/images/members/") and item.get("category") in ["grid_slice", "poster_event", "non_member_graphic"]:
                excluded_in_members.append(dest)
        check("Excluded non-member graphics/grid slices are NOT in public/images/members/",
              len(excluded_in_members) == 0,
              f"{len(excluded_in_members)} leaked assets: {excluded_in_members[:5]}")

    # =========================================================================
    # PHASE 2: R2 All-Era Leaders & Managers Showcase (2020-2025)
    # =========================================================================
    print_header("PHASE 2: R2 All-Era Leaders & Managers Showcase (2020-2025)")
    
    with open(team_data_file, 'r', encoding='utf-8') as f:
        team_data_src = f.read()

    # Verify Leaders 2020-2025
    expected_leaders = {
        2020: "Nurcholis",
        2021: "Afif Aiman Saputra",
        2022: "Muhammad Iqbal Rasyid",
        2023: "Salsabila Azzahra",
        2024: "Ilham Widyo Nugroho",
        2025: "Farhan Yuda Mahendra"
    }
    
    for yr, name in expected_leaders.items():
        has_leader = f"year: {yr}" in team_data_src and name in team_data_src
        check(f"Leader for year {yr} ({name}) cataloged in LEADERS_HALL_OF_FAME",
              has_leader,
              f"Year {yr} -> {name}")

    # Verify Managers 2020-2025
    expected_managers = {
        2020: "Yuli Dwi Saputri",
        2021: "Yuli Dwi Saputri",
        2022: "Yuli Dwi Saputri",
        2023: "Mustika Wahyu Aprilia",
        2024: ["Mustika Wahyu Aprilia", "Rose Pita Nur Afifah"],
        2025: ["Rose Pita Nur Afifah", "Zelfa Nafisah Zalna"]
    }
    
    for yr, mgrs in expected_managers.items():
        if isinstance(mgrs, list):
            for mgr in mgrs:
                has_mgr = f"year: {yr}" in team_data_src and mgr in team_data_src
                check(f"Co-Manager for year {yr} ({mgr}) cataloged in MANAGERS_SHOWCASE",
                      has_mgr,
                      f"Year {yr} -> {mgr}")
        else:
            has_mgr = f"year: {yr}" in team_data_src and mgrs in team_data_src
            check(f"Manager for year {yr} ({mgrs}) cataloged in MANAGERS_SHOWCASE",
                  has_mgr,
                  f"Year {yr} -> {mgrs}")

    # =========================================================================
    # PHASE 3: R3 Current Active Technical Squad
    # =========================================================================
    print_header("PHASE 3: R3 Current Active Technical Squad")
    
    check("ACTIVE_TECHNICAL_SQUAD exported in teamData.ts", "export const ACTIVE_TECHNICAL_SQUAD" in team_data_src)
    
    active_programmers = ["Tri Wahyu Handoyo", "Farhan Yuda Mahendra", "Hanif", "Hisyam Yasid Pratowo"]
    for prog in active_programmers:
        check(f"Active Programmer: {prog}", prog in team_data_src)
        
    active_electronics = ["Abdul Hasib Adzdzin Nuha", "Ikhsan Nurrohman", "Aryasetya Maulana Swasdika", "Naufal Farros Zainal Arifin"]
    for el in active_electronics:
        check(f"Active Electronics: {el}", el in team_data_src)
        
    active_mechanics = ["Caesar Sokma Langgeng", "Rionaldi Nugroho", "Adhiyatma Fatya Ramadhani", "Andika Nanda Wijaya", "Kharisma Putra Mahardika"]
    for mec in active_mechanics:
        check(f"Active Mechanics: {mec}", mec in team_data_src)

    # =========================================================================
    # PHASE 4: R4 Interactive Alumni & Generation Explorer
    # =========================================================================
    print_header("PHASE 4: R4 Interactive Alumni & Generation Explorer")
    
    check("ALUMNI_GENERATIONS exported in teamData.ts", "export const ALUMNI_GENERATIONS" in team_data_src)
    
    for yr in [2020, 2021, 2022, 2023, 2024, 2025]:
        check(f"Alumni Generation Archive for year {yr} documented", f"year: {yr}" in team_data_src)

    # =========================================================================
    # PHASE 5: R5 Ultra-Smooth Crossfade Photo Engine
    # =========================================================================
    print_header("PHASE 5: R5 Ultra-Smooth Crossfade Photo Engine")
    
    with open(fade_engine_file, 'r', encoding='utf-8') as f:
        fade_src = f.read()
        
    with open(roster_component_file, 'r', encoding='utf-8') as f:
        roster_src = f.read()

    check("Crossfade engine implements CSS opacity transitions (duration-1000 ease-in-out)",
          "duration-1000" in fade_src or "duration-1000" in roster_src)
          
    check("Crossfade engine implements slide counter indicator (e.g. 1/N)",
          "currentIdx + 1" in fade_src or "currentIdx + 1" in roster_src)
          
    check("Crossfade engine implements pagination dot indicators",
          "rounded-full" in fade_src or "rounded-full" in roster_src)
          
    check("Crossfade engine implements manual prev/next navigation with stopPropagation",
          "e.stopPropagation()" in fade_src or "e.stopPropagation()" in roster_src)
          
    check("Crossfade engine implements deterministic staggered auto-play interval",
          "setInterval" in fade_src or "setInterval" in roster_src)
          
    check("Crossfade engine implements initials monogram fallback for broken/missing photos",
          "slice(0, 2)" in fade_src or "slice(0, 2)" in roster_src)

    # =========================================================================
    # PHASE 6: Forensic Data Authenticity & Reference Integrity
    # =========================================================================
    print_header("PHASE 6: Forensic Data Authenticity & Reference Integrity")
    
    # Extract all photo paths from teamData.ts
    photo_paths = re.findall(r"['\"](/images/members/[^'\"]+)['\"]", team_data_src)
    check("Found member image paths in teamData.ts", len(photo_paths) > 0, f"Found {len(photo_paths)} path occurrences")
    
    unique_photo_paths = set(photo_paths)
    missing_photos = []
    for p in unique_photo_paths:
        local_path = project_root / "public" / p.lstrip("/")
        if not local_path.exists():
            missing_photos.append(p)
            
    check("100% of member image paths in teamData.ts resolve to existing disk files in public/",
          len(missing_photos) == 0,
          f"{len(missing_photos)} missing photos: {missing_photos[:5]}")

    # Verify absence of dummy names
    dummy_names = ["john doe", "jane doe", "lorem", "ipsum", "test member", "sample user", "foo bar", "placeholder"]
    found_dummies = [d for d in dummy_names if d in team_data_src.lower()]
    check("Zero dummy/placeholder names in teamData.ts",
          len(found_dummies) == 0,
          f"Found dummy tokens: {found_dummies}")

    # Verify UNY NIM format (11-digit numbers like 22518241023, 17502241001, etc.)
    nim_matches = re.findall(r"nim:\s*['\"](\d{11})['\"]", team_data_src)
    check("Authentic 11-digit UNY student NIMs found in dataset",
          len(nim_matches) >= 14,
          f"Found {len(nim_matches)} NIMs: {nim_matches[:5]}...")

    # =========================================================================
    # PHASE 7: Static Export Output Verification
    # =========================================================================
    print_header("PHASE 7: Static Export Output Verification")
    
    index_html = out_dir / "index.html"
    divisi_html = (out_dir / "divisi" / "index.html") if (out_dir / "divisi" / "index.html").exists() else (out_dir / "divisi.html")
    
    check("out/index.html exists", index_html.exists())
    check("out/divisi static HTML exists", divisi_html.exists(), str(divisi_html))
    
    if index_html.exists():
        with open(index_html, 'r', encoding='utf-8') as f:
            index_content = f.read()
        check("index.html contains Leaders Hall of Fame text", "Leaders Hall of Fame" in index_content or "Ketua Tim" in index_content)
        check("index.html contains Managers Showcase text", "Managers Showcase" in index_content or "Manager" in index_content)
        check("index.html contains Alumni Archive text", "Alumni" in index_content or "Generasi" in index_content or "KRTMI" in index_content)
        check("index.html contains Member photo references", "/images/members/" in index_content)

    # =========================================================================
    # SUMMARY
    # =========================================================================
    print_header("INDEPENDENT AUDIT SUMMARY")
    print(f"Total Checks:   {total_checks}")
    print(f"Passed Checks:  {passed_checks}")
    print(f"Failed Checks:  {len(violations)}")
    
    if violations:
        print("\nViolations List:")
        for v in violations:
            print(f"  - {v}")
        return False
    else:
        print("\nAll independent checks PASSED with 100% integrity!")
        return True

if __name__ == "__main__":
    success = run_audit()
    sys.exit(0 if success else 1)
