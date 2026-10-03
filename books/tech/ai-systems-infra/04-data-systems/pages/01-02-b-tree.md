## B-trees

- A **B-tree** stores keys **sorted**, in fixed-size **pages** (typically 4–8 KB — the same page idea as Booklet 1's memory pages, on disk). It's a shallow, wide, balanced tree: a root page points to branch pages, which point to leaf pages holding the actual rows (or pointers to them). Because it stays balanced, **any** key is reachable in the same small number of hops — `O(log n)`, and in practice just 3–4 page reads even for billions of rows.

<svg viewBox="0 0 360 96" role="img" aria-label="A B-tree: a root page of separator keys points to branch pages, which point to sorted leaf pages holding the rows; a lookup follows one path down" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="140" y="8" width="80" height="16" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="180" y="19" text-anchor="middle" font-size="6">root: 50 | 100</text>
  <rect x="40" y="40" width="70" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="75" y="51" text-anchor="middle" font-size="6">branch ≤50</text>
  <rect x="145" y="40" width="70" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="180" y="51" text-anchor="middle" font-size="6">50–100</text>
  <rect x="250" y="40" width="70" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="285" y="51" text-anchor="middle" font-size="6">&gt;100</text>
  <rect x="40" y="72" width="70" height="16" rx="2" fill="#f7f4fa" stroke="#6a4c93"/><text x="75" y="83" text-anchor="middle" font-size="6">leaf rows</text>
  <rect x="145" y="72" width="70" height="16" rx="2" fill="#f7f4fa" stroke="#6a4c93"/><text x="180" y="83" text-anchor="middle" font-size="6">leaf rows</text>
  <rect x="250" y="72" width="70" height="16" rx="2" fill="#f7f4fa" stroke="#6a4c93"/><text x="285" y="83" text-anchor="middle" font-size="6">leaf rows</text>
  <path d="M165 24 L85 40" stroke="#1a1a1a" marker-end="url(#bt)"/><path d="M180 24 L180 40" stroke="#1a1a1a" marker-end="url(#bt)"/><path d="M196 24 L280 40" stroke="#1a1a1a" marker-end="url(#bt)"/>
  <path d="M75 56 L75 72" stroke="#999" marker-end="url(#bt)"/><path d="M180 56 L180 72" stroke="#999" marker-end="url(#bt)"/><path d="M285 56 L285 72" stroke="#999" marker-end="url(#bt)"/>
  <defs><marker id="bt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Strengths:** reads are fast and **predictable** (same depth for every key), and because leaves are sorted, **range scans** ("orders between March and April", "the next 20 rows") are cheap — walk the leaves in order. This is why relational databases, which live on range queries and joins, are built on B-trees.
- **Cost — write amplification.** An update must **find the page, modify it, and write the whole page back**, even to change one row — and those writes land at **random** places on disk. Worse, to survive a crash mid-write, the change is first written to the WAL (two pages on), so a one-row update can touch the WAL *and* a data page. Under heavy random writes, a B-tree does a lot of random I/O — the weakness the LSM-tree was designed to erase.
