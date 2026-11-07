import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildStandalone } from '../tools/build-standalone.mjs';
import { CAMERAS, CAST, NODES, PEOPLE, SECRETS } from '../story.js';
import {
  applyChoice,
  blankMeta,
  clockLabel,
  freshState,
  hydrate,
  noteProgress,
  play,
  relLabel,
  serialize,
  tiggyStations,
  validateGraph,
} from '../logic.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const HASHES = {
  'bhad-bunny.jpg': 'b4fbdb89104262d58ae5e6b4e130491ab88a78d2aa064f12518f7fa80857afa4',
  'bubba-beer-bot.jpg': 'a07b9c4fb1745375ed00db1197662fd87478dfe271899b9087cddc8ffb372ef2',
  'joey-cha-cha.jpg': '3d453c145f7ee7353e87ed0bf319cde8ac9fbe16c4c7e3985dd652f68ace2400',
  'chicken-pete.jpg': 'b774cf47fd26d640f468fc5920c1806b0e5a5e47e5a1ee9bd8dc75a5f0ecd077',
  'ticklish-tiggy.jpg': '815f6116ab0406a421c4840f47e5c1facf8939cfaf862d1426e7b3a79d0d65a7',
  'tatter-tot-tat.jpg': 'd4014a8ede8fd67baf583dbeee5147b89f21e36726dd996787ec62f3fccc43c5',
};

function untilNode(choiceIds, loopId, nodeId, max = 10) {
  let state = play(choiceIds);
  let steps = 0;
  while (state.node !== nodeId && !NODES[state.node].ending && steps < max) {
    state = applyChoice(state, loopId);
    steps += 1;
  }
  return state;
}

function assertTiggy(state) {
  assert.deepEqual(tiggyStations(state), ['Parts & Service']);
}

test('clock advances from midnight to six by turns, not by itself', () => {
  assert.equal(clockLabel(0), '12:00 AM');
  assert.equal(clockLabel(90), '1:30 AM');
  assert.equal(clockLabel(150), '2:30 AM');
  assert.equal(clockLabel(360), '6:00 AM');
  assert.equal(relLabel(0), 'New');
  assert.equal(relLabel(2), 'Charmed');
  assert.equal(relLabel(3), 'Devoted');
});

test('story graph is large, linked, and fully reachable', () => {
  const report = validateGraph();
  assert.deepEqual(report.errors, [], report.errors.join('\n'));
  assert.ok(report.story >= 25, `story nodes ${report.story}`);
  assert.ok(report.endings >= 5, `endings ${report.endings}`);
  assert.equal(report.reachable, Object.keys(NODES).length);
});

function untilEnding(choiceIds, loopId, max = 8) {
  let state = play(choiceIds);
  let steps = 0;
  while (!NODES[state.node].ending && steps < max) {
    state = applyChoice(state, loopId);
    steps += 1;
  }
  return state;
}

function finishAudit(state, proof) {
  assert.equal(state.node, 'tatter-arrival', `${state.node} power ${state.power} at ${state.minutes}`);
  let next = applyChoice(state, 'face-rules');
  next = applyChoice(next, 'rules-right');
  next = applyChoice(next, proof);
  return next;
}

