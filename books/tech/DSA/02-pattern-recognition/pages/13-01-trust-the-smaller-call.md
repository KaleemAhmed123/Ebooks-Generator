# Chapter 13 - Recursion & Backtracking

## Trust the Smaller Call <span class="lv lv1"></span>

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

### Variations

- **Pow(x, n) (LeetCode 50):** hypothesis `pow(x, n)` returns xⁿ. Induction: `h = pow(x, ⌊n/2⌋)`; return `h · h`, times `x` if n is odd. Handle negative n with `1 / pow(x, −n)`. O(log n) calls
- **Insert at the bottom of a stack (GFG):** hypothesis `insertBottom(st, x)` puts x under everything. Pop the top, trust the call for the smaller stack, push the top back
- **Reverse a stack using recursion (GFG):** hypothesis `reverse(st)` reverses it. Pop the top, trust `reverse` on the rest, then `insertBottom` the popped value
- **Sort a stack (GFG):** pop the top, trust `sort` on the rest, then insert the top into its sorted position with the same pop-trust-push shape
- **Binary search, merge sort:** the same three statements with a halving instead of `n − 1`

### The failure

- **Tracing instead of trusting.** Following every call of Hanoi for n = 4 means 15 moves across 31 calls; nobody debugs that in an interview. Check the base case and one induction step on paper; that is the whole proof
- **A base case the recursion can skip.** `pow(x, n)` with base `n === 1` never terminates for n = 0, and with base `n === 0` alone but a step of `n − 2` it overshoots odd n into negatives. Make sure every chain of calls reaches the base

:::interview
"How do you design a recursive solution you can't picture?" — I write the hypothesis in one sentence, pick the smallest input as the base case, and then only ask: if the smaller call does exactly what the hypothesis says, can I finish the job in O(1) or O(n) extra work? That is an induction proof, and it replaces tracing the call tree.
:::
