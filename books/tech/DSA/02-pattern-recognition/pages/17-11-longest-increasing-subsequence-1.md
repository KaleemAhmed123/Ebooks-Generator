## Longest Increasing Subsequence <span class="lv lv1"></span>

- **What:** the longest run of strictly increasing picks (order kept, gaps allowed). Two engines: `dp[i]` = best chain ending at `i` (O(n²)), or a **tails** pile with binary search (O(n log n))
- **Spot it:** "longest increasing subsequence", "max nesting envelopes / boxes", "fewest deletions to sort", "longest chain of pairs"
- **Why:** `tails[k]` holds the *smallest* possible tail of an increasing subsequence of length `k + 1`. A smaller tail can only help later, so replacing the first tail ≥ x keeps every length reachable. The pile count is the LIS length

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Patience method on 2, 5, 3, 7, 101, 18. The tails array keeps the smallest tail per length. 2 starts tails [2]. 5 appends [2,5]. 3 replaces 5 giving [2,3]. 7 appends [2,3,7]. 101 appends [2,3,7,101]. 18 replaces 101 giving [2,3,7,18]. Length 4 is the answer. Replacing, not appending, keeps future tails small." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .app { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .rep { fill: #fff4d6; stroke: #8a5a00; stroke-width: 1.2; }
  </style>
  <text x="14" y="24" class="sm">x</text><text x="14" y="44" class="sm">tails</text>
  <g font-family="Consolas,monospace">
    <text x="44" y="24" class="lb">2</text><rect class="app" x="34" y="32" width="24" height="18"/><text x="46" y="45" class="lb" text-anchor="middle">2</text>
    <text x="94" y="24" class="lb">5</text><rect class="app" x="84" y="32" width="24" height="18"/><text x="96" y="45" class="lb" text-anchor="middle">2</text><rect class="app" x="108" y="32" width="24" height="18"/><text x="120" y="45" class="lb" text-anchor="middle">5</text>
    <text x="168" y="24" class="lb">3</text><rect class="app" x="158" y="32" width="24" height="18"/><text x="170" y="45" class="lb" text-anchor="middle">2</text><rect class="rep" x="182" y="32" width="24" height="18"/><text x="194" y="45" class="lb" text-anchor="middle">3</text>
    <text x="242" y="24" class="lb">7</text><rect class="app" x="232" y="32" width="24" height="18"/><text x="244" y="45" class="lb" text-anchor="middle">2</text><rect class="app" x="256" y="32" width="24" height="18"/><text x="268" y="45" class="lb" text-anchor="middle">3</text><rect class="app" x="280" y="32" width="24" height="18"/><text x="292" y="45" class="lb" text-anchor="middle">7</text>
    <text x="340" y="24" class="lb">18</text><rect class="app" x="330" y="32" width="24" height="18"/><text x="342" y="45" class="lb" text-anchor="middle">2</text><rect class="app" x="354" y="32" width="24" height="18"/><text x="366" y="45" class="lb" text-anchor="middle">3</text><rect class="app" x="378" y="32" width="24" height="18"/><text x="390" y="45" class="lb" text-anchor="middle">7</text><rect class="rep" x="402" y="32" width="24" height="18"/><text x="414" y="45" class="lb" text-anchor="middle">18</text>
  </g>
  <rect class="app" x="34" y="70" width="16" height="12"/><text x="58" y="80" class="sm">append: x beats every tail → longer LIS</text>
  <rect class="rep" x="34" y="90" width="16" height="12"/><text x="58" y="100" class="sm">replace: x takes the first tail ≥ x → smaller tail, same length</text>
  <text x="34" y="126" class="lb" fill="#2d6a4f">tails length = 4 = LIS length (2,3,7,18)</text>
</svg>
:::

```ts
// Longest Increasing Subsequence (LeetCode 300): O(n log n) patience
function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];                           // tails[k]: smallest tail of length k+1
  for (const x of nums) {
    let lo = 0, hi = tails.length;                      // lower_bound: first tail ≥ x
    while (lo < hi) { const mid = (lo + hi) >> 1; tails[mid] < x ? (lo = mid + 1) : (hi = mid); }
    if (lo === tails.length) tails.push(x);             // x extends the longest run
    else tails[lo] = x;                                 // x becomes a smaller tail
  }
  return tails.length;
}
```

- **Watch out:** `tails` is **not** an actual increasing subsequence — only its *length* is correct. To reconstruct the sequence, store predecessors alongside the O(n²) `dp`. For non-strict (≥) LIS, use `upper_bound` (first tail `> x`) instead
