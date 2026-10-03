## Strongly Connected Components (Tarjan) <span class="lv lv3"></span>

- Tarjan's Algorithm accomplishes exactly the same thing as Kosaraju's Algorithm (finding all SCCs in O(V + E) time).
- **The Difference:** Tarjan does it in a **single pass** of DFS, without needing to reverse the graph.
- It is significantly harder to memorize, but mathematically more elegant. It shares the same `disc` and `low` concept as the Bridge-finding algorithm.

### The Mechanics

As Tarjan's DFS runs, it pushes nodes onto a `Stack`. 
It maintains `disc` (discovery time) and `low` (lowest reachable discovery time).
- A node `U` is considered the **"Root" of an SCC** if its `low[u] === disc[u]` after all its children have been processed.
- This means `U` cannot reach any node older/higher than itself in the DFS tree. The SCC is completely bounded by `U`.
- When a root is found, Tarjan pops all nodes off the stack until it pops `U`. That cluster of popped nodes is one complete SCC.
