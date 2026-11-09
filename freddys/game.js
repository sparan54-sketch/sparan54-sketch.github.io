import { CAST, ITEMS, CAMERAS, NODES, PEOPLE, SECRETS } from './story.js';
import { applyChoice, blankMeta, clockLabel, freshState, hydrate, noteProgress, nodeParagraphs, relLabel, serialize } from './logic.js';

const KEYS = {
  auto: 'freddys-autosave-v1',
  a: 'freddys-slot-a-v1',
  b: 'freddys-slot-b-v1',
  meta: 'freddys-meta-v1',
  sound: 'freddys-sound-v1',
};

const REL_ORDER = [
  ['joey', PEOPLE.joey],
  ['bubba', PEOPLE.bubba],
  ['pete', PEOPLE.pete],
  ['tiggy', PEOPLE.tiggy],
];

let state = freshState();
let meta = blankMeta();
let soundOn = false;
let audioCtx = null;
let toastText = '';

function assetUrl(file) {
  const map = globalThis.FREDDY_ASSET_DATA;
  if (map && map[file]) return map[file];
  return file;
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
}

function castById(id) {
  return CAST.find((person) => person.id === id) || CAST[0];
}

function portrait(file, alt, className) {
  const img = document.createElement('img');
  img.src = assetUrl(file);
  img.alt = alt;
  img.draggable = false;
  if (className) img.className = className;
  img.addEventListener('error', () => {
    const note = document.createElement('p');
    note.className = 'missing-photo';
    note.textContent = `Portrait file failed to load (${file}). No stand-in picture is shown.`;
    img.replaceWith(note);
  });
  return img;
}

function saveAuto() {
  writeJSON(KEYS.auto, serialize(state));
}

function saveMeta() {
  writeJSON(KEYS.meta, meta);
}

function blip() {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 494;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (err) {
    soundOn = false;
  }
}

function setSound(on) {
  soundOn = on;
  const button = document.getElementById('btn-sound');
  button.setAttribute('aria-pressed', on ? 'true' : 'false');
  button.textContent = on ? 'Sound on' : 'Sound off';
  try { localStorage.setItem(KEYS.sound, on ? 'on' : 'off'); } catch (err) { /* ignore */ }
}

function youAreHere(room) {
  if (state.location === room) return true;
  if (state.location === 'Walk-in Cooler' && room === 'Kitchen') return true;
  return false;
}

function renderCrew() {
  const crew = document.getElementById('crew');
  crew.replaceChildren();
  const active = NODES[state.node].speaker;
  for (const person of CAST) {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'listitem');
    button.setAttribute('aria-label', `Open ${person.name} in the cast gallery`);
    if (person.id === active) button.setAttribute('aria-current', 'true');
    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.append(portrait(person.file, person.alt));
    const label = document.createElement('small');
    label.textContent = person.short;
    button.append(thumb, label);
    button.addEventListener('click', () => openCast(person.id));
    crew.append(button);
  }
}

function renderStatus() {
  const node = NODES[state.node];
  document.getElementById('clock').textContent = clockLabel(state.minutes);
  document.getElementById('turn').textContent = String(state.log.length);
  document.getElementById('power').textContent = `${state.power}%`;
  document.getElementById('room').textContent = state.location || node.location;
  const word = document.getElementById('power-word');
  const card = document.getElementById('power-card');
  word.textContent = state.power <= 20 ? 'Low' : state.power >= 70 ? 'Steady' : 'Okay';
  card.classList.toggle('low', state.power <= 20);
  const pips = document.getElementById('pips');
  pips.setAttribute('aria-valuenow', String(state.power));
  pips.replaceChildren();
  for (let i = 0; i < 10; i += 1) {
    const pip = document.createElement('i');
    const mark = (i + 1) * 10;
    if (state.power >= mark) {
      pip.className = state.power <= 20 ? 'bad' : state.power <= 40 ? 'warn' : 'on';
    }
    pips.append(pip);
  }
}

function renderHero() {
  const node = NODES[state.node];
  const person = castById(node.speaker);
  const hero = document.getElementById('hero');
  hero.replaceChildren(portrait(person.file, person.alt));
  const name = document.getElementById('hero-name');
  const who = node.who || person.name;
  name.replaceChildren();
  const strong = document.createElement('strong');
  strong.textContent = who;
  name.append(strong, document.createTextNode(` · ${person.role}`));
}

