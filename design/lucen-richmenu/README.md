# LUCEN LINE リッチメニュー デザイン

LUCEN（[lucen.shop](https://lucen.shop/) / 金属アレルギー対応ジュエリー）の
LINE 公式アカウント用リッチメニュー。**2500 × 843 px** ちょうどで書き出し済み。

配色は白・黒・グレーのみ。**入稿データは `lucen-richmenu-a2d.png`（A2案・相談アイコン案D）**。

## 本番：A2案

うすいグレーの地に白いカードを3枚。立体アイコン＋「説明 → ボタン名」の二段組み。

中央のAIキャラクターは、**左右対称をあえて崩した**シルエットにしている。
角の丸みを一つずつ変え、輪郭の4点もずらして傾けることで、整い過ぎない
「作られた形」に見せる狙い。口は置かず、目だけで表情をつくっている。

`src/icons.js` の `BODY` にある頂点座標と角の丸みの数値を書き換えれば、
シルエットはいくらでも調整できる。台形版は `BODY_TRAPEZOID`。

### 相談アイコンの形ちがい

4案を並べた比較シート → `lucen-ai-character-variants.png`

| | リッチメニュー | アイコン |
|---|---|---|
| **案D** | **`lucen-richmenu-a2d.png`** | **採用。目を角丸の四角に。スリット状でデジタルに寄る** |
| 案A | `lucen-richmenu-a2.png` | 目は中央のまる |
| 案B | `lucen-richmenu-a2b.png` | 目を下寄りに |
| 案C | `lucen-richmenu-a2c.png` | 台形ぎみに斜めをつけた形 |

### 参考：初回検討分

| | ファイル | 中央のかたち |
|---|---|---|
| A | `lucen-richmenu-a.png` | 四芒星 |
| A3 | `lucen-richmenu-a3.png` | まる |

### 各ボタン

| 位置 | 説明ラベル | ボタン名 | アイコン |
|---|---|---|---|
| 左 | 新作・人気アイテム | ショップを見る | LUCEN ロゴタイプ |
| 中央 | AIと人間がすぐにご返答 | なんでも相談 | AIキャラクター |
| 右 | 注文履歴・会員情報 | マイページ | 会員カード |

文字サイズは説明ラベル 43px / ボタン名 78px。スマホ表示で読みやすいよう、
初稿から 1.3 倍に上げている。

## 初回比較用の他案（参考）

構成そのものを変えた比較用の2案。文言・文字サイズは初稿のままなので、
採用する場合はA案と同じ内容に揃える必要がある。

| | ファイル | 型 |
|---|---|---|
| B | `lucen-richmenu-b.png` | **Panel** — 面を3分割し中央だけ黒ベタに反転。線画アイコン |
| C | `lucen-richmenu-c.png` | **Typographic** — 文字組みと余白だけで見せる |

## ロゴについて

`assets/lucen-logo.svg` は **支給ロゴそのものではなく、近似で起こした暫定版**。
ロゴ画像のファイル自体を受け取れていないため、見た目から寸法を拾って
Bodoni Moda（SIL OFL）で組み直している。

- 字面の縦横比（幅 ÷ キャップハイト = 4.14）を画像から実測して合わせた
- E は支給ロゴに合わせ、C の輪郭に横棒を渡した丸い形で作っている
- 書体そのものは別物なので、セリフの形や太さの細部は一致しない

**正式なロゴデータ（AI / SVG / EPS）が手に入り次第、このファイルを差し替えること。**
`src/make-logo.py` は暫定版を作り直すためのスクリプトで、縦横比・字幅・ウェイト・
横棒の位置はファイル冒頭の定数で調整できる。

## タップ領域（LINE Official Account Manager / Messaging API 共通）

3分割・各セル 843px 高さ。合計が 2500px ちょうどになるよう中央だけ 834px。

| 位置 | ボタン名 | x | y | width | height | 遷移先の想定 |
|---|---|---|---|---|---|---|
| 左 | ショップを見る | 0 | 0 | 833 | 843 | https://lucen.shop/ |
| 中央 | なんでも相談 | 833 | 0 | 834 | 843 | AIチャット起動（postback / メッセージ送信） |
| 右 | マイページ | 1667 | 0 | 833 | 843 | https://lucen.shop/account |

中央はAIキャラクターに自動応答させる想定なので、URL遷移ではなく
postback アクション（例: `action=ai_consult`）でチャットを開始させるのが扱いやすい。

## AIキャラクター

ジュエリーの「輝き」を起点にしたマスコット。1色 + 白い目だけで構成しているので、
小さく縮めても潰れず、LINEのアイコン・スタンプ・サイト内のチャットボタンにも流用できる。

- `assets/lucen-ai-character-square.svg` — **確定形（案D）**／白背景用
- `assets/lucen-ai-character-square-white.svg` — 確定形／黒背景用
- `assets/lucen-ai-character-black.svg` — 四芒星（初回検討分）
- `assets/lucen-ai-character-white.svg` — 四芒星／黒背景用
- `assets/lucen-ai-character-grey.svg` — 四芒星／グレー
- `assets/lucen-ai-character-circle.svg` — まる（初回検討分）

## カラー

| 用途 | 値 |
|---|---|
| 白 | `#ffffff` |
| うすいグレーの地 | `#f2f2f0` |
| 文字（ブランドブラック） | `#111111` |
| 説明ラベルのグレー | `#8a8a86` |
| 立体の押し出し面 | `#d9d9d5` |
| カードの影 | `#e6e6e2` |

## フォント

- 和文: **Zen Kaku Gothic New**（ボタン名 Bold / 説明ラベル Regular）
- 欧文: **Raleway**（B案・C案で使用）
- ロゴ近似: **Bodoni Moda**

いずれも Google Fonts（SIL Open Font License）。商用利用可。

## 書き出し方法

```sh
src/render.sh
```

`src/pattern-*.html` を Chromium ヘッドレスで撮影し、
このディレクトリに `lucen-richmenu-*.png` を 2500×843 で出力する。

| ファイル | 役割 |
|---|---|
| `src/base.css` | 共通の土台（カラー変数・3分割グリッド・フォント） |
| `src/icons.js` | アイコン定義。立体版・線画版・キャラクターの形ちがいを1か所にまとめている |
| `src/pattern-a2*.html` | A2案。`a2` / `a2b` / `a2c` / `a2d` は中央のアイコン指定だけが違う |
| `src/variants.html` | 相談アイコンの比較シート（入稿データではない） |
| `src/pattern-b/c.html` | 初回比較用の他案 |
| `src/make-logo.py` | ロゴ近似版の生成 |
| `src/pngcrop.py` | ヘッドレス特有のウィンドウ枠分の余白を落として 2500×843 ちょうどに揃える |

`CHROME=/path/to/chrome src/render.sh` で Chromium の場所を差し替えられる。

## LINE 側の入稿条件

- 画像形式: JPEG / PNG、ファイルサイズ 1MB 以下 → 本データは 40〜70KB で余裕あり
- 画像サイズ: 2500×843（大サイズ）
- テンプレート: 「大」の 3分割（横1列3マス）を選択
