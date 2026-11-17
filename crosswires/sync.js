// Shared game record on Firestore. One document per room: { rev, json }.
// Every change is a transaction, so two phones moving at once can never overwrite each other,
// and the engine's turn check runs inside the transaction.
export function makeSync({ fs, db, room, uid, Engine, levels }) {
  const ref = fs.doc(db, 'rooms', room);
  const blank = () => ({ rev: 0, seats: { A: null, B: null }, game: null, cleared: {}, last: null });
  const parse = (snap) => {
    if (!snap.exists()) return blank();
    try { return Object.assign(blank(), JSON.parse(snap.data().json)); } catch (e) { return blank(); }
  };
  async function edit(fn) {
    return fs.runTransaction(db, async (tx) => {
      const d = parse(await tx.get(ref));
      const out = fn(d);
      if (out && out.write) { d.rev += 1; tx.set(ref, { rev: d.rev, json: JSON.stringify(d) }); }
      return out ? out.result : undefined;
    });
  }
  const seatOf = (d) => (d.seats.A === uid ? 'A' : d.seats.B === uid ? 'B' : null);
  return {
    ref,
    seatOf,
    subscribe(onDoc, onErr) { return fs.onSnapshot(ref, (snap) => onDoc(parse(snap)), onErr); },
    claim(seat) {
      return edit((d) => {
        const other = seat === 'A' ? 'B' : 'A';
        if (d.seats[seat] && d.seats[seat] !== uid) return { result: { ok: false, why: 'taken' } };
        if (d.seats[other] === uid) d.seats[other] = null;
        d.seats[seat] = uid;
        return { write: true, result: { ok: true } };
      });
    },
    leave(force) {
      return edit((d) => {
        ['A', 'B'].forEach((k) => { if (d.seats[k] === uid || force) d.seats[k] = null; });
        return { write: true, result: { ok: true } };
      });
    },
    startLevel(n) {
      return edit((d) => {
        if (!seatOf(d)) return { result: { ok: false, why: 'no-seat' } };
        d.game = { level: n, state: Engine.newState(levels[n - 1]) };
        d.last = null;
        return { write: true, result: { ok: true } };
      });
    },
    backToLevels() {
      return edit((d) => {
        if (!seatOf(d)) return { result: { ok: false, why: 'no-seat' } };
        d.game = null; d.last = null;
        return { write: true, result: { ok: true } };
      });
    },
    act(action) {
      return edit((d) => {
        const seat = seatOf(d);
        if (!seat) return { result: { event: { type: 'no-seat' } } };
        if (!d.game) return { result: { event: { type: 'no-level' } } };
        const lv = levels[d.game.level - 1];
        const desk = Engine.deskFor(seat, d.game.level);
        const r = Engine.apply(d.game.state, lv, desk, action);
        if (r.state === d.game.state) return { result: { event: r.event, seat: desk } };
        d.game = { level: d.game.level, state: r.state };
        d.last = { rev: d.rev + 1, by: desk, ev: { type: r.event.type, slot: r.event.slot === undefined ? null : r.event.slot, dry: r.event.dry === undefined ? null : r.event.dry } };
        if (r.state.status === 'won') {
          const stars = r.state.slips > 0 ? 1 : (r.state.turn - 1) <= lv.slots.length + 2 * lv.hintCap ? 3 : 2;
          d.cleared[d.game.level] = Math.max(d.cleared[d.game.level] || 0, stars);
        }
        return { write: true, result: { event: r.event, seat: desk } };
      });
    },
  };
}
