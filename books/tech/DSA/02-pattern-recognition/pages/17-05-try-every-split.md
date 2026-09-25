## Try Every Split <span class="lv lv3"></span>

- **What it is:** **Partition DP.** The state is a range `(i, j)`. Pick the operation inside it that splits the range into two parts that no longer affect each other, try every position k for it, and pay a cost that depends only on `i`, `k` and `j`
- **Signal:** "minimum cost to cut / merge / multiply / burst", "place brackets", "partition into pieces", n ≤ 100–500 so O(n³) fits
- **Why it works:** Once the split is fixed, the left and right ranges are independent subproblems of the same shape. The question to ask is *which operation makes the sides independent*: for cuts it is the **first** cut, for Burst Balloons it is the **last** balloon to burst

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Minimum cost to cut a stick. The stick runs from 0 to n with cut marks. The first cut at position c k splits the stick; its cost is the full length c j minus c i. After it, the left piece from c i to c k and the right piece from c k to c j are cut independently, so dp of i j equals c j minus c i plus the minimum over k of dp i k plus dp k j." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .l { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .r { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>
  <rect class="l" x="40" y="30" width="170" height="18"/><rect class="r" x="210" y="30" width="220" height="18"/>
  <line x1="210" y1="18" x2="210" y2="60" stroke="#ef476e" stroke-width="2"/>
  <line x1="100" y1="30" x2="100" y2="48" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <line x1="300" y1="30" x2="300" y2="48" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <line x1="360" y1="30" x2="360" y2="48" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="40" y="24" class="lb" text-anchor="middle">c[i]</text><text x="210" y="14" class="lb" text-anchor="middle">c[k]: first cut</text><text x="430" y="24" class="lb" text-anchor="middle">c[j]</text>
  <text x="125" y="64" class="sm" text-anchor="middle">dp[i][k], solved alone</text>
  <text x="320" y="64" class="sm" text-anchor="middle">dp[k][j], solved alone</text>
  <text x="235" y="88" class="lb" text-anchor="middle">dp[i][j] = (c[j] − c[i]) + min over k of (dp[i][k] + dp[k][j])</text>
  <text x="235" y="108" class="sm" text-anchor="middle">solve short ranges first: loop by length (Module 06, 01-05)</text>
</svg>
:::

```ts
// Minimum Cost to Cut a Stick (LeetCode 1547)
function minCost(n: number, cuts: number[]): number {
  const c = [0, ...[...cuts].sort((a, b) => a - b), n];
  const m = c.length;
  // dp[i][j]: cheapest way to make every cut inside (c[i], c[j])
  const dp = Array.from({ length: m }, () => new Array(m).fill(0));
  for (let len = 2; len < m; len++)
    for (let i = 0; i + len < m; i++) {
      const j = i + len;
      let best = Infinity;
      for (let k = i + 1; k < j; k++)
        best = Math.min(best, dp[i][k] + dp[k][j]);
      dp[i][j] = best + c[j] - c[i];
    }
  return dp[0][m - 1];
}
```

### Variations

- **Matrix Chain Multiplication (GFG):** `dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i−1] · d[k] · d[j]`; the split is the last multiplication
- **Burst Balloons (LeetCode 312):** pad with 1s; k is the **last** balloon burst in `(i, j)`, so its neighbours at that moment are exactly `i` and `j`
- **Minimum Score Triangulation of Polygon (LeetCode 1039):** edge `(i, j)` belongs to one triangle `(i, k, j)`; try every k
- **Boolean Parenthesization (GFG):** each range stores two counts, ways to be true and ways to be false; combine them by the operator at k
- **Optimal Binary Search Tree (GFG):** k is the root; every key in `(i, j)` sinks one level, so add the range's total frequency
- **Palindrome Partitioning II (LeetCode 132):** the one-dimensional cousin: `f(i)` tries every palindrome `s[i..k]` as the next piece

### The failure

- **Cutting nearest the middle first.** It looks balanced but is not optimal: n = 10, cuts `[4, 5, 6]`. Middle-first cuts at 5 for 20; cutting at 6 first costs 10 + 6 + 2 = 18
- **Row-by-row loop order.** Filling `dp[i][j]` with `i` ascending reads `dp[k][j]` for `k > i` before it is computed. On LeetCode 1547's first example (n = 7, cuts `[1, 3, 4, 5]`) that returns 7 instead of 16. Loop by range length, or `i` descending
- **Choosing the wrong "split" operation.** For Burst Balloons, "first balloon burst" leaves its neighbours depending on later choices, so the sides are not independent. Choose the operation whose context is fixed

:::interview
"How do you find the split for a range DP?" — I ask which single operation, once fixed, makes the two sides independent. For cutting a stick it is the first cut; for bursting balloons it is the last burst. Then `dp[i][j]` tries every k, adds the cost that depends only on `i`, `k`, `j`, and I fill ranges by increasing length. O(n³) time, O(n²) space.
:::
