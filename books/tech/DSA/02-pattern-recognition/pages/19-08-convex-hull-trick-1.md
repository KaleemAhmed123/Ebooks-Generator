## Convex Hull Trick as Elimination <span class="lv lv3"></span>

- The **Convex Hull Trick (CHT)** is an advanced DP optimisation that reduces O(n²) time to O(n) or O(n log n)
- Textbooks describe it with geometry ("lower envelope of a set of lines"). But structurally, it is just Dominated Candidate Elimination applied to linear functions

### The DP Bottleneck

- **Problem:** You have a DP transition that looks like: `dp[i] = min(dp[j] + m[j] * x[i] + c[j])` for all `j < i`
- At step `i`, you have to check all previous `j` to find the minimum. That's a bottleneck
- **The insight:** Each `j` represents a line `y = m*x + c`. You are asking: "At x-coordinate `x[i]`, which of the previous lines gives the lowest y-value?"

### The Elimination

- If you draw the lines, some lines are **never** the lowest at any x-coordinate, or they are only lowest for a range of x-coordinates you have already passed
- If a line can *never* be the minimum again, it is a **dominated candidate**. We should throw it away
- To find if a new line `L3` dominates an existing line `L2`, we check the intersections:
  - If `L3` intersects `L1` *before* `L2` intersects `L1`, then `L2` is completely swallowed by `L1` and `L3`. `L2` is dominated

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Convex Hull Trick. Three lines intersect. Line 2 is always above the lower envelope formed by Line 1 and Line 3. Line 2 is dominated and eliminated." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.2; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.2; fill: none; }
    .hi { stroke: #2d6a4f; stroke-width: 1.8; fill: none; }
  </style>

  <!-- Axes -->
  <path class="a" d="M 20 120 L 250 120" />
  <path class="a" d="M 20 120 L 20 10" />

  <!-- Line 1: shallow -->
  <path class="a" d="M 20 100 L 250 40" />
  <text x="255" y="45" class="lb">L1</text>

  <!-- Line 2: medium (dominated) -->
  <path class="hot" d="M 40 120 L 180 10" stroke-dasharray="2 2" />
  <text x="185" y="15" class="lb" fill="#ef476e">L2 (dominated)</text>

  <!-- Line 3: steep -->
  <path class="a" d="M 120 120 L 210 10" />
  <text x="215" y="15" class="lb">L3</text>

  <!-- Lower Envelope (Highlight) -->
  <path class="hi" d="M 20 100 L 155 65 L 210 10" />
  
  <text x="270" y="50" class="lb">The Elimination:</text>
  <text x="270" y="65" class="sm">- We only care about the green envelope</text>
  <text x="270" y="77" class="sm">- L2 is never the lowest line at any x</text>
  <text x="270" y="89" class="sm">- L3 arrives and proves L2 is useless</text>
  <text x="270" y="101" class="sm">- Pop L2 from the monotonic queue</text>
</svg>
:::
