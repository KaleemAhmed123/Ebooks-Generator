# Module 3 - Indexes

## Every index is a write

- An index is a redundant copy of your data, sorted differently to make a specific query fast
- Because it is a copy, it must be updated every time the base data changes. An `INSERT`, `UPDATE`, or `DELETE` on a row touches not just the table, but every index that row participates in

<svg viewBox="0 0 460 140" role="img" aria-label="An INSERT touching multiple indexes. The single row insert triggers three separate B-tree writes: the primary key, the email index, and the status index." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="66" text-anchor="middle">INSERT row</text>
  
  <rect x="180" y="10" width="120" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="240" y="26" text-anchor="middle">1. PK Index (B-tree)</text>
  
  <rect x="180" y="50" width="120" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="240" y="66" text-anchor="middle">2. Email Index (B-tree)</text>
  
  <rect x="180" y="90" width="120" height="24" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="240" y="106" text-anchor="middle">3. Status Index (B-tree)</text>
  
  <path d="M100 62 L180 22" stroke="#1a1a1a" fill="none"/><path d="M180 22 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-20 180 22)"/>
  <path d="M100 62 L180 62" stroke="#1a1a1a" fill="none"/><path d="M180 62 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M100 62 L180 102" stroke="#1a1a1a" fill="none"/><path d="M180 102 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 102)"/>
  
  <text x="350" y="66" text-anchor="middle" font-size="7" fill="#6b6b6b">One insert = Three writes</text>
</svg>

- In MySQL, because every secondary index physically contains a copy of the primary key, adding indexes also increases the storage footprint of the table significantly
- In DynamoDB, secondary indexes are billed entirely separately. Every time you write an item, you pay for the base table write, plus a write for every index the item touches

### The failure

- Creating an index "just in case", or leaving ten indexes on a highly active table. The write throughput drops, the disk fills up, and latency spikes because every insert is doing 10× the work
- Because unused indexes silently consume write capacity without providing any read benefit, you must actively delete indexes that the query planner is not using
