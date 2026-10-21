# Our Board Calendar – progress

Live: https://sparan54-sketch.github.io/  (repo sparan54-sketch/sparan54-sketch.github.io, Pages from main root)
Shared storage: textdb.dev (no account) – URL in SYNC_URL.txt. Anyone with that URL can read/write.

## Build
`python3 build.py "$(cat SYNC_URL.txt)" 10,11,12,...` -> index.html (2nd arg = months shown live; month keys: 10-12 = Oct-Dec 2026, 13-15 = Jan-Mar 2027).
Work-in-progress months exist in source but only show with `?wip=1`.
Figures: him_s.png / her_s.png (base64 copies *.b64 in repo; decode with `base64 -d`).
Test: `python3 -m http.server 8765` then `venv/bin/python test_sync.py <url> <monthKey> <day>` (logs event in one browser, checks a second sees it, deletes it).

## Status
- [x] Oct, Nov, Dec 2026 – live
- [ ] Jan 2027 Bravo on Broadway (key 13)
- [ ] Feb 2027 Valentine dreamscape (key 14)
- [ ] Mar 2027 St. Patrick's Philly bar hop on street map (key 15)

## Next steps
Add next month config to M in app.src.html, test with ?wip=1, add key to LIVE list in build, push index.html + sources, verify live sync.
