## Bitmask DP <span class="lv lv2"></span>

- **What:** when `n ≤ ~20` and the state is "which subset is already handled", store that subset as the bits of one integer. `dp[mask]` rolls over all 2ⁿ subsets; `popcount(mask)` says how many are placed
- **Spot it:** "n ≤ 20", "assign each of n to a distinct one of n", "visit every node once", "cover all with minimum cost", "minimum XOR / cost matching"
- **Why:** a subset of ≤ 20 elements fits in a 32-bit int, so 2ⁿ states are enumerable. Each state is solved once and extended by turning on one more bit — the whole point is trading exponential-in-n for polynomial-in-2ⁿ

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Assignment by bitmask. The mask marks which columns are used. State mask with popcount i means i people are assigned; the next person i picks any unused column j, moving to mask with bit j set. dp of full mask all ones is the answer. Example mask 1010 means columns 1 and 3 used, two people placed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .on { fill: #2d6a4f; stroke: #2d6a4f; stroke-width: 1; }
    .off { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .txt { font: bold 9px Consolas, monospace; fill: #ffffff; }
    .a { stroke: #1d4e89; stroke-width: 1.3; }
  </style>
  <defs><marker id="b1713" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <text x="20" y="30" class="sm">mask</text>
  <g transform="translate(58,16)">
    <rect class="on" x="0" y="0" width="22" height="22"/><text x="11" y="16" class="txt" text-anchor="middle">1</text>
    <rect class="off" x="22" y="0" width="22" height="22"/><text x="33" y="16" class="lb" text-anchor="middle">0</text>
    <rect class="on" x="44" y="0" width="22" height="22"/><text x="55" y="16" class="txt" text-anchor="middle">1</text>
    <rect class="off" x="66" y="0" width="22" height="22"/><text x="77" y="16" class="lb" text-anchor="middle">0</text>
  </g>
  <text x="150" y="20" class="sm">cols 3 and 1 used</text>
  <text x="150" y="32" class="sm">popcount = 2 → 2 people placed</text>
  <line class="a" x1="100" y1="50" x2="170" y2="74" marker-end="url(#b1713)"/>
  <text x="58" y="74" class="lb">person i = popcount(mask)</text>
  <g transform="translate(180,62)">
    <rect class="on" x="0" y="0" width="22" height="22"/><text x="11" y="16" class="txt" text-anchor="middle">1</text>
    <rect class="on" x="22" y="0" width="22" height="22"/><text x="33" y="16" class="txt" text-anchor="middle">1</text>
    <rect class="on" x="44" y="0" width="22" height="22"/><text x="55" y="16" class="txt" text-anchor="middle">1</text>
    <rect class="off" x="66" y="0" width="22" height="22"/><text x="77" y="16" class="lb" text-anchor="middle">0</text>
  </g>
  <text x="278" y="78" class="sm">set an unused bit j → assign person i to j</text>
  <text x="58" y="112" class="lb" fill="#2d6a4f">dp[(1&lt;&lt;n) − 1] = best over all assignments</text>
</svg>
:::

```ts
// Minimum XOR Sum of Two Arrays (LeetCode 1879): pair each nums1[i] with a distinct nums2[j]
function minimumXORSum(nums1: number[], nums2: number[]): number {
  const n = nums1.length;
  const dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;                                            // nothing paired yet
  for (let mask = 0; mask < (1 << n); mask++) {
    if (dp[mask] === Infinity) continue;
    const i = popcount(mask);                           // how many of nums1 are placed = next index
    if (i >= n) continue;
    for (let j = 0; j < n; j++) if (!(mask & (1 << j))) { // choose an unused nums2[j]
      const next = mask | (1 << j);
      dp[next] = Math.min(dp[next], dp[mask] + (nums1[i] ^ nums2[j]));
    }
  }
  return dp[(1 << n) - 1];                              // all bits set = fully paired
}
function popcount(x: number): number { let c = 0; while (x) { x &= x - 1; c++; } return c; }
```

- **Watch out:** 2ⁿ blows up fast — n ≤ ~20 (about a million masks) is the ceiling, n ≤ ~22 with a tight transition. Deriving the "how far along" index from `popcount(mask)` only works when items are placed in a fixed order; otherwise carry it in the state. `1 << n` overflows past 31 bits — that is the hard wall
