#!/usr/bin/env bash
# LUCEN rich menu : HTML -> PNG (2500 x 843, LINE rich menu "large" size)
#
#   ./render.sh            … pattern-a / b / c を書き出す
#
# ヘッドレス Chromium の --window-size にはウィンドウ枠の分が含まれるため、
# 実ビューポートが 843px になるようオフセットを実測してから撮影する。
set -euo pipefail

CHROME=${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}
SRC="$(cd "$(dirname "$0")" && pwd)"
OUT="$(dirname "$SRC")"
W=2500
H=843

probe="$(mktemp -d)/probe.html"
cat > "$probe" <<'EOF'
<!doctype html><meta charset="utf-8"><style>html,body{margin:0;height:843px}</style>
<script>document.title=document.documentElement.clientHeight</script>
EOF
vp=$("$CHROME" --headless --disable-gpu --no-sandbox --window-size=$W,$H \
      --virtual-time-budget=2000 --dump-dom "file://$probe" 2>/dev/null \
      | grep -o '<title>[0-9]*</title>' | tr -dc '0-9')
offset=$(( H - ${vp:-$H} ))
echo "viewport offset: ${offset}px (window-size height = $(( H + offset )))"

for p in a b c; do
  [ -f "$SRC/pattern-$p.html" ] || continue
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=1 \
    --window-size=$W,$(( H + offset )) --virtual-time-budget=5000 \
    --screenshot="$OUT/lucen-richmenu-$p.png" "file://$SRC/pattern-$p.html" 2>/dev/null
  python3 "$SRC/pngcrop.py" "$OUT/lucen-richmenu-$p.png" $W $H > /dev/null
  echo "  pattern-$p.html -> lucen-richmenu-$p.png (${W}x${H})"
done
