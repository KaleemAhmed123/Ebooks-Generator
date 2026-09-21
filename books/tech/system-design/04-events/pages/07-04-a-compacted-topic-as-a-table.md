## A compacted topic as a table

- Kafka Streams calls it **stream-table duality**. A stream is a table's changelog: every update, in order. A table is a stream folded to the latest value per key. Either can be rebuilt from the other, and a compacted topic is the smallest stream that still folds to the same table

<svg viewBox="0 0 460 120" role="img" aria-label="Stream-table duality. Left, a stream of changes: user 1 set to Ann, user 2 set to Bo, user 1 set to Anne. Right, the table those changes build: user 1 is Anne, user 2 is Bo. An arrow from stream to table is labelled fold, latest per key; an arrow from table to stream is labelled changelog." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="90" y="18" text-anchor="middle" font-weight="bold">stream</text>
  <g stroke="#333" fill="#fff"><rect x="20" y="28" width="140" height="18"/><rect x="20" y="50" width="140" height="18"/><rect x="20" y="72" width="140" height="18"/></g>
  <text x="26" y="40" font-size="7.5">key 1 → "Ann"</text>
  <text x="26" y="62" font-size="7.5">key 2 → "Bo"</text>
  <text x="26" y="84" font-size="7.5">key 1 → "Anne"</text>
  <text x="370" y="18" text-anchor="middle" font-weight="bold">table</text>
  <g stroke="#333" fill="#fff"><rect x="300" y="28" width="140" height="18"/><rect x="300" y="50" width="140" height="18"/></g>
  <text x="306" y="40" font-size="7.5">1 · "Anne"</text>
  <text x="306" y="62" font-size="7.5">2 · "Bo"</text>
  <line x1="165" y1="46" x2="295" y2="46" stroke="#333" marker-end="url(#h)"/>
  <text x="230" y="41" text-anchor="middle" font-size="7.5">fold: latest value per key</text>
  <line x1="295" y1="74" x2="165" y2="74" stroke="#333" marker-end="url(#h)"/>
  <text x="230" y="86" text-anchor="middle" font-size="7.5">changelog: every update, in order</text>
  <text x="20" y="112" font-size="7.5" fill="#555">A compacted topic is the shortest stream that still folds to this table.</text>
  <defs><marker id="h" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- This is what a compacted topic is for: a `users` topic keyed by user id is the users table, readable by any service that folds it into a local copy. A new service reads from zero and has the whole table; from then on it reads updates. No API call to the owning service, no cache to invalidate
- It is also why event sourcing (Module 9) and change data capture (Module 8) both land on Kafka: a database's changelog, in a compacted topic, is the database, as a stream anyone can fold
- The fold must be per key and in order, which is what the key-to-partition rule (Module 4) gives. Two partitions can be at different points in time; one key never is

### The failure

- Reading from zero as a consistent snapshot. The fold runs while writes continue; key A is read at Monday's value and key Z at Wednesday's, and no moment ever had both. A compacted topic gives the latest value per key, not a point-in-time view across keys. Anything that needs all keys as of one instant needs a real snapshot (Module 9, page 3) or the source database's transaction
