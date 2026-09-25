# Chapter 13 - Recursion & Backtracking

## Trust the Smaller Call 🟢

- **What it is:** Write a recursive function in three statements, and never trace it. **Hypothesis:** state exactly what `f(n)` does. **Base case:** the smallest input, answered directly. **Induction:** assume `f(n − 1)` (or any smaller call) already works as promised, and use it to finish `f(n)`
- **Signal:** "using recursion", "tower of Hanoi", "reverse / sort a stack without another data structure", "compute xⁿ", a problem that looks like a smaller copy of itself once one element is removed
- **Why it works:** It is mathematical induction. If the base case is right and every call is right *whenever its smaller calls are right*, then every call is right. Tracing 2ⁿ calls by hand is where people get lost; the hypothesis replaces the trace

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Tower of Hanoi with n disks. Hypothesis: solve of n, from, to, via moves n disks from from to to. Induction: trust solve of n minus 1 to move the top n minus 1 disks to via, move the largest disk directly, then trust solve of n minus 1 again to move them onto to. Base case: zero disks, do nothing. Total moves 2 to the n minus 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .peg { stroke: #1a1a1a; stroke-width: 2; }
    .blk { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .big { fill: #1d4e89; }
  </style>
  <line class="peg" x1="50" y1="20" x2="50" y2="90"/><line class="peg" x1="130" y1="20" x2="130" y2="90"/><line class="peg" x1="210" y1="20" x2="210" y2="90"/>
  <line x1="14" y1="90" x2="246" y2="90" stroke="#1a1a1a" stroke-width="1.5"/>
  <rect class="blk" x="26" y="52" width="48" height="26" rx="3"/><text x="50" y="69" class="sm" text-anchor="middle">n − 1</text>
  <rect class="big" x="16" y="78" width="68" height="10" rx="2"/>
  <text x="50" y="104" class="sm" text-anchor="middle">from</text><text x="130" y="104" class="sm" text-anchor="middle">via</text><text x="210" y="104" class="sm" text-anchor="middle">to</text>
  <text x="268" y="30" class="lb">1. solve(n−1, from → via)  trust it</text>
  <text x="268" y="48" class="lb">2. move disk n, from → to</text>
  <text x="268" y="66" class="lb">3. solve(n−1, via → to)    trust it</text>
  <text x="268" y="88" class="sm">base: n = 0 → nothing to move</text>
  <text x="268" y="102" class="sm">moves(n) = 2·moves(n−1) + 1 = 2ⁿ − 1</text>
</svg>
:::

```ts
// Tower of Hanoi (GFG): list every move for n disks
function hanoi(n: number, from = 1, to = 3, via = 2,
               moves: [number, number][] = []): [number, number][] {
  if (n === 0) return moves;                 // base case
  // trust: n−1 disks out of the way
  hanoi(n - 1, from, via, to, moves);
  moves.push([from, to]);                    // the only real work
  // trust: n−1 disks back on top
  hanoi(n - 1, via, to, from, moves);
  return moves;
}
```
