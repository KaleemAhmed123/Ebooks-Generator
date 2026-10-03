## Bipartite Graphs <span class="lv lv1"></span>

- **Definition:** A graph is Bipartite if its nodes can be divided into exactly two independent sets, U and V, such that every edge connects a node in U to a node in V. There are absolutely zero edges between nodes in the same set.
- **Visual Intuition:** Imagine coloring the graph using only Red and Blue. If you can color every node such that no two adjacent nodes have the same color, the graph is Bipartite.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bipartite Graph Coloring">
  <!-- Valid Bipartite -->
  <circle cx="50" cy="40" r="15" fill="#1d4e89" />
  <circle cx="50" cy="100" r="15" fill="#1d4e89" />
  <circle cx="150" cy="40" r="15" fill="#ef476e" />
  <circle cx="150" cy="100" r="15" fill="#ef476e" />
  
  <path d="M 65 40 L 135 40" stroke="#12121a" stroke-width="2" />
  <path d="M 65 100 L 135 100" stroke="#12121a" stroke-width="2" />
  <path d="M 60 50 L 140 90" stroke="#12121a" stroke-width="2" />
  <path d="M 60 90 L 140 50" stroke="#12121a" stroke-width="2" />
  
  <text x="75" y="135" class="s">Valid (Bipartite)</text>

  <!-- Invalid Bipartite -->
  <circle cx="280" cy="40" r="15" fill="#1d4e89" />
  <circle cx="280" cy="100" r="15" fill="#ef476e" />
  <circle cx="380" cy="40" r="15" fill="#ef476e" />
  
  <path d="M 295 40 L 365 40" stroke="#12121a" stroke-width="2" />
  <path d="M 280 55 L 280 85" stroke="#12121a" stroke-width="2" />
  <path d="M 290 90 L 370 50" stroke="#12121a" stroke-width="2" />
  
  <!-- The offending edge -->
  <path d="M 295 100 Q 380 100 380 55" stroke="#ef476e" stroke-width="3" stroke-dasharray="4" />
  
  <text x="290" y="135" class="s">Odd Cycle (Not Bipartite)</text>
</svg>
:::

- **The Mathematical Rule:** A graph is Bipartite **if and only if** it does not contain any cycles of **odd length**.
