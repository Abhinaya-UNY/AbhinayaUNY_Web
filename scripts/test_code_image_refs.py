import re
import sys
from pathlib import Path
from PIL import Image

# Force UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

root = Path(__file__).resolve().parent.parent
public_dir = root / 'public'

print("=" * 70)
print("COMPREHENSIVE CODE & MARKDOWN IMAGE REFERENCE AUDIT")
print("=" * 70)

# Check all md files in root
for md_file in sorted(root.glob('*.md')):
    content = md_file.read_text(encoding='utf-8', errors='replace')
    refs1 = re.findall(r'(/images/[^\s"\'`\)]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))', content)
    refs2 = re.findall(r'(public/images/[^\s"\'`\)]+\.(?:jpg|jpeg|png|webp|gif|svg|ico))', content)
    all_refs = set(refs1 + refs2)
    
    missing = []
    for r in sorted(all_refs):
        clean = r.lstrip('/')
        if clean.startswith('public/'):
            clean = clean[len('public/'):]
        if not (public_dir / clean).exists():
            missing.append(r)
            
    print(f"\nFile: {md_file.name}")
    print(f"  Total Image References: {len(all_refs)}")
    print(f"  Missing References: {len(missing)}")
    for m in missing:
        print(f"    [MISSING] {m}")

print("\n" + "=" * 70)
print("CODEBASE REFERENCES (app/, components/, data/)")
print("=" * 70)

code_refs = set()
for p in list((root / 'app').rglob('*')) + list((root / 'components').rglob('*')) + list((root / 'data').rglob('*')):
    if p.is_file() and p.suffix in {'.ts', '.tsx', '.js', '.jsx', '.json'}:
        text = p.read_text(encoding='utf-8', errors='replace')
        matches = re.findall(r'["\'`](/(?:images|assets|gallery)/[^\s"\'`]+?\.(?:jpg|jpeg|png|webp|gif|svg|ico))["\'`]', text)
        for m in matches:
            code_refs.add((p.relative_to(root).as_posix(), m))

missing_in_code = []
for src, ref in sorted(code_refs):
    clean = ref.lstrip('/')
    if not (public_dir / clean).exists():
        missing_in_code.append((src, ref))

print(f"Total Unique Code Image References: {len(code_refs)}")
print(f"Missing in Code: {len(missing_in_code)}")
for src, ref in missing_in_code:
    print(f"  [MISSING] {src} -> {ref}")

print("=" * 70)
