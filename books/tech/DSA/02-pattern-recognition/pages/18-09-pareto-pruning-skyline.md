## Pareto Pruning and Skylines

- When candidates have multiple dimensions, domination becomes a 2D or 3D problem. This is where Pareto pruning comes in

### The Pareto Principle in algorithms

- A candidate point `(x1, y1)` **strictly dominates** `(x2, y2)` if it is better in *both* dimensions. For example, if you want high speed and low memory, a candidate that is both faster and uses less memory dominates a slower, memory-heavy candidate
- The set of candidates that are not dominated by any other candidate is called the **Pareto frontier** (or Skyline)
- **The elimination rule:** If a candidate is not on the Pareto frontier, throw it away. It can never be the optimal choice for any combined weighting of the dimensions

### The Skyline Problem

- **Problem:** Given a set of overlapping rectangular buildings, output the outline (skyline) of the city
- A building is defined by `[left, right, height]`. The bottleneck is that many buildings are completely hidden behind taller buildings
- **The insight:** A building `B` is dominated if there is another building `A` such that `A` is taller AND covers the entire width of `B`
- But the skyline isn't just about throwing away whole buildings; it's about finding the highest active point at any x-coordinate

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Pareto pruning. Three points on a graph. Point B is worse than Point A in both X and Y dimensions, so it is strictly dominated and eliminated. Only A and C survive." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { stroke: #1a1a1a; stroke-width: 1.2; fill: none; }
    .hot { fill: #ef476e; }
    .hi { fill: #2d6a4f; }
    .zone { fill: #f0f0f0; }
  </style>

  <!-- Axes (Maximising both) -->
  <path class="a" d="M 20 100 L 220 100" marker-end="url(#arrow)" />
  <path class="a" d="M 20 100 L 20 10" marker-end="url(#arrow)" />
  <text x="225" y="105" class="sm">Speed (higher = better)</text>
  <text x="5" y="8" class="sm">Memory (higher = better)</text>

  <!-- Domination zone from A -->
  <rect class="zone" x="20" y="40" width="80" height="60" />
  <text x="50" y="80" class="sm" fill="#6b6b6b">Dominated Zone</text>

  <!-- Points -->
  <circle cx="100" cy="40" r="4" class="hi" />
  <text x="110" y="37" class="lb">A (Fast, High Mem)</text>

  <circle cx="60" cy="70" r="4" class="hot" />
  <text x="70" y="67" class="lb" fill="#ef476e">B (Slow, Low Mem)</text>

  <circle cx="160" cy="80" r="4" class="hi" />
  <text x="170" y="77" class="lb">C (Very Fast, Low Mem)</text>

  <path class="a" stroke-dasharray="2 2" d="M 100 40 L 100 100" />
  <path class="a" stroke-dasharray="2 2" d="M 20 40 L 100 40" />

  <text x="250" y="30" class="lb">The Elimination:</text>
  <text x="250" y="45" class="sm">- A is better than B at Speed (100 > 60)</text>
  <text x="250" y="57" class="sm">- A is better than B at Memory (y: 40 > 70)</text>
  <text x="250" y="69" class="sm">- B is strictly dominated. Eliminate B.</text>
  <text x="250" y="81" class="sm">- C is faster than A, but A has more Memory.</text>
  <text x="250" y="93" class="sm">- Neither dominates. Both survive.</text>
</svg>
:::

### The structural parallel

- Whether you are sorting items by weight/value (Knapsack bounding) or tracking the maximum height in a sweep-line (Skyline), the core action is the same:
- **Discard the strictly inferior.** Do not let it enter your data structure. Do not evaluate it in your DP
- The data structure used to maintain the Pareto frontier is usually a **binary search tree (e.g. `std::set` in C++, `TreeMap` in Java)**, which allows you to quickly query "is there any point up and to the right of me?"

### The trap

- **Checking all pairs.** To eliminate dominated candidates, beginners often check every new candidate against *every* existing candidate, creating an O(n²) bottleneck. By sorting the data first (e.g., by the X dimension), you only need to check the Y dimension against the *current best* Y dimension seen so far. Sorting turns 2D elimination into 1D monotonic tracking
