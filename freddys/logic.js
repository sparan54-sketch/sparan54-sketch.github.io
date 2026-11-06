import { CAMERAS, ITEMS, NODES, PEOPLE, SECRETS, ensureTiggy } from './story.js';

const REL_KEYS = ['bubba', 'tiggy', 'pete', 'joey'];
const PERSON_NAMES = Object.values(PEOPLE);

export function clockLabel(minutes) {
  const m = clamp(minutes | 0, 0, 360);
  const h = Math.floor(m / 60);
  const min = m % 60;
  const hour = h === 0 ? 12 : h;
  return `${hour}:${String(min).padStart(2, '0')} AM`;
}

export function relLabel(n) {
  if (n <= -2) return 'Icy';
  if (n === -1) return 'Frosty';
  if (n === 0) return 'New';
  if (n === 1) return 'Warm';
  if (n === 2) return 'Charmed';
  return 'Devoted';
}

export function freshState() {
  const cams = {};
  for (const room of CAMERAS) cams[room] = [];
  const state = {
    node: 'clock-in',
    minutes: 0,
    power: 76,
    inventory: [],
    rel: { bubba: 0, tiggy: 0, pete: 0, joey: 0 },
    flags: {},
    cams,
    location: 'Office',
    log: [],
  };
  state.cams['Show Stage'] = [PEOPLE.joey];
  state.cams.Kitchen = [PEOPLE.bubba];
  state.cams.Restrooms = [PEOPLE.pete];
  state.cams['Parts & Service'] = [PEOPLE.tiggy];
  return state;
}

export function blankMeta() {
  return { v: 1, endings: {}, secrets: {} };
}

export function noteProgress(meta, state) {
  const base = meta && meta.v === 1 ? meta : blankMeta();
  const next = {
    v: 1,
    endings: { ...base.endings },
    secrets: { ...base.secrets },
  };
  const node = NODES[state.node];
  if (node && node.ending && !next.endings[node.id]) {
    next.endings[node.id] = { title: node.title, turns: state.log.length };
  }
  for (const secret of SECRETS) {
    if (state.flags[secret.id]) next.secrets[secret.id] = true;
  }
  return next;
}

