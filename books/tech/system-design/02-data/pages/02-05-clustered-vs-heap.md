## Clustered vs heap

- Where does the row itself live? InnoDB and Postgres answer differently
- **InnoDB** uses a clustered index: the row is stored in the leaf of the primary-key B-tree. Every secondary index stores the primary key as its pointer
- **Postgres** stores rows in a heap, an unordered file. Every index, including the primary key, points at a heap location

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

- A secondary-index lookup in InnoDB is two tree walks: secondary index → primary key → primary tree → row. In Postgres it is one walk and one heap fetch

### The failure

- A random UUIDv4 primary key in InnoDB. Rows are stored in key order, so random keys scatter inserts across the whole tree, and "if the primary key is long, the secondary indexes use more space": 16 bytes copied into every index entry
- Use a sequential integer or a time-ordered UUID (v7) so inserts append and the key stays short

:::interview
"Why not a UUID as the primary key?" — In a clustered table a random key means random inserts and page splits, and the 16-byte key is copied into every secondary index. A time-ordered UUIDv7 keeps the global uniqueness and fixes the ordering.
:::
