#!/usr/bin/env python3
"""assets/icon-only.png を iOS 用（不透明・角なし・1024×1024）のアプリアイコンに変換する。

使い方:  python3 tools/make_ios_icon.py <入力png> <出力png>

背景:
  App Store / ホーム画面用のアイコンは透明部分を持てず、角も OS が丸めます。
  元画像は角が白い角丸正方形なので、そのままだと白い角が残ります。
  角に繋がった白い領域（画像の外側）を検出し、絵柄の背景色で塗りつぶします。
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
W, H = im.size
a = np.asarray(im).astype(np.int16)

# 角に繋がった「ほぼ白」の領域 = 画像の外側
white = (a.min(axis=2) >= 235)
lab, _ = ndimage.label(white)
corners = {lab[0, 0], lab[0, W - 1], lab[H - 1, 0], lab[H - 1, W - 1]} - {0}
outside = ndimage.binary_dilation(np.isin(lab, list(corners)), iterations=4)

# 背景色 = 外周の少し内側の色の中央値
ring = []
for t in (28, 44):
    ring += [a[t, W // 2], a[H - 1 - t, W // 2], a[H // 2, t], a[H // 2, W - 1 - t]]
bg = np.median(np.array(ring), axis=0).astype(np.uint8)

out = a.astype(np.uint8).copy()
out[outside] = bg
res = Image.fromarray(out, 'RGB')
if res.size != (1024, 1024):
    res = res.resize((1024, 1024), Image.LANCZOS)
res.save(dst)   # RGB（アルファ無し）で保存する
print('iOS icon', res.size, res.mode, 'bg #%02X%02X%02X' % tuple(bg), '->', dst)
