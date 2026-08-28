import os
import glob
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

ig_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed"
txts = sorted(glob.glob(os.path.join(ig_dir, "*.txt")))

for t in txts:
    with open(t, "r", encoding="utf-8", errors="ignore") as fp:
        c = fp.read().strip()
        base = os.path.basename(t)
        if "ahmad" in c.lower() or "insan" in c.lower() or "kamil" in c.lower() or "2022-09-24" in base:
            print(f"=== {base} ===")
            print(c)
            # Find associated image files
            prefix = base[:-4]
            imgs = glob.glob(os.path.join(ig_dir, prefix + "*.jpg"))
            for img in imgs:
                print(f"  Img: {os.path.basename(img)} (size={os.path.getsize(img)})")
            print()
