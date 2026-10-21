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
- [x] Jan 2027 Bravo on Broadway (key 13) – live, stamp 🥂, marquee + playbill per day (31 real Bravo shows/casts at 31 real Broadway theatres)
- [x] Feb 2027 Valentine dreamscape (key 14) – live, stamp 💘, Feb 14 = Valentine's Day Palace
- [x] Mar 2027 St. Patrick's Philly bar hop (key 15) – live, stamp ☘️, simplified Center City street grid, 31 real bars at approx. real spots, Mar 17 = McGillin's
- Live sync verified on https://sparan54-sketch.github.io/ (two browsers, add + delete)

## Next steps
Next months (Apr 2027+ = key 16+): add config to months2027.js (or a new file) , test with ?wip=1, add key to LIVE list in build, push index.html + sources, verify live sync.

Note: the GitHub MCP file tool decodes HTML entities (&amp; etc.) – never put literal entities in source.
Source files: src/app.src.html (+ src/months2027.js injected at /*__M2027__*/).

## Fact-check pass (Oct 21 2026)
- March bars verified open via web (Inquirer, PhillyMag, official sites, Visit Philly); replaced closed: Sugar Mom's (closed 2013) -> The Victoria Freehouse; Mac's Tavern (closed 2025) -> The Monto (same address); Dark Horse (closed) -> Cavanaugh's Headhouse (same address); The Irish Pub (closed 2019/2020) -> Finn McCool's; McGlinchey's (closed 2025) -> Tír na nÓg; The Black Sheep (fire, May 2026) -> The Goat Rittenhouse; The Bards (closed 2020) -> Molly Malloy's; Doobies (closed) -> The Twisted Tail. Moved: Cavanaugh's Rittenhouse -> 1921 Sansom; City Tap Logan -> 100 N 18th St.
- March map: OSM Nominatim coords, projected to km and rotated 9.2° to the street grid; streets/avenues placed from geocoded addresses (7th & Pine interpolated). Tiles nudged off true spot when crowded, with a leader line to a gold dot at the true spot.
- January: casts checked on Bravo/Wikipedia; fixes listed in commit. Minifig-style generic crew per show added (SVG, no logos).
