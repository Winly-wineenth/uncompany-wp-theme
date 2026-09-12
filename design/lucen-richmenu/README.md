# LUCEN LINE リッチメニュー デザイン（3パターン）

LUCEN（[lucen.shop](https://lucen.shop/) / 金属アレルギー対応ジュエリー）の
LINE 公式アカウント用リッチメニュー。**2500 × 843 px** ちょうどで書き出し済み。

配色は**白・黒・グレーのみ**。3案は色違いではなく、**構成そのものを変えている**ので
並べて比較しやすい。

| | ファイル | 型 | どんなとき向きか |
|---|---|---|---|
| **A** | `lucen-richmenu-a.png` | **Card** — うすいグレー地に白いカード3枚。立体アイコン＋「説明 → ボタン名」の二段組み | 押せる場所がいちばん分かりやすい。情報量も持たせられる万能型 |
| **B** | `lucen-richmenu-b.png` | **Panel** — カードを使わず面を3分割し、中央だけ黒ベタに反転。線画アイコン | コントラストがいちばん強い。AI相談を主役に立たせたいとき |
| **C** | `lucen-richmenu-c.png` | **Typographic** — アイコンは極小のマークに留め、文字組みと余白だけで見せる | いちばん静かで上質。ジュエリーブランドらしさを優先するとき |

## タップ領域（LINE Official Account Manager / Messaging API 共通）

3分割・各セル 843px 高さ。合計が 2500px ちょうどになるよう中央だけ 834px。

| 位置 | ボタン名 | x | y | width | height | 遷移先の想定 |
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

- `assets/lucen-ai-character-black.svg` — 白背景用（基本形）
- `assets/lucen-ai-character-white.svg` — 黒背景用（B案の中央パネルなど）
- `assets/lucen-ai-character-grey.svg` — 補助的に使うとき

## カラー

| 用途 | 値 |
|---|---|
| 白 | `#ffffff` |
| うすいグレーの地（A案） | `#f2f2f0` |
| 文字（ブランドブラック） | `#111111` |
| 説明ラベルのグレー | `#8a8a86` |
| 立体の押し出し面 | `#d9d9d5` |
| 罫線 | `#e2e2de` |

## フォント

- 和文: **Zen Kaku Gothic New**（A案 Bold / B案 Medium / C案 Light）
- 欧文: **Raleway** Regular（字間を広くとったオールキャップス）

いずれも Google Fonts（SIL Open Font License）。商用利用可。

## 書き出し方法

```sh
src/render.sh
```

`src/pattern-{a,b,c}.html` を Chromium ヘッドレスで撮影し、
このディレクトリに `lucen-richmenu-{a,b,c}.png` を 2500×843 で出力する。

| ファイル | 役割 |
|---|---|
| `src/base.css` | 3案共通の土台（カラー変数・3分割グリッド・フォント） |
| `src/icons.js` | アイコン定義。立体版と線画版を1か所にまとめている |
| `src/pattern-a/b/c.html` | 各案のレイアウトと配色 |
| `src/pngcrop.py` | ヘッドレス特有のウィンドウ枠分の余白を落として 2500×843 ちょうどに揃える（依存パッケージなし） |

`CHROME=/path/to/chrome src/render.sh` で Chromium の場所を差し替えられる。

## LINE 側の入稿条件

- 画像形式: JPEG / PNG、ファイルサイズ 1MB 以下 → 本データは約 30〜60KB で余裕あり
- 画像サイズ: 2500×843（大サイズ）
- テンプレート: 「大」の 3分割（横1列3マス）を選択