test('scripted endings are actually reachable', () => {
  const direct = [
    ['ending-foam-manager', ['read-note', 'to-kitchen', 'cooler', 'listen-dough', 'tell-bubba', 'take-sip', 'foam-now']],
    ['ending-dough', ['read-note', 'to-kitchen', 'beer-talk', 'ask-dough', 'join-dough']],
    ['ending-fired-napkin', ['read-note', 'to-kitchen', 'leave-restroom', 'dismiss', 'double-down']],
    ['ending-pete-union', ['read-note', 'to-kitchen', 'leave-restroom', 'fix-soap', 'make-official']],
    ['ending-tickle-treaty', ['read-note', 'lock-up', 'unlock-hall', 'to-parts', 'step-in', 'open-treaty', 'sign-treaty']],
    ['ending-toilet-throne', ['read-note', 'to-kitchen', 'leave-restroom', 'into-stall', 'take-plunger', 'talk-toilet', 'claim-throne']],
    ['ending-prize-locked', ['strut', 'sneak-prize', 'climb-bin']],
  ];
  for (const [ending, path] of direct) {
    const state = play(path);
    assert.equal(state.node, ending, `${ending} via ${path.join(' > ')} landed on ${state.node}`);
    assertTiggy(state);
  }

  const audited = [
    ['ending-dawn-closer', ['read-note', 'lock-up', 'unlock-hall', 'to-party', 'leave-for-jazz', 'dance-crisis', 'to-diplomacy', 'mop-heroes'], 'long-mop', 'present-work'],
    ['ending-staff-picnic', ['read-note', 'lock-up', 'unlock-hall', 'to-party', 'leave-for-jazz', 'dance-crisis', 'to-diplomacy', 'mop-heroes', 'invite-out', 'staff-picnic'], 'long-mop', 'present-work'],
    ['ending-parking-joey', ['strut', 'dance', 'encore-flirt', 'date-ask'], 'wait-joey', 'present-work'],
  ];
  for (const [ending, path, loop, proof] of audited) {
    const atDoor = untilNode(path, loop, 'tatter-arrival');
    const state = finishAudit(atDoor, proof);
    assert.equal(state.node, ending, `${ending} landed on ${state.node}`);
    assert.equal(state.flags.tatterCleared, true);
    assert.equal(state.minutes, 360);
    assert.ok(state.power > 0, `${ending} power ${state.power}`);
    assertTiggy(state);
  }

  const bubbaDoor = untilNode(['read-note', 'to-kitchen', 'keg-flirt', 'ask-date'], 'wait-bubba', 'tatter-arrival');
  let bubba = applyChoice(bubbaDoor, 'face-rules');
  bubba = applyChoice(bubba, 'rules-right');
  bubba = applyChoice(bubba, 'slip-for-proof');
  bubba = applyChoice(bubba, 'prep-slice');
  bubba = applyChoice(bubba, 'present-slice');
  assert.equal(bubba.node, 'ending-parking-bubba');
  assert.equal(bubba.minutes, 360);
  assert.ok(bubba.power > 0);
  assertTiggy(bubba);

  for (const [ending, path, loop] of [
    ['ending-blackout-huddle', ['open-cams', 'more-rooms', 'stare'], 'keep'],
    ['ending-blackout-polka', ['strut', 'dance', 'cams-from-dance'], 'keep'],
    ['ending-blackout-keg', ['read-note', 'to-kitchen', 'cooler', 'cams-from-cooler'], 'keep'],
  ]) {
    const state = untilEnding(path, loop);
    assert.equal(state.node, ending, `${ending} landed on ${state.node}`);
    assert.equal(state.power, 0);
    assert.ok(state.minutes < 300);
    assertTiggy(state);
  }
});

test('the auditor is a fair puzzle and resources do not respawn', () => {
  const door = untilNode(
    ['read-note', 'to-kitchen', 'leave-restroom', 'fix-soap', 'enough-rules', 'to-kitchen-hall', 'beer-talk', 'take-slice', 'to-party', 'leave-for-jazz', 'dance-crisis', 'to-diplomacy', 'mop-heroes'],
    'long-mop',
    'tatter-arrival',
  );
  assert.ok(door.power > 0, `prepared power ${door.power}`);
  assert.ok(door.inventory.includes('slice'));
  assert.equal(door.flags.soapFixed, true);
  assert.equal(door.flags.readRules, true);
  let won = applyChoice(door, 'face-rules');
  won = applyChoice(won, 'rules-right');
  won = applyChoice(won, 'present-slice');
  assert.equal(won.node, 'ending-dawn-closer');
  assert.equal(won.flags.tatterCleared, true);
  assert.equal(won.inventory.includes('slice'), false);

  let missed = applyChoice(door, 'face-rules');
  missed = applyChoice(missed, 'rules-jazz');
  assert.equal(missed.node, 'tatter-rules');
  assert.equal(missed.flags.auditStrike, true);
  missed = applyChoice(missed, 'rules-chair');
  assert.equal(missed.node, 'ending-audit-failed');
  assert.notEqual(missed.flags.tatterCleared, true);

  let empty = applyChoice(door, 'face-rules');
  empty = applyChoice(empty, 'rules-right');
  const withoutSlice = { ...empty, inventory: empty.inventory.filter((id) => id !== 'slice') };
  empty = applyChoice(withoutSlice, 'present-fuse');
  assert.equal(empty.node, 'tatter-offering');
  assert.equal(empty.flags.offeringMiss, true);
  empty = applyChoice(empty, 'present-fuse');
  assert.equal(empty.node, 'ending-audit-failed');

  let office = freshState();
  office.node = 'office-hold';
  office = applyChoice(office, 'breadstick');
  const fed = office.power;
  office = applyChoice(office, 'breadstick');
  office = applyChoice(office, 'breadstick');
  assert.ok(office.power < fed, `breadstick farm ${fed} -> ${office.power}`);

  let dock = freshState();
  dock.node = 'loading-dock';
  dock = applyChoice(dock, 'kill-sign');
  const saved = dock.power;
  dock = applyChoice(dock, 'kill-sign');
  dock = applyChoice(dock, 'kill-sign');
  assert.ok(dock.power < saved, `sign farm ${saved} -> ${dock.power}`);
});

