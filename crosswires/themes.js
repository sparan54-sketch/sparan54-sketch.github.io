// One city per level. The words stay random; the city sets the colours, the lettering, the pattern in the black
// squares and a skyline drawn from simple shapes. Every colour pair here is checked for contrast by test/themes.test.mjs.
// Skylines use a 400 x 96 box with the ground at y = 96.

const G = 96;
const R = (x, w, h) => `M${x} ${G}V${G - h}H${x + w}V${G}Z`;
const T = (x1, x2, top, cx, yb = G) => `M${x1} ${yb}L${cx} ${top}L${x2} ${yb}Z`;
const D = (cx, y, r) => `M${cx - r} ${y}A${r} ${r} 0 0 1 ${cx + r} ${y}Z`;
const S = (cx, top, base, w = 1.4) => `M${cx - w / 2} ${base}V${top}H${cx + w / 2}V${base}Z`;
// many buildings from [x, w, h] triples
const row = (list) => list.map(([x, w, h]) => R(x, w, h)).join('');
// a hill or mountain line in the back
const hill = (pts) => 'M0 ' + G + pts.map(([x, y]) => 'L' + x + ' ' + y).join('') + 'L400 ' + G + 'Z';
// small lit windows, placed the same way every time
function lit(list, seed, every = 3) {
  let a = seed, out = '';
  const rnd = () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff; };
  list.forEach(([x, w, h]) => {
    for (let y = G - h + 4; y < G - 4; y += 5) for (let k = x + 2; k < x + w - 2; k += 4) if (rnd() < 1 / every) out += `<rect x="${k}" y="${y}" width="1.6" height="2.2"/>`;
  });
  return out;
}
const stars = (seed, n) => { let a = seed, o = ''; const r = () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; for (let i = 0; i < n; i++) o += `<circle cx="${(r() * 400).toFixed(1)}" cy="${(r() * 50).toFixed(1)}" r="${(0.4 + r() * 0.7).toFixed(2)}"/>`; return o; };

// SVG tile for the black squares
// colours in the pattern bodies are written as %23RRGGBB; turn them back into # before encoding the whole SVG once
const tile = (w, h, bg, body) => `${bg} url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body.replace(/%23/g, '#')}</svg>`)}") 0 0/${w}px ${h}px`;

