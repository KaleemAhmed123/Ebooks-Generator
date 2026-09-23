## The strangler fig

- The big-bang rewrite — build the replacement in parallel for two years, switch on a Sunday — fails because the switch is one untested event carrying every risk at once. The **strangler fig**, named by Martin Fowler after the vine that grows around a tree and eventually replaces it, spreads that risk over a hundred small events
- A façade takes every request. One slice at a time is routed behind it to new code. The work "begins with small additions … built on top of, yet separate to the legacy code base"

<svg viewBox="0 0 460 124" role="img" aria-label="A strangler fig migration over time. A single façade sits in front throughout. At month zero the legacy monolith serves every route. At month six the slash billing routes are served by new code, about a quarter of the traffic, and the legacy monolith serves the rest. At month eighteen slash billing, slash orders and slash search are served by new code, roughly seventy per cent, and only a small legacy remainder is left. The façade is the only component that knows a migration is happening; callers see one address throughout. An orange cross marks the permanent façade: the easy seventy per cent moves, funding stops, and both systems plus the routing layer live on forever." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="13" font-size="7.5">one façade in front; each slice moves behind it and the legacy share shrinks</text>
  <text x="6" y="32" font-size="7">month 0</text>
  <rect x="50" y="20" width="40" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="70" y="32" text-anchor="middle" font-size="7">façade</text>
  <rect x="98" y="20" width="356" height="18" rx="3" fill="#f3f3f3" stroke="#666"/><text x="276" y="32" text-anchor="middle" font-size="7.5">legacy monolith — every route</text>
  <text x="6" y="58" font-size="7">month 6</text>
  <rect x="50" y="46" width="40" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="70" y="58" text-anchor="middle" font-size="7">façade</text>
  <rect x="98" y="46" width="89" height="18" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="142" y="58" text-anchor="middle" font-size="7">/billing</text>
  <rect x="187" y="46" width="267" height="18" rx="3" fill="#f3f3f3" stroke="#666"/><text x="320" y="58" text-anchor="middle" font-size="7.5">legacy</text>
  <text x="6" y="84" font-size="7">month 18</text>
  <rect x="50" y="72" width="40" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="70" y="84" text-anchor="middle" font-size="7">façade</text>
  <rect x="98" y="72" width="249" height="18" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="222" y="84" text-anchor="middle" font-size="7">/billing  /orders  /search</text>
  <rect x="347" y="72" width="107" height="18" rx="3" fill="#f3f3f3" stroke="#666"/><text x="400" y="84" text-anchor="middle" font-size="7.5">legacy</text>
  <text x="6" y="104" font-size="7">the façade is the only part that knows a migration is running; callers see one address throughout</text>
  <text x="6" y="118" font-size="7.5" fill="#bf4c28">✕ the permanent façade: the easy 70 % moves, funding stops, and both systems plus the routing live on forever</text>
</svg>

- Every slice ships to production on its own, so every slice can be rolled back on its own by flipping one route. That is the entire benefit, and it is why the façade must be able to route per path from day one
- Pick the first slice for its boundary, not its size: something with few callers and its own data. A slice that shares tables with everything else is the third migration, not the first

### The failure

- The façade that becomes architecture. The valuable 70 % migrates, the remaining 30 % is the gnarly part nobody sized, funding moves to the next thing, and the routing layer is now permanent — two systems, two deploy pipelines, two on-call rotations, plus a proxy that encodes which is which
- A strangler fig is only cheaper than a rewrite if it is funded to the deletion of the old system. Stopping halfway buys the cost of both and the benefit of neither
