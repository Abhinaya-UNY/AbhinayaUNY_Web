import os
import re
import sys
import hashlib
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
MEMBERS_DIR = os.path.join(ROOT_DIR, "public", "images", "members")
IG_DIR = os.path.join(ROOT_DIR, "public", "images", "instagram_feed")
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

CORRUPTED_HASH = "74a1baa89954e8ee2ca15b8e73aa0ff9"

def check_image_health(file_path):
    """Inspects an image file for corruption, blankness, tiny size, or bad headers."""
    if not os.path.exists(file_path):
        return False, "FILE_NOT_FOUND"
    
    size = os.path.getsize(file_path)
    if size < 5120:  # 5 KB minimum
        return False, f"FILE_TOO_SMALL ({size} bytes < 5KB)"
    
    with open(file_path, "rb") as fp:
        md5 = hashlib.md5(fp.read()).hexdigest()
    if md5.startswith("74a1baa8"):
        return False, f"CORRUPTED_HASH_MATCH ({md5})"
    
    try:
        with Image.open(file_path) as img:
            img.verify()
        
        with Image.open(file_path) as img:
            w, h = img.size
            if w < 100 or h < 100:
                return False, f"DIMENSIONS_TOO_SMALL ({w}x{h})"
            
            extrema = img.getextrema()
            if img.mode == 'RGB' and extrema == ((0, 0), (0, 0), (0, 0)):
                return False, "SOLID_BLACK_BLANK (RGB 0,0,0)"
            elif img.mode == 'L' and extrema == (0, 0):
                return False, "SOLID_BLACK_BLANK (L 0)"
            
            return True, f"VALID ({img.format}, {img.mode}, {w}x{h}, {size} bytes, md5={md5[:8]})"
    except Exception as e:
        return False, f"CORRUPT_HEADER_OR_PARSE_ERROR ({e})"

def run_suite():
    print("=" * 80)
    print(" TIM ROBOTIKA ABHINAYA UNY — IMAGE ASSET VERIFICATION SUITE")
    print("=" * 80)
    
    failures = []
    
    # Test Suite 1: All public/images/members/ images
    print("\n--- [SUITE 1] Validating public/images/members/ Directory ---")
    member_files = sorted(os.listdir(MEMBERS_DIR))
    members_passed = 0
    
    for f in member_files:
        p = os.path.join(MEMBERS_DIR, f)
        if not os.path.isfile(p):
            continue
        is_ok, reason = check_image_health(p)
        if is_ok:
            members_passed += 1
        else:
            failures.append((f"members/{f}", reason))
            print(f"  [FAIL] {f}: {reason}")
            
    print(f"Result Suite 1: {members_passed}/{len(member_files)} valid images passed.")
    
    # Test Suite 2: All public/images/instagram_feed/ images
    print("\n--- [SUITE 2] Validating public/images/instagram_feed/ Directory ---")
    ig_files = sorted([f for f in os.listdir(IG_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
    ig_passed = 0
    for f in ig_files:
        p = os.path.join(IG_DIR, f)
        is_ok, reason = check_image_health(p)
        if is_ok:
            ig_passed += 1
        else:
            failures.append((f"instagram_feed/{f}", reason))
            print(f"  [FAIL] {f}: {reason}")
            
    print(f"Result Suite 2: {ig_passed}/{len(ig_files)} valid images passed.")
    
    # Test Suite 3: All active codebase referenced images (app, components, data, lib)
    print("\n--- [SUITE 3] Validating Codebase Referenced Images ---")
    active_dirs = ['app', 'components', 'data', 'lib', 'public']
    code_refs = set()
    for d in active_dirs:
        dir_path = os.path.join(ROOT_DIR, d)
        if not os.path.exists(dir_path):
            continue
        for root, _, files in os.walk(dir_path):
            for f in files:
                if f.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.html')):
                    filepath = os.path.join(root, f)
                    try:
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                            content = fp.read()
                            matches = re.findall(r'[\'"](/(?:images|assets|gallery)/[a-zA-Z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg))[\'"]', content)
                            for m in matches:
                                code_refs.add((m, os.path.relpath(filepath, ROOT_DIR)))
                    except Exception:
                        pass
                        
    ref_passed = 0
    for ref_url, src_file in sorted(code_refs):
        disk_path = os.path.join(PUBLIC_DIR, ref_url.lstrip('/').replace('/', os.sep))
        if ref_url.endswith('.svg'):
            if os.path.exists(disk_path) and os.path.getsize(disk_path) > 100:
                ref_passed += 1
            else:
                failures.append((f"ref: {ref_url} (in {src_file})", "SVG MISSING OR EMPTY"))
        else:
            is_ok, reason = check_image_health(disk_path)
            if is_ok:
                ref_passed += 1
            else:
                failures.append((f"ref: {ref_url} (in {src_file})", reason))
                print(f"  [FAIL] Reference {ref_url} in {src_file}: {reason}")
                
    print(f"Result Suite 3: {ref_passed}/{len(code_refs)} codebase image references valid.")
    
    # Test Suite 4: Semantic Pattern Coverage
    print("\n--- [SUITE 4] Validating Semantic Naming & Year Coverage (2020-2025) ---")
    years_found = set()
    divisions_found = set()
    semantic_count = 0
    
    for f in member_files:
        m = re.match(r"^(\d{4})_([a-z]+)_(.+)_(\d{2})\.(jpg|jpeg|png|webp)$", f)
        if m:
            y, div, name, seq, ext = m.groups()
            years_found.add(int(y))
            divisions_found.add(div)
            semantic_count += 1
            
    print(f"Total semantic pattern filenames: {semantic_count}")
    print(f"Years covered: {sorted(years_found)}")
    print(f"Divisions covered: {sorted(divisions_found)}")
    
    for yr in [2020, 2021, 2022, 2023, 2024, 2025]:
        if yr not in years_found:
            failures.append((f"year_{yr}", f"Missing semantic coverage for year {yr}"))
            
    # Final Assessment
    print("\n" + "=" * 80)
    print(" VERIFICATION SUMMARY")
    print("=" * 80)
    print(f"Total Failures / Defects: {len(failures)}")
    if not failures:
        print("✅ ALL TESTS PASSED! 100% of images are authentic, healthy, and verified.")
        return 0
    else:
        print("❌ FAILURES DETECTED:")
        for name, reason in failures:
            print(f"  - {name}: {reason}")
        return 1

if __name__ == "__main__":
    sys.exit(run_suite())
