import { Engine } from './engine.js';
import { LEVELS } from './data.js';
import { makeSync } from './sync.js';
import { themeFor, skylineSVG, themeVars, FONT_URL } from './themes.js';
{ const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONT_URL; document.head.appendChild(l); }
const postHTML = (n) => { const t = themeFor(n); return '<div class="post">' + skylineSVG(t) + '<div class="city"><span>Level ' + n + '</span><b>' + esc(t.city) + '</b></div></div>'; };
let themed = null;
function applyTheme(n) {
  if (themed === n) return; themed = n;
  const root = document.documentElement.style, vars = themeVars(themeFor(1));
  Object.keys(vars).forEach((k) => root.removeProperty(k));
  if (n) { const v = themeVars(themeFor(n)); Object.keys(v).forEach((k) => root.setProperty(k, v[k])); }
}

// Public web config for the Firebase project. These values identify the project; access is controlled by the Firestore rules.
const FIREBASE = {
  apiKey: 'AIzaSyDiQfdwjIZnJaB5BqhRJYboGb9tiE3sVgE',
  authDomain: 'crosswires-7be48.firebaseapp.com',
  projectId: 'crosswires-7be48',
  storageBucket: 'crosswires-7be48.firebasestorage.app',
  messagingSenderId: '492331467834',
  appId: '1:492331467834:web:eefa6cd80fc0a63ec7a103',
};
const SDK = 'https://www.gstatic.com/firebasejs/13.3.0/';

const levels = Engine.buildLevels(LEVELS);
const $ = (s) => document.querySelector(s);
const app = $('#app');
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function rid() { return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10); }
var uid = store('cw_uid'); if (!uid) { uid = rid(); store('cw_uid', uid); }
const room = (new URLSearchParams(location.search).get('room') || 'main').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'main';

const ctx = { mode: null, doc: null, hot: null, sel: null, chip: null, draft: '', msg: { t: '', k: '' }, cover: false, busy: false,
  view: null, rulesSeen: store('cw_rules') === '1', cleared: {}, net: 'idle', netNote: '', flash: null, lastRevShown: 0, sync: null };

const lvOf = (n) => levels[n - 1];
const curGame = () => { const g = ctx.mode === 'hot' ? ctx.hot : (ctx.doc && ctx.doc.game) || null; if (g && g.state.status === 'play') g.state.active = Engine.whoseTurn(g.state, lvOf(g.level)); return g; };
const mySeat = () => (ctx.doc && ctx.doc.seats ? (ctx.doc.seats.A === uid ? 'A' : ctx.doc.seats.B === uid ? 'B' : null) : null);
const clearedMap = () => (ctx.mode === 'hot' ? ctx.cleared : (ctx.doc && ctx.doc.cleared) || {});
const setMsg = (t, k) => { ctx.msg = { t: t, k: k || '' }; };
const starsFor = (st, lv) => (st.status !== 'won' ? 0 : st.slips > 0 ? 1 : (st.turn - 1) <= lv.slots.length + 4 ? 3 : 2);
const arrow = (s) => (s.desk === 'A' ? '→' : '↓');
const NOOP = ['over', 'not-your-turn', 'bad-slot', 'not-your-slot', 'already-locked', 'nothing-to-erase', 'bad-length', 'unknown-word', 'pencil-cap', 'no-hints', 'already-hinted', 'hints-used', 'no-seat', 'no-level', 'bad-action'];

