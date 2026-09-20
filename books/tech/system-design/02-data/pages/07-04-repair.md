## Repairing the replicas

- Without a leader, nothing makes a replica that missed a write catch up. Two mechanisms do it: one during reads, one in the background
- **Read repair**: the coordinator collects R versions, returns the newest to the client, and writes it back to the replicas that returned something older. Keys that are read get fixed as a side effect of being read

<svg viewBox="0 0 460 104" role="img" aria-label="Read repair: the coordinator reads from three replicas, gets versions 7, 7 and 5, returns 7, and writes version 7 back to the stale replica. Anti-entropy: two replicas compare Merkle tree roots and descend only into the subtree whose hashes differ." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="60" y="47" text-anchor="middle" fill="#1d4e89">coordinator</text>
  <g fill="#fcfcfc" stroke="#1a1a1a"><rect x="150" y="6" width="60" height="22" rx="3"/><rect x="150" y="38" width="60" height="22" rx="3"/><rect x="150" y="70" width="60" height="22" rx="3"/></g>
  <text x="180" y="21" text-anchor="middle" font-size="7.5">v7</text><text x="180" y="53" text-anchor="middle" font-size="7.5">v7</text><text x="180" y="85" text-anchor="middle" font-size="7.5" fill="#b8541a">v5 stale</text>
  <g stroke="#1a1a1a" fill="none"><path d="M100 43 L150 17"/><path d="M100 43 L150 49"/><path d="M100 43 L150 81"/></g>
  <path d="M104 50 L150 86" stroke="#1d4e89" fill="none" stroke-dasharray="2 2"/><text x="90" y="72" font-size="6.5" fill="#1d4e89">write v7 back</text>
  <text x="180" y="102" text-anchor="middle" font-size="7">read repair</text>
  <g font-size="7" text-anchor="middle">
    <circle cx="340" cy="16" r="9" fill="#fcfcfc" stroke="#b8541a"/><text x="340" y="19">≠</text>
    <circle cx="305" cy="46" r="9" fill="#fcfcfc" stroke="#1a1a1a"/><text x="305" y="49">=</text>
    <circle cx="375" cy="46" r="9" fill="#fcfcfc" stroke="#b8541a"/><text x="375" y="49">≠</text>
    <circle cx="358" cy="76" r="9" fill="#fcfcfc" stroke="#1a1a1a"/><text x="358" y="79">=</text>
    <circle cx="392" cy="76" r="9" fill="#fce4e2" stroke="#b8541a"/><text x="392" y="79">≠</text>
  </g>
  <g stroke="#1a1a1a" fill="none"><path d="M334 23 L311 39"/><path d="M346 23 L369 39"/><path d="M370 54 L362 68"/><path d="M380 54 L388 68"/></g>
  <text x="350" y="102" text-anchor="middle" font-size="7">anti-entropy: descend where hashes differ</text>
</svg>

- **Anti-entropy**: a background process compares whole replicas. Each replica keeps a **Merkle tree** per key range: a hash tree whose leaves hash blocks of keys and whose parents hash their children. Two replicas compare roots; if they match, the range is identical; if not, they descend only into the subtrees that differ and exchange those keys. The cost is proportional to the difference, not the data
- Cassandra runs this as `nodetool repair`, in full, sub-range or incremental form. Dynamo used one tree per key range for the same reason

### The failure

- Keys nobody reads are never read-repaired, so anti-entropy is not optional. And repair skipped past `gc_grace_seconds` (Module 2, page 9) does worse than nothing: the replica that missed the delete has the value, the others have dropped the tombstone, and repair copies the value back to everyone. Run repair on every node inside the window, every time