function renderStory(focusTitle) {
  const node = NODES[state.node];
  const story = document.getElementById('story');
  story.replaceChildren();
  const title = document.createElement('h2');
  title.id = 'story-title';
  title.tabIndex = -1;
  title.textContent = node.title;
  const who = document.createElement('p');
  who.className = 'who';
  who.textContent = node.who || castById(node.speaker).name;
  story.append(title, who);
  for (const paragraph of nodeParagraphs(node, state)) {
    const p = document.createElement('p');
    p.textContent = paragraph;
    story.append(p);
  }
  const choices = document.getElementById('choices');
  choices.replaceChildren();
  if (node.ending) {
    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'action';
    again.dataset.action = 'restart-ending';
    again.textContent = 'Start a new shift';
    again.addEventListener('click', askRestart);
    const log = document.createElement('button');
    log.type = 'button';
    log.className = 'action';
    log.dataset.action = 'open-log';
    log.textContent = 'Open the night log';
    log.addEventListener('click', () => openCast());
    choices.append(again, log);
  } else {
    node.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'choice';
      button.dataset.choice = choice.id;
      const key = document.createElement('span');
      key.className = 'choice-key';
      key.textContent = String(index + 1);
      const copy = document.createElement('span');
      const label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = choice.label;
      copy.append(label);
      if (choice.hint) {
        const hint = document.createElement('span');
        hint.className = 'choice-hint';
        hint.textContent = choice.hint;
        copy.append(hint);
      }
      button.append(key, copy);
      button.addEventListener('click', () => choose(choice.id));
      choices.append(button);
    });
  }
  const live = document.getElementById('live');
  const first = nodeParagraphs(node, state)[0] || '';
  live.textContent = '';
  window.setTimeout(() => {
    live.textContent = `${node.title}. ${first}`;
  }, 30);
  if (focusTitle) title.focus();
}

function render(focusTitle) {
  meta = noteProgress(meta, state);
  saveMeta();
  saveAuto();
  renderCrew();
  renderStatus();
  renderHero();
  renderStory(focusTitle);
  const toast = document.getElementById('toast');
  if (toastText) {
    toast.hidden = false;
    toast.textContent = toastText;
  } else {
    toast.hidden = true;
    toast.textContent = '';
  }
}

function choose(id) {
  state = applyChoice(state, id);
  toastText = '';
  blip();
  closeModal();
  render(true);
}

function doRestart() {
  state = freshState();
  toastText = 'New shift. Your ending stamps stay in the night log.';
  try { localStorage.removeItem(KEYS.auto); } catch (err) { /* ignore */ }
  closeModal();
  render(true);
}

function wipeLog() {
  meta = blankMeta();
  saveMeta();
  toastText = 'Ending stamps and secrets cleared. This shift is still on the clock.';
  closeModal();
  render(false);
}

function openModal(title, build) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  const body = document.getElementById('modal-body');
  body.replaceChildren();
  build(body);
  modal.hidden = false;
  document.getElementById('modal-x').focus();
}

function closeModal() {
  document.getElementById('modal').hidden = true;
}

function askRestart() {
  openModal('Start this shift over?', (body) => {
    const p = document.createElement('p');
    p.textContent = 'The clock returns to 12:00 AM and your pockets empty. Ending stamps and secrets already in the night log stay put.';
    const yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'block';
    yes.id = 'yes-restart';
    yes.textContent = 'Start a new shift';
    yes.addEventListener('click', doRestart);
    const no = document.createElement('button');
    no.type = 'button';
    no.className = 'block';
    no.id = 'no-restart';
    no.textContent = 'Keep playing';
    no.addEventListener('click', closeModal);
    body.append(p, yes, no);
  });
}

function openCams() {
  openModal('Floor board', (body) => {
    const p = document.createElement('p');
    p.textContent = 'Rooms you can already account for. Peeking at the board is free. Staring into it until the breaker files a complaint is a story choice, and it spends power.';
    const list = document.createElement('ul');
    list.className = 'room-list';
    for (const room of CAMERAS) {
      const li = document.createElement('li');
      const people = state.cams[room] || [];
      const who = people.length ? people.join(', ') : 'Nobody stationed';
      const here = youAreHere(room) ? ' You are here.' : '';
      li.innerHTML = `<strong>${room}</strong><br>${who}${here ? `<span class="here">${here}</span>` : ''}`;
      list.append(li);
    }
    body.append(p, list);
  });
}

