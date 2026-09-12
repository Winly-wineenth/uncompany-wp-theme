/* LUCEN rich menu : アイコン定義
 *
 * 3案で共通のアイコンをここに集約している。色はすべて CSS 側のクラスで決める。
 *   .ic-extrude … 奥に見える押し出し面（A案の立体表現で使用）
 *   .ic-face    … 手前の面
 *   .ic-detail  … 面の上にのる白抜きのディテール
 *   .ic-line    … 線画（B案・C案で使用。stroke に currentColor）
 *
 * <div data-icon="bag"></div> と置くと、下の loader が SVG を流し込む。
 */
(function () {
  /* ブランドの「輝き」マーク = AIキャラクターの輪郭 */
  var SPARK = 'M0,-118 Q36,-36 118,0 Q36,36 0,118 Q-36,36 -118,0 Q-36,-36 0,-118 Z';
  var svg = function (inner) {
    return '<svg viewBox="0 0 140 140" width="100%" height="100%">' + inner + '</svg>';
  };
  /* 四角・まるの中に入れる顔（中心 68,74 のボディに合わせてある） */
  var FACE =
    '<g class="ic-detail">' +
      '<ellipse cx="48" cy="63" rx="5.6" ry="7.8"/>' +
      '<ellipse cx="82" cy="63" rx="5.6" ry="7.8"/>' +
      '<path d="M56,84 Q65,92 74,84" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round"/>' +
    '</g>';
  var face = function (v) { return '<g transform="translate(64,78) scale(' + v + ')"><path d="' + SPARK + '"/></g>'; };

  var ICONS = {

    /* ---- 立体（A案） ---------------------------------------------- */

    bag: svg(
      '<g class="ic-extrude" transform="translate(9,9)">' +
        '<path d="M54,46 V36 A16,16 0 0 1 86,36 V46" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M32,46 H108 A6,6 0 0 1 114,52.6 L108.6,120 A8,8 0 0 1 100.6,128 H39.4 A8,8 0 0 1 31.4,120 L26,52.6 A6,6 0 0 1 32,46 Z"/>' +
      '</g>' +
      '<g class="ic-face">' +
        '<path d="M54,46 V36 A16,16 0 0 1 86,36 V46" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M32,46 H108 A6,6 0 0 1 114,52.6 L108.6,120 A8,8 0 0 1 100.6,128 H39.4 A8,8 0 0 1 31.4,120 L26,52.6 A6,6 0 0 1 32,46 Z"/>' +
      '</g>' +
      '<g class="ic-detail" transform="translate(70,90) scale(0.2)"><path d="' + SPARK + '"/></g>'
    ),

    char: svg(
      '<g class="ic-extrude" transform="translate(9,9)">' + face(0.46) + '</g>' +
      '<g class="ic-face">' + face(0.46) + '</g>' +
      '<g class="ic-detail" transform="translate(64,78) scale(0.46)">' +
        '<ellipse cx="-30" cy="-8" rx="10.5" ry="15"/>' +
        '<ellipse cx="30"  cy="-8" rx="10.5" ry="15"/>' +
        '<path d="M-17,32 Q0,47 17,32" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="ic-face" transform="translate(104,30) scale(0.115)"><path d="' + SPARK + '"/></g>'
    ),

    member: svg(
      '<g class="ic-extrude" transform="translate(9,9)"><rect x="20" y="38" width="100" height="68" rx="14"/></g>' +
      '<g class="ic-face"><rect x="20" y="38" width="100" height="68" rx="14"/></g>' +
      '<g class="ic-detail">' +
        '<circle cx="50" cy="64" r="9.5"/>' +
        '<path d="M37,88 A13,13 0 0 1 63,88 Z"/>' +
        '<rect x="75" y="58" width="30" height="7" rx="3.5"/>' +
        '<rect x="75" y="74" width="21" height="7" rx="3.5"/>' +
      '</g>'
    ),


    /* ---- キャラクターの形ちがい（A案の中央で比較用） -------------- */

    /* 角丸の四角 */
    charSquare: svg(
      '<g class="ic-extrude" transform="translate(9,9)"><rect x="20" y="24" width="90" height="90" rx="28"/></g>' +
      '<g class="ic-face"><rect x="20" y="24" width="90" height="90" rx="28"/></g>' +
      FACE +
      '<g class="ic-face" transform="translate(106,28) scale(0.115)"><path d="' + SPARK + '"/></g>'
    ),

    /* まる */
    charCircle: svg(
      '<g class="ic-extrude" transform="translate(9,9)"><circle cx="65" cy="69" r="45"/></g>' +
      '<g class="ic-face"><circle cx="65" cy="69" r="45"/></g>' +
      FACE +
      '<g class="ic-face" transform="translate(108,26) scale(0.115)"><path d="' + SPARK + '"/></g>'
    ),

    /* ---- 線画（B案・C案） ------------------------------------------ */

    bagLine: svg(
      '<g class="ic-line" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M30,46 H110 L104,122 A8,8 0 0 1 96,129 H44 A8,8 0 0 1 36,122 Z"/>' +
        '<path d="M54,46 V36 A16,16 0 0 1 86,36 V46"/>' +
      '</g>'
    ),

    memberLine: svg(
      '<g class="ic-line" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="70" cy="55" r="19"/>' +
        '<path d="M32,116 A38,38 0 0 1 108,116"/>' +
      '</g>'
    ),

    /* ベタ1色のキャラクター（B案・C案） */
    charFlat: svg(
      '<g class="ic-face">' + face(0.46) + '</g>' +
      '<g class="ic-detail" transform="translate(64,78) scale(0.46)">' +
        '<ellipse cx="-30" cy="-8" rx="10.5" ry="15"/>' +
        '<ellipse cx="30"  cy="-8" rx="10.5" ry="15"/>' +
        '<path d="M-17,32 Q0,47 17,32" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="ic-face" transform="translate(104,30) scale(0.115)"><path d="' + SPARK + '"/></g>'
    ),

    /* 文字組みに添えるだけの極小マーク（C案） */
    charMark: svg('<g class="ic-face">' + face(0.46) + '</g>')
  };

  function paint() {
    document.querySelectorAll('[data-icon]').forEach(function (el) {
      el.innerHTML = ICONS[el.dataset.icon] || '';
    });
  }
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', paint)
    : paint();
})();
