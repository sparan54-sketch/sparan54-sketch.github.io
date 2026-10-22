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

## Round 3 (Oct 21 2026, afternoon)
- [x] Jan 2027 replaced: Bravo removed -> Philly Food Crawl (key 13, stamp 🥨). 31 spots checked open via web Oct 2026 (seasonal water-ice shops flagged), OSM coords, two to-scale panels (whole city + Center City/South Philly detail). Jan 1 2027 = Fri, 31 days.
  Swaps from first draft after checks: Federal Donuts (closures) -> Jim's South St.; Joe's Steaks Torresdale (closed 2022) -> Joe's Fishtown (1 W Girard); Tony Luke's now "Tony and Nick's Steaks"; Franklin Fountain (could not confirm) -> Down Home Diner.
- [x] Map months (Jan, Mar): pinch/drag/wheel zoom via SVG viewBox, + / − / Fit buttons, default fit, tap still opens close-up (drag suppresses click). Zoom kept across 20 s sync re-render.
- [ ] Apr 16, May 17, Jun 18, Jul 19, Aug 20, Sep 21 (world map), Oct 2027 22 – data in months_themes.js
Next: write months_themes.js (TM(key,{...days:[[title,subtitle,emojis]...]})), add key to LIVE, deploy each.

## Round 3 — Apr–Oct 2027 (2026-10-21)
- LIVE: 10,11,12,13,14,15,16,17,18,19,20,21,22 (all months).
- Apr 🌷 spring (30d, starts Thu) · May ☕ coffee (31d, Sat) · Jun 🌴 tropical beaches (30d, Tue) · Jul 🎆 USA/fireworks (31d, Thu) · Aug 🎂 couple birthdays, enlarged figurines + balloons (31d, Sun) · Sep ✈️ world map, a country/landmark/flag per day (30d, Wed; zoom buttons) · Oct '27 🚀 space (31d, Fri).
- Verified: day counts match the calendar; all titles are unique within each month.
- Gaps: flag emoji appear as letters on some devices (e.g. Windows/headless Chrome); June/Sep coordinates were written from general knowledge, not web lookups.

## Round 4 — distinct layouts + Nov 2027 (2026-10-21)
- Layouts (all different): Oct'26 serpentine · Nov'26 Monopoly square loop · Dec spiral · Jan real Philly map · Feb heart · Mar real Old City map · Apr ring · May steam columns · Jun figure-eight · Jul star · Aug zigzag mountain climb · Sep world route · Oct'27 double orbit · Nov'27 platformer levels.
- Nov 2027 (key 23, 30 days, starts Mon): original pixel-platformer world — pipes, ? blocks, mushroom village, desert, underwater, clouds, ice, lava castle, dragon finale; unique titles every day. No franchise characters or logos.
- LIVE: 10–23.

## Round 5 (2026-10-21)
- Jan + Mar: rebuilt as single to-scale maps from real OpenStreetMap geometry (Overpass: roads + water), no inset, fit-to-map default, zoom. All 31 food + 31 bar addresses re-geocoded via Nominatim; Jan reordered into a route (Roxborough → N Philly → NE → Fishtown → Old City → Reading Terminal → South St → Italian Market → Passyunk → Oregon/Snyder).
- Oct 21–31, Nov, Dec 2026: every close-up has its own backdrop scene + caption + props (months_2026.js).
- Aug: couple moved to a summit spot under the subtitle.
- Dec 2027 (key 24): Christmas + beer winter activities, 🍺 stamp, snowflake layout. LIVE 10–24.

## Round 6 (2026-10-21)
- Dec 2027: 31 hand-drawn SVG scenes (dec27.js) + "That's us…" captions + foreground pieces (hot tub, lift chair, snowmobile, bar, sled…) and beers in hand. Snowflake path is now continuous (no jumps back to center).
- Oct 21–Dec 31 2026: one captioned couple moment per day (moments2026.js); random prop scatter hidden.
- PENDING: Jan–Nov 2027 moment rewrite (captions + composed scenes).

## Round 7 (2026-10-21)
- Feb: heart tiles evenly spaced by arc length (22 days) + days 23–28 on a drawn Cupid's arrow (arrowhead + fletching).
- Global no-overlap pass in render (tile size from pairwise spacing + box separation); test_overlap.py checks all months at 390px and 1280px → PASS.
- Captions: casual implied-subject style everywhere (capFix), no "That's us".
- art.js drawn-scene library; Jan 2027 moved to drawn food-crawl moments (jan_drawn.js).
- PENDING: Feb–Nov 2027 drawn moments; Oct 1–20 captions; 2026 upgrade to drawn quality.

