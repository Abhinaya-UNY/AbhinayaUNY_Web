import os
import hashlib
from PIL import Image

ig_dir = "public/images/instagram_feed"
files = sorted(os.listdir(ig_dir))

black_images = []
normal_images = []

for f in files:
    if f.endswith((".jpg", ".jpeg", ".png")):
        p = os.path.join(ig_dir, f)
        size = os.path.getsize(p)
        with open(p, "rb") as fp:
            h = hashlib.md5(fp.read()).hexdigest()
        with Image.open(p) as im:
            dims = im.size
            # check if single color
            colors = im.getcolors(maxcolors=2)
            if colors and len(colors) == 1 and colors[0][1] == (0, 0, 0):
                black_images.append((f, size, dims, h))
            else:
                normal_images.append((f, size, dims, h))

print(f"Total Instagram images: {len(files)} (Filtered images: {len(black_images) + len(normal_images)})")
print(f"Normal non-blank images: {len(normal_images)}")
print(f"Blank black placeholder images: {len(black_images)}")
for b in black_images:
    print(f"  - {b[0]} (size={b[1]} B, dims={b[2]})")