function describe(ev, by, lv, mine) {
  const who = mine ? 'You' : 'Desk ' + by, nm = (i) => Engine.slotName(lv, i);
  switch (ev.type) {
    case 'pencil': return { t: who + ' pencilled ' + nm(ev.slot) + '.', k: 'good' };
    case 'erase': return { t: who + ' rubbed out a pencil on ' + nm(ev.slot) + '.', k: '' };
    case 'lock': return { t: who + ' locked ' + nm(ev.slot) + '.', k: 'good' };
    case 'hint': return { t: who + ' used a hint on ' + nm(ev.slot) + ' and skipped the move.', k: '' };
    case 'miss': return { t: 'That word is not on the list for ' + nm(ev.slot) + '. It used your turn, but no slip.', k: 'bad' };
    case 'hints-used': return { t: 'You have used both hints on this level.', k: '' };
    case 'already-hinted': return { t: 'That word list is already open.', k: '' };
    case 'pass': return { t: who + ' passed.', k: '' };
    case 'clash': return { t: 'Slip. That word does not match a letter already locked in the grid (' + nm(ev.slot) + ').', k: 'bad' };
    case 'jam': return { t: 'Slip. After that word, ' + nm(ev.dry) + ' would have no possible word left, so the lock on ' + nm(ev.slot) + ' was undone.', k: 'bad' };
    case 'unknown-word': return { t: 'That word is not in this clue’s list. No slip, no turn used.', k: '' };
    case 'bad-length': return { t: 'That word is the wrong length.', k: '' };
    case 'pencil-cap': return { t: 'Three pencils are on the grid already. Rub one out first.', k: '' };
    case 'already-locked': return { t: 'That clue is already locked.', k: '' };
    case 'nothing-to-erase': return { t: 'There is no pencil there to rub out.', k: '' };
    case 'not-your-turn': return { t: 'It is not your turn yet.', k: '' };
    case 'not-your-slot': return { t: 'That clue belongs to your partner.', k: '' };
    case 'no-seat': return { t: 'Take a desk first.', k: '' };
    case 'no-level': return { t: 'No level is running.', k: '' };
    default: return { t: '', k: '' };
  }
}
function errText(e) {
  const c = e && e.code;
  if (c === 'permission-denied') return 'The shared database refused the request. Its Firebase rules need to allow the “rooms” collection.';
  if (c === 'unavailable' || c === 'deadline-exceeded') return 'Could not reach the shared game. Check your signal and try again.';
  return 'The shared game returned an error (' + (c || 'unknown') + '). Try again.';
}

// ---------- coach (level 1 only) ----------
function coach(lv, st, me, myTurn) {
  if (!myTurn) return 'Wait for Desk ' + st.active + '. When they pencil or lock a word, its letters appear on the grid. Then check which of your words still fit.';
  if (lv.hinted && myTurn) return 'The word lists are hidden. Type a word you think fits, or use a Hint to open the list for one clue. A Hint uses your turn, and you get ' + Engine.HINT_CAP + ' per level. A word that is not on the list uses your turn too, but costs no slip.';
  const gl = Engine.gridLetters(lv, st, me);
  if (!Object.keys(gl).length) return 'The grid is empty, so you have to guess. Pick a clue, choose a word, and Pencil it. Pencil is free and your partner sees it in teal. Ask them whether it fits.';
  const open = lv.slots.filter((s) => s.desk === me && st.locked[s.id] === undefined);
  const info = open.map((s) => ({ s: s, ok: s.allowed.filter((w) => Engine.fits(s, w, gl)).length }));
  const none = info.filter((x) => x.ok === 0)[0];
  if (none) return 'No word for clue ' + none.s.n + arrow(none.s) + ' matches the grid. One of your partner’s pencils may be wrong. Tap Clash and tell them.';
  const one = info.filter((x) => x.ok === 1)[0];
  if (one) return 'Clue ' + one.s.n + arrow(one.s) + ' has only one word that matches the letters on the grid. It is the one that is not greyed out.';
  return 'Your partner’s letters are on the grid. Words that do not match them are greyed out. Choose one that is not.';
}

