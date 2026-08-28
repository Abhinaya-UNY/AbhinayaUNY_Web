import os
import json
from PIL import Image

t_dir = "public/images/tournaments"
files = sorted(os.listdir(t_dir))

for f in files:
    p = os.path.join(t_dir, f)
    with Image.open(p) as im:
        dims = im.size
        mode = im.mode
        fmt = im.format
    size = os.path.getsize(p)
    print(f"{f:50} | {dims[0]}x{dims[1]} | {fmt:4} | {size:8} B")
