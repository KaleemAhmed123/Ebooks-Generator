## Snapshots

- A **snapshot** is a periodic checkpoint of the folded state at some event number, so a rebuild starts from the snapshot and only replays what came after — the same idea as a stream processor restoring local state from a changelog tail (Module 12), applied to an event store's own aggregates

<svg viewBox="0 0 460 90" role="img" aria-label="Snapshots. Events zero to one hundred are folded to a snapshot at one hundred, then events one hundred one to one hundred four are replayed on top of it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="160" height="24" fill="none" stroke="#999"/>
  <text x="100" y="46" text-anchor="middle" font-size="7">events 0 – 100</text>
  <path d="M180 42 L230 42" stroke="#333" marker-end="url(#sn9)"/>
  <rect x="230" y="28" width="90" height="28" fill="none" stroke="#bf4c28"/>
  <text x="275" y="46" text-anchor="middle" font-size="7" fill="#bf4c28">snapshot @ 100</text>
  <path d="M320 42 L360 42" stroke="#333" marker-end="url(#sn9)"/>
  <rect x="360" y="32" width="80" height="20" fill="none" stroke="#333"/>
  <text x="400" y="46" text-anchor="middle" font-size="6.5">events 101 – 104</text>
  <defs><marker id="sn9" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- Without one, an aggregate with a hundred thousand events refolds all hundred thousand on every load. With one every thousand events, a load refolds at most 999
- The snapshot's shape must track the fold's shape. If the fold changes — a field renamed, a new derived value added — old snapshots still describe the old shape, and loading one without noticing hands the new code a value it does not expect

### The failure

- The fold gains a field, the snapshot code is not touched, and a rebuild silently loads snapshots missing that field as `undefined` instead of erroring. Version the snapshot schema, and refuse to load a version the current fold does not know
