## What a secondary index lookup costs

- In Postgres, a secondary index does not store the row data. It stores the indexed value (e.g., `UK`) and a pointer to the physical location of the row on the heap
- An index lookup therefore costs two completely separate disk seeks. First, walk the B-tree to find the pointer. Second, jump to the heap (a random read) to fetch the actual row

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

- If a query matches many rows, those rows will be scattered randomly across the heap. The database must execute a random read for every single match
- Because random disk seeks are slow, the query planner checks the table statistics first. If the planner believes the index lookup will match a large percentage of the table (low selectivity), it ignores the index entirely and performs a sequential table scan. A sequential read of the whole table is faster than ten thousand random jumps

### The failure

- Creating an index on a low-cardinality column like `status` (which only has three values: `PENDING`, `ACTIVE`, `DELETED`). The planner sees that `ACTIVE` makes up 90% of the table and never uses the index. You pay the write penalty on every insert for an index that is never read
