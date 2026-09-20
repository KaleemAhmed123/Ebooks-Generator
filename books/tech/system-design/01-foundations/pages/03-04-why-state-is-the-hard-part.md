## Compute scales for free; state does not

- Adding a tenth stateless web server is adding a tenth copy of the same code. No coordination needed — every copy does the same thing independently
- Adding a tenth copy of the data is a different problem entirely. Now ten copies must agree on what the data is, or the data must be split across them, or both

<svg viewBox="0 0 460 94" role="img" aria-label="Left: compute fans out trivially to N identical copies. Right: data must be replicated (all copies hold the same data) or partitioned (each holds a slice), and both choices cost consistency" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="8" y="14" font-size="8.5" fill="#6b6b6b">compute</text>
  <rect x="8" y="22" width="64" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="40" y="36" text-anchor="middle">code</text>
  <path d="M72 32 L100 20" stroke="#1a1a1a" fill="none"/><path d="M100 20 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M72 32 L100 32" stroke="#1a1a1a" fill="none"/><path d="M100 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M72 32 L100 44" stroke="#1a1a1a" fill="none"/><path d="M100 44 l-7 -5 v6 z" fill="#1a1a1a"/>
  <rect x="104" y="8" width="50" height="18" rx="3" fill="none" stroke="#1a1a1a"/><text x="129" y="21" text-anchor="middle" font-size="8.5">copy</text>
  <rect x="104" y="24" width="50" height="18" rx="3" fill="none" stroke="#1a1a1a"/><text x="129" y="37" text-anchor="middle" font-size="8.5">copy</text>
  <rect x="104" y="40" width="50" height="18" rx="3" fill="none" stroke="#1a1a1a"/><text x="129" y="53" text-anchor="middle" font-size="8.5">copy</text>
  <text x="176" y="36" fill="#6b6b6b" font-size="8.5">trivial</text>

  <text x="240" y="14" font-size="8.5" fill="#6b6b6b">data — replicate</text>
  <rect x="240" y="22" width="64" height="20" rx="3" fill="none" stroke="#1a1a1a"/><text x="272" y="36" text-anchor="middle">data</text>
  <path d="M304 32 L332 20" stroke="#1a1a1a" fill="none"/><path d="M332 20 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M304 32 L332 44" stroke="#1a1a1a" fill="none"/><path d="M332 44 l-7 -5 v6 z" fill="#1a1a1a"/>
  <rect x="336" y="8" width="50" height="18" rx="3" fill="none" stroke="#1a1a1a"/><text x="361" y="21" text-anchor="middle" font-size="8.5">all data</text>
  <rect x="336" y="40" width="50" height="18" rx="3" fill="none" stroke="#1a1a1a"/><text x="361" y="53" text-anchor="middle" font-size="8.5">all data</text>
  <path d="M361 26 L361 40" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="404" y="36" fill="#6b6b6b" font-size="8.5">agree?</text>

  <text x="240" y="72" font-size="8.5" fill="#6b6b6b">data — partition</text>
  <rect x="240" y="76" width="64" height="16" rx="3" fill="none" stroke="#1a1a1a"/><text x="272" y="88" text-anchor="middle" font-size="8.5">data</text>
  <rect x="336" y="76" width="34" height="16" rx="3" fill="none" stroke="#1a1a1a"/><text x="353" y="88" text-anchor="middle" font-size="8.5">A–M</text>
  <rect x="376" y="76" width="34" height="16" rx="3" fill="none" stroke="#1a1a1a"/><text x="393" y="88" text-anchor="middle" font-size="8.5">N–Z</text>
  <path d="M304 84 L336 84" stroke="#1a1a1a" fill="none"/><path d="M336 84 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="428" y="88" fill="#6b6b6b" font-size="8.5">route?</text>
</svg>

- **Replication** (booklet 02): every copy holds all the data. Writes must reach all copies. The question is how stale a reader can be
- **Partitioning** (booklet 02): each node holds a slice. The question is how to route a query to the right slice, and what happens when you need data from two slices

### The bridge

- Everything in booklets 02 and 03 follows from this split. Replication strategies, consistency models, consensus algorithms — they are all ways of managing the cost of having more than one copy of a fact
