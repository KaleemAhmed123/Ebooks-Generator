## Find the Invariant <span class="lv lv2"></span>

- **What it is:** Some "minimum operations" problems are not search problems at all. Before simulating, ask what every operation *preserves* or changes by a fixed amount: a difference, a parity, a sum, a divisor count. The answer then falls out of arithmetic
- **Signal:** "each move increments n − 1 elements", "toggle every k-th bulb", "negate an element exactly k times", "each operation replaces x with two numbers that sum to x", huge n or huge values that make simulation hopeless
- **Why it works:** An operation that looks global often has a local meaning relative to something else. Incrementing everyone but one element leaves all *differences* but one unchanged; it is the same as decrementing that one element. Once the move is seen in the right frame, the count is a formula

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Minimum moves to equal elements on 1, 2, 3. Incrementing all but one element is the same, relative to the others, as decrementing that one element. So every element must come down to the minimum 1. Moves equal 0 plus 1 plus 2, which is the sum 6 minus 3 times the minimum, 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bar { fill: #1a1a1a; }
    .cut { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; stroke-dasharray: 3 2; }
  </style>
  <rect class="bar" x="40" y="66" width="30" height="16"/>
  <rect class="bar" x="90" y="66" width="30" height="16"/><rect class="cut" x="90" y="50" width="30" height="16"/>
  <rect class="bar" x="140" y="66" width="30" height="16"/><rect class="cut" x="140" y="34" width="30" height="32"/>
  <text x="55" y="96" class="sm" text-anchor="middle">1</text><text x="105" y="96" class="sm" text-anchor="middle">2</text><text x="155" y="96" class="sm" text-anchor="middle">3</text>
  <text x="200" y="30" class="lb">+1 to n−1 elements</text>
  <text x="200" y="44" class="lb">  ≡ −1 to one element (relative)</text>
  <text x="200" y="66" class="lb">moves = Σ (a[i] − min)</text>
  <text x="200" y="80" class="lb">      = 6 − 3 · 1 = 3</text>
</svg>
:::

```ts
// Minimum Moves to Equal Array Elements (LeetCode 453)
function minMoves(nums: number[]): number {
  let min = Infinity, sum = 0;
  for (const x of nums) { min = Math.min(min, x); sum += x; }
  // everyone "comes down" to min
  return sum - nums.length * min;
}
```
