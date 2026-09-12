# LUCEN LINE リッチメニュー デザイン（3パターン）

LUCEN（[lucen.shop](https://lucen.shop/) / 金属アレルギー対応ジュエリー）の
LINE 公式アカウント用リッチメニュー。**2500 × 843 px** ちょうどで書き出し済み。

| | ファイル | コンセプト |
|---|---|---|
| **A** | `lucen-richmenu-a.png` | **Hairline** — 白一色。細い罫線と極細アイコンだけの最小構成。いちばん静かで、商品写真の邪魔をしない |
| **B** | `lucen-richmenu-b.png` | **Deep Green** — 中央の相談パネルだけ深緑ベタ。AI相談への導線をいちばん強く見せたいとき |
| **C** | `lucen-richmenu-c.png` | **Soft Card** — オフホワイト地に白いカードを3枚。押せる場所が直感的に分かり、やわらかい印象 |

3案とも構成・文言・アイコン・余白は共通で、**色と面の処理だけを変えている**ので、
どれを選んでもブランドのトーンは揃う。

## タップ領域（LINE Official Account Manager / Messaging API 共通）

3分割・各セル 843px 高さ。合計が 2500px ちょうどになるよう中央だけ 834px。

| 位置 | ラベル | x | y | width | height | 遷移先の想定 |
|---|---|---|---|---|---|---|
| 左 | LUCEN通販 | 0 | 0 | 833 | 843 | https://lucen.shop/ |
| 中央 | なんでも相談 | 833 | 0 | 834 | 843 | AIチャット起動（postback / メッセージ送信） |
| 右 | マイページ | 1667 | 0 | 833 | 843 | https://lucen.shop/account |

中央はAIキャラクターに自動応答させる想定なので、URL遷移ではなく
postback アクション（例: `action=ai_consult`）でチャットを開始させるのが扱いやすい。

## AIキャラクター

ジュエリーの「輝き」をそのままキャラクターにした、角を丸めた四芒星のマスコット。
1色 + 白い目と口だけで構成しているので、小さく縮めても潰れず、
LINEのアイコン・スタンプ・サイト内のチャットボタンにもそのまま流用できる。

- `assets/lucen-ai-character-green.svg` — 白背景用（基本形）
- `assets/lucen-ai-character-white.svg` — 深緑・黒背景用
- `assets/lucen-ai-character-black.svg` — モノクロ運用時

## カラー

| 用途 | 値 |
|---|---|
| ベース（白） | `#ffffff` |
| ベース（オフホワイト・C案） | `#f5f4f1` |
| 文字（ブランドブラック） | `#141414` |
| 差し色（ディープグリーン） | `#1f3d33` |
| サブコピー（グレー） | `#8e8e88` |
| 罫線 | `#e5e4df` |

## フォント

- 和文: **Zen Kaku Gothic New** Medium（フォールバック: Noto Sans JP）
- 欧文: **Raleway** Regular（字間 0.42em のオールキャップス）

いずれも Google Fonts（SIL Open Font License）。商用利用可。

## 書き出し方法

```sh
src/render.sh
```

`src/pattern-{a,b,c}.html` を Chromium ヘッドレスで撮影し、
このディレクトリに `lucen-richmenu-{a,b,c}.png` を 2500×843 で出力する。

- 文言・アイコン・余白はすべて HTML/CSS 側（`src/base.css` と各パターン）で調整できる
- `CHROME=/path/to/chrome src/render.sh` で Chromium の場所を差し替え可能
- `src/pngcrop.py` はヘッドレス特有のウィンドウ枠分の余白を落として
  出力を 2500×843 ちょうどに揃えるためのもの（依存パッケージなし）

## LINE 側の入稿条件

- 画像形式: JPEG / PNG、ファイルサイズ 1MB 以下 → 本データは約 50KB で余裕あり
- 画像サイズ: 2500×843（大サイズ）
- テンプレート: 「大」の 3分割（横1列3マス）を選択
