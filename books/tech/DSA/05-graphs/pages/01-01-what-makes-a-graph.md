## What Makes a Graph?

- In data structures, a graph is simply a collection of **Nodes** (also called Vertices) connected by **Edges**.
- If a Tree is a strict hierarchy, a Graph is the wild west. Any node can point to any other node, or even to itself. In fact, a Tree is just a highly restricted type of graph (a connected, undirected graph with no cycles).

### Directed vs Undirected

- **Directed Graph (Digraph):** Edges have arrows. If node `A` points to node `B`, it does not mean `B` points to `A`. (Example: Twitter followers. I can follow you, but you don't have to follow me).
- **Undirected Graph:** Edges are bidirectional. If `A` is connected to `B`, then `B` is inherently connected to `A`. (Example: Facebook friends. We are mutually friends).

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Directed vs Undirected Graphs">
  <!-- Undirected -->
  <circle cx="50" cy="70" r="20" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <circle cx="150" cy="70" r="20" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <line x1="70" y1="70" x2="130" y2="70" stroke="#1d4e89" stroke-width="3" />
  
  <text x="45" y="75" class="l">A</text>
  <text x="145" y="75" class="l">B</text>
  <text x="60" y="120" class="s">Undirected</text>

  <!-- Directed -->
  <circle cx="280" cy="70" r="20" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <circle cx="380" cy="70" r="20" fill="#f4f4f4" stroke="#12121a" stroke-width="2" />
  <line x1="300" y1="70" x2="360" y2="70" stroke="#ef476e" stroke-width="3" marker-end="url(#arrow)" />
  
  <text x="275" y="75" class="l">C</text>
  <text x="375" y="75" class="l">D</text>
  <text x="290" y="120" class="s">Directed</text>
</svg>
:::

### Weighted vs Unweighted

- **Unweighted:** Every edge costs the exact same amount to traverse (usually `1`). Finding the shortest path is a matter of counting the fewest number of edges.
- **Weighted:** Edges have a cost, distance, or time associated with them. The path with the fewest edges might actually be the most expensive path.

### Cycles

- **Cyclic:** The graph contains at least one loop. You can start at node `A`, travel through the graph, and eventually end up back at node `A` without retracing your exact steps.
- **Acyclic:** The graph has no loops. 
- A **DAG** (Directed Acyclic Graph) is the most important type of graph in computer science. It represents dependencies (e.g., this file must be compiled before that file).

### The trap

- **Assuming Undirected:** If an interview problem says "There is a road between City A and City B", candidates often blindly code a directed edge `A -> B` and forget to add `B -> A`.
- **The fix:** Unless the problem explicitly uses words like "one-way", "directs to", or "points to", always assume real-world physical connections are undirected.
