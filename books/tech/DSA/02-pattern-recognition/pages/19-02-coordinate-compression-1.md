## Coordinate Compression <span class="lv lv2"></span>

- **What:** the *values* span billions but there are only n of them. Replace each value by its **rank** — its position among the sorted distinct values — so they become `0 … n−1`. Order is preserved, so every comparison still holds
- **Spot it:** "count smaller elements after self", "range sum of prefix sums", skyline and interval problems, coordinates up to 1e9 but n ≤ 1e5. You need a Fenwick or bucket array indexed by value, but the value range is too large to allocate
- **Why:** a range structure (82, 83) needs an array sized to the value range. Compressing to ranks shrinks that range to n while keeping every "less than" relationship, so order-based queries give identical answers in O(n) memory

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Raw values 90, 5, 90, 1000000, 5. Sorted distinct values are 5, 90, 1000000 with ranks 0, 1, 2. Each raw value is replaced by its rank, giving 1, 0, 1, 2, 0. A Fenwick array now needs only three slots instead of a million." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .raw { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .uniq { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .rk { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>
  <text x="10" y="24" class="sm">raw</text>
  <rect class="raw" x="44" y="12" width="40" height="22"/><text x="64" y="27" class="lb" text-anchor="middle">90</text>
  <rect class="raw" x="84" y="12" width="40" height="22"/><text x="104" y="27" class="lb" text-anchor="middle">5</text>
  <rect class="raw" x="124" y="12" width="40" height="22"/><text x="144" y="27" class="lb" text-anchor="middle">90</text>
  <rect class="raw" x="164" y="12" width="60" height="22"/><text x="194" y="27" class="lb" text-anchor="middle">1e6</text>
  <rect class="raw" x="224" y="12" width="40" height="22"/><text x="244" y="27" class="lb" text-anchor="middle">5</text>
  <text x="10" y="72" class="sm">sorted</text>
  <rect class="uniq" x="44" y="60" width="44" height="22"/><text x="66" y="75" class="lb" text-anchor="middle">5→0</text>
  <rect class="uniq" x="88" y="60" width="48" height="22"/><text x="112" y="75" class="lb" text-anchor="middle">90→1</text>
  <rect class="uniq" x="136" y="60" width="60" height="22"/><text x="166" y="75" class="lb" text-anchor="middle">1e6→2</text>
  <text x="10" y="112" class="sm">ranks</text>
  <rect class="rk" x="44" y="100" width="40" height="22"/><text x="64" y="115" class="lb" text-anchor="middle">1</text>
  <rect class="rk" x="84" y="100" width="40" height="22"/><text x="104" y="115" class="lb" text-anchor="middle">0</text>
  <rect class="rk" x="124" y="100" width="40" height="22"/><text x="144" y="115" class="lb" text-anchor="middle">1</text>
  <rect class="rk" x="164" y="100" width="60" height="22"/><text x="194" y="115" class="lb" text-anchor="middle">2</text>
  <rect class="rk" x="224" y="100" width="40" height="22"/><text x="244" y="115" class="lb" text-anchor="middle">0</text>
  <text x="300" y="72" class="sm">array size: 1e6 → 3</text>
</svg>
:::

```ts
// Build the rank map, then index any range structure by rank.
function compress(values: number[]): Map<number, number> {
  const sorted = [...new Set(values)].sort((a, b) => a - b);  // distinct, ascending
  const rank = new Map<number, number>();
  sorted.forEach((v, i) => rank.set(v, i));                   // value → 0..k−1
  return rank;                                                // k = sorted.length slots
}
// Count of Smaller Numbers After Self (LeetCode 315): walk right→left,
// query how many ranks below rank(x) are already seen, then add rank(x).
```

- **Watch out:** must dedupe before ranking (`new Set`), or two equal values get different ranks and counts double. When the query is "values in `[lo, hi]`" rather than exact, compress the **query bounds too**, using `lowerBound` so an absent bound maps to the right insertion rank
