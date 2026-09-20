## The B-tree

- To solve the Bitcask problem (cannot query a range, index must fit in RAM), most relational databases (Postgres, MySQL) use a **B-tree**
- A B-tree splits the disk into fixed-size pages (Postgres uses 8 kB, InnoDB defaults to 16 kB). The tree is balanced: every leaf is exactly the same number of hops from the root (typically 3 or 4)

<svg viewBox="0 0 460 120" role="img" aria-label="A B-tree with root, branch, and leaf pages. The tree is shallow. Leaf pages contain the sorted data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="180" y="10" width="100" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="26" text-anchor="middle">Root: [100, 200]</text>
  
  <rect x="100" y="50" width="80" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="140" y="66" text-anchor="middle">Br: [10, 50]</text>
  
  <rect x="280" y="50" width="80" height="24" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="320" y="66" text-anchor="middle">Br: [110, 150]</text>
  
  <path d="M210 34 L160 50" stroke="#1d4e89" fill="none"/>
  <path d="M250 34 L300 50" stroke="#1d4e89" fill="none"/>
  
  <rect x="50" y="90" width="70" height="24" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="85" y="106" text-anchor="middle">Leaf: 1..9</text>
  <rect x="140" y="90" width="70" height="24" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="175" y="106" text-anchor="middle">Leaf: 10..49</text>
  
  <rect x="250" y="90" width="70" height="24" rx="3" fill="#fcfcfc" stroke="#1d4e89"/>
  <text x="285" y="106" text-anchor="middle">Leaf: 100..109</text>
  
  <path d="M120 74 L85 90" stroke="#1d4e89" fill="none"/>
  <path d="M160 74 L175 90" stroke="#1d4e89" fill="none"/>
  <path d="M300 74 L285 90" stroke="#1d4e89" fill="none"/>
</svg>

- **Strengths**: Because the leaves are sorted, finding all users from ID 10 to 49 requires jumping to leaf 10 and reading sequentially. Because the tree is shallow, finding a single key takes only 3 or 4 page reads
- **Use for**: Extremely read-heavy workloads (99% reads) where most queries look up a single row or scan a contiguous range

### The failure

- The B-tree is updated in place. If you change one string from "Alice" to "Bob", the database must overwrite the entire 8 kB page on disk
- A random write workload (like UUID inserts) is hostile to a B-tree. The inserts land in random leaves, forcing the disk head to thrash. When a leaf page fills up, the database must halt to split the page in half, cascading splits up the tree
