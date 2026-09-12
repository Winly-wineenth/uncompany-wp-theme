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
  /* 顔。口は置かず、目だけで表情をつくる。
       cy … 目の高さ / square … 角丸の四角い目にする / dx … 左右のずらし */
  var eyes = function (cy, square, dx) {
    dx = dx || 0;
    return '<g class="ic-detail">' + (square
      ? '<rect x="' + (39.5 + dx) + '" y="' + (cy - 11) + '" width="15" height="22" rx="5"/>' +
        '<rect x="' + (75.5 + dx) + '" y="' + (cy - 11) + '" width="15" height="22" rx="5"/>'
      : '<ellipse cx="' + (47 + dx) + '" cy="' + cy + '" rx="7.6" ry="10.6"/>' +
        '<ellipse cx="' + (83 + dx) + '" cy="' + cy + '" rx="7.6" ry="10.6"/>'
    ) + '</g>';
  };
  var FACE = eyes(64);
  var face = function (v) { return '<g transform="translate(64,78) scale(' + v + ')"><path d="' + SPARK + '"/></g>'; };


  /* 頂点ごとに丸みの大きさを変えられる多角形。
     すべての角を同じ半径で丸めると整い過ぎるので、
     アイコンのシルエットはこれで少し歪ませている。 */
  function roundedPoly(pts, radii) {
    var n = pts.length, d = [];
    for (var i = 0; i < n; i++) {
      var cur = pts[i], prev = pts[(i + n - 1) % n], next = pts[(i + 1) % n];
      var v1 = [prev[0] - cur[0], prev[1] - cur[1]];
      var v2 = [next[0] - cur[0], next[1] - cur[1]];
      var l1 = Math.hypot(v1[0], v1[1]), l2 = Math.hypot(v2[0], v2[1]);
      var r = Math.min(radii[i], l1 / 2, l2 / 2);
      var a = [cur[0] + v1[0] / l1 * r, cur[1] + v1[1] / l1 * r];
      var b = [cur[0] + v2[0] / l2 * r, cur[1] + v2[1] / l2 * r];
      d.push((i ? 'L' : 'M') + a[0].toFixed(1) + ',' + a[1].toFixed(1) +
             'Q' + cur[0] + ',' + cur[1] + ' ' + b[0].toFixed(1) + ',' + b[1].toFixed(1));
    }
    return d.join('') + 'Z';
  }

  /* AIキャラクターのボディ（左右非対称／角の丸みもばらばら） */
  var BODY = roundedPoly(
    [[16, 30], [102, 18], [114, 106], [28, 118]],
    [44, 5, 28, 20]
  );

  /* 台形ぎみに斜めをつけたボディ */
  var BODY_TRAPEZOID = roundedPoly(
    [[36, 18], [102, 27], [116, 110], [20, 113]],
    [20, 13, 26, 22]
  );

  var spark = function (x, y, k) {
    return '<g class="ic-face" transform="translate(' + x + ',' + y + ') scale(' + k + ')">' +
             '<path d="' + SPARK + '"/></g>';
  };
  var solid = function (d) {
    return '<g class="ic-extrude" transform="translate(9,9)"><path d="' + d + '"/></g>' +
           '<g class="ic-face"><path d="' + d + '"/></g>';
  };

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
        '<ellipse cx="-30" cy="2" rx="11.5" ry="16.5"/>' +
        '<ellipse cx="30"  cy="2" rx="11.5" ry="16.5"/>' +
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


    /* ---- 相談アイコン（中央）の形ちがい ---------------------------- */

    /* 左右非対称に歪ませた角丸のボディ（現行案） */
    charSquare: svg(solid(BODY) + eyes(64) + spark(119, 24, 0.1)),

    /* 案B：目を下寄りに置いて、上に余白をとった形 */
    charLowEyes: svg(solid(BODY) + eyes(84) + spark(119, 24, 0.1)),

    /* 案C：台形ぎみに斜めをつけた形 */
    charTrapezoid: svg(solid(BODY_TRAPEZOID) + eyes(72, false, 3) + spark(121, 22, 0.1)),

    /* 案D：目を角丸の四角にしてデジタルに寄せた形 */
    charSquareEyes: svg(solid(BODY) + eyes(66, true) + spark(119, 24, 0.1)),

    /* まる（初回検討分） */
    charCircle: svg(
      '<g class="ic-extrude" transform="translate(9,9)"><circle cx="64" cy="68" r="45"/></g>' +
      '<g class="ic-face"><circle cx="64" cy="68" r="45"/></g>' +
      FACE +
      spark(116, 26, 0.105)
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
