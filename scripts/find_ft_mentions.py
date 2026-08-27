import os

root_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web"
target_dirs = ["app", "components", "data"]

for td in target_dirs:
    full_d = os.path.join(root_dir, td)
    for root, _, files in os.walk(full_d):
        for f in files:
            if f.endswith(('.ts', '.tsx', '.json', '.md')):
                p = os.path.join(root, f)
                with open(p, "r", encoding="utf-8") as file:
                    lines = file.readlines()
                    for idx, line in enumerate(lines, 1):
                        lower = line.lower()
                        if "ft uny" in lower or "fakultas teknik" in lower:
                            # skip organizer UGM / ITS
                            rel = os.path.relpath(p, root_dir)
                            print(f"{rel}:{idx} -> {line.strip()}")
