# Module 3 - Indexes

## Every index is a write

- An index is a second copy of some columns, kept in a different order so one query is fast
- A copy has to be maintained. Every `INSERT`, `DELETE`, and every `UPDATE` that changes an indexed column, writes to every index the row is in

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

- InnoDB copies the primary key into every secondary index entry, so each index also costs space in proportion to the key
- DynamoDB bills it plainly: a write to an item is one write to the table plus one to every index it projects into, each from that index's own capacity

### The failure

- Ten indexes on a hot table, half of them "just in case". Every insert does eleven writes, and nobody can say which indexes are unused
- The planner's statistics can (`pg_stat_user_indexes` in Postgres shows scans per index). Indexes with zero reads are pure write cost; drop them
