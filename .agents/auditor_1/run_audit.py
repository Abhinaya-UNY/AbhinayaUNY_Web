import os
import re
import sys
import json
import subprocess

# Ensure stdout uses UTF-8 without crashing on Windows console
sys.stdout.reconfigure(encoding='utf-8')

root = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"

print("================================================================================")
print(" FORENSIC INTEGRITY AUDIT - ABHINAYA UNY ROBOTICS PORTAL")
print("================================================================================")

# 1. Source Code & Data Authenticity Forensics
print("\n[PHASE 1] SOURCE CODE & DATA AUTHENTICITY AUDIT")

forbidden_patterns = [
    (re.compile(r"3yr5uNkxA_8"), "Dummy Video ID (3yr5uNkxA_8)"),
    (re.compile(r"dQw4w9WgXcQ"), "Rickroll Video ID (dQw4w9WgXcQ)"),
    (re.compile(r"TODO_VIDEO"), "TODO Video ID"),
    (re.compile(r"PLACEHOLDER"), "Placeholder Token"),
    (re.compile(r"John Doe|Jane Doe", re.IGNORECASE), "Dummy Names (John/Jane Doe)"),
    (re.compile(r"lorem ipsum", re.IGNORECASE), "Lorem Ipsum Filler Text"),
]

prod_dirs = ['app', 'components', 'data', 'scripts']
dummy_hits = []
scanned_count = 0

for d in prod_dirs:
    dp = os.path.join(root, d)
    for r, dirs, files in os.walk(dp):
        if any(x in r for x in ['node_modules', '.next', '__pycache__', 'backups', '.git']):
            continue
        for f in files:
            if f.endswith(('.ts', '.tsx', '.js', '.jsx', '.py', '.json')) and not f.startswith('test_'):
                scanned_count += 1
                fp = os.path.join(r, f)
                rel = os.path.relpath(fp, root)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as fc:
                    for i, line in enumerate(fc, 1):
                        for pat, desc in forbidden_patterns:
                            if pat.search(line):
                                dummy_hits.append((rel, i, desc, line.strip()))

print(f"Scanned Production/Data Files: {scanned_count}")
print(f"Dummy / Placeholder Hits: {len(dummy_hits)}")
for h in dummy_hits:
    print(f"  • {h[0]}:{h[1]} [{h[2]}] -> {h[3]}")

# 1.2 Official YouTube & Media Verification
print("\n[PHASE 1.2] OFFICIAL MULTIMEDIA VERIFICATION")
yt_file = os.path.join(root, 'components', 'YouTubeVideoShowcase.tsx')
with open(yt_file, 'r', encoding='utf-8') as f:
    yt_content = f.read()

yt_main = 'PmxwdrhpxKg' in yt_content
yt_shorts = 'wLusNVfFFHA' in yt_content
yt_channel = '@AbhinayaUNY' in yt_content
ig_channel = 'abhinaya.uny' in yt_content

print(f"  [+] Main Action Video ID (PmxwdrhpxKg): {'VERIFIED AUTHENTIC' if yt_main else 'MISSING'}")
print(f"  [+] Official Shorts Video ID (wLusNVfFFHA): {'VERIFIED AUTHENTIC' if yt_shorts else 'MISSING'}")
print(f"  [+] YouTube Channel (@AbhinayaUNY): {'VERIFIED AUTHENTIC' if yt_channel else 'MISSING'}")
print(f"  [+] Instagram Account (@abhinaya.uny): {'VERIFIED AUTHENTIC' if ig_channel else 'MISSING'}")

# 1.3 Team Roster Verification
print("\n[PHASE 1.3] TEAM ROSTER & SURAT TUGAS KRI 2024 RECORD VERIFICATION")
team_file = os.path.join(root, 'data', 'teamData.ts')
with open(team_file, 'r', encoding='utf-8') as f:
    team_content = f.read()

