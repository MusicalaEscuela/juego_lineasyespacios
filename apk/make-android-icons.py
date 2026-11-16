"""Genera los íconos y la pantalla de inicio del APK a partir de ../icons/.

Uso (desde la carpeta apk/):  python make-android-icons.py
Requiere Pillow (pip install pillow).
"""
import glob
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ICONS = os.path.join(HERE, '..', 'icons')
RES = os.path.join(HERE, 'android', 'app', 'src', 'main', 'res')

full = Image.open(os.path.join(ICONS, 'icon-1024.png')).convert('RGBA')
maskable = Image.open(os.path.join(ICONS, 'icon-maskable-512.png')).convert('RGBA')
rounded = Image.open(os.path.join(ICONS, 'icon-512.png')).convert('RGBA')

DENSITIES = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}


def circle(img):
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).ellipse([0, 0, img.width - 1, img.height - 1], fill=255)
    out = img.copy()
    out.putalpha(mask)
    return out


for name, k in DENSITIES.items():
    folder = os.path.join(RES, f'mipmap-{name}')
    legacy = int(48 * k)
    adaptive = int(108 * k)
    rounded.resize((legacy, legacy), Image.LANCZOS).save(os.path.join(folder, 'ic_launcher.png'))
    circle(full.resize((legacy, legacy), Image.LANCZOS)).save(os.path.join(folder, 'ic_launcher_round.png'))
    maskable.resize((adaptive, adaptive), Image.LANCZOS).save(os.path.join(folder, 'ic_launcher_foreground.png'))

# Pantalla de inicio: fondo del juego con el ícono centrado.
for path in glob.glob(os.path.join(RES, 'drawable*', 'splash.png')):
    w, h = Image.open(path).size
    splash = Image.new('RGBA', (w, h), '#0c0b18')
    side = int(min(w, h) * 0.34)
    icon = rounded.resize((side, side), Image.LANCZOS)
    splash.alpha_composite(icon, ((w - side) // 2, (h - side) // 2))
    splash.convert('RGB').save(path)

print('Íconos y pantalla de inicio generados.')
