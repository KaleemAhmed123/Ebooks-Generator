### The synthesis

- The most difficult problems in competitive programming and interviews don't use one pattern. They combine them
- **Example:** "Find the shortest path in a graph where you can skip at most K edges."
  - This is Frontier Maintenance (Dijkstra) combined with State Precompute (the state is `(node, skipsUsed)`). 
- **Example:** "Answer range minimum queries, but the array is updated."
  - This is Precompute (you can't use Sparse Table because it doesn't support updates, so you must use a Segment Tree).
- When you see the abstract structures, you stop trying to memorize templates and start assembling solutions from fundamental building blocks

:::interview
"I understand the solutions when I read them, but I can't come up with them."

You are trying to retrieve full solutions from memory. Expert problem solvers retrieve abstract structures (like boundaries or frontiers) and derive the solution on the spot. Ask the 4 diagnostic questions to force your brain out of keyword-matching mode.
:::