test('inventory, relationships, cameras, and secrets change the night', () => {
  const sliced = play(['read-note', 'to-kitchen', 'beer-talk', 'take-slice']);
  assert.ok(sliced.inventory.includes('slice'));
  assert.equal(sliced.node, 'hall-patrol');
  assert.ok(sliced.rel.bubba >= 2);
  assert.ok(sliced.minutes > 0);

  const crisis = play(['read-note', 'lock-up', 'unlock-hall', 'to-party', 'leave-for-jazz']);
  assert.equal(crisis.node, 'party-room-crisis');
  assert.ok(crisis.cams['Party Room'].includes(PEOPLE.joey));
  assert.ok(crisis.cams['Party Room'].includes(PEOPLE.pete));
  assert.ok(crisis.cams.Kitchen.includes(PEOPLE.bubba));
  assert.deepEqual(tiggyStations(crisis), ['Parts & Service']);
  assert.equal(crisis.flags.sawTypo, true);

  const bare = freshState();
  bare.node = 'tickle-treaty-talk';
  assert.equal(applyChoice(bare, 'sign-treaty').node, 'tiggy-errand');
  bare.flags.tickled = true;
  assert.equal(applyChoice(bare, 'sign-treaty').node, 'ending-tickle-treaty');

  const flirt = freshState();
  flirt.node = 'joey-flirt';
  assert.equal(applyChoice(flirt, 'date-ask').node, 'joey-later');
  assert.equal(applyChoice(flirt, 'date-ask').flags.dateDenied, true);
  flirt.flags.dancedOnce = true;
  const dated = applyChoice(flirt, 'date-ask');
  assert.equal(dated.node, 'waiting-curb-joey');
  assert.equal(dated.flags.dateJoey, true);

  const box = freshState();
  box.node = 'fuse-box';
  assert.equal(applyChoice(box, 'install-fuse').node, 'supply-closet');
  box.inventory = ['fuse'];
  const powered = applyChoice(box, 'install-fuse');
  assert.equal(powered.flags.poweredUp, true);
  assert.ok(powered.power > box.power);
  assert.equal(powered.inventory.includes('fuse'), false);
});

test('save, load, and reset keep a valid shift and the night log', () => {
  const state = play(['read-note', 'to-kitchen', 'beer-talk', 'take-slice']);
  const raw = serialize(state);
  const back = hydrate(JSON.parse(JSON.stringify(raw)));
  assert.equal(back.node, state.node);
  assert.deepEqual(back.inventory, state.inventory);
  assert.equal(back.minutes, state.minutes);
  assert.equal(back.power, state.power);
  assert.deepEqual(back.rel, state.rel);
  assert.deepEqual(back.cams.Kitchen, state.cams.Kitchen);
  assert.deepEqual(tiggyStations(back), ['Parts & Service']);

  assert.equal(hydrate(null), null);
  assert.equal(hydrate({ v: 2, node: 'clock-in', minutes: 0, power: 1 }), null);
  assert.equal(hydrate({ v: 1, node: 'nope', minutes: 0, power: 1 }), null);
  assert.equal(hydrate({ v: 1, node: 'clock-in' }), null);

  const moved = hydrate({
    v: 1,
    node: 'parts-service',
    minutes: 40,
    power: 50,
    inventory: ['slice', 'not-real'],
    rel: { bubba: 9, tiggy: -9, pete: 1, joey: 0 },
    flags: { tickled: true, nope: 'x' },
    cams: { 'Party Room': [PEOPLE.tiggy, PEOPLE.joey], Kitchen: [PEOPLE.bubba] },
    location: 'Parts & Service',
    log: ['clock-in:read-note->corporate-note'],
  });
  assert.deepEqual(moved.inventory, ['slice']);
  assert.equal(moved.rel.bubba, 8);
  assert.equal(moved.rel.tiggy, -3);
  assert.equal(moved.flags.tickled, true);
  assert.equal(moved.flags.nope, undefined);
  assert.deepEqual(tiggyStations(moved), ['Parts & Service']);
  assert.ok(moved.cams['Party Room'].includes(PEOPLE.joey));

  const ending = play(['read-note', 'to-kitchen', 'cooler', 'listen-dough', 'tell-bubba', 'take-sip', 'foam-now']);
  const meta = noteProgress(blankMeta(), ending);
  assert.ok(meta.endings['ending-foam-manager']);
  const again = noteProgress(meta, ending);
  assert.equal(Object.keys(again.endings).length, 1);
  const reset = freshState();
  assert.equal(reset.node, 'clock-in');
  assert.equal(reset.minutes, 0);
  assert.deepEqual(reset.inventory, []);
  assert.ok(noteProgress(meta, reset).endings['ending-foam-manager']);
});

