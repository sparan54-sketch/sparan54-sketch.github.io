// Crosswires game engine. Pure functions, no DOM. Runs in the browser and in Node.
function sha256(str) {
  var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  var bytes = [];
  for (var i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xff); // ASCII only
  var bl = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (var s = 7; s >= 0; s--) bytes.push(s >= 4 ? 0 : (bl >>> (s * 8)) & 0xff);
  var rotr = function (x, n) { return (x >>> n) | (x << (32 - n)); };
  for (var off = 0; off < bytes.length; off += 64) {
    var w = [];
    for (var t = 0; t < 16; t++) w[t] = (bytes[off+4*t]<<24)|(bytes[off+4*t+1]<<16)|(bytes[off+4*t+2]<<8)|bytes[off+4*t+3];
    for (t = 16; t < 64; t++) {
      var s0 = rotr(w[t-15],7)^rotr(w[t-15],18)^(w[t-15]>>>3), s1 = rotr(w[t-2],17)^rotr(w[t-2],19)^(w[t-2]>>>10);
      w[t] = (w[t-16] + s0 + w[t-7] + s1) | 0;
    }
    var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
    for (t = 0; t < 64; t++) {
      var S1 = rotr(e,6)^rotr(e,11)^rotr(e,25), ch = (e&f)^(~e&g), t1 = (h+S1+ch+K[t]+w[t])|0;
      var S0 = rotr(a,2)^rotr(a,13)^rotr(a,22), mj = (a&b)^(a&c)^(b&c), t2 = (S0+mj)|0;
      h=g; g=f; f=e; e=(d+t1)|0; d=c; c=b; b=a; a=(t1+t2)|0;
    }
    H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;
  }
  return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
}

// A grid is an array of strings: "." is an open square and "#" is a block. Every run of 3 or more open
// squares in a row is an Across word and in a column is a Down word. Slots are numbered in reading order
// the way a printed crossword is: a square that starts an Across word, a Down word or both gets one number.
function slotsFromGrid(grid) {
  var R = grid.length, C = grid[0].length, A = [], D = [];
  var open = function (r, c) { return r >= 0 && r < R && c >= 0 && c < C && grid[r].charAt(c) !== '#'; };
  for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) {
    if (!open(r, c)) continue;
    var k, cells;
    if (!open(r, c - 1) && open(r, c + 1) && open(r, c + 2)) { cells = []; for (k = c; open(r, k); k++) cells.push([r, k]); A.push(['A', cells]); }
    if (!open(r - 1, c) && open(r + 1, c) && open(r + 2, c)) { cells = []; for (k = r; open(k, c); k++) cells.push([k, c]); D.push(['D', cells]); }
  }
  // Desk A holds the Across words and Desk B holds the Down words
  return A.concat(D).map(function (x) { return [x[0] === 'A' ? 'A' : 'B', x[1]]; });
}
// Each player keeps a seat (A or B). The desk they play swaps every level: odd levels as seated, even levels switched.
function deskFor(seat, levelN) { return levelN % 2 === 0 ? (seat === 'A' ? 'B' : 'A') : seat; }
var HINT_CAP = 2; // levels 4 to 6; levels 7 and up have bigger grids and get 3 (level.hintCap)
var MAX_SLIPS = 3, PENCIL_CAP = 3;

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function clueText(bank, cats, idx, len) {
  var ph = cats.map(function (c) { return bank[c].clue[idx]; });
  var t = ph.length === 1 ? ph[0] : ph.slice(0, -1).join(', ') + ' or ' + ph[ph.length - 1];
  return cap(t) + ' (' + len + ')';
}
// From level 21 the words are dealt evenly instead of Across to one desk and Down to the other: Across words go
// A, B, A, B in clue-number order, then Down words continue the deal, so the desks differ by at most one word
// and each desk gets about half the Across words and half the Down words.
function splitEvenly(slots) {
  var k = 0;
  ['across', 'down'].forEach(function (dir) {
    slots.filter(function (s) { return s.dir === dir; }).sort(function (a, b) { return a.n - b.n; }).forEach(function (s) { s.desk = k++ % 2 === 0 ? 'A' : 'B'; });
  });
}
// Every level gives a grid and, for each word slot in reading order, the clue group and its exact words.
function buildLevel(L) {
  var pat = slotsFromGrid(L.grid), R = L.grid.length, C = L.grid[0].length, numbers = {}, next = 1;
  pat.forEach(function (p) { var k = p[1][0][0] + ',' + p[1][0][1]; if (numbers[k] === undefined) numbers[k] = 0; });
  for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) { var key = r + ',' + c; if (numbers[key] !== undefined) numbers[key] = next++; }
  var slots = pat.map(function (p, i) {
    var d = L.slots[i], len = p[1].length;
    return { id: i, desk: p[0], dir: p[0] === 'A' ? 'across' : 'down', n: numbers[p[1][0][0] + ',' + p[1][0][1]], cells: p[1], len: len, allowed: d.words.slice().sort(), label: d.label, clue: cap(d.label) + ' (' + len + ' letters)' };
  });
  if (L.mix) splitEvenly(slots);
  return { n: L.n, rows: R, cols: C, mix: !!L.mix, slots: slots, salt: L.salt, hash: L.hash, tutorial: !!L.tutorial, chips: true, hinted: L.n >= 4, hintCap: L.n >= 7 ? 3 : HINT_CAP, recap: L.recap || '', budget: L.tutorial ? 24 : 5 * slots.length + 4 };
}
function buildLevels(levels) { return levels.map(buildLevel); }