## Round 8 (2026-10-21 ~5:50 PM ET) — photo backdrops + drawn months
- Per-day photo backdrops: assets/backdrops/YYYY-MM-DD.jpg (or .jpg.b64 data-URI fallback; the GitHub MCP can only write text, so we push .b64). Photo mode hides drawn layers; figurines + caption stay. Captions in src/photocaps.js.
- Workflow: `./addbd.sh YYYY-MM-DD /path.jpg "Caption"` (writes assets/backdrops/*.jpg/.b64 + photocaps.js), move source to incoming/done/, build, push .b64s (≤4 per push) + index.html + photocaps.js, then `python verify_bd.py K D1 D2` on live.
- LIVE photos: Oct, Nov, Dec 2026; Feb, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec 2027 (all days); Jan 2027 days 1,2,5,15,17 (user real photos). Next: sync test.
- March 2027 drawn close-ups LIVE (DRAWN=[14,15]); all pub-interior setting, props vary — could use more setting variety.
- Build: `DRAWN=[14] python3 build.py "$(cat SYNC_URL.txt)" 10,...,24` — DRAWN lists months whose drawn specs (months_drawn.js DS[k]) are enabled. Feb (14) live. March (15) spec written, under screenshot check.
- PENDING: Mar–Nov 2027 drawn specs; Oct 11–31 photos as they arrive in incoming/; 2026 drawn upgrade.
- Jan & Mar 2027: NO generated photos (user will send real ones later); skip them in the deploy order.
- Jan/Mar real user photos land in incoming/ one at a time (2027-01-01 Dalessandro's in); deploy when the month is complete or user asks.

## Round 9 (2026-10-21 ~6:40 PM ET)
- LIVE photos: Oct, Nov, Dec 2026; Feb, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec 2027 (all days); Jan 2027 days 1,2,5,15,17 (user real photos). Next: sync test.
- January 2027 REDONE: 31 restaurants from user list (Laurel + Bibou closed; Honeysuckle + Rosy's dropped), OSM-geocoded, route ~13.9 km, new OSMJ2 street data (osm/proc4.py builds osmdata.js: OSMJ, OSMJ2, OSMO, OSMM). Old Jan photos moved to incoming/old_jan/.
- October 2026 month view is now a spooky OSM map (OCTLOC in months_osm.js, OSMO data). Photos/captions unchanged.
- February arrow: single straight shaft, days 23–28 evenly along it inside the heart; heart path ends at day 22 next to the arrow entry. Feb 14 = heart-shaped box of chocolates (caption in months_drawn.js + photocaps.js).
- Next: Feb photos (when in incoming/), Apr–Dec 2027, then sync test. Jan/Mar wait for user's real photos.
- Jan real photos collected in incoming/ (2027-01-17 Little Water, landscape). Deploy in batches.
- 6:58 PM: Feb 2027 photos all 28 live (Feb 14 = generated chocolates photo), Feb arrow pinned straight (M[14].pin, app nudge respects T.pin). Close-up caption fix: fixCapOverlap() in app.src.html moves a caption card under the panel only when they overlap; test_capoverlap.py PASS all months at 390x844. test_mapanchor.py PASS. Jan real photos live: 1,2,5,15,17.
- MBARS (March bar coords) now lives at top of months_osm.js — don't drop it.

## Round 10 (Oct 21 2026, evening): real photos for Jan + Mar
- Jan 2027 real user photos (original files, no recompression, contain-fit below the top panel, caption low): days 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31. Centered: 11, 22, 26, 29, 31.
- Mar 2027 real bar exteriors (contain-fit, sign fully visible): 1 Paddy's, 2 Victoria Freehouse, 3 Monto, 4 National Mechanics, 5 Sassafras, 11 Tattooed Mom, 12 Bob & Barbara's, 14 Tavern on Camac, 15 Moriarty's, 13 Dirty Franks, 16 Fergie's, 17 McGillin's, 20 Tír na nÓg, 25 Bonner's, 31 Good Dog. 11/12/17 from Commons/official sites; 14/15/31 from official sites; others are user photos.
- Mar days still needing photos: 6-10, 18, 19, 21-24, 26-30.
- Low-res sources (upscaled ~1.1-2x at DPR 3): Jan 2; Mar 1, 2, 3, 4, 5, 16, 25.
- Oct 19 (Masonic Temple) and Oct 29 (bowling) use real user photos. Sep-Dec 2027 all live; sync test PASS.
- Jan 2027: all 31 days have real user photos.
- Stamps: Oct🎃 Nov🦃 Dec🎄 Jan🍽️ Feb💘 Mar☘️ Apr🌷 May☕ Jun🌴 Jul🎆 Aug🎂 Sep✈️ Oct🚀 Nov⭐ Dec🍺 (verified locally w/ mocked sync, no live writes)
- Removed all hand/floating props beside figurines in day view (CSS kills .figs::before/::after); verified 8 days across months.
- Jan map audit: 31 addresses re-geocoded via Nominatim (29 exact, Barclay Prime 49m, Alpen Rose 75m: both on the correct block, unchanged); grid/rivers/Broad/Market/I-95 match OSM; test_mapanchor + test_overlap PASS.
- Mar 6 Khyber Pass Pub real user photo (1500x1500 original, top-aligned).
- Mar 19 Molly Malloy's + Mar 21 Con Murphy's real user photos (originals).
- Mar 22 City Tap House + Mar 23 The Goat real user photos (interiors, centered).
- Mar 28 Locust Rendezvous real user photo (original, top-aligned).
- Mar 27 TenStone real user photo (original, top-aligned).
- Mar 9 The Twisted Tail real user photo (original, top-aligned).
- Mar 7 The Plough & the Stars real user photo (interior, centered).
- Mar 30 Misconduct Tavern real user photo (original, top-aligned).
- Mar 26 Grace Tavern real user photo (original, top-aligned).
- Mar 8 Cavanaugh's Headhouse real user photo (original, top-aligned).
- Mar 29 Fadó real user photo (original, top-aligned).
- Mar 10 O'Neals + Mar 18 Finn McCool's real user photos (originals, top-aligned).
- Mar 24 Cavanaugh's Rittenhouse real user photo (kept though closed, user OK). March complete: all 31 days real photos.
- Mar 18 Finn McCool's swapped to sharper square user photo.
- Aug 24 2027 (Amanda's birthday): extravagant board tile (glow gold-pink frame, crown, balloon, cake, 'Birthday!' ribbon, confetti, sparkles; no overlap, all tiles tappable) + user party photo backdrop (contain, banner visible) + figurines holding champagne bottles (him_bday.png/her_bday.png, this day only).