test('every choice can be followed a few turns without throwing or moving Tiggy', () => {
  const seen = new Set();
  function walk(state, depth) {
    assertTiggy(state);
    if (depth > 5 || seen.size > 4000) return;
    const key = [
      state.node,
      state.minutes,
      state.power,
      state.inventory.join(','),
      JSON.stringify(state.flags),
      JSON.stringify(state.rel),
    ].join('|');
    if (seen.has(key)) return;
    seen.add(key);
    const node = NODES[state.node];
    if (node.ending) return;
    for (const choice of node.choices) walk(applyChoice(state, choice.id), depth + 1);
  }
  walk(freshState(), 0);
  assert.ok(seen.size > 20);
});

test('cast photos are the exact supplied jpeg bytes', () => {
  assert.equal(CAST.length, 6);
  const expectedFiles = new Set(Object.keys(HASHES).map((name) => `assets/${name}`));
  for (const person of CAST) {
    assert.equal(expectedFiles.has(person.file), true, person.file);
    const name = person.file.split('/').pop();
    const bytes = readFileSync(join(root, 'assets', name));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), HASHES[name]);
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    assert.equal(bytes[2], 0xff);
  }
  const sums = readFileSync(join(root, 'assets', 'SHA256SUMS'), 'utf8');
  for (const [name, hash] of Object.entries(HASHES)) assert.ok(sums.includes(hash) && sums.includes(name));
});

test('ui keeps full-frame photos, no timer stress, and a visible parody line', () => {
  const css = readFileSync(join(root, 'styles.css'), 'utf8');
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const game = readFileSync(join(root, 'game.js'), 'utf8');
  assert.match(css, /object-fit:\s*contain/);
  assert.equal(css.includes('object-fit: cover'), false);
  assert.equal(game.includes('setInterval'), false);
  assert.match(html, /Not affiliated with or endorsed by/);
  assert.match(html, /Five Nights at Freddy's/);
  for (const person of CAST) assert.ok(html || person.file);
  const banned = ['cripple', 'wheelchair-bound', 'confined to a', 'retard', 'spaz', 'r-word'];
  const blob = JSON.stringify(NODES).toLowerCase() + JSON.stringify(CAST).toLowerCase() + JSON.stringify(SECRETS).toLowerCase();
  for (const word of banned) assert.equal(blob.includes(word), false, word);
  assert.ok(CAMERAS.length >= 8);
  assert.equal(SECRETS.length >= 8, true);
  const source = Object.values(NODES).map((node) => [
    node.title,
    typeof node.body === 'function' ? node.body.toString() : '',
    ...(node.choices || []).map((choice) => `${choice.label} ${choice.hint || ''} ${typeof choice.to === 'function' ? choice.to.toString() : ''}`),
  ].join('\n')).join('\n').toLowerCase();
  for (const word of banned) assert.equal(source.includes(word), false, word);
});

test('standalone file embeds the exact original jpeg bytes', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'freddy-')), 'play-offline.html');
  buildStandalone(out);
  buildStandalone(join(root, 'play-offline.html'));
  const html = readFileSync(out, 'utf8');
  const offline = html.replaceAll('http://www.w3.org/2000/svg', '');
  assert.equal(offline.includes('src="game.js"'), false);
  assert.equal(offline.includes('href="styles.css"'), false);
  assert.equal(offline.includes('https://'), false);
  assert.equal(offline.includes('http://'), false);
  assert.match(html, /object-fit:\s*contain/);
  for (const [name, hash] of Object.entries(HASHES)) {
    const key = `assets/${name}`;
    const marker = `"${key}":"data:image/jpeg;base64,`;
    const start = html.indexOf(marker);
    assert.ok(start > 0, name);
    const b64 = html.slice(start + marker.length, html.indexOf('"', start + marker.length));
    const bytes = Buffer.from(b64, 'base64');
    assert.equal(createHash('sha256').update(bytes).digest('hex'), hash);
    assert.deepEqual(bytes, readFileSync(join(root, 'assets', name)));
  }
});
