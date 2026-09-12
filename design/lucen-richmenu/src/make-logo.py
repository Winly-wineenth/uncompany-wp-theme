#!/usr/bin/env python3
"""LUCEN ロゴタイプ（ワードマーク）を SVG として書き出す。

支給された正式なロゴデータが手元にないため、いただいたロゴ画像に合わせて
Bodoni Moda（SIL OFL）から近似のアウトラインを起こしている。
特徴的な丸い E は、C のアウトラインに横棒を足して再現している。

    python3 make-logo.py <BodoniModa-var.ttf> ../assets/lucen-logo.svg

正式なロゴの AI / SVG が支給されたら、出力先の SVG を差し替えるだけでよい。
"""
import sys

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

WORD = "LUCEN"
TRACKING = 0.045      # 字間（em）
WGHT, OPSZ = 400, 96  # opsz を大きくすると Didone らしくヘアラインが細くなる

# 丸い E（C ＋ 横棒）の作り方
BAR_LEFT   = 0.20   # C の字幅に対する棒の左端
BAR_RIGHT  = 0.86   # 　　　〃　　　　　　右端
BAR_MID    = 0.475  # キャップハイトに対する棒の中心高さ
BAR_WEIGHT = 0.075  # 　　　〃　　　　　　太さ


def main(src, dst):
    font = TTFont(src)
    instancer.instantiateVariableFont(font, {"wght": WGHT, "opsz": OPSZ}, inplace=True)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight

    parts, x = [], 0.0
    for ch in WORD:
        name = cmap[ord("C" if ch == "E" else ch)]   # E は C から起こす
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        parts.append(f'<path transform="translate({x:.1f},0)" d="{pen.getCommands()}"/>')

        if ch == "E":
            bounds = BoundsPen(glyphs)
            glyphs[name].draw(bounds)
            x0, _, x1, _ = bounds.bounds
            w = x1 - x0
            bx, bw = x0 + w * BAR_LEFT, w * (BAR_RIGHT - BAR_LEFT)
            bh = cap * BAR_WEIGHT
            by = cap * BAR_MID - bh / 2
            parts.append(
                f'<rect transform="translate({x:.1f},0)" '
                f'x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}"/>'
            )

        x += glyphs[name].width + upm * TRACKING

    width = x - upm * TRACKING
    pad = upm * 0.02
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{-pad:.0f} {-pad:.0f} {width + pad * 2:.0f} {cap + pad * 2:.0f}" '
        f'width="{(width + pad * 2) / 10:.0f}" height="{(cap + pad * 2) / 10:.0f}">\n'
        f'  <title>LUCEN</title>\n'
        f'  <g fill="#111111" transform="translate(0,{cap:.0f}) scale(1,-1)">\n    '
        + "\n    ".join(parts)
        + "\n  </g>\n</svg>\n"
    )
    open(dst, "w").write(svg)
    print(f"{dst}  ({width / upm:.2f}em x {cap / upm:.2f}em)")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
