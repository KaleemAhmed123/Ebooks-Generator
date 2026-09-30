## Split, Solve, Combine <span class="lv lv2"></span>

- **What:** cut the input at a chosen point, solve each part independently, then combine the parts' answers. When the cut point is itself a choice — an operator, a root, a pivot — try every cut and merge the results
- **Spot it:** "all results from different groupings", "combine answers from two halves", "count across a split", a problem that shrinks to two independent smaller copies
- **Why:** parts that do not overlap cannot affect each other, so solving them apart and merging is exact. If different cuts reuse the same subproblem, memoise the cut — divide & conquer becomes DP (17-05)

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Different Ways to Add Parentheses on 2 star 3 minus 4. Splitting at the star computes 2 and (3 minus 4) then multiplies. Splitting at the minus computes (2 star 3) and 4 then subtracts. Each operator is a cut; the left and right results are combined by that operator, collecting all groupings." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .op { font: bold 9px Consolas, monospace; fill: #ef476e; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
  </style>
  <defs><marker id="dc0710" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6b6b6b"/></marker></defs>
  <rect class="n" x="185" y="8" width="100" height="22" rx="3"/><text x="235" y="23" class="lb" text-anchor="middle">"2*3-4"</text>
  <line class="e" x1="210" y1="30" x2="120" y2="56" marker-end="url(#dc0710)"/>
  <line class="e" x1="260" y1="30" x2="350" y2="56" marker-end="url(#dc0710)"/>
  <text x="150" y="48" class="op">cut at *</text>
  <text x="330" y="48" class="op">cut at −</text>
  <rect class="n" x="70" y="58" width="110" height="22" rx="3"/><text x="125" y="73" class="lb" text-anchor="middle">"2" * "3-4"</text>
  <rect class="n" x="300" y="58" width="110" height="22" rx="3"/><text x="355" y="73" class="lb" text-anchor="middle">"2*3" − "4"</text>
  <text x="125" y="100" class="lb" text-anchor="middle">2 × (−1) = −2</text>
  <text x="355" y="100" class="lb" text-anchor="middle">6 − 4 = 2</text>
  <text x="235" y="128" class="lb" text-anchor="middle" fill="#2d6a4f">all groupings: [−2, 2]</text>
</svg>
:::

```ts
// Different Ways to Add Parentheses (LeetCode 241): every operator is a cut
function diffWaysToCompute(expr: string): number[] {
  const memo = new Map<string, number[]>();              // reused sub-expressions
  const go = (s: string): number[] => {
    if (memo.has(s)) return memo.get(s)!;
    const res: number[] = [];
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "+" || c === "-" || c === "*") {          // cut here
        const L = go(s.slice(0, i)), R = go(s.slice(i + 1));
        for (const a of L) for (const b of R)             // combine every pair
          res.push(c === "+" ? a + b : c === "-" ? a - b : a * b);
      }
    }
    if (res.length === 0) res.push(Number(s));            // base: a bare number
    memo.set(s, res);
    return res;
  };
  return go(expr);
}
```

- **Watch out:** the combine step is where the cost lives — merging two sorted halves is O(n), so merge sort is O(n log n), but combining *every* left with *every* right (as above) is exponential without the memo. Always ask whether the halves are truly independent; if they share state, it is DP, not clean divide & conquer
