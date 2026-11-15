#!/usr/bin/env python3
"""Capacitor が生成した AndroidManifest.xml にカメラ／マイクの権限と uses-feature を追加する（何度実行しても重複しない）。

  - CAMERA / RECORD_AUDIO / MODIFY_AUDIO_SETTINGS : WebView の getUserMedia（カメラ翻訳）に必要。
    Capacitor の WebChromeClient は、マニフェストに宣言があれば初回に実行時の許可ダイアログを出してくれる。
  - uses-feature camera (required=false) : カメラの無い端末でもインストールできるようにする。
"""
import re
import sys
from pathlib import Path

p = Path(sys.argv[1] if len(sys.argv) > 1 else 'android/app/src/main/AndroidManifest.xml')
s = p.read_text(encoding='utf-8')

lines = []
for perm in ('CAMERA', 'RECORD_AUDIO', 'MODIFY_AUDIO_SETTINGS'):
    if f'android.permission.{perm}' not in s:
        lines.append(f'    <uses-permission android:name="android.permission.{perm}" />')
for feat in ('android.hardware.camera', 'android.hardware.camera.autofocus', 'android.hardware.microphone'):
    if f'"{feat}"' not in s:
        lines.append(f'    <uses-feature android:name="{feat}" android:required="false" />')

if lines:
    m = re.search(r'^[ \t]*<application\b', s, re.M)
    if not m:
        sys.exit('ERROR: <application> が見つかりません: ' + str(p))
    s = s[:m.start()] + '\n'.join(lines) + '\n\n' + s[m.start():]
    p.write_text(s, encoding='utf-8')
print(f'{p}: {len(lines)} 行を追加')
for ln in re.findall(r'<uses-(?:permission|feature)[^>]*>', p.read_text(encoding="utf-8")):
    print('  ', ln)