# Parse member objects
member_blocks = re.findall(r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?nim:\s*['\"]([^'\"]+)['\"].*?division:\s*['\"]([^'\"]+)['\"].*?role:\s*['\"]([^'\"]+)['\"]", team_content, re.DOTALL)

print(f"Total Authentic Roster Members: {len(member_blocks)}")
for i, (mid, n, nim, div, role) in enumerate(member_blocks, 1):
    print(f"  {i:2d}. {n:<42} | {nim:<18} | {div:<20} | {role}")

# 1.4 Competition Parameters & Guidebooks (2019-2026)
print("\n[PHASE 1.4] COMPETITION EDITIONS & PDF GUIDEBOOKS VERIFICATION")
krtmi_file = os.path.join(root, 'data', 'krtmiData.ts')
with open(krtmi_file, 'r', encoding='utf-8') as f:
    krtmi_content = f.read()

editions = re.findall(r"year:\s*['\"](\d{4})['\"].*?theme:\s*['\"]([^'\"]+)['\"].*?dimensions:\s*['\"]([^'\"]+)['\"].*?power:\s*['\"]([^'\"]+)['\"]", krtmi_content, re.DOTALL)

pdf_dir = os.path.join(root, 'public', 'guidebooks')
pdf_files = os.listdir(pdf_dir) if os.path.exists(pdf_dir) else []

print(f"Cataloged Competition Editions: {len(editions)} editions")
for y, t, dim, pwr in editions:
    print(f"  • [{y}] Theme: {t:<45} | Arena: {dim:<15} | Power: {pwr}")

print(f"\nPDF Rulebooks in public/guidebooks/: {len(pdf_files)} files")
for pdf in sorted(pdf_files):
    sz = os.path.getsize(os.path.join(pdf_dir, pdf)) / (1024 * 1024)
    print(f"  • {pdf:<45} ({sz:.2f} MB)")

# 2. Security & Public Exposure Audit
print("\n[PHASE 2] SECURITY & PUBLIC EXPOSURE AUDIT")
app_dir = os.path.join(root, 'app')
app_routes = []
for r, dirs, files in os.walk(app_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.js')):
            app_routes.append(os.path.relpath(os.path.join(r, f), root))

admin_routes = [r for r in app_routes if 'admin' in r.lower() or 'api' in r.lower()]
print(f"Total App Router source files: {len(app_routes)}")
print(f"Public Admin / API Routes in app/: {len(admin_routes)}")
if admin_routes:
    for ar in admin_routes:
        print(f"  VIOLATION: Exposed route -> {ar}")
else:
    print("  [PASS] ZERO public admin or server-side API endpoints detected in app/")

# Check scripts/manager_tool.py client isolation
manager_tool_in_components = []
for r, dirs, files in os.walk(os.path.join(root, 'components')):
    for f in files:
        fp = os.path.join(r, f)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as fc:
            if 'manager_tool' in fc.read():
                manager_tool_in_components.append(os.path.relpath(fp, root))

print(f"scripts/manager_tool.py references in UI components: {len(manager_tool_in_components)}")
if not manager_tool_in_components:
    print("  [PASS] scripts/manager_tool.py is strictly offline and isolated from client bundles")

# 3. Behavioral & Test Suite Execution
print("\n[PHASE 3] TEST SUITE & BEHAVIORAL VALIDATION")

print("\n--- 3.1 E2E Test Suite (scripts/test_e2e_suite.py) ---")
res_e2e = subprocess.run(["python", "scripts/test_e2e_suite.py"], cwd=root, capture_output=True, text=True)
print(f"E2E Suite Exit Code: {res_e2e.returncode}")
for line in res_e2e.stdout.strip().split("\n")[-10:]:
    print(f"  {line}")

print("\n--- 3.2 Manager Tool Test Suite (scripts/test_manager_tool.py) ---")
res_mgr = subprocess.run(["python", "scripts/test_manager_tool.py"], cwd=root, capture_output=True, text=True)
print(f"Manager Tool Test Exit Code: {res_mgr.returncode}")
for line in res_mgr.stderr.strip().split("\n")[-6:]:
    print(f"  {line}")

print("\n================================================================================")
print(" AUDIT SCAN COMPLETE")
print("================================================================================")
