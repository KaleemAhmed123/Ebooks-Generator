## What a secondary index lookup costs

- A Postgres index entry is the indexed value plus a pointer to the row's place in the heap. It does not hold the row
- So a lookup is two steps: walk the tree to the pointer, then one random read into the heap for the row

<svg viewBox="0 0 460 140" role="img" aria-label="Index lookup. 1. Find 'UK' in the B-tree to get the heap pointer. 2. Fetch the row from the random heap location." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="66" text-anchor="middle">SELECT * WHERE</text>
  <text x="60" y="80" text-anchor="middle">country = 'UK'</text>
  
  <rect x="140" y="50" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="190" y="67" text-anchor="middle">B-Tree (Index)</text>
  <text x="190" y="82" text-anchor="middle" font-size="7">[UK] → [Ptr: A5]</text>
  
  <rect x="300" y="10" width="100" height="100" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="27" text-anchor="middle">Heap (Table)</text>
  <rect x="310" y="40" width="80" height="20" fill="#fff" stroke="#1a1a1a"/>
  <text x="350" y="54" text-anchor="middle" font-size="7">Loc: A5 [Alice, UK]</text>
  
  <path d="M100 62 L140 62" stroke="#1a1a1a" fill="none"/><path d="M140 62 l-3 -3 v6 z" fill="#1a1a1a"/>
  <rect x="115" y="54" width="10" height="10" rx="5" fill="#fff" stroke="#1a1a1a"/><text x="120" y="62" text-anchor="middle" font-size="6">1</text>
  
  <path d="M240 70 L310 50" stroke="#1a1a1a" fill="none"/><path d="M310 50 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 310 50)"/>
  <rect x="270" y="50" width="10" height="10" rx="5" fill="#fff" stroke="#1a1a1a"/><text x="275" y="58" text-anchor="middle" font-size="6">2</text>
  <text x="275" y="75" text-anchor="middle" font-size="6" fill="#6b6b6b">Random read</text>
</svg>

- Many matches means many random heap reads, one per row, scattered across the file
- The planner knows this from the table statistics. When a predicate matches a large fraction of the table it skips the index and reads the table sequentially, because one sequential pass beats thousands of random reads

### The failure

- An index on `status` with three values, where `ACTIVE` is 90% of the rows. The planner never picks it for `status = 'ACTIVE'`, and every insert pays for it anyway. A partial index on the rare value (`WHERE status = 'PENDING'`) is the shape that gets used
