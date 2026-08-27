import json
import os

with open('scripts/full_catalog_with_renaming.json', 'r', encoding='utf-8') as f:
    cat = json.load(f)

missing = []
zero_size = []
valid = []

for item in cat:
    src = item['source_path']
    if not os.path.exists(src):
        missing.append(src)
    else:
        sz = os.path.getsize(src)
        if sz == 0:
            zero_size.append(src)
        else:
            valid.append((src, sz))

print(f"Total catalog entries: {len(cat)}")
print(f"Valid files on disk: {len(valid)}")
print(f"Missing files: {len(missing)}")
if missing:
    print("Missing files sample:", missing[:10])
print(f"Zero size files: {len(zero_size)}")
if zero_size:
    print("Zero size files:", zero_size)
