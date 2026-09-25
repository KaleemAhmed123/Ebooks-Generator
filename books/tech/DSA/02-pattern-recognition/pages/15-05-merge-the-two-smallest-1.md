## Merge the Two Smallest <span class="lv lv2"></span>

- **What it is:** When items are combined two at a time and each combination costs the sum of what is combined, always combine the two *cheapest* items available, then put the result back. A min-heap keeps "the two cheapest" ready after every merge
- **Signal:** "connect n ropes with minimum cost", "Huffman coding", "minimum cost to connect sticks", "repeatedly take the largest (or smallest) and put something back", "smash the two heaviest stones"
- **Why it works:** Every merge result is paid again in every later merge it takes part in, so an item's total cost is its length times the number of merges above it: its depth in the merge tree. The optimal tree puts the smallest items deepest, and merging the two smallest first does exactly that (Huffman's exchange argument)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Connecting ropes 4, 3, 2, 6. Merge 2 and 3 for cost 5. Merge 4 and 5 for cost 9. Merge 6 and 9 for cost 15. Total 29. The smallest ropes end deepest in the merge tree, so their lengths are counted most often." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .m { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <circle class="m" cx="150" cy="16" r="12"/><text x="150" y="20" class="lb" text-anchor="middle">15</text>
  <line class="e" x1="142" y1="25" x2="104" y2="46"/><line class="e" x1="158" y1="25" x2="196" y2="46"/>
  <circle class="n" cx="100" cy="54" r="11"/><text x="100" y="58" class="lb" text-anchor="middle">6</text>
  <circle class="m" cx="200" cy="54" r="11"/><text x="200" y="58" class="lb" text-anchor="middle">9</text>
  <line class="e" x1="194" y1="63" x2="170" y2="84"/><line class="e" x1="206" y1="63" x2="230" y2="84"/>
  <circle class="n" cx="166" cy="92" r="11"/><text x="166" y="96" class="lb" text-anchor="middle">4</text>
  <circle class="m" cx="234" cy="92" r="11"/><text x="234" y="96" class="lb" text-anchor="middle">5</text>
  <text x="222" y="116" class="sm">2 + 3 (deepest)</text>
  <text x="290" y="30" class="lb">heap [2, 3, 4, 6]</text>
  <text x="290" y="48" class="lb">2+3 = 5   cost  5</text>
  <text x="290" y="64" class="lb">4+5 = 9   cost  9</text>
  <text x="290" y="80" class="lb">6+9 = 15  cost 15</text>
  <text x="290" y="100" class="lb" fill="#1d4e89">total 29</text>
</svg>
:::

```ts
// Minimum Cost of Ropes (GFG); Heap class from page 15-04
function minCost(ropes: number[]): number {
  const h = new Heap<number>((a, b) => a < b);
  for (const r of ropes) h.push(r);
  let cost = 0;
  while (h.size() > 1) {
    const merged = h.pop()! + h.pop()!;   // the two cheapest
    cost += merged;
    // the result competes again
    h.push(merged);
  }
  return cost;
}
```
