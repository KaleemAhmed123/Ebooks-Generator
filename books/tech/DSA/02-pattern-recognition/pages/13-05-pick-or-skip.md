## Pick or Skip <span class="lv lv1"></span>

- **What it is:** For "all subsets / subsequences", walk the items by index and make one binary decision per item: take it or leave it. Two calls per level, n levels, 2ⁿ leaves, and every leaf is a different subset
- **Signal:** "all subsets", "all subsequences", "power set", "count subsets with sum K", "longest concatenation with unique characters", n ≤ 20
- **Why it works:** A subset is fully described by one yes/no answer per item. The recursion tree enumerates every sequence of answers exactly once, so there are no duplicates to filter (as long as the items are distinct). The index argument is what guarantees each item is decided once and in order

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Pick or skip tree for items 1, 2, 3. At depth 0 decide 1, at depth 1 decide 2, at depth 2 decide 3. Left branches pick, right branches skip. The eight leaves are 1 2 3, 1 2, 1 3, 1, 2 3, 2, 3 and the empty set." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 8.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .e { stroke: #1a1a1a; stroke-width: 0.9; }
    .k { stroke: #9a9a9a; stroke-width: 0.9; stroke-dasharray: 3 2; }
  </style>
  <text x="230" y="14" class="lb" text-anchor="middle">{}</text>
  <line class="e" x1="226" y1="18" x2="126" y2="38"/><line class="k" x1="234" y1="18" x2="334" y2="38"/>
  <text x="120" y="46" class="lb" text-anchor="middle">{1}</text><text x="340" y="46" class="lb" text-anchor="middle">{}</text>
  <line class="e" x1="116" y1="50" x2="70" y2="70"/><line class="k" x1="124" y1="50" x2="170" y2="70"/>
  <line class="e" x1="336" y1="50" x2="290" y2="70"/><line class="k" x1="344" y1="50" x2="390" y2="70"/>
  <text x="66" y="78" class="lb" text-anchor="middle">{1,2}</text><text x="174" y="78" class="lb" text-anchor="middle">{1}</text><text x="286" y="78" class="lb" text-anchor="middle">{2}</text><text x="394" y="78" class="lb" text-anchor="middle">{}</text>
  <line class="e" x1="62" y1="82" x2="42" y2="100"/><line class="k" x1="70" y1="82" x2="90" y2="100"/>
  <line class="e" x1="170" y1="82" x2="150" y2="100"/><line class="k" x1="178" y1="82" x2="198" y2="100"/>
  <line class="e" x1="282" y1="82" x2="262" y2="100"/><line class="k" x1="290" y1="82" x2="310" y2="100"/>
  <line class="e" x1="390" y1="82" x2="370" y2="100"/><line class="k" x1="398" y1="82" x2="418" y2="100"/>
  <text x="38" y="112" class="lb" text-anchor="middle">123</text><text x="94" y="112" class="lb" text-anchor="middle">12</text><text x="146" y="112" class="lb" text-anchor="middle">13</text><text x="202" y="112" class="lb" text-anchor="middle">1</text>
  <text x="258" y="112" class="lb" text-anchor="middle">23</text><text x="314" y="112" class="lb" text-anchor="middle">2</text><text x="366" y="112" class="lb" text-anchor="middle">3</text><text x="422" y="112" class="lb" text-anchor="middle">∅</text>
  <text x="20" y="46" class="sm">pick 1?</text><text x="20" y="78" class="sm">pick 2?</text><text x="440" y="78" class="sm">…</text>
</svg>
:::

```ts
// Subsets (LeetCode 78): distinct values
function subsets(nums: number[]): number[][] {
  const out: number[][] = [], cur: number[] = [];
  const go = (i: number) => {
    // copy the leaf
    if (i === nums.length) { out.push([...cur]); return; }
    cur.push(nums[i]);                   // pick
    go(i + 1);
    cur.pop();                           // undo the pick
    go(i + 1);                           // skip
  };
  go(0);
  return out;
}
```

### Variations

- **Print all subsequences of a string (GFG):** the same tree on characters; the leaf is `cur.join("")`
- **Count subsets with sum K / Target Sum (LeetCode 494):** return counts instead of collecting. The state `(i, remaining)` repeats across branches, so memoising it turns 2ⁿ calls into O(n · K): pick-or-skip is where most knapsack DPs are born (Chapter 17)
- **Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239):** "pick" is allowed only if the word has no repeated letter and shares none with the current mask. Keep exploring *skip* even when pick is allowed: picking now can block a better pick later
- **Ones and Zeroes (LeetCode 474):** pick costs `(zeros, ones)` from two budgets; again memoise `(i, m, n)`
- **Subset sums in sorted order (GFG):** the leaves' sums; sort at the end, or generate them by merging (Chapter 19, meet in the middle, for n up to 40)

### The failure

- **Pushing the working array itself.** `out.push(cur)` stores one shared array 2ⁿ times; after the recursion finishes every entry is the same (empty) array. Push a copy at the leaf
- **Forgetting to undo.** Without `cur.pop()`, the "skip" branch still contains the picked item, and the output is wrong from the second leaf on

:::interview
"What is the complexity of generating all subsets?" — There are 2ⁿ subsets, and copying each one costs up to n, so O(n · 2ⁿ) time and O(n) extra space for the recursion and the working array. It is fine for n ≤ 20. If the question only asks for a *count* or a *best* subset under a numeric budget, the repeated `(index, budget)` states mean DP, not enumeration.
:::