// ---------- screens ----------
const NOTES = [
  ['fits', 'Fits', 'My words work with your letters.', '(their words work with your letters)'],
  ['clash', 'Clash', 'A letter you pencilled breaks one of my clues.', '(a letter you pencilled breaks one of their clues)'],
  ['stuck', 'Stuck', 'None of my words work yet. Try a different letter.', '(none of their words work yet, so try a different letter)'],
  ['yourmove', 'Your move', 'I am waiting on you. Lock a word if you are sure.', '(they are waiting on you, so lock a word if you are sure)']
];
function boardHTML(lv, st, me, showTags) {
  const R = lv.rows, C = lv.cols, cells = {}, gl0 = Engine.gridLetters(lv, st, me);
  lv.slots.forEach((s) => s.cells.forEach((rc, idx) => { const key = rc[0] + ',' + rc[1]; (cells[key] = cells[key] || []).push({ s: s, idx: idx }); }));
  const lock = Engine.lettersOf(lv, st.locked), selSlot = ctx.sel !== null ? lv.slots[ctx.sel] : null, other = me === 'A' ? 'B' : 'A';
  let out = '';
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const key = r + ',' + c, here = cells[key];
    if (!here) { out += '<div class="cell off" aria-hidden="true"></div>'; continue; }
    let letter = '', cls = '';
    if (lock[key]) { letter = '<span class="l">' + lock[key] + '</span>'; cls = ' locked'; }
    else {
      let mine = null, theirs = null;
      here.forEach((h) => {
        const pm = st.pencil[me] && st.pencil[me][h.s.id], pt = st.pencil[other] && st.pencil[other][h.s.id];
        if (pm) mine = pm.charAt(h.idx); if (pt) theirs = pt.charAt(h.idx);
      });
      if (!mine && !theirs && selSlot && ctx.draft && ctx.draft.length === selSlot.len) { const hs = here.find((h) => h.s.id === selSlot.id); if (hs) mine = ctx.draft.charAt(hs.idx); }
      if (mine) letter = '<span class="l mine">' + mine + '</span>'; else if (theirs) letter = '<span class="l theirs">' + theirs + '</span>';
    }
    let tag = '';
    if (showTags) here.forEach((h) => { if (h.idx === 0 && !tag) tag = String(h.s.n); });
    const sel = selSlot && here.some((h) => h.s.id === selSlot.id) ? ' sel' : '';
    out += '<div class="cell' + cls + sel + (here.length > 1 ? ' x' : '') + '" role="img" aria-label="grid square">' + (tag ? '<span class="tag">' + tag + '</span>' : '') + letter + '</div>';
  }
  return '<div class="board" style="--n:' + C + '">' + out + '</div>';
}
function pattern(s, gl) { return s.cells.map((rc) => gl[rc[0] + ',' + rc[1]] || '_').join(' ').toUpperCase(); }
function dotsHTML(st) { let o = ''; for (let i = 0; i < Engine.MAX_SLIPS; i++) o += '<span class="dot' + (i < st.slips ? ' on' : '') + '"></span>'; return '<span class="dots" role="img" aria-label="' + st.slips + ' of ' + Engine.MAX_SLIPS + ' slips used">' + o + '</span>'; }

function rulesHTML() {
  const g = curGame(), inGame = !!(g && g.state.status === 'play');
  const mini = '<div class="miniwrap"><div class="board" style="--n:3" aria-label="Example grid">' +
    '<div class="cell x"><span class="l">c</span></div><div class="cell"><span class="l">a</span></div><div class="cell"><span class="l">t</span></div>' +
    '<div class="cell"><span class="l">o</span></div><div class="cell off"></div><div class="cell off"></div>' +
    '<div class="cell"><span class="l">w</span></div><div class="cell off"></div><div class="cell off"></div></div>' +
    '<p class="small">Example: CAT runs across, COW runs down. They share the C.</p></div>';
  return '<div class="mast"><span>Crosswires</span><span>How to play</span></div><div class="card rules"><ol>' +
    '<li><span class="num">1</span><div><h3>One grid, two people</h3><p>You fill in a small crossword together. Each of you sees only your own clues.</p></div></li>' +
    '<li><span class="num">2</span><div><h3>Desk A and Desk B</h3><p>Desk A has the Across words, which run left to right. Desk B has the Down words, which run top to bottom. On two phones, you swap desks every level, so whoever had Across on one level has Down on the next. You cannot see your partner’s clues, only the letters they put on the grid.</p></div></li>' +
    '<li><span class="num">3</span><div><h3>What a clue does</h3><p>A clue names a group, like “a drink”, and the number tells you how many letters. The answer is a word from that group. Several words can fit one clue, so you have to guess, and the grid tells you which guess is right. Under each clue, “Letters” shows what is already on the grid for that word, like T _ _.</p></div></li>' +
    '<li><span class="num">4</span><div><h3>Crossing squares share a letter</h3><p>Where an Across word and a Down word meet, there is one square for both of them. the square is marked with a small teal diamond and both words use the same letter there. If your partner has put a T in that square, your word must have a T there too. Use their letters to rule out your guesses.</p>' + mini + '</div></li>' +
    '<li><span class="num">5</span><div><h3>On your turn</h3><p><b>Pencil</b> suggests a word. Your partner sees it in teal, and you can change it later. <b>Lock</b> makes it final. <b>Rub out</b> removes a pencil. <b>Pass</b> skips your turn. Each turn you do one of these.</p></div></li>' +
    '<li><span class="num">6</span><div><h3>Notes to your partner</h3><p>You cannot see each other’s clues, so notes are how you talk. Tap one before you end your turn and your partner sees it on their screen. They are optional and cost nothing.</p><p><b>Fits</b>: my words work with your letters.<br><b>Clash</b>: a letter you pencilled breaks one of my clues.<br><b>Stuck</b>: none of my words work yet, so try a different letter.<br><b>Your move</b>: I am waiting on you. Lock a word if you are sure.</p></div></li>' +
    '<li><span class="num">7</span><div><h3>Hints (levels 4 and up)</h3><p>On these levels the list of possible words is hidden, so you type your own guess. Tap <b>Hint</b> on a clue to open its list. A hint uses your turn, and each of you gets 2 per level. A typed word that is not on the list also uses your turn, but costs no slip.</p></div></li>' +
    '<li><span class="num">8</span><div><h3>Slips</h3><p>A lock that breaks a shared letter is a slip. So is a lock that leaves your partner with no possible word. Three slips ends the level. There is also a turn limit. Pencils never cost anything.</p></div></li>' +
    '</ol><button class="btn" data-a="rules-done">' + (inGame ? 'Got it, back to the game' : 'Got it') + '</button></div>';
}

