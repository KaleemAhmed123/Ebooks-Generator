## The B-tree

- A **B-tree** fixes both Bitcask limits: keys are sorted, and only the top levels need to stay in memory. It is the default index in Postgres and the table itself in InnoDB
- The tree is made of fixed-size pages (Postgres 8 kB, InnoDB 16 kB), each holding sorted keys and pointers to child pages. Every leaf sits at the same depth

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

- The depth is the arithmetic: an 8 kB page holds a few hundred keys, so three levels address a few hundred cubed, tens of millions of rows. A point read is that many page reads, most of them cached
- A range, `id BETWEEN 10 AND 49`, is one descent to the first leaf and a walk along the leaves

### The failure

- Pages are updated in place. Changing one value rewrites the whole page, and the WAL carries the change first
- Random keys (UUIDv4) land in random leaves: random I/O per insert, and a full leaf splits, which can cascade up a level. Sorted keys append to the rightmost leaf instead
