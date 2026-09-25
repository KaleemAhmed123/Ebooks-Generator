## Pair the Extremes 🟢

- **What it is:** Sort, then decide pairings from the two ends: the largest item with the smallest, or the first X with the last Y. The ends are where the extreme cases live, and extreme cases decide the answer
- **Signal:** "each boat carries at most two people", "minimise the maximum pair sum", "maximum product of three numbers", "buy one, get the k most expensive free", "assign each mouse a hole"
- **Why it works:** The heaviest person needs a partner light enough to fit; the lightest person is the best partner anyone can get. If the lightest cannot ride with the heaviest, nobody can, so the heaviest rides alone. If the lightest can, pairing them never hurts: any optimal answer that pairs them differently can swap partners without breaking a limit (exchange argument)

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Boats to Save People with people 1, 2, 2, 3 and limit 3 after sorting. Heaviest 3 plus lightest 1 is 4, over the limit, so 3 rides alone. Then 2 plus 1 fits: one boat. Then 2 alone. Three boats." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1d4e89; stroke-width: 1.2; fill: none; }
  </style>
  <rect class="bx" x="40" y="14" width="32" height="24"/><text x="56" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="72" y="14" width="32" height="24"/><text x="88" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="104" y="14" width="32" height="24"/><text x="120" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="136" y="14" width="32" height="24"/><text x="152" y="30" class="lb" text-anchor="middle">3</text>
  <text x="56" y="52" class="sm" text-anchor="middle">i →</text><text x="152" y="52" class="sm" text-anchor="middle">← j</text>
  <text x="200" y="24" class="lb">1 + 3 = 4 &gt; 3 → 3 alone        (boat 1)</text>
  <text x="200" y="42" class="lb">1 + 2 = 3 ≤ 3 → pair            (boat 2)</text>
  <text x="200" y="60" class="lb">2 left       → alone            (boat 3)</text>
  <text x="40" y="86" class="sm">the heaviest always boards; the lightest joins it only if it fits</text>
</svg>
:::

```ts
// Boats to Save People (LeetCode 881)
function numRescueBoats(people: number[], limit: number): number {
  people.sort((a, b) => a - b);
  let i = 0, j = people.length - 1, boats = 0;
  while (i <= j) {
    // lightest joins heaviest
    if (people[i] + people[j] <= limit) i++;
    // heaviest always boards
    j--;
    boats++;
  }
  return boats;
}
```

### Variations

- **Maximum Product of Three Numbers (LeetCode 628):** after sorting, only two candidates can win: the three largest, or the two smallest (both negative) times the largest. First X and last Y, with X + Y = 3
- **Minimize Maximum Pair Sum in Array (LeetCode 1877):** pair `a[i]` with `a[n − 1 − i]`; the answer is the largest of those sums
- **Assign Mice to Holes (GFG):** here the extremes pair with the *same* extremes: sort both lists and match in order; the answer is the largest `|mouse − hole|`. Crossing assignments never lower the maximum
- **Assign Cookies (LeetCode 455):** sort both; give each child, smallest greed first, the smallest cookie that satisfies them
- **Shop in Candy Store (GFG):** buy the cheapest, take the k most expensive free, repeat from both ends. For the maximum spend, mirror it: buy the most expensive, take the k cheapest free

### The failure

- **Two pointers without the sort.** The ends of an unsorted array are not the extremes. On `[3, 3, 1, 1]` with limit 3, the unsorted walk pairs nothing and uses 4 boats; sorted, the two 1s share a boat and the answer is 3
- **Forgetting negatives in products.** For three numbers, "the three largest" misses `[−10, −10, 1, 3, 2]`, where `−10 · −10 · 3 = 300` beats `1 · 2 · 3 = 6`

:::interview
"Why is the heaviest person paired with the lightest and not the next heaviest?" — The heaviest person needs a boat no matter what. The lightest person is the only candidate guaranteed not to be a worse partner than any other. If even the lightest does not fit, the heaviest goes alone; if it fits, any solution that pairs them differently can swap partners without violating the limit. So two pointers from both ends are optimal after an O(n log n) sort.
:::