function tilesHTML() {
  const cl = clearedMap();
  let o = '<div class="card"><h3>Pick a level</h3><div class="tiles">';
  levels.forEach((lv) => {
    const s = cl[lv.n] || 0, open = lv.n === 1 || (cl[lv.n - 1] || 0) > 0;
    o += '<button class="tile" data-a="level-' + lv.n + '"' + (open ? '' : ' disabled') + ' aria-label="Level ' + lv.n + (s ? ', ' + s + ' stars' : open ? '' : ', locked') + '">' + lv.n + '<span class="cty">' + esc(({ 'Rio de Janeiro': 'Rio', 'Mexico City': 'Mexico', 'San Francisco': 'San Fran' })[themeFor(lv.n).city] || themeFor(lv.n).city) + '</span><small>' + (s ? '★'.repeat(s) : lv.n === 1 && !s ? 'start here' : '') + '</small></button>';
  });
  return o + '</div><p class="small">Level 1 teaches the rules. Each level unlocks when you clear the one before it.</p></div>';
}
function lobbyHTML() {
  let h = '<div class="mast"><span>Wire desk</span><span>Two phones, one grid</span></div><h1 class="title">Crosswires</h1><p class="deck">Each of you holds half the clues. Neither half is enough.</p>';
  if (!ctx.mode) {
    h += '<div class="card"><h3>How do you want to play?</h3><button class="btn" data-a="mode-duo">Two phones, taking turns</button><button class="btn alt" data-a="mode-hot">One phone, passed back and forth</button></div>';
    h += '<button class="btn alt" data-a="rules">How to play</button>';
    return h;
  }
  if (ctx.mode === 'duo') {
    const d = ctx.doc, seat = mySeat();
    if (ctx.net !== 'ok') {
      h += '<div class="card"><h3>Shared game</h3><p class="small">' + (ctx.net === 'error' ? esc(ctx.netNote) : 'Connecting to the shared game.') + '</p>' + (ctx.net === 'error' ? '<button class="btn" data-a="retry">Try again</button>' : '') + '</div>';
    } else {
      h += '<div class="card"><h3>Pick your desk</h3>';
      ['A', 'B'].forEach((k) => {
        const holder = d && d.seats && d.seats[k], mineS = holder && holder === uid;
        h += '<div class="row"><div><b>Desk ' + k + '</b> <span class="small">(' + (k === 'A' ? 'Across words' : 'Down words') + ')</span><br><span class="small">' + (mineS ? 'You are here' : holder ? 'Taken' : 'Free') + '</span></div><button class="btn ' + (mineS ? 'alt' : '') + '" data-a="' + (mineS ? 'leave' : 'seat-' + k) + '"' + (holder && !mineS ? ' disabled' : '') + '>' + (mineS ? 'Leave desk' : 'Take Desk ' + k) + '</button></div>';
      });
      h += '<p class="small">Each of you takes a different desk on your own phone. You swap desks every level, so you both get Across and Down.</p></div>';
      if (d && d.seats && d.seats.A && d.seats.B && seat) h += tilesHTML();
      else if (seat) h += '<p class="small">Waiting for the other desk to be taken.</p>';
      if (d && d.seats && ((d.seats.A && d.seats.A !== uid) || (d.seats.B && d.seats.B !== uid)) && !seat) h += '<button class="btn alt" data-a="clear-seats">Clear both desks</button>';
    }
  } else h += tilesHTML();
  h += '<p class="msg ' + ctx.msg.k + '" aria-live="polite">' + esc(ctx.msg.t) + '</p><div class="menu"><button data-a="rules">How to play</button><button data-a="mode-reset">Change how we play</button></div>';
  return h;
}
function playHTML(g, me, swaps) {
  const lv = lvOf(g.level), st = g.state, myTurn = st.status === 'play' && st.active === me;
  let h = postHTML(lv.n) + '<div class="bar"><span>Level ' + lv.n + '</span>' + dotsHTML(st) + '<span>Turn ' + Math.min(st.turn, st.budget) + ' of ' + st.budget + '</span></div>';
  if (swaps && lv.n > 1) h += '<p class="small" style="margin:0">Desks swap each level. This level you are Desk ' + me + ' (' + (me === 'A' ? 'Across' : 'Down') + ').</p>';
  h += '<div class="banner ' + (myTurn ? 'mine' : 'wait') + '">' + (myTurn ? 'Your turn · Desk ' + me + ' (' + (me === 'A' ? 'Across' : 'Down') + ')' : 'Waiting · Desk ' + st.active + ' is up') + '</div>';
  if (lv.chips) h += '<div class="coach"><b>Tip.</b> ' + esc(coach(lv, st, me, myTurn)) + '</div>';
  const lg = st.log[st.log.length - 1];
  if (lg && lg.by !== me && myTurn && lg.slot !== null && (lg.res === 'hint' || lg.res === 'miss')) {
    const nm = Engine.slotName(lv, lg.slot);
    h += '<div class="coach partner"><b>Desk ' + lg.by + ' ' + (lg.res === 'hint' ? 'used a hint on ' + nm + ' and skipped their move.' : 'guessed a word on ' + nm + ' that was not on the list, so their move was used up.') + '</b> Nothing you did was wrong. Their turn only went on that.</div>';
  }
  h += '<p class="msg ' + ctx.msg.k + '" aria-live="polite">' + esc(ctx.msg.t) + '</p>';
  h += boardHTML(lv, st, me, true);
  h += '<p class="legend">Across words run left to right, Down words run top to bottom. <span class="dia"></span> marks a square shared by two words, so both use the same letter there. Teal letters are your partner’s pencils.</p>';
  const pc = st.chip && st.chip.by !== me ? st.chip : null;
  const pn = pc && NOTES.find((x) => x[0] === pc.chip);
  h += '<div class="partnerchip">' + (pn ? 'Note from Desk ' + pc.by + ': <b>' + pn[1] + '</b> ' + pn[3] : '') + '</div>';
  h += '<div class="lab">Your clues, Desk ' + me + '</div><div class="clues">';
  const glMe = Engine.gridLetters(lv, st, me), myHints = (st.hints && st.hints[me]) || {};
  lv.slots.filter((s) => s.desk === me).forEach((s) => {
    const locked = st.locked[s.id], pen = st.pencil[me][s.id];
    h += '<button class="clue' + (ctx.sel === s.id ? ' sel' : '') + (locked ? ' done' : '') + '" data-a="sel-' + s.id + '"' + (locked ? ' disabled' : '') + '><span class="n">' + s.n + arrow(s) + '</span><span class="t">' + esc(s.clue) + '<span class="s">' + (locked ? 'Locked: ' + locked : (pen ? 'Pencilled: ' + pen + ' · ' : '') + 'Letters: ' + pattern(s, glMe) + (lv.hinted ? (myHints[s.id] ? ' · list open' : ' · list hidden') : '')) + '</span></span></button>';
  });
  h += '</div>';
  if (myTurn) {
    if (ctx.sel !== null) {
      const s = lv.slots[ctx.sel];
      h += '<div class="entry">';
      const listOpen = lv.chips && (!lv.hinted || myHints[s.id]), hintsLeft = Engine.HINT_CAP - Object.keys(myHints).length;
      if (listOpen) {
        const gl = Engine.gridLetters(lv, st, me);
        h += '<div class="lab">Choose a word for ' + s.n + arrow(s) + ': ' + esc(s.label) + '</div><div class="wchips">';
        s.allowed.forEach((w) => { h += '<button class="wc' + (Engine.fits(s, w, gl) ? '' : ' dim') + '" aria-pressed="' + (ctx.draft === w) + '" data-a="word-' + w + '">' + w + '</button>'; });
        h += '</div><p class="small">Greyed-out words do not match a letter already on the grid.</p>';
      } else {
        h += '<input id="wordIn" type="text" maxlength="' + s.len + '" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Word for ' + s.n + (s.desk === 'A' ? ' across' : ' down') + '" placeholder="' + '·'.repeat(s.len) + '" value="' + esc(ctx.draft) + '">';
      }
      h += '<div class="row"><button class="btn alt" data-a="do-pencil">Pencil</button><button class="btn red" data-a="do-lock">Lock</button><button class="btn alt" data-a="do-erase">Rub out</button></div>';
      if (lv.hinted && !listOpen) h += '<button class="btn alt" data-a="do-hint"' + (hintsLeft > 0 ? '' : ' disabled') + '>Hint: open the word list (' + hintsLeft + ' left)</button><p class="small">A hint uses your turn. A typed word that is not on the list also uses your turn, with no slip.</p>';
      else if (lv.chips) h += '<p class="small">Pencil suggests the word. Lock makes it final.</p>';
      h += '</div>';
    } else h += '<p class="small">Tap one of your clues, then pencil or lock a word.</p>';
    h += '<div class="lab">Add a note for your partner (optional)</div><p class="small">A note rides along with your move. Your partner sees it until they move.</p><div class="chips notes">';
    NOTES.forEach((c) => { h += '<button class="chip" aria-pressed="' + (ctx.chip === c[0]) + '" data-a="chip-' + c[0] + '"><b>' + c[1] + '</b><span>' + c[2] + '</span></button>'; });
    h += '</div><button class="btn alt" data-a="do-pass">Pass this turn</button>';
  }
  h += '<div class="menu"><button data-a="back-levels">Levels</button><button data-a="rules">How to play</button>' + (ctx.mode === 'duo' ? '<button data-a="leave">Leave desk</button>' : '') + '</div>';
  return h;
}
function resultHTML(g) {
  const lv = lvOf(g.level), st = g.state, won = st.status === 'won', stars = starsFor(st, lv);
  let h = '<div class="mast"><span>Level ' + lv.n + '</span><span>' + (won ? 'Cleared' : 'Not this time') + '</span></div>';
  h += postHTML(lv.n) + '<div class="cover" style="min-height:0;padding:12px 0"><div class="stamp slam">' + (won ? 'Cleared' : st.reason === 'slips' ? 'Three slips' : 'Out of turns') + '</div>';
  if (won) {
    const words = lv.slots.map((s) => st.locked[s.id]), ok = Engine.sha256(lv.salt + ':' + words.join('|')) === lv.hash;
    h += '<div class="stars" aria-label="' + stars + ' of 3 stars">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>' + boardHTML(lv, st, 'A', false) +
      '<span class="seal">' + (ok ? 'Answer checked' : 'Answer does not match') + '</span><p class="small">' + (st.turn - 1) + ' turns, ' + st.slips + ' slip' + (st.slips === 1 ? '' : 's') + '.</p>';
    if (lv.recap) h += '<p class="small" style="text-align:left">' + esc(lv.recap) + '</p>';
    h += '<div class="row">' + (lv.n < levels.length ? '<button class="btn" data-a="level-' + (lv.n + 1) + '">Next level</button>' : '') + '<button class="btn alt" data-a="back-levels">Levels</button></div>';
  } else {
    h += '<p class="small">The answer stays sealed. Same level, fresh start.</p><div class="row"><button class="btn" data-a="level-' + lv.n + '">Try again</button><button class="btn alt" data-a="back-levels">Levels</button></div>';
  }
  return h + '</div>';
}
function coverHTML(g) {
  const st = g.state;
  return '<div class="mast"><span>Level ' + g.level + '</span><span>Pass the phone</span></div><div class="cover">' + postHTML(g.level) + '<h2 class="title" style="font-size:34px">Desk ' + st.active + ' is up</h2><p class="deck">Hand the phone over. Tap when only Desk ' + st.active + ' is looking.</p><button class="btn" data-a="uncover">I am Desk ' + st.active + '</button></div>';
}
function render() {
  const wi = document.activeElement && document.activeElement.id === 'wordIn', caret = wi ? document.activeElement.selectionStart : 0;
  const g = curGame();
  const needRules = g && lvOf(g.level).tutorial && g.state.status === 'play' && !ctx.rulesSeen && (ctx.mode === 'hot' || mySeat());
  let html, theme = null;
  if (ctx.view === 'rules' || needRules) html = rulesHTML();
  else if (!ctx.mode || !g) html = lobbyHTML();
  else if (g.state.status !== 'play') { html = resultHTML(g); theme = g.level; }
  else if (ctx.mode === 'hot') { html = ctx.cover ? coverHTML(g) : playHTML(g, g.state.active); theme = g.level; }
  else { const seat = mySeat(); html = seat ? playHTML(g, Engine.deskFor(seat, g.level), true) : lobbyHTML(); if (seat) theme = g.level; }
  applyTheme(theme);
  app.innerHTML = html;
  const w = $('#wordIn');
  if (w) { w.addEventListener('input', () => { ctx.draft = w.value.replace(/[^a-zA-Z]/g, '').toLowerCase(); w.value = ctx.draft; }); if (wi) { w.focus(); try { w.setSelectionRange(caret, caret); } catch (e) {} } }
  if (ctx.flash) { const cls = ctx.flash === 'jam' || ctx.flash === 'clash' ? 'shake' : ctx.flash === 'lock' ? 'press' : ''; if (cls) { const b = $('.board'); if (b) b.classList.add(cls); } ctx.flash = null; }
}

