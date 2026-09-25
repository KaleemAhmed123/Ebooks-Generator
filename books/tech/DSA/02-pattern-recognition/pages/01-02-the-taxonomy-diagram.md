## The taxonomy of structure 🟢

- The structural patterns that solve 99% of interview problems fall into these eight families
- When you read constraints and write the brute force, you are looking for which of these families the problem belongs to

:::mint
<svg viewBox="0 0 470 230" role="img" aria-label="A diagram showing 8 structural families: Locality, Order, Repeated Extremum, Repeated State, Connectivity, Dependency, Range Interaction, and Search Space Reduction, mapping to their respective techniques." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; font-weight: bold; }
    .sm { font: 8px Consolas, monospace; fill: #1d4e89; }
    .desc { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>

  <!-- Left Column -->
  <rect class="hi" x="10" y="10" width="140" height="40" rx="3"/>
  <text x="20" y="24" class="lb">Locality</text>
  <text x="20" y="36" class="desc">Answer is a contiguous chunk</text>
  <text x="20" y="46" class="sm">Sliding Window, Mono-Stack</text>

  <rect class="bx" x="10" y="60" width="140" height="40" rx="3"/>
  <text x="20" y="74" class="lb">Order / Ranking</text>
  <text x="20" y="86" class="desc">Values relate by magnitude</text>
  <text x="20" y="96" class="sm">Sorting, Two Pointers</text>

  <rect class="bx" x="10" y="110" width="140" height="40" rx="3"/>
  <text x="20" y="124" class="lb">Repeated Extremum</text>
  <text x="20" y="136" class="desc">Need max/min repeatedly</text>
  <text x="20" y="146" class="sm">Heaps, Segment Trees</text>

  <rect class="bx" x="10" y="160" width="140" height="40" rx="3"/>
  <text x="20" y="174" class="lb">Repeated State</text>
  <text x="20" y="186" class="desc">Same subproblem appears</text>
  <text x="20" y="196" class="sm">Dynamic Programming</text>

  <!-- Right Column -->
  <rect class="bx" x="160" y="10" width="140" height="40" rx="3"/>
  <text x="170" y="24" class="lb">Connectivity</text>
  <text x="170" y="36" class="desc">Elements link to others</text>
  <text x="170" y="46" class="sm">Graphs, BFS/DFS, DSU</text>

  <rect class="bx" x="160" y="60" width="140" height="40" rx="3"/>
  <text x="170" y="74" class="lb">Dependency</text>
  <text x="170" y="86" class="desc">A must happen before B</text>
  <text x="170" y="96" class="sm">Topological Sort, DAGs</text>

  <rect class="bx" x="160" y="110" width="140" height="40" rx="3"/>
  <text x="170" y="124" class="lb">Range Interaction</text>
  <text x="170" y="136" class="desc">Queries/updates over ranges</text>
  <text x="170" y="146" class="sm">Prefix Sum, Fenwick</text>

  <rect class="bx" x="160" y="160" width="140" height="40" rx="3"/>
  <text x="170" y="174" class="lb">Search Space Reduction</text>
  <text x="170" y="186" class="desc">Eliminating candidates fast</text>
  <text x="170" y="196" class="sm">Binary Search on Answer</text>

  <!-- Unnamed Patterns Box -->
  <rect class="bx" x="310" y="10" width="150" height="190" rx="3" stroke-dasharray="4 4"/>
  <text x="320" y="24" class="lb">The Unnamed Patterns</text>
  <text x="320" y="36" class="desc">Chapter 18 covers patterns</text>
  <text x="320" y="46" class="desc">nobody gave a LeetCode tag</text>
  
  <text x="320" y="66" class="sm">1. Maintain the Frontier</text>
  <text x="320" y="76" class="desc">(BFS, Dijkstra, Greedy Beam)</text>
  
  <text x="320" y="96" class="sm">2. Dominated Candidate</text>
  <text x="320" y="106" class="desc">(Mono-stack, Convex Hull)</text>
  
  <text x="320" y="126" class="sm">3. Boundary Finding</text>
  <text x="320" y="136" class="desc">(Binary Search, Thresholds)</text>
  
  <text x="320" y="156" class="sm">4. Precompute for Queries</text>
  <text x="320" y="166" class="desc">(Prefix Sum, Sparse Table)</text>
</svg>
:::

- Look at how techniques cross over. "Binary Search" isn't a category — it's a technique used in both **Order** (finding an element) and **Search Space Reduction** (finding an answer threshold)
- The rest of this module walks through each of these families, showing how to spot them and how to code the techniques that solve them. 01-03 maps each family to its chapters
