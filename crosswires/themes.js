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
const tile = (w, h, bg, body) => `${bg} url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`)}") 0 0/${w}px ${h}px`;

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
    city: 'Rio de Janeiro', font: 'Righteous', scale: 0.95,
    c: { paper: '#E6EFE2', panel: '#F6FAF2', ink: '#13281D', pencil: '#455A4C', stamp: '#0A7A43', onstamp: '#FFFFFF', wire: '#1B5E9A', rule: '#A6BCA3', locked: '#FFFEF5', sky: '#2E4A3A', sun: '#F2C230' },
    block: tile(24, 12, '#F7F5EE', "<path d='M0 6Q6 0 12 6T24 6V12H0Z' fill='%23222222'/>"),
    sky: () => ({
      back: hill([[0, 64], [40, 48], [70, 60]]) ,
      d: /* sugarloaf */ 'M250 96C252 70 262 40 280 34C296 30 304 56 308 96Z' + 'M210 96C214 80 222 66 232 64C242 64 246 80 250 96Z' +
        /* tall peak */ 'M60 96C80 70 100 30 118 22C128 20 134 40 150 96Z' + S(122, 10, 22, 1.2) + 'M118 14H126V15.4H118Z' +
        row([[150, 10, 30], [162, 12, 38], [176, 10, 26], [188, 14, 34], [312, 12, 30], [326, 10, 40], [338, 14, 28], [354, 12, 36], [368, 14, 26], [384, 16, 32]]),
      extra: '<path d="M0 92H400" stroke="var(--wire)" stroke-width="3" opacity=".45"/>'
    })
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

export const FONT_URL = 'https://fonts.googleapis.com/css2?' + [...new Set(THEMES.map((t) => t.font))].map((f) => 'family=' + f.replace(/ /g, '+') + (/(Playfair|Cormorant|Libre Baskerville|Josefin|Rubik|Oswald)/.test(f) ? ':wght@400;700' : '')).join('&') + '&display=swap';

export function themeFor(n) { return THEMES[(n - 1) % THEMES.length]; }

export function skylineSVG(t) {
  const s = t.sky();
  let o = `<svg class="sky" viewBox="0 0 400 96" preserveAspectRatio="xMidYMax slice" aria-hidden="true">`;
  if (s.starsN) o += `<g fill="var(--ink)" opacity=".7">${stars(t.city.length * 97, s.starsN)}</g>`;
  o += `<circle cx="${s.sunX || 340}" cy="${s.sunY || 26}" r="${s.sunR || 11}" fill="var(--sun)" opacity="${t.night ? 0.9 : 0.75}"/>`;
  if (s.back) o += `<path d="${s.back}" fill="var(--sky)" opacity=".35"/>`;
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