// ---------- moves ----------
function afterMove(ev, by, lv) {
  const m = describe(ev, by, lv, true); setMsg(m.t, m.k);
  if (NOOP.indexOf(ev.type) < 0) { ctx.chip = null; ctx.draft = ''; ctx.sel = null; ctx.flash = ev.type; return true; }
  return false;
}
async function act(action) {
  if (ctx.busy) return;
  const g = curGame(); if (!g) return;
  if ((action.type === 'pencil' || action.type === 'lock') && !ctx.draft) { setMsg('Choose a word first.', ''); render(); return; }
  if (action.type === 'pencil' || action.type === 'lock') action.word = ctx.draft;
  action.chip = ctx.chip || undefined;
  const lv = lvOf(g.level);
  if (ctx.mode === 'hot') {
    const by = g.state.active, r = Engine.apply(g.state, lv, by, action);
    const changed = afterMove(r.event, by, lv);
    if (changed) { g.state = r.state; ctx.cover = r.state.status === 'play'; if (r.state.status === 'won') ctx.cleared[g.level] = Math.max(ctx.cleared[g.level] || 0, starsFor(r.state, lv)); }
    render(); return;
  }
  ctx.busy = true;
  try { const res = await ctx.sync.act(action); afterMove(res.event, res.seat, lv); }
  catch (e) { setMsg(errText(e), 'bad'); }
  ctx.busy = false; render();
}
async function startLevel(n) {
  const cl = clearedMap(); if (n > 1 && !(cl[n - 1] > 0)) return;
  if (ctx.mode === 'hot') { ctx.hot = { level: n, state: Engine.newState(lvOf(n)) }; ctx.sel = null; ctx.draft = ''; ctx.chip = null; ctx.cover = true; setMsg('', ''); render(); return; }
  if (ctx.busy) return; ctx.busy = true;
  try { await ctx.sync.startLevel(n); } catch (e) { setMsg(errText(e), 'bad'); }
  ctx.busy = false; ctx.sel = null; ctx.draft = ''; ctx.chip = null; setMsg('', ''); render();
}
async function backToLevels() {
  if (ctx.mode === 'hot') { ctx.hot = null; ctx.sel = null; render(); return; }
  if (ctx.busy) return; ctx.busy = true;
  try { await ctx.sync.backToLevels(); } catch (e) { setMsg(errText(e), 'bad'); }
  ctx.busy = false; ctx.sel = null; render();
}
async function seatOp(fn) {
  if (ctx.busy) return; ctx.busy = true;
  try { const r = await fn(); if (r && r.ok === false) setMsg('That desk is already taken.', 'bad'); else setMsg('', ''); }
  catch (e) { setMsg(errText(e), 'bad'); }
  ctx.busy = false; render();
}

