## Best Partner So Far 🟢

- **What it is:** For "best pair `i < j`" problems, split the score into a part that depends only on `i` and a part that depends only on `j`. Walk `j` left to right and keep the best `i`-part seen so far. Each `j` meets its best partner in O(1)
- **Signal:** "buy on one day, sell on a later day", "maximise `a[i] + a[j] + i − j`", "maximum `a[j] − a[i]` with `i < j`", "find two numbers that sum to target"
- **Why it works:** If `score(i, j) = f(i) + g(j)`, then for a fixed `j` the best partner is simply the index `i < j` with the largest `f(i)`. That maximum only grows as `j` moves right, so one variable holds it. The O(n²) pair search becomes one pass

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Best Sightseeing Pair with values 8, 1, 5, 2, 6. The score values i plus i plus values j minus j splits into f of i equals values i plus i and g of j equals values j minus j. Walking j from left to right, keep the best f seen so far. At j equal to 2, best f is 8 and g is 3, giving 11, the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .cur { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <text x="14" y="26" class="sm">values</text>
  <rect class="hi" x="70" y="12" width="40" height="22"/><text x="90" y="27" class="lb" text-anchor="middle">8</text>
  <rect class="bx" x="110" y="12" width="40" height="22"/><text x="130" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="cur" x="150" y="12" width="40" height="22"/><text x="170" y="27" class="lb" text-anchor="middle">5</text>
  <rect class="bx" x="190" y="12" width="40" height="22"/><text x="210" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="230" y="12" width="40" height="22"/><text x="250" y="27" class="lb" text-anchor="middle">6</text>
  <text x="14" y="52" class="sm">f = v + i</text>
  <text x="90" y="52" class="lb" text-anchor="middle">8</text><text x="130" y="52" class="lb" text-anchor="middle">2</text><text x="170" y="52" class="lb" text-anchor="middle">7</text><text x="210" y="52" class="lb" text-anchor="middle">5</text><text x="250" y="52" class="lb" text-anchor="middle">10</text>
  <text x="14" y="70" class="sm">g = v − i</text>
  <text x="90" y="70" class="lb" text-anchor="middle">8</text><text x="130" y="70" class="lb" text-anchor="middle">0</text><text x="170" y="70" class="lb" text-anchor="middle">3</text><text x="210" y="70" class="lb" text-anchor="middle">−1</text><text x="250" y="70" class="lb" text-anchor="middle">2</text>
  <text x="14" y="90" class="sm">bestF before j</text>
  <text x="130" y="90" class="lb" text-anchor="middle">8</text><text x="170" y="90" class="lb" text-anchor="middle">8</text><text x="210" y="90" class="lb" text-anchor="middle">8</text><text x="250" y="90" class="lb" text-anchor="middle">8</text>
  <text x="300" y="40" class="lb">j = 2: bestF 8 + g 3 = 11</text>
  <text x="300" y="58" class="lb">j = 4: bestF 8 + g 2 = 10</text>
  <text x="300" y="80" class="lb" fill="#2d6a4f">answer 11 (i = 0, j = 2)</text>
</svg>
:::

```ts
// Best Sightseeing Pair (LeetCode 1014)
// maximise values[i] + values[j] + i − j over i < j
function maxScoreSightseeingPair(values: number[]): number {
  // best f(i) = values[i] + i so far
  let bestF = values[0] + 0;
  let best = -Infinity;
  for (let j = 1; j < values.length; j++) {
    // read: pair j with best i
    best = Math.max(best, bestF + values[j] - j);
    // then offer j as a future i
    bestF = Math.max(bestF, values[j] + j);
  }
  return best;
}
```
