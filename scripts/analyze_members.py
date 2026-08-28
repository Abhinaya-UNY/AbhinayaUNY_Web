import os
from collections import defaultdict
import re

members_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\members"
files = sorted(os.listdir(members_dir))

by_year = defaultdict(list)
studio_files = []
other_files = []

for f in files:
    m = re.match(r"^(\d{4})_([a-z]+)_(.+)_(\d{2})\.(jpg|jpeg|png|webp)$", f)
    if m:
        year, div, name, seq, ext = m.groups()
        by_year[year].append((div, name, seq, ext, f))
    elif re.match(r"^\d{2}_", f):
        studio_files.append(f)
    else:
        other_files.append(f)

print(f"Total files in members/: {len(files)}")
for y in sorted(by_year.keys()):
    print(f"\n--- Era {y} ({len(by_year[y])} files) ---")
    for div, name, seq, ext, fname in sorted(by_year[y]):
        sz = os.path.getsize(os.path.join(members_dir, fname))
        print(f"  [{div}] {name} (#{seq}.{ext}) -> {sz} bytes")

print(f"\n--- Studio Files ({len(studio_files)} files) ---")
for f in studio_files:
    print(f"  {f} ({os.path.getsize(os.path.join(members_dir, f))} bytes)")

print(f"\n--- Other / Advisory / Special Files ({len(other_files)} files) ---")
for f in other_files:
    print(f"  {f} ({os.path.getsize(os.path.join(members_dir, f))} bytes)")