// ---------- shared game connection ----------
function onDoc(d) {
  const prev = ctx.doc; ctx.doc = d; ctx.net = 'ok';
  const seat = mySeat();
  if (seat && d.game && d.last && d.last.by !== Engine.deskFor(seat, d.game.level) && d.last.rev > ctx.lastRevShown && d.game) {
    const m = describe(d.last.ev, d.last.by, lvOf(d.game.level), false); setMsg(m.t, m.k); ctx.lastRevShown = d.last.rev; ctx.flash = d.last.ev.type;
  }
  if (prev && prev.game && d.game && prev.game.level !== d.game.level) { ctx.sel = null; ctx.draft = ''; ctx.chip = null; }
  if (prev && prev.game && !d.game) { ctx.sel = null; ctx.draft = ''; }
  render();
}
async function connect() {
  if (ctx.sync || ctx.net === 'connecting') return;
  ctx.net = 'connecting'; render();
  try {
    const [appM, fsM] = await Promise.all([import(SDK + 'firebase-app.js'), import(SDK + 'firebase-firestore.js')]);
    const fbApp = appM.initializeApp(FIREBASE);
    const db = fsM.initializeFirestore(fbApp, { experimentalAutoDetectLongPolling: true });
    ctx.sync = makeSync({ fs: fsM, db: db, room: room, uid: uid, Engine: Engine, levels: levels });
    const timer = setTimeout(() => { if (ctx.net === 'connecting') { ctx.net = 'error'; ctx.netNote = 'The shared game did not answer. Check your signal, then try again.'; render(); } }, 12000);
    ctx.sync.subscribe((d) => { clearTimeout(timer); onDoc(d); }, (e) => { clearTimeout(timer); ctx.net = 'error'; ctx.netNote = errText(e); render(); });
  } catch (e) {
    ctx.sync = null; ctx.net = 'error'; ctx.netNote = 'Could not load the shared-game library. Check your signal, then try again. One phone mode still works.'; render();
  }
}

