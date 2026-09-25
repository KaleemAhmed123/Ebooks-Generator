## Find the Invariant 🟡

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

### Variations

- **Bulb Switcher (LeetCode 319):** bulb `i` is toggled once per divisor of `i`. Divisors come in pairs except for perfect squares, so the bulbs left on are the squares: `⌊√n⌋`, no simulation
- **Maximize Sum Of Array After K Negations (LeetCode 1005):** negate the most negative values first. If negations remain, their parity is all that matters: an even count cancels, an odd count lands once on the smallest absolute value
- **Faulty wiring and bulbs (GFG):** pressing a switch flips everything to its right. Scan left to right carrying the parity of presses so far; a bulb's *effective* state is `bulb XOR parity`, and every effective 0 costs one press
- **Minimum Replacements to Sort the Array (LeetCode 2366):** walk right to left keeping the allowed maximum `m`. A value `x > m` must split into `k = ⌈x / m⌉` parts (`k − 1` operations), and the new maximum is `⌊x / k⌋`, the largest equal split
- **Minimum Operations to Make the Array Increasing (LeetCode 1827):** each element must reach `prev + 1`; add the gap and move on. The invariant is "the previous value is already final"

### The failure

- **Simulating.** Incrementing n − 1 elements one step at a time is O(answer · n); with values up to 10⁹ the answer alone is ~10⁹ steps
- **Using leftover negations on the wrong element.** In 1005, spending an odd remainder on the element you last negated can lower the sum more than necessary. Spend it on the smallest absolute value in the whole array

:::interview
"How do you approach a 'minimum operations' problem you have not seen?" — I run the operation on a tiny input by hand and look for what it does *not* change: pairwise differences, parity, the sum, a count of divisors. Once I find that invariant, the answer is usually a formula or a single pass, and I can justify it without a search.
:::
