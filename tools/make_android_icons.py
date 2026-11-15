#!/usr/bin/env python3
"""assets/icon-only.png から Android のランチャーアイコン一式を生成する。

使い方:  python3 tools/make_android_icons.py <出力する res ディレクトリ>
   例:  python3 tools/make_android_icons.py android/app/src/main/res

背景:
  @capacitor/assets は icon-only.png だけだと、Android 8 以降が使うアダプティブアイコンの前景/背景を
  差し替えず、Capacitor 既定のアイコンが残る。そこで必要なリソースを自前で生成して上書きする。

  - mipmap-*/ic_launcher.png / ic_launcher_round.png : Android 7 以前用（角丸 / 円）
  - mipmap-*/app_icon_fg.png                         : アダプティブアイコンの前景（108dp レイヤー）
  - mipmap-anydpi-v26/ic_launcher(.round).xml        : アダプティブアイコン定義（Capacitor の既定ファイルを上書き）
  - values/app_icon_colors.xml                       : アイコン背景色 / 起動画面の背景色
  元画像の角（白）は自動で検出して背景色で塗りつぶすので、iOS 風の角丸正方形＋白背景の画像でも使える。
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

SRC = Path('assets/icon-only.png')
out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('android/app/src/main/res')

DENS = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
FG_SCALE = 0.074      # 1024px の元画像 → 108dp レイヤー上の dp/px。絵柄(吹き出し)が中央の安全領域(約66dp円)に収まる大きさ

im = Image.open(SRC).convert('RGB')
W, H = im.size
a = np.asarray(im).astype(np.int16)

# 1) 角に繋がった「ほぼ白」領域 = 画像の外側。縁のにじみを消すため少し広げる
white = (a.min(axis=2) >= 235)
lab, _ = ndimage.label(white)
corner_labels = {lab[0, 0], lab[0, W - 1], lab[H - 1, 0], lab[H - 1, W - 1]} - {0}
outside = np.isin(lab, list(corner_labels))
outside = ndimage.binary_dilation(outside, iterations=4)

# 2) 背景色 = 外周の少し内側の色の中央値（縁のグラデーションを平均化）
ring = []
for t in (28, 44):
    ring += [a[t, W // 2], a[H - 1 - t, W // 2], a[H // 2, t], a[H // 2, W - 1 - t]]
bg = tuple(int(v) for v in np.median(np.array(ring), axis=0))
hexbg = '#%02X%02X%02X' % bg

# 3) 外側を背景色で塗りつぶした絵柄（不透明）と、角丸の形そのもの（アルファ）
art = a.copy()
art[outside] = bg
art_im = Image.fromarray(art.astype(np.uint8), 'RGB')
alpha = Image.fromarray(((~outside) * 255).astype(np.uint8), 'L').filter(__import__('PIL.ImageFilter', fromlist=['x']).GaussianBlur(1.2))


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, optimize=True)


for name, d in DENS.items():
    # アダプティブ前景: 108dp の正方形。全面を背景色で埋め、絵柄を中央に配置
    px = round(108 * d)
    layer = Image.new('RGB', (px, px), bg)
    s = round(W * FG_SCALE * d)
    layer.paste(art_im.resize((s, s), Image.LANCZOS), ((px - s) // 2, (px - s) // 2))
    save(layer, out / f'mipmap-{name}' / 'app_icon_fg.png')

    # レガシー: 48dp。角丸（元画像の形）と円
    px = round(48 * d)
    sq = art_im.resize((px, px), Image.LANCZOS).convert('RGBA')
    sq.putalpha(alpha.resize((px, px), Image.LANCZOS))
    save(sq, out / f'mipmap-{name}' / 'ic_launcher.png')
    big = 4
    mask = Image.new('L', (px * big, px * big), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, px * big - 1, px * big - 1), fill=255)
    rd = art_im.resize((px, px), Image.LANCZOS).convert('RGBA')
    rd.putalpha(mask.resize((px, px), Image.LANCZOS))
    save(rd, out / f'mipmap-{name}' / 'ic_launcher_round.png')

xml_adaptive = '''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/app_icon_bg"/>
    <foreground android:drawable="@mipmap/app_icon_fg"/>
</adaptive-icon>
'''
for n in ('ic_launcher.xml', 'ic_launcher_round.xml'):
    p = out / 'mipmap-anydpi-v26' / n
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(xml_adaptive, encoding='utf-8')

(out / 'values').mkdir(parents=True, exist_ok=True)
(out / 'values' / 'app_icon_colors.xml').write_text(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
    f'    <color name="app_icon_bg">{hexbg}</color>\n'
    f'    <color name="app_splash_bg">{hexbg}</color>\n</resources>\n', encoding='utf-8')
print('icon bg color', hexbg, '->', out)
