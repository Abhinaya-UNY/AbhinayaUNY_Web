from PIL import Image
import os

p = "public/images/instagram_feed/2023-09-08_01-27-05_UTC_Cw6ZCItPRJ-_3.jpg"
with Image.open(p) as im:
    print(f"Format={im.format}, size={im.size}, mode={im.mode}")
    # inspect colors / pixels
    colors = im.getcolors(maxcolors=256)
    print(f"Colors count: {len(colors) if colors else 'many'}")
    if colors:
        print(f"Colors: {colors[:10]}")
