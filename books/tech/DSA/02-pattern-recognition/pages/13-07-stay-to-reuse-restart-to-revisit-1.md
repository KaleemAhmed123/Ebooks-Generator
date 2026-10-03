## Stay to Reuse, Restart to Revisit <span class="lv lv2"></span>

- **What:** the next call's start index sets the rules. `go(i + 1)`: each item once. `go(i)`: reuse, order ignored. `go(0)`: earlier items may follow later ones, so orders count
- **Spot it:** "may be chosen an unlimited number of times" (stay), "different sequences count as different" (restart), coin combinations vs sequences. Order matters, each item once → 13-08
- **Why:** combinations are counted once by forcing non-decreasing index order; the start index enforces it, and restarting at 0 lifts it

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Coins 1 and 2, amount 3. Staying at index i counts combinations: 1 plus 1 plus 1 and 1 plus 2, two ways. Restarting at 0 counts sequences: 1 1 1, 1 2, and 2 1, three ways. The only code difference is the start index of the next call." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .b { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">coins [1, 2], amount 3</text>
  <rect class="a" x="20" y="26" width="200" height="66" rx="4"/>
  <text x="30" y="42" class="lb">go(i): stay, reuse allowed</text>
  <text x="30" y="60" class="lb">1+1+1, 1+2</text>
  <text x="30" y="80" class="lb">→ 2 combinations</text>
  <rect class="b" x="240" y="26" width="210" height="66" rx="4"/>
  <text x="250" y="42" class="lb">go(0): restart, order counts</text>
  <text x="250" y="60" class="lb">1+1+1, 1+2, 2+1</text>
  <text x="250" y="80" class="lb">→ 3 sequences</text>
</svg>
:::

```ts
// Combination Sum (LeetCode 39): reuse allowed, order ignored
function combinationSum(c: number[], target: number): number[][] {
  const out: number[][] = [], cur: number[] = [];
  const go = (start: number, rem: number) => {
    if (rem === 0) { out.push([...cur]); return; }
    for (let i = start; i < c.length; i++) {
      if (c[i] > rem) continue;
      cur.push(c[i]);
      go(i, rem - c[i]);           // stay: c[i] may be used again
      cur.pop();
    }
  };
  go(0, target);
  return out;
}
```

- **Watch out:** 518 and 377 take the same input. Coins `[1, 2]`, amount 3: 2 combinations, 3 sequences
