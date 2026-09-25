## Pair the Extremes <span class="lv lv1"></span>

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