function cloneState(state) {
  const cams = {};
  for (const room of CAMERAS) cams[room] = [...(state.cams[room] || [])];
  return {
    node: state.node,
    minutes: state.minutes,
    power: state.power,
    inventory: [...state.inventory],
    rel: { ...state.rel },
    flags: { ...state.flags },
    cams,
    location: state.location,
    log: [...state.log],
  };
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function call(value, pre) {
  return typeof value === 'function' ? value(pre) : value;
}

function asList(value, pre) {
  const v = call(value, pre);
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function choiceTargets(choice) {
  if (choice.edges && choice.edges.length) return choice.edges.slice();
  if (typeof choice.to === 'string') return [choice.to];
  return [];
}

export function pickDawn(state) {
  if (state.flags.picnic) return 'ending-staff-picnic';
  if (state.flags.dateJoey) return 'ending-parking-joey';
  if (state.flags.dateBubba) return 'ending-parking-bubba';
  return 'ending-dawn-closer';
}

export function pickBlackout(state) {
  const joey = state.rel.joey;
  const bubba = state.rel.bubba;
  const pete = state.rel.pete;
  const tiggy = state.rel.tiggy;
  if (state.flags.dancedOnce && joey >= bubba && joey >= pete && joey >= tiggy) {
    return 'ending-blackout-polka';
  }
  if ((state.flags.coolerTrust || state.flags.sipped) && bubba >= joey && bubba >= pete && bubba >= tiggy) {
    return 'ending-blackout-keg';
  }
  return 'ending-blackout-huddle';
}

export function nodeParagraphs(node, state) {
  const body = typeof node.body === 'function' ? node.body(state) : node.body;
  return Array.isArray(body) ? body : [];
}

export function applyChoice(state, choiceId) {
  const node = NODES[state.node];
  if (!node) throw new Error(`Missing node ${state.node}`);
  const choice = (node.choices || []).find((c) => c.id === choiceId);
  if (!choice) throw new Error(`Missing choice ${choiceId} at ${state.node}`);
  const pre = state;
  const next = cloneState(pre);
  const timeDelta = choice.time == null ? 15 : call(choice.time, pre);
  const powerDelta = choice.power == null ? -1 : call(choice.power, pre);
  next.minutes = clamp(pre.minutes + timeDelta, 0, 360);
  next.power = clamp(pre.power + powerDelta, 0, 100);
  if (choice.setMinutes != null) next.minutes = clamp(choice.setMinutes, 0, 360);
  if (choice.setPower != null) next.power = clamp(choice.setPower, 0, 100);

  const removes = new Set(asList(choice.remove, pre));
  next.inventory = pre.inventory.filter((id) => !removes.has(id));
  for (const id of asList(choice.add, pre)) {
    if (ITEMS[id] && !next.inventory.includes(id)) next.inventory.push(id);
  }

  const relAdd = call(choice.rel, pre) || {};
  for (const key of REL_KEYS) {
    next.rel[key] = clamp((pre.rel[key] || 0) + (relAdd[key] || 0), -3, 8);
  }
  next.flags = { ...pre.flags, ...(call(choice.flag, pre) || {}) };

  let dest = typeof choice.to === 'function' ? choice.to(pre) : choice.to;
  const forced = typeof choice.force === 'function' ? !!choice.force(pre) : !!choice.force;
  if (!forced) {
    if (next.minutes >= 360) dest = pickDawn(next);
    else if (next.power <= 0) dest = pickBlackout(next);
  }
  if (!NODES[dest]) throw new Error(`Bad destination ${dest} from ${pre.node}:${choice.id}`);
  next.node = dest;
  next.location = NODES[dest].location || pre.location;
  if (typeof NODES[dest].onEnter === 'function') NODES[dest].onEnter(next);
  ensureTiggy(next);
  next.log = [...pre.log, `${pre.node}:${choice.id}->${dest}`].slice(-120);
  return next;
}

export function serialize(state) {
  return { v: 1, ...cloneState(state) };
}

const LOCATIONS = new Set(CAMERAS.concat(['Walk-in Cooler']));

export function hydrate(raw) {
  if (!raw || typeof raw !== 'object' || raw.v !== 1 || !NODES[raw.node]) return null;
  if (typeof raw.minutes !== 'number' || typeof raw.power !== 'number') return null;
  const next = freshState();
  next.node = raw.node;
  next.minutes = clamp(raw.minutes, 0, 360);
  next.power = clamp(raw.power, 0, 100);
  next.inventory = Array.isArray(raw.inventory) ? raw.inventory.filter((id) => ITEMS[id]) : [];
  for (const key of REL_KEYS) {
    const n = raw.rel && raw.rel[key];
    next.rel[key] = clamp(typeof n === 'number' ? n : 0, -3, 8);
  }
  next.flags = {};
  if (raw.flags && typeof raw.flags === 'object') {
    for (const [key, value] of Object.entries(raw.flags)) {
      if (typeof key === 'string' && key.length < 40 && typeof value === 'boolean') next.flags[key] = value;
    }
  }
  if (raw.cams && typeof raw.cams === 'object') {
    for (const room of CAMERAS) {
      const list = raw.cams[room];
      next.cams[room] = Array.isArray(list)
        ? list.filter((name) => PERSON_NAMES.includes(name) && name !== PEOPLE.tiggy)
        : [];
    }
  }
  ensureTiggy(next);
  next.location = LOCATIONS.has(raw.location) ? raw.location : (NODES[next.node].location || 'Office');
  next.log = Array.isArray(raw.log) ? raw.log.filter((item) => typeof item === 'string').slice(-120) : [];
  return next;
}

export function validateGraph() {
  const errors = [];
  const ids = Object.keys(NODES);
  if (!NODES['clock-in']) errors.push('missing start');
  let story = 0;
  let endings = 0;
  for (const id of ids) {
    const node = NODES[id];
    const choices = node.choices || [];
    if (node.ending) {
      endings += 1;
      if (choices.length) errors.push(`${id} ending has choices`);
    } else {
      story += 1;
      if (choices.length < 2 || choices.length > 4) errors.push(`${id} choice count ${choices.length}`);
    }
    if (!node.title) errors.push(`${id} no title`);
    if (!node.location) errors.push(`${id} no location`);
    if (!node.speaker) errors.push(`${id} no speaker`);
    const text = nodeParagraphs(node, freshState()).join(' ');
    if (text.length < 320) errors.push(`${id} short body ${text.length}`);
    const seen = new Set();
    for (const choice of choices) {
      if (!choice.id || !choice.label || choice.label.length < 8) errors.push(`${id} bad choice label`);
      if (seen.has(choice.id)) errors.push(`${id} duplicate ${choice.id}`);
      seen.add(choice.id);
      const targets = choiceTargets(choice);
      if (!targets.length) errors.push(`${id} ${choice.id} no targets`);
      if (typeof choice.to === 'function' && !(choice.edges && choice.edges.length)) {
        errors.push(`${id} ${choice.id} function without edges`);
      }
      for (const target of targets) {
        if (!NODES[target]) errors.push(`${id} -> missing ${target}`);
      }
    }
  }
  if (story < 25) errors.push(`story nodes ${story}`);
  if (endings < 5) errors.push(`endings ${endings}`);
  const reach = new Set();
  const queue = ['clock-in'];
  while (queue.length) {
    const id = queue.pop();
    if (reach.has(id)) continue;
    reach.add(id);
    for (const choice of NODES[id].choices || []) {
      for (const target of choiceTargets(choice)) queue.push(target);
    }
  }
  for (const id of ids) if (!reach.has(id)) errors.push(`unreachable ${id}`);
  return { errors, story, endings, reachable: reach.size };
}

export function play(choiceIds, state = freshState()) {
  let next = state;
  for (const id of choiceIds) {
    if (NODES[next.node].ending) break;
    next = applyChoice(next, id);
  }
  return next;
}

export function tiggyStations(state) {
  const where = [];
  for (const room of CAMERAS) {
    if ((state.cams[room] || []).includes(PEOPLE.tiggy)) where.push(room);
  }
  return where;
}
