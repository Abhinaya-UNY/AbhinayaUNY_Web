import json
import os
import hashlib
import sys

sys.stdout.reconfigure(encoding="utf-8")

members_dir = "public/images/members"
files = sorted(os.listdir(members_dir))

def get_hash(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

file_data = []
hashes = {}
for f in files:
    p = os.path.join(members_dir, f)
    size = os.path.getsize(p)
    h = get_hash(p)
    hashes.setdefault(h, []).append(f)
    file_data.append({"filename": f, "size": size, "hash": h})

print(f"Total files in members: {len(file_data)}")
print(f"Unique file contents (by MD5): {len(hashes)}")

duplicates = {k: v for k, v in hashes.items() if len(v) > 1}
print(f"Duplicate content groups: {len(duplicates)}")
for h, flist in duplicates.items():
    print(f"\nHash {h[:8]}: {len(flist)} files:")
    for fn in flist:
        print(f"  - {fn}")
