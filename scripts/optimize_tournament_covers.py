import os
from PIL import Image

tour_dir = r"D:\Data_Lokal\Kuliah\Tri Wahyu (22518241023)\AbhinayaUNY_Web\public\images\tournaments"

# Generate optimized thumbnails (width=600, maintain aspect ratio)
covers = {
    "2019": ("krtmi_2019_cover.png", "krtmi_2019_thumb.jpg"),
    "2020": ("krtmi_2020_cover.png", "krtmi_2020_thumb.jpg"),
    "2021": ("krtmi_2021_cover.png", "krtmi_2021_thumb.jpg"),
    "2022": ("krtmi_2022_cover.png", "krtmi_2022_thumb.jpg"),
    "2023": ("krtmi_2023_cover.png", "krtmi_2023_thumb.jpg"),
    "2024": ("krtmi_2024_full_cover.png", "krtmi_2024_thumb.jpg"),
    "2026": ("technocorner_2026_cover.png", "technocorner_2026_thumb.jpg"),
}

for year, (src_file, out_file) in covers.items():
    src_p = os.path.join(tour_dir, src_file)
    out_p = os.path.join(tour_dir, out_file)
    if os.path.exists(src_p):
        im = Image.open(src_p).convert('RGB')
        target_w = 600
        target_h = int(target_w * im.height / im.width)
        im_resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        im_resized.save(out_p, "JPEG", quality=88, optimize=True)
        print(f"Generated {year} thumbnail: {out_file} ({target_w}x{target_h})")

# Let's also check Technocorner logo:
tc_logo_src = os.path.join(tour_dir, "technocorner_2026_extracted_p0_0.jpeg")
if os.path.exists(tc_logo_src):
    im_tc = Image.open(tc_logo_src)
    im_tc.save(os.path.join(tour_dir, "technocorner_logo.png"), "PNG")
    print("Saved technocorner_logo.png")
