## Clustered vs heap

- A table must physically store the row data somewhere. The two great relational databases differ entirely on where this happens
- **InnoDB (MySQL)** uses a clustered index. The actual row data (the name, the email) is physically stored inside the leaf nodes of the primary key B-tree
- **Postgres** uses a heap. The row data is stored in an unsorted pile (the heap). The primary key B-tree only stores the ID and a physical pointer to the heap location

<svg viewBox="0 0 460 140" role="img" aria-label="Clustered vs Heap. InnoDB stores data inside the PK leaf, and secondary indexes point to the PK. Postgres stores data in a heap, and all indexes point to the heap." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="120" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">InnoDB (Clustered)</text>
  <rect x="50" y="30" width="140" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="120" y="46" text-anchor="middle">PK Leaf: [ID 1, Alice, UK]</text>
  
  <rect x="70" y="80" width="100" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="120" y="96" text-anchor="middle">Sec Index: [UK → ID 1]</text>
  <path d="M120 80 L120 54" stroke="#1a1a1a" fill="none"/><path d="M120 54 l-3 6 h6 z" fill="#1a1a1a"/>
  
  <text x="340" y="20" text-anchor="middle" font-weight="bold" fill="#1d4e89">Postgres (Heap)</text>
  <rect x="290" y="30" width="100" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="340" y="46" text-anchor="middle">Heap: [Alice, UK]</text>
  
  <rect x="240" y="80" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="280" y="96" text-anchor="middle">PK: [ID 1 → PTR]</text>
  <path d="M280 80 L310 54" stroke="#1a1a1a" fill="none"/><path d="M310 54 l-1 6 h6 z" fill="#1a1a1a" transform="rotate(-30 310 54)"/>
  
  <rect x="360" y="80" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="96" text-anchor="middle">Sec: [UK → PTR]</text>
  <path d="M400 80 L370 54" stroke="#1a1a1a" fill="none"/><path d="M370 54 l-6 2 v6 z" fill="#1a1a1a" transform="rotate(20 370 54)"/>
</svg>

- In MySQL, a secondary index lookup costs two B-tree walks: first the secondary index to find the primary key, then the primary index to find the row. Postgres does it in one (secondary index straight to the heap pointer)

### The failure

- Using a UUIDv4 (a random, 36-character string) as the primary key in InnoDB. Because the row data lives inside the primary key leaf, a random insert scatters the actual rows wildly across the disk
- Furthermore, because every MySQL secondary index carries a copy of the primary key, a long UUID physically bloats every single index on the table. You should use sequential IDs or time-sorted UUIDs (UUIDv7)
