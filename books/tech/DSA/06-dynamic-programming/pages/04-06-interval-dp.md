## Interval DP <span class="lv lv2"></span>

- **Interval DP** solves problems where the answer for a range `[i, j]` depends on answers for smaller sub-ranges within it. The state is the interval itself: `dp[i][j]` = the optimal answer for the subproblem spanning indices `i` to `j`
- **The signal:** the problem involves merging, splitting, or collapsing contiguous elements — stones, balloons, matrices, parenthesisations. Whenever you combine two adjacent pieces and the cost depends on what remains, think interval DP

### The evaluation order

- Unlike standard 2D DP where you fill row by row, interval DP fills by **interval length**. You must solve all intervals of length 1 before length 2, length 2 before length 3, and so on
- The outer loop iterates `len` from 1 to n. The inner loop iterates the start index `i`, and `j = i + len - 1`

```ts
// Skeleton for interval DP
for (let len = 1; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    // Base case: dp[i][i] is a single element
    if (i === j) { dp[i][j] = base; continue; }
    // Try every split point k between i and j
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(dp[i][j],
        dp[i][k] + dp[k + 1][j] + mergeCost(i, j, k));
    }
  }
}
```

### Matrix Chain Multiplication

- **Problem:** Given n matrices with dimensions `dims[0] × dims[1], dims[1] × dims[2], …, dims[n-1] × dims[n]`, find the parenthesisation that minimises total scalar multiplications
- **State:** `dp[i][j]` = minimum cost to multiply matrices i through j
- **Transition:** split at k — multiply `[i..k]` and `[k+1..j]` separately, then multiply the two results. The cost of the final multiplication is `dims[i] × dims[k+1] × dims[j+1]`
- **Complexity:** O(n³) time, O(n²) space

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Interval DP fills by length: length-1 intervals first, then length-2, up to the full range" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <text x="10" y="14" class="sm">fill order:</text>

  <rect class="hi" x="10" y="22" width="30" height="16" rx="2"/>
  <rect class="hi" x="45" y="22" width="30" height="16" rx="2"/>
  <rect class="hi" x="80" y="22" width="30" height="16" rx="2"/>
  <rect class="hi" x="115" y="22" width="30" height="16" rx="2"/>
  <text x="80" y="55" class="sm" text-anchor="middle">len = 1</text>

  <rect class="bx" x="170" y="22" width="60" height="16" rx="2"/>
  <rect class="bx" x="235" y="22" width="60" height="16" rx="2"/>
  <rect class="bx" x="300" y="22" width="60" height="16" rx="2"/>
  <text x="265" y="55" class="sm" text-anchor="middle">len = 2</text>

  <rect class="bx" x="170" y="62" width="90" height="16" rx="2"/>
  <rect class="bx" x="265" y="62" width="90" height="16" rx="2"/>
  <text x="265" y="95" class="sm" text-anchor="middle">len = 3</text>

  <rect class="bx" x="370" y="42" width="90" height="16" rx="2"/>
  <text x="415" y="75" class="sm" text-anchor="middle">len = n (answer)</text>
</svg>
:::

### The trap

- **Using `for (let i = 0; i < n; i++)` as the outer loop.** This fills row by row, but `dp[i][j]` needs `dp[i+1][...]` which has not been computed yet. The outer loop must be interval length, not start index
- **Off-by-one in the split.** The split point `k` must range from `i` to `j - 1` (not `j`). Splitting at `j` produces an empty right half

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | Classic "which to burst last" interval DP |
| [Minimum Cost to Merge Stones](https://leetcode.com/problems/minimum-cost-to-merge-stones/) (LeetCode 1000) | Merge adjacent piles — interval split with group constraint |
| [Strange Printer](https://leetcode.com/problems/strange-printer/) (LeetCode 664) | Minimum turns to print a string — interval collapse |
| [Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) (LeetCode 1039) | Split polygon into triangles at each vertex |

:::interview
"What class of problems does interval DP solve?"

Any problem where you combine adjacent elements and the cost depends on the result of combining sub-intervals. The key invariant: after you merge a range, the elements outside that range are unchanged — they do not rearrange. Matrix chain, burst balloons, optimal BST, and palindrome partitioning all fit this shape.
:::
