## Strongly Connected Components (Kosaraju) <span class="lv lv2"></span>

- In an undirected graph, connected components are trivial to find (just run a DFS).
- In a **Directed Graph**, connectivity is much stricter. A **Strongly Connected Component (SCC)** is a maximal subgraph where *every* node can reach *every other* node in that subgraph. (If `A -> B`, then `B` must also have a path back to `A`).
- **Kosaraju's Algorithm** finds all SCCs in O(V + E) time using two passes of DFS.

### The Insight

1. If you run a DFS, nodes that finish their post-order processing last are structurally "upstream" (closer to the source). 
2. If you reverse the direction of every single edge in the graph, the SCCs themselves remain internally perfectly intact (because they form cycles), but the overarching directed pathways between different SCCs are reversed.
3. Therefore, if you process the nodes in decreasing order of their original finish times on the *reversed* graph, the DFS will get "trapped" perfectly inside one SCC at a time.