function openPockets() {
  openModal('Pockets', (body) => {
    const p = document.createElement('p');
    p.textContent = state.inventory.length
      ? 'Things you actually picked up. The lollipop in your hand stays in the photo, so it is not pocket inventory.'
      : 'Empty pockets. The swirl lollipop stays in your hand, where the photo put it.';
    const list = document.createElement('ul');
    list.className = 'item-list';
    for (const id of state.inventory) {
      const item = ITEMS[id];
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.name}</strong><br>${item.detail}`;
      list.append(li);
    }
    body.append(p, list);
  });
}

function openPeople() {
  openModal('People', (body) => {
    const p = document.createElement('p');
    p.textContent = 'How the shift feels about you. Words, not just a number, and nobody is a punchline for how they get around. Tatter Tot Tat is the auditor, not a relationship to farm.';
    const list = document.createElement('ul');
    list.className = 'rel-list';
    for (const [key, name] of REL_ORDER) {
      const li = document.createElement('li');
      li.textContent = `${name}: ${relLabel(state.rel[key])}`;
      list.append(li);
    }
    const boss = document.createElement('li');
    boss.textContent = state.flags.tatterCleared
      ? 'Tatter Tot Tat: audit passed'
      : (state.node.startsWith('tatter') ? 'Tatter Tot Tat: holding the stamp' : 'Tatter Tot Tat: not on the floor yet');
    list.append(boss);
    body.append(p, list);
  });
}

function slotRaw(key) {
  return readJSON(key);
}

function openSave() {
  openModal('Save and load', (body) => {
    const auto = document.createElement('p');
    auto.textContent = `Autosave is on. This shift is at ${clockLabel(state.minutes)}, turn ${state.log.length}, in ${state.location}.`;
    body.append(auto);
    for (const [key, label] of [[KEYS.a, 'Slot A'], [KEYS.b, 'Slot B']]) {
      const raw = slotRaw(key);
      const saved = raw ? hydrate(raw) : null;
      const info = document.createElement('p');
      info.textContent = saved
        ? `${label}: ${NODES[saved.node].title} · ${clockLabel(saved.minutes)} · ${saved.power}% power`
        : `${label}: empty`;
      const save = document.createElement('button');
      save.type = 'button';
      save.className = 'block';
      save.id = key === KEYS.a ? 'save-a' : 'save-b';
      save.textContent = `Save into ${label}`;
      save.addEventListener('click', () => {
        writeJSON(key, serialize(state));
        toastText = `${label} saved.`;
        closeModal();
        render(false);
      });
      const load = document.createElement('button');
      load.type = 'button';
      load.className = 'block';
      load.id = key === KEYS.a ? 'load-a' : 'load-b';
      load.textContent = `Load ${label}`;
      load.disabled = !saved;
      load.addEventListener('click', () => {
        const next = hydrate(readJSON(key));
        if (!next) {
          toastText = 'That slot was crumpled. Nothing loaded.';
        } else {
          state = next;
          toastText = `${label} loaded.`;
        }
        closeModal();
        render(true);
      });
      body.append(info, save, load);
    }
  });
}

function openCast(focusId) {
  openModal('Cast and night log', (body) => {
    const loaded = document.createElement('p');
    loaded.id = 'cast-status';
    loaded.textContent = 'Checking the five supplied portraits…';
    body.append(loaded);
    const list = document.createElement('div');
    list.className = 'cast-list';
    const images = [];
    for (const person of CAST) {
      const card = document.createElement('article');
      card.className = 'cast-card';
      card.id = `cast-${person.id}`;
      const frame = document.createElement('div');
      frame.className = 'frame';
      const img = portrait(person.file, person.alt);
      images.push(img);
      frame.append(img);
      const copy = document.createElement('div');
      const h = document.createElement('h3');
      h.textContent = person.name;
      const role = document.createElement('p');
      role.innerHTML = `<strong>${person.role}</strong>`;
      const blurb = document.createElement('p');
      blurb.textContent = person.blurb;
      copy.append(h, role, blurb);
      card.append(frame, copy);
      list.append(card);
    }
    const endingCount = Object.keys(NODES).filter((id) => NODES[id].ending).length;
    const foundEndings = Object.keys(meta.endings || {}).length;
    const endHead = document.createElement('h3');
    endHead.textContent = `Endings clocked: ${foundEndings} / ${endingCount}`;
    const stamps = document.createElement('div');
    for (const id of Object.keys(NODES)) {
      if (!NODES[id].ending) continue;
      const stamp = document.createElement('div');
      stamp.className = 'stamp';
      if (meta.endings[id]) {
        stamp.innerHTML = `<strong>${meta.endings[id].title}</strong><br>${NODES[id].epilogue || ''}`;
      } else {
        stamp.textContent = 'Locked ending. Another shift can find it.';
      }
      stamps.append(stamp);
    }
    const secretHead = document.createElement('h3');
    const foundSecrets = SECRETS.filter((secret) => meta.secrets[secret.id]).length;
    secretHead.textContent = `Secrets found: ${foundSecrets} / ${SECRETS.length}`;
    const secretList = document.createElement('div');
    for (const secret of SECRETS) {
      const stamp = document.createElement('div');
      stamp.className = 'stamp';
      if (meta.secrets[secret.id]) {
        stamp.innerHTML = `<strong>${secret.name}</strong><br>${secret.detail}`;
      } else {
        stamp.textContent = 'Hidden stamp. Still somewhere on the floor.';
      }
      secretList.append(stamp);
    }
    const wipe = document.createElement('button');
    wipe.type = 'button';
    wipe.className = 'block';
    wipe.id = 'wipe-log';
    wipe.textContent = 'Erase ending stamps';
    wipe.addEventListener('click', () => {
      if (wipe.dataset.confirm === 'yes') wipeLog();
      else {
        wipe.dataset.confirm = 'yes';
        wipe.textContent = 'Really erase the stamps?';
      }
    });
    body.append(list, endHead, stamps, secretHead, secretList, wipe);
    window.setTimeout(() => {
      const ok = images.filter((img) => img.complete && img.naturalWidth > 0).length;
      const failed = images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.alt);
      loaded.textContent = ok === CAST.length
        ? `All ${CAST.length} supplied portraits loaded, full frame.`
        : `${ok} of ${CAST.length} portraits loaded. ${failed.length ? 'A file failed and no stand-in is shown.' : 'Still checking.'}`;
    }, 400);
    if (focusId) {
      const card = document.getElementById(`cast-${focusId}`);
      if (card) card.scrollIntoView({ block: 'nearest' });
    }
  });
}

function onKey(event) {
  if (event.key === 'Escape' && !document.getElementById('modal').hidden) {
    closeModal();
    return;
  }
  if (!document.getElementById('modal').hidden) return;
  if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) return;
  if (/^[1-4]$/.test(event.key)) {
    const button = document.querySelectorAll('#choices .choice')[Number(event.key) - 1];
    if (button) {
      event.preventDefault();
      button.click();
    }
  }
}

function boot() {
  meta = readJSON(KEYS.meta) || blankMeta();
  if (!meta.endings || !meta.secrets) meta = blankMeta();
  const raw = readJSON(KEYS.auto);
  const resumed = raw ? hydrate(raw) : null;
  if (raw && !resumed) toastText = 'That autosave was crumpled. New shift.';
  state = resumed || freshState();
  try { soundOn = localStorage.getItem(KEYS.sound) === 'on'; } catch (err) { soundOn = false; }
  setSound(soundOn);
  document.getElementById('btn-sound').addEventListener('click', () => {
    setSound(!soundOn);
    if (soundOn) blip();
  });
  document.getElementById('btn-cams').addEventListener('click', openCams);
  document.getElementById('btn-pockets').addEventListener('click', openPockets);
  document.getElementById('btn-people').addEventListener('click', openPeople);
  document.getElementById('btn-save').addEventListener('click', openSave);
  document.getElementById('btn-cast').addEventListener('click', () => openCast());
  document.getElementById('btn-restart').addEventListener('click', askRestart);
  document.getElementById('modal-x').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target.id === 'modal') closeModal();
  });
  document.addEventListener('keydown', onKey);
  render(false);
  globalThis.__FREDDY = {
    getState: () => state,
    getMeta: () => meta,
    apply: (id) => choose(id),
    restart: () => doRestart(),
  };
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
