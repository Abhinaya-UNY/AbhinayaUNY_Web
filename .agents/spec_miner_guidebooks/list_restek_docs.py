import os

restek_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\Restek"

docs = []
for root, dirs, files in os.walk(restek_dir):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in [".pdf", ".docx", ".doc", ".xlsx", ".xls", ".pptx", ".txt"]:
            p = os.path.join(root, f)
            sz = os.path.getsize(p)
            docs.append((p, sz))

print(f"Total documents found in Restek: {len(docs)}")
for p, sz in sorted(docs):
    rel = os.path.relpath(p, restek_dir)
    print(f"[{sz/1024:.1f} KB] {rel}")
