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
