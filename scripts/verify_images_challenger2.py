#!/usr/bin/env python3
"""
================================================================================
 Challenger 2 Empirical Image Asset & Reference Integrity Verification Suite
================================================================================
 Adversarially tests:
 1. Zero-byte image files
 2. Corrupted headers / truncated JPEG/PNG/WebP data
 3. Solid black or monochromatic placeholder images
 4. Dimension anomalies (< 100px width/height)
 5. Unresolved / Broken Next.js image references across codebase
================================================================================
"""

import os
import sys
import re
import json
from pathlib import Path
from PIL import Image
import numpy as np

# Force UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ROOT_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT_DIR / "public"

def inspect_image_file(file_path: Path):
    """Deep inspect a single image file for corruption, blackness, dimensions, etc."""
    rel_path = file_path.relative_to(ROOT_DIR).as_posix()
    file_size = file_path.stat().st_size
    
    issues = []
    
    # Check 1: Zero-byte or very small
    if file_size == 0:
        return {
            "path": rel_path,
            "size": 0,
            "status": "FAIL",
            "issues": ["Zero-byte file (0 bytes)"]
        }
    
    if file_size < 100:
        issues.append(f"Suspiciously small file size ({file_size} bytes)")

    try:
        # Check 2: Header & decode verification
        with Image.open(file_path) as img:
            img.verify()
            img_format = img.format

        # Reload for pixel operations (verify() closes/invalidates the file handle)
        with Image.open(file_path) as img:
            width, height = img.size
            img_mode = img.mode
            
            # Check 3: Dimension anomalies
            if width < 100 or height < 100:
                issues.append(f"Dimension anomaly: {width}x{height} is < 100px in width or height")
            
            # Check 4: Pixel & color distribution
            rgb_img = img.convert("RGB")
            arr = np.array(rgb_img, dtype=np.float32)
            
            r_channel = arr[:, :, 0]
            g_channel = arr[:, :, 1]
            b_channel = arr[:, :, 2]
            
            mean_rgb = np.mean(arr)
            std_rgb = np.std(arr)
            max_rgb = np.max(arr)
            min_rgb = np.min(arr)
            
            is_pure_black = (mean_rgb < 5.0 and max_rgb < 10.0)
            is_monochrome = (std_rgb < 1.0)
            
            if is_pure_black:
                issues.append(f"Solid black placeholder detected: mean={mean_rgb:.2f}, max={max_rgb:.2f}")
            elif is_monochrome:
                issues.append(f"Monochromatic / blank placeholder detected: std_dev={std_rgb:.2f}")

            return {
                "path": rel_path,
                "size": file_size,
                "format": img_format,
                "mode": img_mode,
                "width": width,
                "height": height,
                "mean_rgb": float(mean_rgb),
                "std_rgb": float(std_rgb),
                "min_rgb": float(min_rgb),
                "max_rgb": float(max_rgb),
                "status": "FAIL" if issues else "PASS",
                "issues": issues
            }

    except Exception as e:
        return {
            "path": rel_path,
            "size": file_size,
            "status": "FAIL",
            "issues": [f"Image decoding / corrupted header error: {str(e)}"]
        }

def scan_directory(dir_path: Path):
    """Scan all image files in a directory recursively."""
    results = []
    if not dir_path.exists():
        print(f"Directory does not exist: {dir_path}")
        return results

    image_extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".ico", ".svg"}
    for file_path in sorted(dir_path.rglob("*")):
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            res = inspect_image_file(file_path)
            results.append(res)
    return results

def check_referenced_paths():
    """Extract and check all image references in code and markdown files."""
    files_to_check = [
        ROOT_DIR / "data" / "teamData.ts",
        ROOT_DIR / "STRUKTUR_TIM_ABHINAYA.md",
        ROOT_DIR / "ARSIP_ANALISIS_FOTO_DAN_DATA_ANGGOTA.md",
        ROOT_DIR / "components" / "TeamRosterSection.tsx",
        ROOT_DIR / "components" / "MemberPhotoFadeEngine.tsx"
    ]
    
    reference_results = []
    
    # Pattern to match image URLs like /images/... or public/images/...
    img_pattern = re.compile(r'["\'`](/(?:images|gallery|assets)/[^"\'`]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))["\'`]|([a-zA-Z0-9_\-\.\/]+(?:images|gallery|assets)/[a-zA-Z0-9_\-\.\/]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))', re.IGNORECASE)
    
    for fpath in files_to_check:
        if not fpath.exists():
            continue
        
        content = fpath.read_text(encoding="utf-8", errors="replace")
        matches = set()
        
        # Regex search
        for m in img_pattern.finditer(content):
            ref = m.group(1) or m.group(2)
            if ref:
                matches.add(ref)
                
        # Also find markdown image links: ![...](path)
        md_img_pattern = re.compile(r'!\[.*?\]\((.*?)\)')
        for m in md_img_pattern.finditer(content):
            ref = m.group(1).split()[0].strip() # handle possible title
            if ref and not ref.startswith("http"):
                matches.add(ref)

        for ref in sorted(matches):
            # Normalize to relative path inside public/
            clean_ref = ref.strip().lstrip("/")
            if clean_ref.startswith("public/"):
                clean_ref = clean_ref[len("public/"):]
            
            target_file = PUBLIC_DIR / clean_ref
            
            exists = target_file.is_file()
            valid_img = False
            img_info = None
            
            if exists:
                img_info = inspect_image_file(target_file)
                valid_img = (img_info["status"] == "PASS")
            
            reference_results.append({
                "source_file": fpath.relative_to(ROOT_DIR).as_posix(),
                "referenced_path": ref,
                "resolved_target": target_file.relative_to(ROOT_DIR).as_posix() if target_file.exists() else str(target_file),
                "exists": exists,
                "valid": valid_img,
                "details": img_info
            })
            
    return reference_results

