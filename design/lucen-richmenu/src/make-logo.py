#!/usr/bin/env python3
"""LUCEN ロゴタイプ（ワードマーク）を SVG として書き出す。

正式なロゴデータ（AI / SVG）が手元にないため、いただいたロゴ画像に合わせて
Bodoni Moda（SIL OFL）から近似のアウトラインを起こしている。
字面の縦横比が画像と一致するよう、字間を逆算して求めている。

    python3 make-logo.py <BodoniModa-var.ttf> ../assets/lucen-logo.svg

正式なロゴが支給されたら、出力先の SVG を差し替えるだけでよい。
"""
import sys

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

WORD = "LUCEN"
RATIO = 4.14          # 字面の 幅 ÷ キャップハイト（支給画像から実測）
CONDENSE = 0.88       # 支給ロゴは Bodoni より字幅が狭いので横に詰める
WGHT, OPSZ = 445, 96  # 横に詰めた分だけ字面が細るのでウェイトで補正

# 支給ロゴの E は、C の輪郭に横棒を渡した丸い形をしている
ROUND_E = True
E_NARROW = 0.93                     # E は C よりわずかに細い
BAR_LEFT, BAR_RIGHT = 0.17, 0.80    # C の字幅に対する横棒の左右
BAR_MID, BAR_WEIGHT = 0.470, 0.068  # キャップハイトに対する横棒の中心高さと太さ


def main(src, dst):
    font = TTFont(src)
    instancer.instantiateVariableFont(font, {"wght": WGHT, "opsz": OPSZ}, inplace=True)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    cap = font["OS/2"].sCapHeight

    names = [cmap[ord("C" if (ch == "E" and ROUND_E) else ch)] for ch in WORD]
    # 字ごとの横の詰め（E だけ少し細くする）
    squeeze = [CONDENSE * (E_NARROW if (ch == "E" and ROUND_E) else 1) for ch in WORD]

    def bounds(name):
        pen = BoundsPen(glyphs)
        glyphs[name].draw(pen)
        return pen.bounds

    # ロゴタイプなので送り幅ではなく「字面どうしの間隔」を一定にして組む。
    # その間隔は、全体の縦横比が支給画像と揃うように逆算する。
    inked = [(bounds(n)[2] - bounds(n)[0]) * q for n, q in zip(names, squeeze)]
    gap = (RATIO * cap - sum(inked)) / (len(names) - 1)

    parts, x = [], -bounds(names[0])[0] * squeeze[0]
    for i, (ch, name) in enumerate(zip(WORD, names)):
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        parts.append(
            f'<path transform="translate({x:.1f},0) scale({squeeze[i]},1)" d="{pen.getCommands()}"/>'
        )

        if ch == "E" and ROUND_E:
            x0, _, x1, _ = (v * squeeze[i] for v in bounds(name))
            w = x1 - x0
            bx, bw = x0 + w * BAR_LEFT, w * (BAR_RIGHT - BAR_LEFT)
            bh = cap * BAR_WEIGHT
            parts.append(
                f'<rect transform="translate({x:.1f},0)" x="{bx:.1f}" '
                f'y="{cap * BAR_MID - bh / 2:.1f}" width="{bw:.1f}" height="{bh:.1f}"/>'
            )

        if i + 1 < len(names):
            # 次の字は「今の字の右端 + 一定の間隔」から字面が始まるように置く
            x += bounds(name)[2] * squeeze[i] + gap - bounds(names[i + 1])[0] * squeeze[i + 1]

    width = sum(inked) + gap * (len(names) - 1)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {width:.0f} {cap:.0f}" '
        f'width="{width / 10:.0f}" height="{cap / 10:.0f}">\n'
        f'  <title>LUCEN</title>\n'
        f'  <g fill="#111111" transform="translate(0,{cap:.0f}) scale(1,-1)">\n    '
        + "\n    ".join(parts)
        + "\n  </g>\n</svg>\n"
    )
    open(dst, "w").write(svg)
    print(f"{dst}  ratio {width / cap:.2f}  gap {gap / cap:.3f}cap")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