function newState(level) { return { level: level.n, turn: 1, active: 'A', slips: 0, budget: level.budget, locked: {}, pencil: { A: {}, B: {} }, chip: null, hints: { A: {}, B: {} }, log: [], status: 'play', reason: '' }; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function lettersOf(level, locked) {
  var m = {};
  Object.keys(locked).forEach(function (si) {
    var s = level.slots[si];
    s.cells.forEach(function (rc, k) { m[rc[0] + ',' + rc[1]] = locked[si].charAt(k); });
  });
  return m;
}
// Letters visible on the grid for one desk: every locked word plus the partner's pencils.
function gridLetters(level, st, me) {
  var m = lettersOf(level, st.locked), other = me === 'A' ? 'B' : 'A';
  Object.keys(st.pencil[other] || {}).forEach(function (si) {
    if (st.locked[si] !== undefined) return;
    var s = level.slots[si], w = st.pencil[other][si];
    s.cells.forEach(function (rc, k) { var key = rc[0] + ',' + rc[1]; if (m[key] === undefined) m[key] = w.charAt(k); });
  });
  return m;
}
function fits(slot, word, m) {
  for (var k = 0; k < slot.cells.length; k++) { var v = m[slot.cells[k][0] + ',' + slot.cells[k][1]]; if (v && v !== word.charAt(k)) return false; }
  return true;
}
function candidates(level, locked, si) {
  var m = lettersOf(level, locked), s = level.slots[si];
  return s.allowed.filter(function (w) { return fits(s, w, m); });
}
function slotName(level, si) { var s = level.slots[si]; return s.n + ' ' + (s.dir === 'across' ? 'Across' : 'Down'); }
// If the desk whose turn it is has nothing left to fill in, the turn stays with the other desk instead of forcing a pass.
function whoseTurn(st, level) {
  var open = function (d) { return level.slots.some(function (s) { return s.desk === d && st.locked[s.id] === undefined; }); };
  if (st.active && !open(st.active) && open(st.active === 'A' ? 'B' : 'A')) return st.active === 'A' ? 'B' : 'A';
  return st.active;
}
function finish(st, ev, by, act, slot, word) {
  st.log.push({ turn: st.turn, by: by, act: act, slot: slot === undefined ? null : slot, word: word || null, res: ev.type });
  if (st.log.length > 60) st.log.shift();
  st.turn++; st.active = by === 'A' ? 'B' : 'A';
  return st;
}
// action: {type:'pencil'|'erase'|'lock'|'pass'|'hint', slot, word, chip}
// On hinted levels (4 and up) a clue's word list is hidden. A hint opens it for one of your clues and uses your turn; each desk gets HINT_CAP per level.
// A typed word that is not in a hidden list is a miss: it uses the turn but costs no slip.
function apply(state, level, by, action) {
  var st = clone(state), ev, slot, word, i;
  if (st.status !== 'play') return { state: state, event: { type: 'over' } };
  st.active = whoseTurn(st, level);
  if (st.active !== by) return { state: state, event: { type: 'not-your-turn' } };
  var t = action.type;
  if (!st.hints) st.hints = { A: {}, B: {} };
  if (t === 'pass') { ev = { type: 'pass' }; }
  else if (t === 'hint') {
    slot = level.slots[action.slot];
    if (!level.hinted) return { state: state, event: { type: 'no-hints' } };
    if (!slot) return { state: state, event: { type: 'bad-slot' } };
    if (slot.desk !== by) return { state: state, event: { type: 'not-your-slot' } };
    if (st.locked[slot.id] !== undefined) return { state: state, event: { type: 'already-locked', slot: slot.id } };
    if (st.hints[by][slot.id]) return { state: state, event: { type: 'already-hinted', slot: slot.id } };
    if (Object.keys(st.hints[by]).length >= (level.hintCap || HINT_CAP)) return { state: state, event: { type: 'hints-used' } };
    st.hints[by][slot.id] = true; ev = { type: 'hint', slot: slot.id };
  }
  else {
    slot = level.slots[action.slot];
    if (!slot) return { state: state, event: { type: 'bad-slot' } };
    if (slot.desk !== by) return { state: state, event: { type: 'not-your-slot' } };
    if (st.locked[slot.id] !== undefined) return { state: state, event: { type: 'already-locked', slot: slot.id } };
    if (t === 'erase') {
      if (st.pencil[by][slot.id] === undefined) return { state: state, event: { type: 'nothing-to-erase' } };
      delete st.pencil[by][slot.id]; ev = { type: 'erase', slot: slot.id };
    } else if (t === 'pencil' || t === 'lock') {
      word = String(action.word || '').toLowerCase();
      if (word.length !== slot.len) return { state: state, event: { type: 'bad-length' } };
      var known = slot.allowed.indexOf(word) >= 0, hidden = level.hinted && !st.hints[by][slot.id];
      if (!known && !hidden) return { state: state, event: { type: 'unknown-word' } };
      if (!known) { ev = { type: 'miss', slot: slot.id }; }
      else if (t === 'pencil') {
        var cur = Object.keys(st.pencil[by]).length;
        if (st.pencil[by][slot.id] === undefined && cur >= PENCIL_CAP) return { state: state, event: { type: 'pencil-cap' } };
        st.pencil[by][slot.id] = word; ev = { type: 'pencil', slot: slot.id, word: word };
      } else {
        var m = lettersOf(level, st.locked);
        if (!fits(slot, word, m)) { st.slips++; ev = { type: 'clash', slot: slot.id }; }
        else {
          st.locked[slot.id] = word; delete st.pencil[by][slot.id];
          var empty = -1;
          for (i = 0; i < level.slots.length; i++) if (st.locked[i] === undefined && candidates(level, st.locked, i).length === 0) { empty = i; break; }
          if (empty >= 0) { delete st.locked[slot.id]; st.slips++; ev = { type: 'jam', slot: slot.id, dry: empty }; }
          else ev = { type: 'lock', slot: slot.id, word: word };
        }
      }
    } else return { state: state, event: { type: 'bad-action' } };
  }
  if (st.chip && st.chip.by !== by) st.chip = null;
  if (action.chip && ['fits', 'clash', 'stuck', 'yourmove'].indexOf(action.chip) >= 0) st.chip = { by: by, chip: action.chip, turn: st.turn };
  finish(st, ev, by, t, slot ? slot.id : undefined, word);
  st.active = whoseTurn(st, level);
  if (Object.keys(st.locked).length === level.slots.length) {
    var words = level.slots.map(function (s) { return st.locked[s.id]; });
    ev.seal = sha256(level.salt + ':' + words.join('|')) === level.hash;
    st.status = 'won'; ev.won = true;
  } else if (st.slips >= MAX_SLIPS) { st.status = 'lost'; st.reason = 'slips'; ev.lost = 'slips'; }
  else if (st.turn - 1 >= st.budget) { st.status = 'lost'; st.reason = 'turns'; ev.lost = 'turns'; }
  return { state: st, event: ev };
}

export const Engine = { whoseTurn, deskFor, HINT_CAP, sha256, slotsFromGrid, buildLevel, buildLevels, newState, apply, candidates, lettersOf, gridLetters, fits, slotName, MAX_SLIPS, PENCIL_CAP };
