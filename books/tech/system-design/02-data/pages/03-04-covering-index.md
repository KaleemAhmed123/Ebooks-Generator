## The covering index

- The expensive half of page 2 is the heap fetch. A **covering index** removes it by carrying the columns the query returns inside the index
- Postgres: `CREATE INDEX ON orders (customer_id) INCLUDE (total)`. `INCLUDE` columns are stored in the leaf but are not part of the key, so they do not change the sort order or count against uniqueness

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

- When every column the query touches is in the index, the planner can choose an **index-only scan**: read the leaf, return, never visit the heap

### The failure

- The index does not know whether a row version is visible to this transaction (MVCC, Module 2, page 4). Postgres checks the **visibility map**, one bit per heap page set by `VACUUM` when every row on the page is visible to everyone
- On a table that changes fast the bits are mostly unset, so the "index-only" scan visits the heap after all. A covering index on a hot table earns its keep only when `VACUUM` keeps up
