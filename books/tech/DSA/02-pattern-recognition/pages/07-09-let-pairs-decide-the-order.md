## Let Pairs Decide the Order <span class="lv lv2"></span>

- **What:** when no single key sorts correctly, order by asking about *two* items: "should `a` come before `b`?". A consistent pairwise rule plus one comparator sort gives the optimal line
- **Spot it:** "form the largest number", "each person knows how many taller ones stand in front", "order to minimise the total cost". The statement *gives* the before/after pairs → 16-04
- **Why:** an exchange argument. If swapping neighbours `a b → b a` never helps when `a` should lead, any line can be bubble-swapped into comparator order without getting worse

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

- **Watch out:** a comparator must return a number. `(a, b) => a + b < b + a` returns `true`/`false`, which becomes 1/0, never negative, and the order is undefined
- **Also solves:** [Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/) (LeetCode 406) (tallest first, then insert at index `k`) · [Sort Integers by The Number of 1 Bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/) (LeetCode 1356) · [Custom Sort String](https://leetcode.com/problems/custom-sort-string/) (LeetCode 791) · collapse the pair rule into one key when you can: [Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/) (LeetCode 1029) → 08-05
