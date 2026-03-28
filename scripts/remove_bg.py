"""
Background remover for Friday's bottle images.
Removes the white/grey background and saves clean PNGs.

Usage:
  pip install Pillow
  python scripts/remove_bg.py

Place aelia.jpg, azura.jpg, kayaan.jpg in public/images/ first.
This will create aelia.png, azura.png, kayaan.png in the same folder.
"""

from PIL import Image
import os

IMAGES_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')

def remove_white_bg(path_in, path_out, threshold=230, feather=8):
    img = Image.open(path_in).convert('RGBA')
    data = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = data[x, y]
            # If the pixel is close to white/grey background, make it transparent
            if r >= threshold and g >= threshold and b >= threshold:
                # Soft edge: scale alpha based on how close to pure white
                brightness = (r + g + b) / 3
                alpha = max(0, int(255 * (1 - (brightness - threshold) / (255 - threshold))))
                data[x, y] = (r, g, b, min(a, alpha))

    img.save(path_out, 'PNG')
    print(f'Saved: {path_out}')

names = ['aelia', 'azura', 'kayaan', 'dreams', 'loruun', 'liara']

for name in names:
    jpg = os.path.join(IMAGES_DIR, f'{name}.jpg')
    png = os.path.join(IMAGES_DIR, f'{name}.png')
    if os.path.exists(jpg):
        remove_white_bg(jpg, png)
    else:
        print(f'Not found (skipping): {jpg}')
