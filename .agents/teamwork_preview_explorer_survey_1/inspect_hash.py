import json
import os
import hashlib
from PIL import Image

members_dir = "public/images/members"
sample_file = os.path.join(members_dir, "2022_desain_afif_aiman_saputra_01.jpg")
with Image.open(sample_file) as im:
    print(f"Sample 74a1baa8: size={im.size}, mode={im.mode}, format={im.format}")

# Let's also check if this hash matches any file in instagram_feed
ig_dir = "public/images/instagram_feed"
for f in os.listdir(ig_dir):
    if f.endswith((".jpg", ".jpeg", ".png")):
        p = os.path.join(ig_dir, f)
        with open(p, "rb") as fp:
            h = hashlib.md5(fp.read()).hexdigest()
            if h == "74a1baa8518df91f24d49e1e3b2e59e9" or h.startswith("74a1baa8"):
                print(f"Matches IG file: {f}")
