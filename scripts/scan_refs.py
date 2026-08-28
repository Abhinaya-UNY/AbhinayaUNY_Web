import os
import re

code_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
image_refs = set()
exts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css']

for root, dirs, files in os.walk(code_dir):
    if any(ignore in root for ignore in ['.git', 'node_modules', '.next', '.agents']):
        continue
    for f in files:
        if any(f.endswith(ext) for ext in exts):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    matches = re.findall(r'[\'"](/images/[a-zA-Z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg))[\'"]', content)
                    for m in matches:
                        image_refs.add((m, p))
                    matches2 = re.findall(r'[\'"](/assets/[a-zA-Z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg))[\'"]', content)
                    for m in matches2:
                        image_refs.add((m, p))
                    matches3 = re.findall(r'[\'"](/gallery/[a-zA-Z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg))[\'"]', content)
                    for m in matches3:
                        image_refs.add((m, p))
            except Exception as e:
                pass

print(f"Total unique referenced images in codebase: {len(image_refs)}")
missing = []
for m, source_file in sorted(image_refs):
    rel = m.lstrip('/')
    disk_path = os.path.join(code_dir, 'public', rel.replace('/', os.sep))
    if not os.path.exists(disk_path):
        missing.append((m, source_file))

print(f"Total missing referenced images: {len(missing)}")
for m, sf in missing:
    print(f"  MISSING: {m} (referenced in {os.path.relpath(sf, code_dir)})")
