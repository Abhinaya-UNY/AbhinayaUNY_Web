import os
import hashlib

ig_dir = "public/images/instagram_feed"
for f in sorted(os.listdir(ig_dir)):
    if "Cw6ZCItPRJ-" in f or "Ci5OdP-L4vD" in f:
        p = os.path.join(ig_dir, f)
        if f.endswith(".jpg"):
            with open(p, "rb") as fp:
                h = hashlib.md5(fp.read()).hexdigest()
            print(f"{f}: size={os.path.getsize(p)}, hash={h[:8]}")