def main():
    print("=" * 80)
    print("CHALLENGER 2: ADVERSARIAL IMAGE ASSET & REFERENCE STRESS TEST")
    print("=" * 80)
    
    # 1. Members directory scan
    members_dir = PUBLIC_DIR / "images" / "members"
    print(f"\n[1] Scanning public/images/members/ ({members_dir})...")
    member_results = scan_directory(members_dir)
    member_failures = [r for r in member_results if r["status"] == "FAIL"]
    print(f"  -> Total member images scanned: {len(member_results)}")
    print(f"  -> Passes: {len(member_results) - len(member_failures)}")
    print(f"  -> Failures: {len(member_failures)}")
    if member_failures:
        for f in member_failures:
            print(f"     [FAIL] {f['path']}: {', '.join(f['issues'])}")

    # 2. Instagram feed directory scan
    ig_dir = PUBLIC_DIR / "images" / "instagram_feed"
    print(f"\n[2] Scanning public/images/instagram_feed/ ({ig_dir})...")
    ig_results = scan_directory(ig_dir)
    ig_failures = [r for r in ig_results if r["status"] == "FAIL"]
    print(f"  -> Total Instagram feed images scanned: {len(ig_results)}")
    print(f"  -> Passes: {len(ig_results) - len(ig_failures)}")
    print(f"  -> Failures: {len(ig_failures)}")
    if ig_failures:
        for f in ig_failures:
            print(f"     [FAIL] {f['path']}: {', '.join(f['issues'])}")

    # 3. All other public/images directory scan
    other_images_dir = PUBLIC_DIR / "images"
    all_img_results = scan_directory(other_images_dir)
    all_failures = [r for r in all_img_results if r["status"] == "FAIL"]
    print(f"\n[3] Total public/images/* images scanned: {len(all_img_results)}")
    print(f"  -> Total Passes: {len(all_img_results) - len(all_failures)}")
    print(f"  -> Total Failures: {len(all_failures)}")

    # 4. Code & Markdown references validation
    print(f"\n[4] Scanning Codebase Image References (data/teamData.ts, etc.)...")
    ref_results = check_referenced_paths()
    missing_refs = [r for r in ref_results if not r["exists"]]
    invalid_refs = [r for r in ref_results if r["exists"] and not r["valid"]]
    print(f"  -> Total image references inspected: {len(ref_results)}")
    print(f"  -> Missing files: {len(missing_refs)}")
    print(f"  -> Invalid/Corrupt files referenced: {len(invalid_refs)}")
    
    if missing_refs:
        for m in missing_refs:
            print(f"     [MISSING] Source: {m['source_file']} -> Ref: {m['referenced_path']}")
            
    if invalid_refs:
        for inv in invalid_refs:
            print(f"     [INVALID] Source: {inv['source_file']} -> Ref: {inv['referenced_path']} ({inv['details']['issues']})")

    # Summary Assessment
    total_failures = len(all_failures) + len(missing_refs) + len(invalid_refs)
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY:")
    print(f"  Total Images Inspected: {len(all_img_results)}")
    print(f"  Total Image References Checked: {len(ref_results)}")
    print(f"  Total Failure Count: {total_failures}")
    if total_failures == 0:
        print("  VERDICT: 100% CLEAN - ALL IMAGES VALID & ZERO MISSING REFERENCES!")
    else:
        print(f"  VERDICT: FOUND {total_failures} ISSUES!")
    print("=" * 80)

    # Save detailed JSON report
    report_data = {
        "member_results": member_results,
        "ig_results": ig_results,
        "all_results": all_img_results,
        "references": ref_results,
        "total_failures": total_failures
    }
    
    out_json = ROOT_DIR / "scripts" / "challenger2_image_audit_report.json"
    out_json.write_text(json.dumps(report_data, indent=2), encoding="utf-8")
    print(f"\nWrote full audit JSON to {out_json}")

if __name__ == "__main__":
    main()
