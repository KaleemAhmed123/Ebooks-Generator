## Let Pairs Decide the Order 🟡

- **What it is:** When no single key sorts the items correctly, define the order by asking about *two* items at a time: "should `a` come before `b`?". If that pairwise rule is consistent, one comparator sort produces the optimal arrangement
- **Signal:** "arrange the numbers to form the largest number", "sort by number of set bits, ties by value", "reconstruct the queue from (height, count in front)", "order so that the total cost is minimal"
- **Why it works:** An exchange argument. If swapping two neighbours `a b → b a` never makes the answer better when `a` should precede `b`, then any arrangement can be bubble-swapped into comparator order without getting worse. So the comparator order is optimal. The comparator must be a *consistent* ordering, or the sort's output is undefined

:::mint
<svg viewBox="0 0 470 96" role="img" aria-label="Largest number from 3, 30, 34. Comparing 3 and 30 as strings: 330 beats 303, so 3 goes first. Comparing 34 and 3: 343 beats 334, so 34 goes first. The order 34, 3, 30 gives 34330." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="22" class="lb">"3" vs "30":   "330" &gt; "303"  → 3 before 30</text>
  <text x="20" y="42" class="lb">"34" vs "3":   "343" &gt; "334"  → 34 before 3</text>
  <text x="20" y="62" class="sm">compare the two concatenations, never the numbers themselves</text>
  <rect class="hi" x="20" y="70" width="160" height="20"/><text x="100" y="84" class="lb" text-anchor="middle">34 · 3 · 30 → "34330"</text>
  <text x="200" y="84" class="sm">"30" first would give "30343"</text>
</svg>
:::

```ts
// Largest Number (LeetCode 179)
function largestNumber(nums: number[]): string {
  const s = nums.map(String);
  // b+a bigger → b first
  s.sort((a, b) => (b + a).localeCompare(a + b));
  const joined = s.join("");
  // [0, 0] → "0"
  return joined[0] === "0" ? "0" : joined;
}
```
