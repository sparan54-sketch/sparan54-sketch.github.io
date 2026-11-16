# Crosswires

A two-player word game. Each player holds half the clues and sees only their own, so the two of you have to work out the grid together.

- `index.html`, `main.js`: the page and the game screens
- `engine.js`: the rules (turns, pencil and lock, slips, answer check)
- `data.js`: the 10 levels. Every level has exactly one answer.
- `sync.js`: saves the shared game in Firestore (project `crosswires-7be48`, collection `rooms`)

Add `?room=name` to the link to play in a separate room.
