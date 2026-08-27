import os
import glob
import json

feed_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\instagram_feed"
txt_files = sorted(glob.glob(os.path.join(feed_dir, "*.txt")))

results = []

for txt_path in txt_files:
    fname = os.path.basename(txt_path)
    base_stem = txt_path[:-4]
    
    with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
        caption = f.read().strip()
        
    imgs = sorted(glob.glob(base_stem + "*.jpg"))
    img_rel_paths = ["/images/instagram_feed/" + os.path.basename(p) for p in imgs]
    
    post_info = {
        "txt_file": fname,
        "base_stem": os.path.basename(base_stem),
        "caption": caption,
        "images": img_rel_paths,
        "image_count": len(img_rel_paths)
    }
    results.append(post_info)

out_file = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\scripts\instagram_analysis.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Successfully analyzed {len(results)} posts and wrote to instagram_analysis.json")
for i, p in enumerate(results):
    short_cap = p['caption'].split('\n')[0] if p['caption'] else '(No caption)'
    print(f"[{i+1}] {p['base_stem']} | {p['image_count']} imgs | {short_cap[:80]}")