export const THEMES = [
  { // 1
    city: 'New York', font: 'Bebas Neue', scale: 1.15,
    c: { paper: '#ECE8DE', panel: '#FAF8F2', ink: '#141414', pencil: '#55504A', stamp: '#C2341C', onstamp: '#FFFFFF', wire: '#1B5A8A', rule: '#B9B2A2', locked: '#FFFDF4', sky: '#2A2A2A', sun: '#E9B824' },
    block: tile(16, 12, '#3A3D3B', "<g fill='none' stroke='%23707571' stroke-width='1.2'><path d='M0 .6H16M0 6.6H16M8 0V6M0 6V12M16 6V12'/></g>"),
    sky: () => ({
      back: '',
      d: row([[0, 22, 40], [24, 16, 58], [42, 20, 46], [64, 14, 66], [80, 26, 52], [108, 12, 38], [122, 20, 62], [176, 22, 48], [200, 14, 70], [216, 24, 44], [242, 18, 56], [262, 30, 40], [296, 16, 64], [314, 22, 50], [338, 14, 72], [354, 24, 46], [380, 20, 58]]) +
        // tall setback tower with a mast
        R(146, 26, 60) + R(150, 18, 70) + R(153, 12, 78) + R(156, 6, 84) + S(159, 2, 12, 1.6) +
        // stepped crown with a spire
        R(202, 10, 76) + T(200, 214, 66, 207, 76) + S(207, 52, 66, 1.2) +
        // water towers
        R(30, 6, 62) + T(29, 37, 31, 33, 34) + R(386, 6, 62) + T(385, 393, 31, 389, 34),
      win: lit([[0, 22, 40], [64, 14, 66], [122, 20, 62], [296, 16, 64], [338, 14, 72]], 7, 4)
    })
  },
  { // 2
    city: 'Paris', font: 'Playfair Display', scale: 1,
    c: { paper: '#E4E7EB', panel: '#F6F6F3', ink: '#1C2333', pencil: '#4C5465', stamp: '#8C1D30', onstamp: '#FFFFFF', wire: '#285C70', rule: '#A7AFBB', locked: '#FFFDF7', sky: '#3A4558', sun: '#E0A060' },
    block: tile(10, 10, '#B5BCC7', "<path d='M0 0V10' stroke='%23939BA8' stroke-width='2'/>"),
    sky: () => ({
      back: '',
      // mansard blocks: wall plus a sloped roof
      d: [[0, 60], [62, 70], [150, 54], [262, 64], [330, 70]].map(([x, w]) => `M${x} ${G}V62H${x + 4}L${x + 8} 52H${x + w - 8}L${x + w - 4} 62H${x + w}V${G}Z`).join('') +
        [12, 22, 34, 46, 74, 86, 98, 112, 124, 274, 290, 306, 342, 356, 372, 388].map((x) => R(x, 3, 47)).join('') +
        // the tower
        'M184 96L194 70L192 70V67L198 50H196V48L200 26L201 6L202 26L206 48H204V50L210 67V70H208L218 96H210Q201 80 192 96Z' +
        // domes on a hill
        R(240, 26, 30) + D(253, 66, 11) + S(253, 46, 56) + D(244, 70, 4) + D(262, 70, 4)
    })
  },
  { // 3
    city: 'London', font: 'Libre Baskerville', scale: 0.9,
    c: { paper: '#E3E0D9', panel: '#F3F1EC', ink: '#1A1C1F', pencil: '#50535A', stamp: '#B01A1F', onstamp: '#FFFFFF', wire: '#1E4C78', rule: '#A8A398', locked: '#FFFDF7', sky: '#353840', sun: '#CFC8B8' },
    block: tile(16, 10, '#9C5A45', "<g stroke='%23D8CDBF' stroke-width='1.2'><path d='M0 .6H16M0 5.6H16M4 0V5M12 5V10'/></g>"),
    sky: () => ({
      back: '',
      d: row([[0, 30, 34], [32, 20, 44], [54, 24, 30], [160, 30, 38], [192, 18, 48], [212, 26, 30], [330, 22, 40], [354, 20, 30], [376, 24, 46]]) +
        // clock tower
        R(110, 12, 60) + R(108, 16, 70) + R(110, 12, 76) + T(110, 122, 4, 116, 20) +
        // long hall
        R(124, 34, 34) + [128, 136, 144, 152].map((x) => T(x - 2, x + 2, 52, x, 62)).join('') +
        // shard
        T(250, 280, 2, 268) +
        // wheel
        `M296 96L310 60L324 96H320L310 66L300 96Z`,
      extra: `<circle cx="310" cy="56" r="24" fill="none" stroke="var(--sky)" stroke-width="1.6"/><g stroke="var(--sky)" stroke-width=".6">${[0, 30, 60, 90, 120, 150].map((a) => { const r = a * Math.PI / 180; return `<line x1="${(310 - 24 * Math.cos(r)).toFixed(1)}" y1="${(56 - 24 * Math.sin(r)).toFixed(1)}" x2="${(310 + 24 * Math.cos(r)).toFixed(1)}" y2="${(56 + 24 * Math.sin(r)).toFixed(1)}"/>`; }).join('')}</g><circle cx="116" cy="30" r="3.4" fill="var(--sun)"/>`
    })
  },
  { // 4
    city: 'Tokyo', font: 'Zen Dots', scale: 0.85, night: true,
    c: { paper: '#13152B', panel: '#1D2040', ink: '#F3F1FF', pencil: '#B3B2D2', stamp: '#FF4A86', onstamp: '#13152B', wire: '#43D6E2', rule: '#3B3F6B', locked: '#272B52', sky: '#2C3164', sun: '#FFE7A3' },
    block: tile(12, 12, '#6A1F4C', "<path d='M0 .5H12M.5 0V12' stroke='%23FF4A86' stroke-width='1.2'/>"),
    sky: () => {
      const b = [[0, 20, 40], [22, 16, 56], [40, 22, 46], [64, 14, 62], [80, 24, 50], [150, 22, 58], [174, 18, 44], [194, 26, 64], [222, 16, 48], [292, 20, 54], [314, 24, 40], [340, 18, 60], [360, 20, 46], [382, 18, 56]];
      return {
        back: '', starsN: 40,
        d: row(b) + /* sky tower */ S(258, 0, 96, 3) + R(252, 8, 34) + R(255, 6, 44) + 'M250 96L254 46H262L266 96Z',
        acc: /* lattice tower */ 'M108 96L118 64H116V60L122 30H120V28L124 8L125 1L126 8L130 28H128V30L134 60V64H132L142 96H134Q125 80 116 96Z',
        win: lit(b, 13, 3)
      };
    }
  },
  { // 5
    city: 'Venice', font: 'Cormorant Garamond', scale: 1.05,
    c: { paper: '#ECE4D1', panel: '#F8F2E4', ink: '#1E2928', pencil: '#4D5853', stamp: '#9E3F27', onstamp: '#FFFFFF', wire: '#1C6965', rule: '#B6AC93', locked: '#FFFCF3', sky: '#594A3F', sun: '#E6AE5E' },
    block: tile(16, 8, '#8FBDB6', "<path d='M0 5Q4 1 8 5T16 5' fill='none' stroke='%23ECE4D1' stroke-width='1.3'/>"),
    sky: () => ({
      back: '',
      d: row([[0, 40, 40], [42, 22, 34], [66, 30, 44], [270, 26, 38], [298, 34, 46], [334, 30, 36], [366, 34, 42]]) +
        // bell tower
        R(120, 12, 66) + R(118, 16, 72) + T(118, 134, 6, 126, 24) + S(126, 1, 8, 1) +
        // basilica with five domes
        R(150, 90, 34) + D(195, 62, 14) + D(168, 66, 9) + D(222, 66, 9) + D(180, 64, 6) + D(210, 64, 6) + S(195, 40, 48, 1.2) + S(168, 50, 57, 1) + S(222, 50, 57, 1),
      // water and a gondola
      extra: `<rect x="0" y="88" width="400" height="8" fill="var(--wire)" opacity=".35"/><path d="M60 88Q90 94 128 84Q96 90 60 88Z" fill="var(--sky)"/>`
    })
  },
  { // 6
    city: 'Cairo', font: 'Marcellus', scale: 1,
    c: { paper: '#EEDFBF', panel: '#F9F0DC', ink: '#2A1F14', pencil: '#5E4E3B', stamp: '#1F4E8C', onstamp: '#FFFFFF', wire: '#7A3B1C', rule: '#C9B48A', locked: '#FFF9EA', sky: '#6B5236', sun: '#E07A2E' },
    block: tile(20, 10, '#D2B783', "<g stroke='%23B89B66' stroke-width='1'><path d='M0 .5H20M0 5.5H20M6 0V5M16 5V10'/></g>"),
    sky: () => ({
      back: '',
      sunR: 16, sunX: 120,
      d: T(20, 150, 30, 85) + T(130, 230, 46, 180) + T(220, 270, 64, 245) +
        row([[280, 30, 26], [312, 22, 34], [336, 30, 24], [368, 32, 30]]) + D(325, 62, 9) + S(325, 46, 54, 1) +
        R(300, 4, 60) + T(299, 305, 28, 302, 36) + R(360, 4, 66) + T(359, 365, 22, 362, 30)
    })
  },
  { // 7
    city: 'Barcelona', font: 'Fredoka', scale: 1,
    c: { paper: '#F4EAD8', panel: '#FBF5EA', ink: '#1E1C2A', pencil: '#514B5C', stamp: '#B5332A', onstamp: '#FFFFFF', wire: '#1D5F8A', rule: '#D6C3A3', locked: '#FFFCF4', sky: '#6A4A3A', sun: '#F2B33D' },
    block: tile(16, 16, '#2E6E9E', "<g stroke='%232E6E9E' stroke-width='.8'><path d='M0 0H7L5 6L0 5Z' fill='%23F2B33D'/><path d='M8 0H16V5L9 7Z' fill='%23E9E2D0'/><path d='M0 6L6 7L7 16H0Z' fill='%234E9A6B'/><path d='M8 9L16 6V16H9Z' fill='%23B5332A'/></g>"),
    sky: () => {
      // basilica spires: tall, tapered, rounded tips
      const spire = (x, w, h) => `M${x} 96V${96 - h + w}Q${x} ${96 - h} ${x + w / 2} ${96 - h - 2}Q${x + w} ${96 - h} ${x + w} ${96 - h + w}V96Z`;
      return {
        bg: ['#BFDDEE', '#F7EDDC'], sunX: 60, sunY: 22,
        layers: [[soft([60, 52, 58, 70, 74, 76, 78]), '#A8B48A', 1]],
        d: spire(170, 8, 74) + spire(180, 9, 84) + spire(191, 9, 88) + spire(202, 8, 80) + spire(212, 7, 70) + spire(158, 7, 60) + spire(222, 7, 58) + R(150, 84, 34) + S(196, 2, 10, 1.2) +
          /* bullet tower */ 'M300 96V44Q300 20 312 18Q324 20 324 44V96Z' +
          row([[0, 22, 26], [24, 18, 32], [44, 26, 22], [72, 20, 30], [94, 22, 24], [118, 26, 30], [240, 22, 28], [264, 20, 22], [330, 24, 30], [356, 20, 24], [378, 22, 28]]),
        extra: '<rect x="0" y="90" width="400" height="6" fill="var(--wire)" opacity=".4"/><g fill="var(--sun)" opacity=".8">' + [[183, 30], [194, 26], [205, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('') + '</g>'
      };
    }
  },
  { // 8
    city: 'Istanbul', font: 'Amiri', scale: 1.05,
    c: { paper: '#E3ECEE', panel: '#F5F9F9', ink: '#14262D', pencil: '#47585F', stamp: '#A3202B', onstamp: '#FFFFFF', wire: '#106B7B', rule: '#9FB8BE', locked: '#FFFDF7', sky: '#2D4650', sun: '#E8B04B' },
    block: tile(14, 14, '#2B7A8C', "<g fill='%23E3ECEE'><circle cx='7' cy='3' r='2'/><circle cx='7' cy='11' r='2'/><circle cx='3' cy='7' r='2'/><circle cx='11' cy='7' r='2'/></g><circle cx='7' cy='7' r='1.4' fill='%23A3202B'/>"),
    sky: () => ({
      back: '',
      d: /* great mosque */ R(110, 110, 30) + D(165, 66, 26) + D(132, 70, 12) + D(198, 70, 12) + S(165, 30, 40, 1.2) +
        [104, 120, 210, 226].map((x) => R(x, 4, 70) + T(x - 1, x + 5, 12, x + 2, 26)).join('') +
        /* round tower */ R(300, 16, 50) + R(298, 20, 54) + T(298, 318, 24, 308, 42) +
        row([[0, 30, 30], [32, 24, 22], [58, 40, 34], [240, 26, 26], [268, 28, 32], [322, 26, 28], [350, 22, 34], [374, 26, 24]]),
      extra: '<rect x="0" y="90" width="400" height="6" fill="var(--wire)" opacity=".35"/>'
    })
  },
  { // 9
    city: 'Marrakech', font: 'Aref Ruqaa', scale: 1,
    c: { paper: '#F1DCCB', panel: '#FBEEE3', ink: '#2B1712', pencil: '#61463C', stamp: '#1F5F5B', onstamp: '#FFFFFF', wire: '#9A3B22', rule: '#D2AE95', locked: '#FFF8F0', sky: '#8E4A35', sun: '#E9A23B' },
    block: tile(16, 16, '#B9573C', "<g fill='%23F1DCCB'><rect x='5' y='5' width='6' height='6'/><rect x='5' y='5' width='6' height='6' transform='rotate(45 8 8)'/></g><circle cx='8' cy='8' r='1.5' fill='%231F5F5B'/>"),
    sky: () => ({
      back: hill([[0, 50], [60, 38], [110, 52], [170, 34], [240, 50], [300, 40], [360, 52], [400, 44]]),
      d: /* square minaret */ R(170, 18, 74) + 'M168 26V22H190V26Z' + R(174, 10, 84) + D(179, 12, 3) + S(179, 4, 9, 1) +
        row([[0, 40, 26], [42, 30, 32], [74, 50, 24], [126, 40, 30], [200, 44, 26], [246, 36, 34], [284, 50, 24], [336, 30, 30], [368, 32, 22]]) +
        /* palms */ [60, 230, 330].map((x) => `M${x} 96L${x + 1} 60L${x + 3} 60L${x + 3} 96Z M${x + 2} 60Q${x - 10} 54 ${x - 14} 62Q${x - 6} 56 ${x + 2} 60Q${x + 12} 52 ${x + 18} 60Q${x + 8} 56 ${x + 2} 60Q${x - 2} 48 ${x - 8} 48Q${x} 52 ${x + 2} 60Z`).join('')
    })
  },
  { // 10
    city: 'Sydney', font: 'Josefin Sans', scale: 1,
    c: { paper: '#E2EDF4', panel: '#F4F9FC', ink: '#0F2333', pencil: '#435869', stamp: '#C2410C', onstamp: '#FFFFFF', wire: '#0E5E8C', rule: '#9DB8CB', locked: '#FFFEF8', sky: '#294459', sun: '#F4B740' },
    block: tile(12, 10, '#2C5F86', "<path d='M0 10L6 2L12 10' fill='none' stroke='%23E2EDF4' stroke-width='1.3'/>"),
    sky: () => ({
      back: '',
      d: /* sails */ 'M60 84L74 50Q80 62 82 84Z M76 84L92 40Q100 58 102 84Z M98 84L116 46Q122 62 124 84Z M120 84L132 58Q138 70 140 84Z' + R(54, 92, 12) +
        row([[300, 14, 48], [316, 12, 60], [330, 16, 44], [348, 12, 66], [362, 16, 52], [380, 20, 40], [270, 14, 36], [286, 12, 30]]) + R(166, 8, 46) + R(240, 8, 46),
      extra: '<path d="M170 64Q205 14 244 64" fill="none" stroke="var(--sky)" stroke-width="5"/><path d="M150 66H262" stroke="var(--sky)" stroke-width="3"/><g stroke="var(--sky)" stroke-width=".8">' + [178, 186, 194, 202, 210, 218, 226, 234].map((x) => `<line x1="${x}" y1="66" x2="${x}" y2="${(64 - 50 * (1 - Math.pow((x - 207) / 37, 2)) * 0.9).toFixed(1)}"/>`).join('') + '</g><rect x="0" y="90" width="400" height="6" fill="var(--wire)" opacity=".35"/>'
    })
  },
  { // 11
    city: 'Kyoto', font: 'Shippori Mincho', scale: 1,
    c: { paper: '#F1EBDD', panel: '#FBF7EE', ink: '#1F1A17', pencil: '#57504A', stamp: '#B3341F', onstamp: '#FFFFFF', wire: '#2F5D50', rule: '#C7BBA2', locked: '#FFFDF6', sky: '#3F3A35', sun: '#D9573A' },
    block: tile(16, 8, '#2F5D50', "<g fill='none' stroke='%23F1EBDD' stroke-width='1'><circle cx='8' cy='8' r='7'/><circle cx='8' cy='8' r='4'/><circle cx='0' cy='4' r='7'/><circle cx='16' cy='4' r='7'/></g>"),
    sky: () => ({
      back: hill([[0, 54], [80, 40], [160, 56], [250, 36], [330, 52], [400, 42]]),
      sunR: 12, sunX: 300, sunY: 30,
      // five-storey pagoda
      d: [0, 1, 2, 3, 4].map((i) => { const y = 92 - i * 14, w = 30 - i * 4; return `M${150 - w / 2 + 4} ${y + 4}V${y - 10}H${150 + w / 2 - 4}V${y + 4}Z` + `M${150 - w / 2 - 4} ${y - 8}Q150 ${y - 14} ${150 + w / 2 + 4} ${y - 8}L${150 + w / 2 - 2} ${y - 11}H${150 - w / 2 + 2}Z`; }).join('') + S(150, 14, 38, 1.2) +
        row([[0, 30, 22], [32, 26, 28], [60, 34, 20], [200, 30, 24], [232, 28, 18], [330, 34, 26], [366, 34, 20]]),
      acc: /* gate */ 'M262 96V64H265V96Z M281 96V64H284V96Z M256 64Q273 58 290 64V66H256Z M259 70H287V72H259Z'
    })
  },
  { // 12
    city: 'Havana', font: 'Abril Fatface', scale: 0.95,
    c: { paper: '#F5E9DA', panel: '#FCF6EE', ink: '#1E2026', pencil: '#544F4C', stamp: '#0B7A75', onstamp: '#FFFFFF', wire: '#B0367A', rule: '#D3C1A6', locked: '#FFFCF5', sky: '#4D5A66', sun: '#F0A63A' },
    block: tile(12, 12, '#7FC4BC', "<rect width='6' height='12' fill='%23F6D7A8'/>"),
    sky: () => ({
      back: '',
      d: /* capitol */ R(120, 120, 30) + R(166, 28, 44) + D(180, 52, 15) + R(178, 4, 54) + S(180, 26, 40, 1.2) +
        [0, 26, 52, 78, 260, 286, 312, 338, 364].map((x, i) => R(x, 24, 26 + (i * 7) % 14)).join('') +
        /* lighthouse */ R(390, 8, 44) + T(389, 399, 44, 394, 52),
      extra: '<path d="M0 90H400" stroke="var(--wire)" stroke-width="4" opacity=".3"/>'
    })
  },
  { // 13
    city: 'Reykjavik', font: 'Archivo Black', scale: 0.85, night: true,
    c: { paper: '#101B24', panel: '#182733', ink: '#EEF5F7', pencil: '#A8BCC6', stamp: '#5EE6A8', onstamp: '#0C1A14', wire: '#8FC2FF', rule: '#2D4251', locked: '#203545', sky: '#3E5A6E', sun: '#E9F2F2' },
    block: tile(14, 12, '#2C6E5C', "<path d='M3.5 .5H10.5L14 6L10.5 11.5H3.5L0 6Z' fill='none' stroke='%235EE6A8' stroke-width='1'/>"),
    sky: () => ({
      back: hill([[0, 60], [60, 44], [120, 52], [180, 38], [240, 50], [300, 42], [400, 56]]), starsN: 30,
      sunR: 6, sunX: 340, sunY: 18,
      // stepped church
      d: [[160, 4, 30], [166, 4, 36], [172, 4, 42], [178, 4, 48], [184, 4, 54], [190, 4, 60]].map(([x, w, h]) => R(x, w, h) + R(2 * 200 - x - w, w, h)).join('') + R(194, 12, 76) + T(194, 206, 6, 200, 20) + R(150, 100, 22) +
        [[10, 18], [34, 16], [58, 20], [262, 18], [288, 16], [312, 20], [336, 16], [360, 18], [384, 16]].map(([x, w]) => R(x, w, 14) + T(x - 1, x + w + 1, 72, x + w / 2, 82)).join(''),
      extra: '<path d="M0 30Q60 6 120 26T240 20T400 24" fill="none" stroke="var(--stamp)" stroke-width="7" opacity=".35"/><path d="M0 40Q80 18 160 36T320 30T400 34" fill="none" stroke="var(--wire)" stroke-width="4" opacity=".3"/>'
    })
  },
  { // 14
    city: 'Mexico City', font: 'Rubik', scale: 0.95,
    c: { paper: '#F6E7EF', panel: '#FCF5F9', ink: '#22141C', pencil: '#5C4653', stamp: '#B4166B', onstamp: '#FFFFFF', wire: '#0F6B5E', rule: '#D7B6C7', locked: '#FFFAFC', sky: '#4A3341', sun: '#F2A91A' },
    block: tile(12, 12, '#1F7A6C', "<path d='M0 0H12L6 7Z' fill='%23F6E7EF'/><circle cx='6' cy='10' r='1.2' fill='%23F2A91A'/>"),
    sky: () => ({
      back: hill([[0, 96], [40, 60], [70, 46], [84, 44], [100, 50], [150, 96]]),
      d: /* column with figure */ R(214, 6, 70) + R(210, 14, 8) + R(216, 2, 76) + 'M213 18L217 12L221 18L217 16Z' +
        /* tall tower */ R(290, 18, 74) + R(294, 10, 80) + S(299, 2, 16, 1.4) +
        /* domed hall */ R(130, 50, 30) + D(155, 66, 12) + D(138, 66, 5) + D(172, 66, 5) + S(155, 46, 54, 1) +
        row([[0, 24, 30], [184, 22, 34], [240, 24, 26], [266, 22, 38], [312, 20, 44], [334, 22, 30], [358, 18, 40], [378, 22, 28]])
    })
  },
  { // 15
    city: 'Mumbai', font: 'Yatra One', scale: 1,
    c: { paper: '#F7E6CF', panel: '#FCF4E8', ink: '#24170D', pencil: '#5C4A39', stamp: '#B4470A', onstamp: '#FFFFFF', wire: '#0E5F7A', rule: '#D7BE9C', locked: '#FFFAF1', sky: '#5A4130', sun: '#E8A33D' },
    block: tile(10, 10, '#C77A2E', "<path d='M5 0L10 5L5 10L0 5Z' fill='none' stroke='%23F7E6CF' stroke-width='1.1'/>"),
    sky: () => ({
      back: '',
      // gateway arch with four turrets
      d: 'M100 96V46H160V96H144V70Q130 52 116 70V96Z' + [102, 116, 140, 154].map((x) => R(x, 4, 56) + D(x + 2, 40, 3)).join('') + 'M98 46V42H162V46Z' +
        /* domed hotel */ R(190, 70, 40) + D(225, 56, 13) + D(200, 56, 6) + D(250, 56, 6) + S(225, 38, 43, 1) +
        row([[0, 22, 36], [24, 16, 50], [42, 20, 30], [64, 26, 44], [280, 16, 54], [298, 22, 40], [322, 14, 62], [338, 20, 46], [360, 18, 56], [380, 20, 38]]),
      extra: '<rect x="0" y="90" width="400" height="6" fill="var(--wire)" opacity=".35"/>'
    })
  },
  { // 16
    city: 'Amsterdam', font: 'DM Serif Display', scale: 1,
    c: { paper: '#EEE6DC', panel: '#F9F5EF', ink: '#1E1A17', pencil: '#544B44', stamp: '#B54A12', onstamp: '#FFFFFF', wire: '#1D5470', rule: '#C3B3A1', locked: '#FFFCF7', sky: '#3E2F27', sun: '#E8A33D' },
    block: tile(12, 12, '#8C4A33', "<g stroke='%23E6D3C2' stroke-width='1'><path d='M0 6L6 0M6 12L12 6M0 6L6 12M6 0L12 6'/></g>"),
    sky: () => {
      // a long row of narrow canal houses with step and bell gables
      let d = '', x = 0, i = 0;
      while (x < 400) {
        const w = 18 + (i * 5) % 8, h = 44 + (i * 13) % 22;
        if (i % 3 === 0) d += `M${x} 96V${96 - h}H${x + 3}V${92 - h}H${x + 6}V${88 - h}H${x + w - 6}V${92 - h}H${x + w - 3}V${96 - h}H${x + w}V96Z`;
        else if (i % 3 === 1) d += `M${x} 96V${96 - h}Q${x + 3} ${92 - h} ${x + 4} ${86 - h}Q${x + w / 2} ${80 - h} ${x + w - 4} ${86 - h}Q${x + w - 3} ${92 - h} ${x + w} ${96 - h}V96Z`;
        else d += `M${x} 96V${96 - h}L${x + w / 2} ${84 - h}L${x + w} ${96 - h}V96Z`;
        if (i === 9) d += R(x + 2, w - 4, h + 30) + T(x + 2, x + w - 2, 96 - h - 54, x + w / 2, 96 - h - 30);
        x += w + 1; i++;
      }
      return { back: '', d, extra: '<rect x="0" y="88" width="400" height="8" fill="var(--wire)" opacity=".4"/>' };
    }
  },
  { // 17
    city: 'Hong Kong', font: 'Bungee', scale: 0.8, night: true,
    c: { paper: '#141020', panel: '#1F1930', ink: '#FAF3FF', pencil: '#BDB1CF', stamp: '#FF5A4E', onstamp: '#141020', wire: '#5FE0C0', rule: '#3D3355', locked: '#2B2342', sky: '#352C52', sun: '#FFE29A' },
    block: tile(10, 10, '#7A2E2A', "<rect x='2' y='2' width='2' height='3' fill='%23FFE29A'/><rect x='6' y='6' width='2' height='3' fill='%23FFB0A8'/>"),
    sky: () => {
      const b = [[0, 14, 50], [16, 12, 64], [30, 16, 46], [48, 12, 70], [62, 14, 56], [78, 10, 40], [90, 14, 62], [140, 16, 58], [158, 12, 44], [172, 14, 68], [188, 12, 52], [232, 14, 60], [248, 12, 46], [262, 16, 66], [280, 12, 50], [294, 14, 58], [310, 12, 42], [324, 16, 64], [342, 12, 48], [356, 14, 60], [372, 12, 44], [386, 14, 56]];
      return {
        back: hill([[0, 34], [70, 22], [140, 36], [210, 18], [300, 30], [400, 24]]), starsN: 12,
        d: row(b) + /* tall crowned tower */ R(108, 22, 82) + R(112, 14, 88) + R(116, 6, 92) + /* angular tower */ 'M206 96V26L214 6L224 26V96Z',
        win: lit(b.concat([[108, 22, 82]]), 31, 3),
        extra: '<rect x="0" y="90" width="400" height="6" fill="var(--wire)" opacity=".3"/>'
      };
    }
  },
  { // 18
    city: 'San Francisco', font: 'Oswald', scale: 0.95,
    c: { paper: '#E8E6E3', panel: '#F6F5F3', ink: '#1C1B1B', pencil: '#53504D', stamp: '#B8381B', onstamp: '#FFFFFF', wire: '#1F5878', rule: '#B6B1AB', locked: '#FFFDF9', sky: '#4A4F57', sun: '#F0C36A' },
    block: tile(10, 10, '#C0452A', "<path d='M0 10L10 0' stroke='%23E8E6E3' stroke-width='1.2'/>"),
    sky: () => ({
      back: hill([[0, 66], [60, 50], [120, 62], [180, 70], [400, 70]]),
      d: /* pyramid tower */ T(300, 318, 6, 309) + S(309, 0, 8, 1) +
        row([[270, 14, 44], [286, 12, 56], [322, 14, 60], [338, 12, 48], [352, 16, 66], [370, 14, 50], [386, 14, 58]]),
      acc: /* bridge */ 'M40 96V22H46V96Z M150 96V22H156V96Z M40 30H46V32H40Z M150 30H156V32H150Z M0 74H220V78H0Z',
      extra: '<path d="M0 50Q20 72 43 24Q98 82 153 24Q190 70 220 56" fill="none" stroke="var(--stamp)" stroke-width="1.6"/><g stroke="var(--stamp)" stroke-width=".5">' + [56, 70, 84, 98, 112, 126, 140, 170, 190, 210, 10, 26].map((x) => `<line x1="${x}" y1="74" x2="${x}" y2="${x < 43 ? (50 - (43 - x) * 0.5).toFixed(0) : x < 153 ? (24 + 30 * (1 - Math.pow((x - 98) / 55, 2))).toFixed(0) : (30 + (x - 153) * 0.4).toFixed(0)}"/>`).join('') + '</g><rect x="0" y="80" width="400" height="16" fill="var(--wire)" opacity=".25"/><path d="M0 60Q100 50 200 62T400 56" stroke="#FFFFFF" stroke-width="10" fill="none" opacity=".45"/>'
    })
  },
  { // 19
    city: 'Rome', font: 'Cinzel', scale: 0.9,
    c: { paper: '#F2E4CC', panel: '#FBF4E6', ink: '#2A1C12', pencil: '#5E4A38', stamp: '#8E2A17', onstamp: '#FFFFFF', wire: '#4B6332', rule: '#D1B58F', locked: '#FFF9EE', sky: '#6A4A33', sun: '#E59A3A' },
    block: tile(12, 8, '#B5633D', "<path d='M0 8A6 6 0 0 1 12 8' fill='none' stroke='%23F2E4CC' stroke-width='1.2'/>"),
    sky: () => ({
      back: '',
      d: /* big dome */ R(250, 70, 30) + R(270, 30, 40) + D(285, 56, 17) + 'M282 40V34H288V40Z' + S(285, 24, 34, 1.4) +
        /* pines */ [30, 214, 360].map((x) => `M${x} 96V62H${x + 3}V96Z M${x - 18} 64Q${x + 2} 42 ${x + 22} 64Z`).join('') + row([[330, 22, 26], [374, 26, 22], [0, 20, 22]]),
      extra: (() => { let o = '<path d="M60 96V50Q120 40 180 50V96Z" fill="var(--sky)"/><g fill="var(--paper)">'; for (let r = 0; r < 3; r++) for (let k = 0; k < 9; k++) o += `<path d="M${66 + k * 12.5} ${92 - r * 14}V${86 - r * 14}A3 3 0 0 1 ${72 + k * 12.5} ${86 - r * 14}V${92 - r * 14}Z"/>`; return o + '</g>'; })()
    })
  },
  { // 20
    city: 'Dubai', font: 'Marcellus', scale: 1, night: true,
    c: { paper: '#141418', panel: '#1E1E24', ink: '#F8F2E4', pencil: '#C4B9A3', stamp: '#D9A93E', onstamp: '#141418', wire: '#6EC3E6', rule: '#3A3832', locked: '#29282F', sky: '#4D4A5C', sun: '#F3E3B5' },
    block: tile(16, 16, '#6E5524', "<path d='M8 1L15 8L8 15L1 8Z M8 5L11 8L8 11L5 8Z' fill='none' stroke='%23F0CF7A' stroke-width='.9'/>"),
    sky: () => {
      const b = [[0, 14, 40], [16, 12, 52], [30, 16, 34], [48, 12, 46], [62, 14, 58], [78, 12, 38], [250, 14, 48], [266, 12, 60], [280, 16, 40], [298, 12, 54], [312, 14, 44], [380, 20, 36]];
      return {
        back: hill([[0, 84], [100, 78], [200, 86], [300, 76], [400, 84]]), starsN: 30, sunR: 7, sunX: 140, sunY: 18,
        // very tall stepped tower
        d: row(b) + R(176, 26, 30) + R(180, 18, 50) + R(184, 12, 66) + R(186, 8, 78) + R(188, 4, 88) + S(190, 0, 10, 1.6) +
          /* sail hotel */ 'M340 96V18H344Q378 40 370 96Z' + R(334, 40, 4),
        win: lit(b, 77, 3)
      };
    }
  }
];


// ---------- National parks, levels 21 to 40 ----------
// Poster-style landscapes: a sky gradient, then layers from far to near.
const xs = (n) => Array.from({ length: n }, (_, i) => +(i * 400 / (n - 1)).toFixed(1));
// smooth ridge through evenly spaced heights
function soft(ys, base = G) {
  const x = xs(ys.length); let d = `M0 ${base}L0 ${ys[0]}L${(x[0] + x[1]) / 2} ${(ys[0] + ys[1]) / 2}`;
  for (let i = 1; i < ys.length - 1; i++) d += `Q${x[i]} ${ys[i]} ${(x[i] + x[i + 1]) / 2} ${(ys[i] + ys[i + 1]) / 2}`;
  return d + `L400 ${ys[ys.length - 1]}L400 ${base}Z`;
}
// jagged ridge through [x, y] points
const jag = (pts, base = G) => `M${pts[0][0]} ${base}` + pts.map(([x, y]) => `L${x} ${y}`).join('') + `L${pts[pts.length - 1][0]} ${base}Z`;
// flat-topped steps: start height, then [x, y] = at x the top changes to y
const steps = (y0, pairs, base = G) => `M0 ${base}V${y0}` + pairs.map(([x, y]) => `H${x}V${y}`).join('') + `H400V${base}Z`;
const pine = (x, base, h) => { const w = h * 0.3; return `M${x} ${base - h}L${x - w * 0.6} ${base - h * 0.6}H${x - w * 0.35}L${x - w} ${base - h * 0.18}H${x + w}L${x + w * 0.35} ${base - h * 0.6}H${x + w * 0.6}Z` + `M${x - 1} ${base}V${base - h * 0.2}H${x + 1}V${base}Z`; };
const pines = (list, base = G) => list.map(([x, h, b]) => pine(x, b || base, h)).join('');
const BISON = 'M2 18L3 11Q1 8 3 5Q6 1 11 2Q14 0 18 2Q26 3 28 8L29 18H26L25 12H13L12 18H9L8 12L6 13L5 18Z';
const animal = (d, x, y, s, fill, flip) => `<path d="${d}" fill="${fill}" transform="translate(${x} ${y - 18 * s}) scale(${flip ? -s : s} ${s})"/>`;
const ELK = 'M4 18L5 10Q3 9 2 6L0 5L2 4L4 5L3 1L5 3L6 0L7 4Q9 6 10 9H24Q27 10 27 14L26 18H24L23 14H12L11 18H9L8 13L6 12L6 18Z';
const sky2 = (a, b) => [a, b];

const PARKS = [
  { // 21
    city: 'Yellowstone', short: 'Yellowstn', park: true, font: 'Alfa Slab One', scale: 0.85,
    c: { paper: '#EDE6D3', panel: '#F8F4E8', ink: '#1F2A22', pencil: '#4F5A4E', stamp: '#A8461C', onstamp: '#FFFFFF', wire: '#1D5C78', rule: '#BFB596', locked: '#FFFCF2', sky: '#2E4A35', sun: '#F2B33D' },
    block: tile(16, 16, '#C9873A', "<g fill='none' stroke='%23F3E3C3' stroke-width='1.1'><path d='M0 6Q8 1 16 6M0 12Q8 7 16 12'/></g>"),
    sky: () => ({
      bg: sky2('#BFD5E2', '#F4EBD6'), sunX: 80, sunY: 24,
      layers: [[soft([54, 44, 50, 38, 48, 42, 52]), '#9FB0BC', 1], [soft([74, 66, 70, 62, 68, 72, 66]), '#6E8A68', 1], [soft([84, 86, 82, 86, 84, 86, 84]), '#C9B27A', 1]],
      d: pines([[14, 30], [26, 24], [38, 34], [50, 26], [330, 32], [344, 26], [356, 36], [370, 28], [384, 34], [396, 24]]),
      extra: '<g fill="#FFFFFF" opacity=".9">' + [[250, 78, 6], [248, 68, 7], [252, 58, 8], [246, 48, 9], [254, 38, 9], [248, 28, 10], [258, 22, 8], [240, 22, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + '</g><ellipse cx="250" cy="86" rx="22" ry="3" fill="#E8D9B0"/>' + animal(BISON, 120, 90, 1, 'var(--sky)') + animal(BISON, 160, 90, 0.8, 'var(--sky)', true)
    })
  },
  { // 22
    city: 'Yosemite', park: true, font: 'Arvo', scale: 0.95,
    c: { paper: '#E6E8E6', panel: '#F6F7F5', ink: '#1D2420', pencil: '#4C5550', stamp: '#2F6B4A', onstamp: '#FFFFFF', wire: '#275A85', rule: '#ADB4AE', locked: '#FFFEF8', sky: '#2F4A3A', sun: '#F0B24A' },
    block: tile(12, 12, '#7D8590', "<g fill='%23C9CED4'><circle cx='3' cy='3' r='1'/><circle cx='9' cy='7' r='1.2'/><circle cx='5' cy='10' r='.8'/></g>"),
    sky: () => ({
      bg: sky2('#C9DDEB', '#F3EFE6'), sunX: 300, sunY: 20, sunR: 9,
      layers: [[soft([60, 52, 56, 50, 54, 58, 52]), '#B9C3CC', 1],
        ['M0 96V30Q30 20 74 26L96 40V96Z', '#8C929B', 1],
        ['M100 96V40H134V96Z', '#9AA0A8', 1],
        ['M180 96C186 62 206 26 246 20L250 20V96Z', '#7F868F', 1],
        ['M250 96V70Q300 60 400 66V96Z', '#8C929B', 1]],
      d: pines([[60, 26], [72, 32], [84, 24], [150, 30], [162, 22], [174, 34], [270, 28], [284, 36], [298, 26], [312, 32], [340, 30], [356, 24], [372, 34], [388, 28]]),
      extra: '<path d="M116 40V96" stroke="#FFFFFF" stroke-width="2.4" opacity=".9"/><rect x="0" y="92" width="400" height="4" fill="var(--wire)" opacity=".5"/>'
    })
  },
  { // 23
    city: 'Grand Canyon', short: 'Canyon', park: true, font: 'Ultra', scale: 0.75,
    c: { paper: '#F3E3CF', panel: '#FBF3E8', ink: '#2B160E', pencil: '#613F2D', stamp: '#A63A1C', onstamp: '#FFFFFF', wire: '#1F5F7A', rule: '#D9B896', locked: '#FFF9F0', sky: '#7A3322', sun: '#F29A3A' },
    block: tile(16, 12, '#B5502E', "<rect y='0' width='16' height='3' fill='%23E8B27A'/><rect y='6' width='16' height='2' fill='%23D07A45'/>"),
    sky: () => ({
      bg: sky2('#F2C99A', '#F8E8D2'), sunX: 330, sunY: 30, sunR: 14,
      layers: [[steps(40, [[60, 36], [130, 42], [210, 34], [300, 40], [360, 38]]), '#E8B27A', 1],
        [steps(54, [[40, 50], [90, 58], [150, 48], [220, 56], [280, 50], [340, 58]]), '#D07A45', 1],
        [steps(66, [[30, 70], [80, 62], [140, 72], [200, 64], [260, 70], [320, 62], [370, 68]]), '#B5502E', 1]],
      d: steps(80, [[50, 76], [110, 84], [170, 78], [230, 86], [290, 80], [350, 84]]),
      extra: '<path d="M0 92Q80 86 160 92T320 90T400 92" stroke="var(--wire)" stroke-width="2.5" fill="none"/>'
    })
  },
  { // 24
    city: 'Zion', park: true, font: 'Bitter', scale: 1,
    c: { paper: '#F1E1D2', panel: '#FAF1E8', ink: '#2A1711', pencil: '#5F4337', stamp: '#8F3A1E', onstamp: '#FFFFFF', wire: '#2E6A5A', rule: '#D4B39E', locked: '#FFF8F2', sky: '#6E2E1C', sun: '#F2B04A' },
    block: tile(14, 14, '#A3482C', "<path d='M0 4L14 0M0 10L14 6M0 14L14 12' stroke='%23D98B5F' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#BCD4E0', '#F6E6D2'), sunX: 200, sunY: 16, sunR: 8,
      layers: [[jag([[120, 96], [130, 40], [160, 30], [200, 36], [240, 28], [270, 44], [280, 96]]), '#E0A27A', 1],
        ['M0 96V12L30 8L60 22L84 40L104 96Z', '#A3482C', 1], ['M400 96V16L370 10L344 26L320 44L300 96Z', '#A3482C', 1]],
      d: 'M0 96V30L20 26L40 40L70 60L90 96Z M400 96V36L380 32L356 50L334 66L318 96Z',
      extra: '<path d="M150 96Q190 84 200 90T250 96Z" fill="var(--wire)" opacity=".7"/><g fill="#5F7F3A">' + [[118, 84, 8], [134, 88, 6], [270, 84, 8], [284, 88, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + '</g>'
    })
  },
  { // 25
    city: 'Acadia', park: true, font: 'Zilla Slab', scale: 1,
    c: { paper: '#E3E8EA', panel: '#F4F7F8', ink: '#172228', pencil: '#4A5860', stamp: '#A12A2A', onstamp: '#FFFFFF', wire: '#1D5976', rule: '#A9B6BC', locked: '#FFFDF8', sky: '#2B3A33', sun: '#F2A65A' },
    block: tile(16, 8, '#3D5566', "<path d='M0 5Q4 2 8 5T16 5' fill='none' stroke='%23C9D6DE' stroke-width='1.1'/>"),
    sky: () => ({
      bg: sky2('#F7C9A4', '#E8EEF1'), sunX: 300, sunY: 64, sunR: 14,
      layers: [['M0 72H400V96H0Z', '#4E7790', 1], [soft([60, 54, 62, 70, 74, 76, 78]), '#7C8FA0', 0.6]],
      d: 'M0 96V58Q40 54 70 64Q100 70 120 80L150 96Z' + pines([[10, 30, 60], [24, 24, 58], [38, 34, 60], [54, 26, 63], [68, 22, 65]], 0),
      acc: 'M112 76V60H118V76Z M111 60L115 54L119 60Z',
      extra: '<path d="M109 76V82H121V76Z" fill="#E8E2D6"/><path d="M300 72V96" stroke="var(--sun)" stroke-width="8" opacity=".35"/>'
    })
  },
  { // 26
    city: 'Great Smoky Mountains', short: 'Smokies', park: true, font: 'Fraunces', scale: 1,
    c: { paper: '#E4E9EF', panel: '#F5F7FA', ink: '#172234', pencil: '#4A5568', stamp: '#3E6B3E', onstamp: '#FFFFFF', wire: '#2B5C8C', rule: '#A8B5C6', locked: '#FFFEFA', sky: '#3D5675', sun: '#F4C770' },
    block: tile(16, 10, '#4F6D8C', "<path d='M0 7Q4 3 8 6T16 4' fill='none' stroke='%23C9D6E3' stroke-width='1.1'/>"),
    sky: () => ({
      bg: sky2('#F6E2C2', '#E4E9EF'), sunX: 100, sunY: 26,
      layers: [[soft([40, 34, 42, 30, 38, 36, 44]), '#C9D6E3', 1], [soft([52, 46, 54, 44, 50, 48, 56]), '#A7BBD0', 1], [soft([64, 58, 66, 56, 62, 60, 66]), '#8099B5', 1], [soft([76, 70, 78, 68, 74, 72, 78]), '#5C7798', 1]],
      d: soft([88, 82, 90, 80, 86, 84, 88]),
      extra: '<g fill="#FFFFFF" opacity=".45"><rect x="0" y="56" width="400" height="5"/><rect x="0" y="70" width="400" height="4"/></g>'
    })
  },
  { // 27
    city: 'Arches', park: true, font: 'Rye', scale: 0.8,
    c: { paper: '#F4E2D2', panel: '#FBF2EA', ink: '#2A140C', pencil: '#63402F', stamp: '#9E3B1C', onstamp: '#FFFFFF', wire: '#2C5E86', rule: '#DDB59A', locked: '#FFF8F1', sky: '#8A3A1F', sun: '#F5B24E' },
    block: tile(16, 14, '#B4502F', "<path d='M3 14V9A5 5 0 0 1 13 9V14' fill='none' stroke='%23F4E2D2' stroke-width='1.4'/>"),
    sky: () => ({
      bg: sky2('#A9CBE0', '#F6E6D4'), sunX: 70, sunY: 22,
      layers: [[jag([[0, 60], [40, 50], [70, 38], [90, 30], [110, 40], [150, 54], [190, 60], [400, 60]]), '#9C8AA8', 1], ['M64 40L90 30L104 36L86 40Z', '#F2EEF4', 1], [soft([84, 76, 72, 74, 80, 78, 84]), '#D9875A', 1]],
      d: 'M228 78C226 42 236 18 260 18C286 18 296 42 294 78H284C286 48 278 32 261 32C246 32 238 48 240 78Z' + 'M300 96V60H316V40H326V60H336V96Z' + 'M20 96V66H34V56H44V96Z',
      extra: ''
    })
  },
  { // 28
    city: 'Glacier', park: true, font: 'Fjalla One', scale: 0.95,
    c: { paper: '#E2EBF0', panel: '#F3F8FA', ink: '#14232E', pencil: '#475A66', stamp: '#2F6B3C', onstamp: '#FFFFFF', wire: '#1E5F8A', rule: '#A3B8C4', locked: '#FFFFFB', sky: '#22382A', sun: '#F2C46A' },
    block: tile(14, 14, '#5E9CC0', "<path d='M0 4L6 8L14 3M3 14L8 9L14 12' fill='none' stroke='%23EAF4F9' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#BFDCEB', '#EEF5F8'), sunX: 360, sunY: 18, sunR: 8,
      layers: [[jag([[0, 50], [30, 30], [50, 40], [80, 12], [110, 36], [140, 20], [170, 44], [200, 16], [230, 34], [260, 22], [290, 40], [320, 14], [350, 32], [380, 24], [400, 38]]), '#5D6F82', 1],
        ['M80 12L72 22L80 20L88 22Z M200 16L192 26L200 24L208 26Z M320 14L312 24L320 22L328 24Z M140 20L134 28L146 28Z', '#FFFFFF', 1],
        ['M0 70H400V96H0Z', '#4F9BC2', 1]],
      d: pines([[10, 30], [24, 38], [38, 28], [52, 34], [300, 30], [316, 38], [332, 26], [348, 36], [364, 30], [380, 40], [396, 28]]),
      extra: '<path d="M60 80H280" stroke="#FFFFFF" stroke-width="1" opacity=".5"/>'
    })
  },
  { // 29
    city: 'Rocky Mountain', short: 'Rocky Mtn', park: true, font: 'Roboto Slab', scale: 1,
    c: { paper: '#EEE9DA', panel: '#F9F6EC', ink: '#1F241C', pencil: '#52574A', stamp: '#8A5A12', onstamp: '#FFFFFF', wire: '#2D5B7E', rule: '#C2BBA2', locked: '#FFFDF4', sky: '#3B4A3A', sun: '#E9A93A' },
    block: tile(10, 16, '#D4A52B', "<rect x='3' width='3' height='16' fill='%23F4F1E6'/><rect x='3' y='5' width='3' height='1.4' fill='%23333333'/><rect x='3' y='11' width='3' height='1' fill='%23333333'/>"),
    sky: () => ({
      bg: sky2('#B5D0E4', '#F2EEE0'), sunX: 60, sunY: 20,
      layers: [[jag([[0, 54], [50, 30], [90, 46], [140, 14], [170, 26], [200, 18], [250, 42], [300, 24], [350, 44], [400, 36]]), '#6E7B8C', 1],
        ['M140 14L130 26L140 23L150 27Z M200 18L192 28L206 28Z M300 24L292 34L308 34Z', '#FFFFFF', 1], [soft([76, 72, 78, 74, 80, 76, 78]), '#A7B06A', 1]],
      d: pines([[14, 26], [28, 34], [42, 24], [356, 30], [370, 26], [384, 34]]) + [100, 112, 124, 260, 274].map((x) => `M${x} 96V72H${x + 2}V96Z`).join(''),
      extra: '<g fill="#E6B52C">' + [[101, 70, 7], [113, 66, 8], [125, 71, 6], [261, 68, 7], [275, 72, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + '</g>' + animal(ELK, 190, 92, 0.9, 'var(--sky)')
    })
  },
  { // 30
    city: 'Olympic', park: true, font: 'Merriweather', scale: 0.9,
    c: { paper: '#E2E8E1', panel: '#F3F7F2', ink: '#16231A', pencil: '#47574B', stamp: '#2F6B3A', onstamp: '#FFFFFF', wire: '#245C78', rule: '#A7B8A9', locked: '#FFFFF8', sky: '#22302A', sun: '#E8D9A6' },
    block: tile(12, 14, '#3F6B3A', "<path d='M6 0V14M6 3L2 1M6 3L10 1M6 7L1 4M6 7L11 4M6 11L1 8M6 11L11 8' fill='none' stroke='%23A9C79A' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#D9E2E2', '#EEF1EC'), sunX: 300, sunY: 24, sunR: 9,
      layers: [[soft([50, 44, 48, 42, 50, 46, 52]), '#B7C2BE', 1], ['M0 74H400V96H0Z', '#6E8E96', 1]],
      d: pines([[8, 50], [22, 62], [36, 46], [50, 58], [64, 44], [78, 52]]) + 'M0 96V54H90V96Z' +
        'M200 80V44Q204 36 212 40L216 80Z M250 80V30Q256 22 264 28L266 80Z M300 80V54Q306 48 312 54L314 80Z M340 80V62H350V80Z' + pines([[206, 12, 40], [256, 14, 26], [262, 10, 28], [306, 8, 50]], 0),
      extra: '<g fill="#FFFFFF" opacity=".35"><rect x="0" y="40" width="400" height="6"/><rect x="0" y="86" width="400" height="2"/></g>'
    })
  },
  { // 31
    city: 'Joshua Tree', short: 'Joshua', park: true, night: true, font: 'Staatliches', scale: 1.05,
    c: { paper: '#1B1626', panel: '#251E33', ink: '#F6EEFF', pencil: '#BDB0D0', stamp: '#F2A65A', onstamp: '#1B1626', wire: '#7FD0E6', rule: '#3F3554', locked: '#2F2741', sky: '#0E0A16', sun: '#FFF0C8' },
    block: tile(14, 14, '#5A3F72', "<g fill='%23F2E6FF'><circle cx='3' cy='4' r='.8'/><circle cx='10' cy='2' r='.6'/><circle cx='8' cy='10' r='1'/></g>"),
    sky: () => ({
      bg: sky2('#1B1530', '#6A3F5E'), starsN: 50, sunX: 330, sunY: 20, sunR: 7,
      layers: [[soft([70, 62, 66, 58, 64, 60, 68]), '#3A2A4A', 1]],
      d: 'M120 96C118 80 130 70 146 72C160 64 178 74 176 86C186 84 194 92 192 96Z M280 96C280 84 292 78 304 82C314 76 328 84 326 96Z' + 'M0 92H400V96H0Z',
      extra: '<g stroke="var(--sky)" stroke-linecap="round" fill="none">' + [[60, 92, 1], [230, 92, 1.2], [370, 92, 0.9]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-30M0 -18L-10 -28L-12 -36M0 -24L8 -32L8 -40M-10 -28L-18 -30" stroke-width="3.2"/></g>`).join('') + '</g><g fill="var(--sky)">' + [[60, 92, 1], [230, 92, 1.2], [370, 92, 0.9]].map(([x, y, s]) => [[0, -30], [-12, -36], [8, -40], [-18, -30]].map(([a, b]) => `<circle cx="${x + a * s}" cy="${y + b * s}" r="${3.4 * s}"/>`).join('')).join('') + '</g>'
    })
  },
  { // 32
    city: 'Everglades', park: true, font: 'Patua One', scale: 0.95,
    c: { paper: '#EAEAD2', panel: '#F7F7E9', ink: '#1C2416', pencil: '#4F5944', stamp: '#9A4A12', onstamp: '#FFFFFF', wire: '#1F6170', rule: '#BFC09A', locked: '#FFFFF4', sky: '#2F3D24', sun: '#F09A3A' },
    block: tile(10, 14, '#6E7F3A', "<path d='M2 14L3 2M6 14L5 0M8 14L9 4' stroke='%23C9D08A' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#F4C08A', '#F3EED6'), sunX: 200, sunY: 58, sunR: 16,
      layers: [['M0 74H400V96H0Z', '#6E9A9C', 1]],
      d: 'M0 74H400V77H0Z' + 'M20 74Q30 50 50 54Q66 46 76 60Q90 58 92 74Z' + 'M300 74Q308 56 326 58Q340 50 352 62Q366 60 370 74Z' +
        Array.from({ length: 60 }, (_, i) => { const x = 4 + i * 6.6 + (i % 3); return `M${x} 96L${x + 1.2} ${82 - (i * 7) % 10}L${x + 2} 96Z`; }).join(''),
      extra: '<path d="M200 76V96" stroke="var(--sun)" stroke-width="10" opacity=".35"/><g transform="translate(150 74)"><path d="M0 0V-14M0 -14Q4 -22 2 -26Q6 -26 8 -24L12 -24L8 -22Q4 -16 2 -10Q-6 -8 -8 -12Q-4 -12 0 -14" stroke="var(--sky)" stroke-width="1.2" fill="var(--sky)"/></g>'
    })
  },
  { // 33
    city: 'Denali', park: true, font: 'Anton', scale: 0.95,
    c: { paper: '#E6EAEF', panel: '#F6F8FA', ink: '#182230', pencil: '#4A5566', stamp: '#A33A2A', onstamp: '#FFFFFF', wire: '#2A5C88', rule: '#AAB5C3', locked: '#FFFFFC', sky: '#2C3A2C', sun: '#F4C46A' },
    block: tile(16, 12, '#4E6A85', "<path d='M0 12L5 4L8 8L11 2L16 12Z' fill='%23EEF3F8'/>"),
    sky: () => ({
      bg: sky2('#A9C6E0', '#EEF2F6'), sunX: 60, sunY: 20, sunR: 8,
      layers: [[jag([[0, 64], [130, 56], [190, 44], [240, 26], [270, 14], [290, 8], [312, 12], [336, 24], [370, 40], [400, 50]]), '#FFFFFF', 1],
        ['M290 8L280 40L300 22L310 46L312 12Z M240 26L234 46L258 30Z M336 24L352 50L356 34Z', '#C9D3DE', 1],
        [soft([72, 68, 74, 66, 72, 70, 74]), '#8A7E5E', 1], [soft([84, 80, 86, 82, 84, 80, 86]), '#6E7A4E', 1]],
      d: pines([[20, 22], [34, 28], [48, 20], [62, 26], [372, 24], [388, 20]]),
      extra: ''
    })
  },
  { // 34
    city: 'Bryce Canyon', short: 'Bryce', park: true, font: 'Bree Serif', scale: 1,
    c: { paper: '#F6E4D6', panel: '#FCF3EC', ink: '#2C150B', pencil: '#66412E', stamp: '#A8461C', onstamp: '#FFFFFF', wire: '#2B5B83', rule: '#E0B79B', locked: '#FFF9F4', sky: '#9A431C', sun: '#F7B85A' },
    block: tile(10, 16, '#D66A2E', "<ellipse cx='5' cy='4' rx='3' ry='3' fill='%23F6E4D6'/><rect x='3.5' y='7' width='3' height='9' fill='%23E89A5E'/>"),
    sky: () => {
      const hoo = (x, w, h, base) => `M${x} ${base}V${base - h + w * 0.6}Q${x - 1} ${base - h + w * 0.3} ${x + w * 0.2} ${base - h + w * 0.2}Q${x + w / 2} ${base - h - w * 0.2} ${x + w * 0.8} ${base - h + w * 0.2}Q${x + w + 1} ${base - h + w * 0.3} ${x + w} ${base - h + w * 0.6}V${base - h * 0.5}Q${x + w + 2} ${base - h * 0.4} ${x + w} ${base - h * 0.3}V${base}Z`;
      const row1 = Array.from({ length: 34 }, (_, i) => hoo(i * 12 - 4, 8, 28 + (i * 11) % 18, 80)).join('');
      const row2 = Array.from({ length: 22 }, (_, i) => hoo(i * 19 - 6, 13, 30 + (i * 7) % 20, 96)).join('');
      return { bg: sky2('#B7D3E6', '#F8EADC'), sunX: 340, sunY: 18, sunR: 9, layers: [[soft([50, 46, 52, 48, 50, 46, 52]), '#E8B98E', 1], [row1, '#E89A5E', 1]], d: row2, extra: '' };
    }
  },
  { // 35
    city: 'Grand Teton', short: 'Teton', park: true, font: 'Crete Round', scale: 1,
    c: { paper: '#E9E8E2', panel: '#F7F6F2', ink: '#1B1F24', pencil: '#4E535A', stamp: '#7A3E22', onstamp: '#FFFFFF', wire: '#2A5E80', rule: '#B6B4AA', locked: '#FFFEF9', sky: '#3A2A1E', sun: '#F2B84E' },
    block: tile(12, 12, '#6B4A32', "<path d='M0 4H12M0 8H12' stroke='%23A5805F' stroke-width='1'/><circle cx='9' cy='2' r='.6' fill='%23A5805F'/>"),
    sky: () => ({
      bg: sky2('#F2D1A8', '#EDEFF2'), sunX: 340, sunY: 22,
      layers: [[jag([[0, 70], [50, 56], [90, 40], [120, 30], [150, 12], [168, 4], [182, 18], [200, 10], [214, 24], [240, 20], [270, 40], [310, 54], [360, 62], [400, 66]]), '#4E5A6E', 1],
        ['M168 4L160 18L170 14L176 22L182 18Z M200 10L194 22L206 20Z M150 12L144 22L156 20Z', '#FFFFFF', 1],
        [soft([80, 78, 82, 78, 80, 78, 82]), '#9AA36A', 1]],
      d: 'M90 96V80L84 80L104 66L114 74V70L134 80H128V96Z' + pines([[30, 20], [44, 26], [300, 22], [316, 28], [330, 20]]),
      extra: '<path d="M0 90Q120 84 220 90T400 88" stroke="var(--wire)" stroke-width="3" fill="none"/>'
    })
  },
  { // 36
    city: 'Sequoia', park: true, font: 'Vollkorn', scale: 1,
    c: { paper: '#ECE4D6', panel: '#F8F3EA', ink: '#24170F', pencil: '#594636', stamp: '#8C3B22', onstamp: '#FFFFFF', wire: '#2E6648', rule: '#C9B89E', locked: '#FFFBF3', sky: '#6A2E18', sun: '#F5D58A' },
    block: tile(10, 16, '#7A3B22', "<path d='M2 0V16M5 0Q6 8 5 16M8 0V16' stroke='%23A4593A' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#E9EED6', '#F5EBD6'), sunX: 260, sunY: 0, sunR: 0,
      layers: [['M40 96L44 0H70L76 96Z M330 96L334 0H352L356 96Z', '#A85E3E', 0.6], [soft([82, 80, 84, 82, 80, 84, 82]), '#5E7F3A', 1]],
      d: 'M110 96L116 0H160L168 96Z M220 96L226 0H252L258 96Z' + pines([[20, 30], [190, 26], [290, 34], [380, 28]]),
      extra: '<g fill="#FFF6D6" opacity=".35"><path d="M170 0L200 0L240 96L200 96Z"/><path d="M270 0L284 0L320 96L300 96Z"/></g><g fill="#3E5F2A">' + [[100, 92, 8], [180, 92, 6], [270, 92, 9], [320, 92, 6]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.6}" ry="${r}"/>`).join('') + '</g>'
    })
  },
  { // 37
    city: 'Death Valley', short: 'Death Vly', park: true, font: 'Holtwood One SC', scale: 0.7,
    c: { paper: '#F5E8D6', panel: '#FCF5EC', ink: '#2A1B0E', pencil: '#614B35', stamp: '#A8461C', onstamp: '#FFFFFF', wire: '#5B4A8A', rule: '#DCC4A4', locked: '#FFFAF2', sky: '#8A5A2E', sun: '#F29A3A' },
    block: tile(14, 12, '#8C6E52', "<path d='M3.5 .5H10.5L14 6L10.5 11.5H3.5L0 6Z' fill='none' stroke='%23F5E8D6' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#F6C9A0', '#F8EEDF'), sunX: 90, sunY: 24, sunR: 16,
      layers: [[jag([[0, 48], [40, 40], [80, 46], [130, 30], [180, 42], [240, 34], [300, 44], [350, 36], [400, 42]]), '#9C7E9A', 1], [soft([64, 60, 66, 62, 64, 60, 66]), '#E2C29A', 1],
        ['M0 96V80Q60 60 120 76Q150 84 180 72Q220 58 260 80Q300 92 330 74Q360 62 400 70V96Z', '#D9A86C', 1]],
      d: 'M0 96V88Q80 74 160 88Q220 96 280 84Q340 74 400 86V96Z',
      extra: '<path d="M120 76Q150 70 180 72" stroke="#F8E6CA" stroke-width="1.4" fill="none"/><path d="M260 80Q300 70 330 74" stroke="#F8E6CA" stroke-width="1.4" fill="none"/>'
    })
  },
  { // 38
    city: 'Hawaiʻi Volcanoes', short: 'Hawaiʻi', park: true, night: true, font: 'Rubik', scale: 1,
    c: { paper: '#1A1414', panel: '#251C1C', ink: '#FFF1EA', pencil: '#C9B3AA', stamp: '#FF6A2B', onstamp: '#1A1414', wire: '#6FD3C9', rule: '#4A3533', locked: '#33262A', sky: '#0D0909', sun: '#FFB36B' },
    block: tile(16, 16, '#5A1F12', "<path d='M0 5L5 7L8 3L13 6L16 4M2 16L6 11L10 13L14 9' fill='none' stroke='%23FF8A3D' stroke-width='1.2'/>"),
    sky: () => ({
      bg: sky2('#1C1220', '#7A2E1E'), starsN: 30, sunX: 70, sunY: 18, sunR: 6,
      layers: [[soft([60, 50, 44, 40, 44, 52, 62]), '#2A1A1A', 1]],
      d: 'M0 96V70Q100 46 200 44Q300 46 400 72V96Z',
      acc: 'M176 46Q200 40 224 46Q200 50 176 46Z M196 48Q198 70 230 80Q260 88 300 96H280Q240 88 214 80Q194 72 192 48Z',
      extra: '<g fill="#FFFFFF" opacity=".5"><circle cx="300" cy="86" r="6"/><circle cx="306" cy="76" r="8"/><circle cx="314" cy="64" r="9"/></g><ellipse cx="200" cy="40" rx="40" ry="10" fill="var(--stamp)" opacity=".25"/>'
    })
  },
  { // 39
    city: 'Crater Lake', short: 'Crater', park: true, font: 'Domine', scale: 0.95,
    c: { paper: '#E1E8F1', panel: '#F3F7FB', ink: '#11203A', pencil: '#45546B', stamp: '#1F4E8C', onstamp: '#FFFFFF', wire: '#2F6B4A', rule: '#A4B4C9', locked: '#FFFFFC', sky: '#2A3A2E', sun: '#F4C46A' },
    block: tile(14, 10, '#1F4E8C', "<path d='M0 6Q3.5 3 7 6T14 6' fill='none' stroke='%237FA9DA' stroke-width='1'/>"),
    sky: () => ({
      bg: sky2('#B5CFE8', '#EEF3F8'), sunX: 330, sunY: 20, sunR: 8,
      layers: [[jag([[0, 40], [40, 34], [80, 44], [110, 56], [290, 56], [320, 42], [360, 30], [400, 38]]), '#6E7F92', 1],
        ['M40 34L32 42L48 40Z M360 30L350 40L368 38Z', '#FFFFFF', 1],
        ['M80 66Q200 56 320 66V80H80Z', '#1F4E8C', 1], ['M130 66L150 50L168 64Z', '#4A5A3E', 1]],
      d: 'M0 96V58Q50 54 90 66Q120 80 200 80Q280 80 310 66Q350 54 400 58V96Z' + pines([[20, 24, 60], [36, 18, 59], [370, 22, 59], [386, 26, 60]], 0),
      extra: ''
    })
  },
  { // 40
    city: 'Badlands', park: true, night: true, font: 'Passion One', scale: 1.05,
    c: { paper: '#17141C', panel: '#211C28', ink: '#F7F0E8', pencil: '#C4B6AA', stamp: '#E8915A', onstamp: '#17141C', wire: '#8FC2FF', rule: '#3F3644', locked: '#2C2534', sky: '#0D0A10', sun: '#FFF1D0' },
    block: tile(12, 12, '#7A4B3C', "<rect y='3' width='12' height='2' fill='%23C98A68'/><rect y='8' width='12' height='1.5' fill='%23E6C3A4'/>"),
    sky: () => {
      const butte = jag([[0, 60], [30, 42], [50, 46], [70, 30], [90, 34], [110, 52], [150, 56], [170, 38], [190, 26], [210, 30], [230, 50], [270, 54], [290, 34], [310, 28], [330, 44], [360, 40], [380, 52], [400, 50]]);
      return {
        bg: sky2('#16122A', '#4E3048'), starsN: 60, sunX: 340, sunY: 14, sunR: 5,
        d: 'M0 90H400V96H0Z',
        extra: `<defs><clipPath id="bl"><path d="${butte}"/></clipPath></defs><path d="${butte}" fill="#5A3A30"/><g clip-path="url(#bl)">${[[38, 4, '#8A5A44'], [48, 3, '#B77A58'], [60, 5, '#7A4B3C'], [72, 3, '#C9926E'], [82, 4, '#6A3E32']].map(([y, h, c]) => `<rect x="0" y="${y}" width="400" height="${h}" fill="${c}"/>`).join('')}</g><path d="M0 40Q120 -10 400 30" stroke="#FFFFFF" stroke-width="14" opacity=".08" fill="none"/>` + animal(BISON, 220, 92, 0.8, 'var(--sky)')
      };
    }
  }
];
THEMES.push(...PARKS);

export const FONT_URL = 'https://fonts.googleapis.com/css2?' + [...new Set(THEMES.map((t) => t.font))].map((f) => 'family=' + f.replace(/ /g, '+') + (/(Playfair|Cormorant|Libre Baskerville|Josefin|Rubik|Oswald|Fraunces|Vollkorn|Merriweather|Bitter|Arvo|Zilla Slab|Roboto Slab|Domine)/.test(f) ? ':wght@400;700' : '')).join('&') + '&display=swap';

export function themeFor(n) { return THEMES[(n - 1) % THEMES.length]; }

export function skylineSVG(t) {
  const s = t.sky();
  let o = `<svg class="sky" viewBox="0 0 400 96" preserveAspectRatio="xMidYMax slice" aria-hidden="true">`;
  if (s.bg) o += `<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.bg[0]}"/><stop offset="1" stop-color="${s.bg[1]}"/></linearGradient></defs><rect width="400" height="96" fill="url(#skyg)"/>`;
  if (s.starsN) o += `<g fill="var(--ink)" opacity=".7">${stars(t.city.length * 97, s.starsN)}</g>`;
  if (s.sunR !== 0) o += `<circle cx="${s.sunX || 340}" cy="${s.sunY || 26}" r="${s.sunR || 11}" fill="var(--sun)" opacity="${t.night ? 0.9 : 0.75}"/>`;
  if (s.back) o += `<path d="${s.back}" fill="var(--sky)" opacity=".35"/>`;
  (s.layers || []).forEach(([d, fill, op]) => { o += `<path d="${d}" fill="${fill}"${op < 1 ? ` opacity="${op}"` : ''}/>`; });
  o += `<path d="${s.d}" fill="var(--sky)"/>`;
  if (s.acc) o += `<path d="${s.acc}" fill="var(--stamp)"/>`;
  if (s.win) o += `<g fill="var(--sun)" opacity=".85">${s.win}</g>`;
  if (s.extra) o += s.extra;
  return o + '</svg>';
}

// CSS custom properties for a theme
export function themeVars(t) {
  const c = t.c;
  return { '--paper': c.paper, '--panel': c.panel, '--ink': c.ink, '--pencil': c.pencil, '--stamp': c.stamp, '--onstamp': c.onstamp, '--wire': c.wire, '--rule': c.rule, '--locked': c.locked, '--sky': c.sky, '--sun': c.sun, '--block': t.block, '--fd': `'${t.font}','Special Elite','Courier Prime',monospace`, '--fscale': String(t.scale) };
}
