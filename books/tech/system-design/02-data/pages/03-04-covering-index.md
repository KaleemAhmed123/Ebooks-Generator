## The covering index

- The cost of an index is the second hop (the random jump from the B-tree to the heap). A **covering index** eliminates this hop by storing the requested payload directly inside the index itself
- Postgres allows you to `INCLUDE` payload columns. These columns are not part of the search key, so they do not affect the tree sorting, but they are carried along in the leaf nodes

<svg viewBox="0 0 460 140" role="img" aria-label="A covering index. The index leaf contains the search key (country) and the included payload (name). The query returns immediately without visiting the heap." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="100" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="63" text-anchor="middle">SELECT name WHERE</text>
  <text x="70" y="75" text-anchor="middle">country = 'UK'</text>
  
  <rect x="160" y="50" width="160" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="240" y="67" text-anchor="middle">Index: (country) INCLUDE (name)</text>
  <text x="240" y="82" text-anchor="middle" font-size="7">Leaf: [UK] Payload: [Alice] → [Ptr]</text>
  
  <rect x="360" y="50" width="80" height="40" rx="3" fill="#f0f0f0" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="400" y="67" text-anchor="middle" fill="#6b6b6b">Heap (Table)</text>
  <text x="400" y="82" text-anchor="middle" font-size="7" fill="#6b6b6b">Never visited</text>
  
  <path d="M120 65 L160 65" stroke="#1a1a1a" fill="none"/><path d="M160 65 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M320 70 L360 70" stroke="#6b6b6b" fill="none"/><line x1="335" y1="65" x2="345" y2="75" stroke="#b8541a" stroke-width="2"/><line x1="345" y1="65" x2="335" y2="75" stroke="#b8541a" stroke-width="2"/>
</svg>

- If a query only asks for columns present in the index, Postgres can perform an **index-only scan**. It reads the B-tree leaf and returns immediately, dodging the random read penalty

### The failure

- An index-only scan relies on the Visibility Map. Postgres must ensure the row in the index hasn't been deleted by a recent transaction. If the table changes rapidly and `VACUUM` lags behind, the visibility map is out of date
- When the map is stale, Postgres cannot trust the index payload. It must visit the heap anyway to check if the row is still alive, turning your carefully designed covering index back into an expensive two-hop query
