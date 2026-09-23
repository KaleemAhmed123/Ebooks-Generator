## Hot keys

- A sharded cache spreads keys evenly and traffic unevenly. One key resolves to one shard, so a key that goes viral sends all of its traffic to one node while the rest of the cluster does nothing

<svg viewBox="0 0 460 106" role="img" aria-label="A hot key on a sharded cache. Incoming reads arrive across ten shards, but one key resolves to a single shard, which runs at one hundred per cent CPU while the other nine sit at about two per cent. Adding shards spreads the other keys and does not move this one, because the hot key still resolves to exactly one node. An orange cross marks the result: nine nodes idle while one times out, and the cluster dashboard shows plenty of headroom." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="12" font-size="7.5">one key resolves to one shard; a viral key sends all of its traffic there</text>
  <rect x="4" y="18" width="452" height="12" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="230" y="27" text-anchor="middle" font-size="6.5">incoming reads</text>
  <line x1="24" y1="30" x2="24" y2="38" stroke="#999"/>
  <line x1="70" y1="30" x2="70" y2="38" stroke="#999"/>
  <line x1="116" y1="30" x2="116" y2="38" stroke="#bf4c28" stroke-width="2.5"/>
  <line x1="162" y1="30" x2="162" y2="38" stroke="#999"/>
  <line x1="208" y1="30" x2="208" y2="38" stroke="#999"/>
  <line x1="254" y1="30" x2="254" y2="38" stroke="#999"/>
  <line x1="300" y1="30" x2="300" y2="38" stroke="#999"/>
  <line x1="346" y1="30" x2="346" y2="38" stroke="#999"/>
  <line x1="392" y1="30" x2="392" y2="38" stroke="#999"/>
  <line x1="438" y1="30" x2="438" y2="38" stroke="#999"/>
  <rect x="4" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="24" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="50" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="70" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="96" y="40" width="40" height="20" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="116" y="70" text-anchor="middle" font-size="6" fill="#bf4c28">100 % CPU</text>
  <rect x="142" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="162" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="188" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="208" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="234" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="254" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="280" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="300" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="326" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="346" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="372" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="392" y="70" text-anchor="middle" font-size="6">2 %</text>
  <rect x="418" y="40" width="40" height="20" rx="2" fill="#fff" stroke="#999"/><text x="438" y="70" text-anchor="middle" font-size="6">2 %</text>
  <text x="4" y="88" font-size="7">adding shards spreads the other keys and does not move this one — it still resolves to exactly one node</text>
  <text x="4" y="101" font-size="7.5" fill="#bf4c28">✕ nine nodes idle while one times out, and the cluster dashboard shows plenty of headroom</text>
</svg>

- The fix is a second cache in front, inside the application process: a `Map` with a one-second TTL. A key taking 50 000 reads per second across 40 instances becomes 40 reads per second at the shard — the rest are served from local memory
- One second of extra staleness buys a three-order-of-magnitude reduction, and it is bounded, unlike the alternatives. Replicating the key under suffixed names works too but moves the invalidation problem: every write now has to delete every copy

### The failure

- Not knowing which key is hot. Shard CPU says a node is dying and says nothing about why, and by the time anyone is looking the node is timing out and taking its whole key range with it. Redis 8.6 added `HOTKEYS` for exactly this
- The other failure is scaling the cluster in response. More shards redistribute every key except the one causing the problem, so the bill goes up and the hot shard is unchanged. Hot keys are a fan-in problem, and adding capacity behind the fan-in does not address it
