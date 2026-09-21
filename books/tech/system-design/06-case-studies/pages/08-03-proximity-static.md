## Proximity for static places

- Places do not move, so the index is written once and read millions of times: the Yelp-shaped variant of the question. Each place gets a cell id at insert; "nearby" is one indexed lookup on the user's cell plus its eight neighbours, then a distance sort in memory

```typescript
// precision 6 = 30 bits, 15 per axis: 360° ÷ 2¹⁵ ≈ 0.011° ≈ 1.2 km east–west,
// 180° ÷ 2¹⁵ ≈ 0.0055° ≈ 0.6 km north–south; nine cells cover any point
const cells = [geohash.encode(lat, lng, 6)];
cells.push(...geohash.neighbors(cells[0]));
const rows = await db.query(
  "SELECT id, lat, lng FROM places WHERE cell6 = ANY($1)", [cells]);
return rows.sort((a, b) => dist(a, lat, lng) - dist(b, lat, lng)).slice(0, 20);
```

<svg viewBox="0 0 460 116" role="img" aria-label="Left: a three-by-three grid of cells, all nine shaded as the query area, with the user dot at the right edge of the centre cell and a cafe star just across the edge in the east cell; caption, nine cells, the cafe is found, then sorted by real distance. Right, with an orange cross: the same grid with only the centre cell shaded; the cafe 30 metres away is in the next cell and is never returned." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g fill="#e6f2ff" stroke="#333">
    <rect x="30" y="14" width="34" height="24"/><rect x="64" y="14" width="34" height="24"/><rect x="98" y="14" width="34" height="24"/>
    <rect x="30" y="38" width="34" height="24"/><rect x="64" y="38" width="34" height="24"/><rect x="98" y="38" width="34" height="24"/>
    <rect x="30" y="62" width="34" height="24"/><rect x="64" y="62" width="34" height="24"/><rect x="98" y="62" width="34" height="24"/>
  </g>
  <circle cx="95" cy="50" r="2.5" fill="#1d4e89"/><text x="102" y="53" font-size="8" fill="#1d4e89">✦</text>
  <text x="81" y="100" text-anchor="middle" font-size="7.5">9 cells: the café is found,</text><text x="81" y="111" text-anchor="middle" font-size="7.5">then sorted by real distance</text>
  <g fill="#fff" stroke="#333">
    <rect x="260" y="14" width="34" height="24"/><rect x="294" y="14" width="34" height="24"/><rect x="328" y="14" width="34" height="24"/>
    <rect x="260" y="38" width="34" height="24"/><rect x="328" y="38" width="34" height="24"/>
    <rect x="260" y="62" width="34" height="24"/><rect x="294" y="62" width="34" height="24"/><rect x="328" y="62" width="34" height="24"/>
  </g>
  <rect x="294" y="38" width="34" height="24" fill="#fbe9e2" stroke="#bf4c28"/>
  <circle cx="325" cy="50" r="2.5" fill="#1d4e89"/><text x="332" y="53" font-size="8" fill="#bf4c28">✦</text>
  <text x="311" y="100" text-anchor="middle" font-size="7.5" fill="#bf4c28">✕ 1 cell: the café 30 m away is in</text><text x="311" y="111" text-anchor="middle" font-size="7.5" fill="#bf4c28">the next cell and never returned</text>
  <text x="196" y="52" text-anchor="middle" font-size="7.5">vs</text>
  <text x="392" y="30" font-size="7">cache key =</text><text x="392" y="40" font-size="7">centre cell,</text><text x="392" y="50" font-size="7">not the user</text>
</svg>

- Cache by cell, not by user. The answer for a cell changes when a place opens or closes, which is rare, so the nine-cell result sits in a cache keyed by the centre cell with a long TTL, and a million users in one neighbourhood share one entry. Booklet 05 owns the invalidation
- PostGIS or a geohash column on a B-tree both serve this size. The interviewer probes the neighbour handling and the cache key, not the extension

### The failure

- Querying the user's cell alone. A user at a cell's edge has half their surroundings in the next cell and never sees them; the bug is invisible in the middle of a cell and constant at the edge. Nine cells, always, and the sort by real distance afterwards