// ---------- events ----------
app.addEventListener('click', (e) => {
  const b = e.target.closest('[data-a]'); if (!b) return; const a = b.getAttribute('data-a');
  if (a === 'mode-hot') { ctx.mode = 'hot'; ctx.hot = null; render(); }
  else if (a === 'mode-duo') { ctx.mode = 'duo'; connect(); render(); }
  else if (a === 'retry') { ctx.sync = null; ctx.net = 'idle'; connect(); }
  else if (a === 'mode-reset') { ctx.mode = null; ctx.hot = null; setMsg('', ''); render(); }
  else if (a === 'rules') { ctx.view = 'rules'; render(); }
  else if (a === 'rules-done') { ctx.view = null; ctx.rulesSeen = true; store('cw_rules', '1'); render(); }
  else if (a.indexOf('seat-') === 0) seatOp(() => ctx.sync.claim(a.slice(5)));
  else if (a === 'leave') seatOp(() => ctx.sync.leave(false));
  else if (a === 'clear-seats') seatOp(() => ctx.sync.leave(true));
  else if (a.indexOf('level-') === 0) startLevel(parseInt(a.slice(6), 10));
  else if (a === 'back-levels') backToLevels();
  else if (a === 'uncover') { ctx.cover = false; render(); }
  else if (a.indexOf('sel-') === 0) { ctx.sel = parseInt(a.slice(4), 10); ctx.draft = ''; render(); const w = $('#wordIn'); if (w) w.focus(); }
  else if (a.indexOf('word-') === 0) { ctx.draft = a.slice(5); render(); }
  else if (a.indexOf('chip-') === 0) { const c = a.slice(5); ctx.chip = ctx.chip === c ? null : c; render(); }
  else if (a === 'do-hint') { if (ctx.sel !== null) act({ type: 'hint', slot: ctx.sel }); }
  else if (a === 'do-pass') act({ type: 'pass' });
  else if (a === 'do-pencil') { if (ctx.sel !== null) act({ type: 'pencil', slot: ctx.sel }); }
  else if (a === 'do-lock') { if (ctx.sel !== null) act({ type: 'lock', slot: ctx.sel }); }
  else if (a === 'do-erase') { if (ctx.sel !== null) act({ type: 'erase', slot: ctx.sel }); }
});
app.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'wordIn') { e.preventDefault(); if (ctx.sel !== null) act({ type: 'pencil', slot: ctx.sel }); } });

window.__cw = { ctx: ctx, levels: levels, render: render };
render();
