## Price the Swap <span class="lv lv2"></span>

- **What it is:** When every item must go to one of two sides and each side has a quota, price each item's move from one side to the other, `costA − costB`, and sort by that price. The cheapest moves are made; nothing else is compared
- **Signal:** every item goes to exactly one of two sides, each side has a quota, and each item has a cost (or gain) on either side: "exactly n to each city", "waiter A takes at most X orders"
- **Not this page if:** the question is the *order* in which items are handled, not which side they go to → 07-09 (a pairwise rule)
- **Why it works:** Total cost = everyone's cost at side B + the extra for each person sent to A, where the extra is `costA − costB`. The second term is the only one a choice changes, so send to A the n people with the *smallest* `costA − costB`. That is a sort by one derived key, and no pairwise reasoning is left

:::mint
<svg viewBox="0 0 470 108" role="img" aria-label="Two city scheduling with costs A B: 10 20, 30 200, 400 50, 30 20. Differences A minus B are minus 10, minus 170, 350, 10. Sorted: minus 170, minus 10, 10, 350. The first two go to A and the last two to B. Total 30 plus 10 plus 50 plus 20 equals 110." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .A { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .B { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">person [costA, costB] sorted by costA − costB</text>
  <rect class="A" x="20" y="26" width="100" height="22"/><text x="70" y="41" class="lb" text-anchor="middle">[30, 200] −170</text>
  <rect class="A" x="124" y="26" width="100" height="22"/><text x="174" y="41" class="lb" text-anchor="middle">[10, 20]  −10</text>
  <rect class="B" x="228" y="26" width="100" height="22"/><text x="278" y="41" class="lb" text-anchor="middle">[30, 20]   10</text>
  <rect class="B" x="332" y="26" width="100" height="22"/><text x="382" y="41" class="lb" text-anchor="middle">[400, 50] 350</text>
  <text x="122" y="64" class="sm" text-anchor="middle">first n → city A</text>
  <text x="330" y="64" class="sm" text-anchor="middle">last n → city B</text>
  <text x="20" y="86" class="lb">total = 30 + 10 + 20 + 50 = 110</text>
  <text x="20" y="102" class="sm">only the difference matters: everyone pays costB, plus costA − costB if sent to A</text>
</svg>
:::

```ts
// Two City Scheduling (LeetCode 1029): 2n people, n per city
function twoCitySchedCost(costs: number[][]): number {
  costs.sort((p, q) => (p[0] - p[1]) - (q[0] - q[1]));
  const n = costs.length / 2;
  let total = 0;
  for (let i = 0; i < costs.length; i++) {
    total += i < n ? costs[i][0] : costs[i][1];
  }
  return total;
}
```
