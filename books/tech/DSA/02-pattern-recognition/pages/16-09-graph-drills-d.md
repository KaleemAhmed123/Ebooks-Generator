## Recognition drills: Graphs & Dependency 🟡 - continued

| Problem | Node · edge · move |
|---|---|
| 36. Bridges in a graph (GFG) / Critical Connections (LeetCode 1192) | **Low-link:** edge (u, v) is a bridge iff low[v] > tin[u] (Module 05, 05-03) |
| 37. Strongly Connected Components, Kosaraju (GFG) | **Two DFS passes,** the second on the reversed graph (Module 05, 05-04) |
| 38. Seven Bridges / Euler path (GFG) | **Degree test:** 0 or 2 odd vertices, one component with edges (Module 05, 05-06) |
| 39. Number of triangles (GFG) | **trace(A³) / 6** undirected, **/ 3** directed |
| 40. Travelling Salesman Problem (GFG) | **Bitmask DP** over (visited set, last city), O(n² · 2ⁿ) |
| 41. Minimize Cash Flow (GFG) | **Net balances;** repeatedly settle the largest creditor against the largest debtor |

### Score yourself

- **35–41:** you name the edge before the algorithm
- **24–34:** reread 16-02 and Module 05's recognition page; most misses are the wrong edge, not the wrong algorithm
- **0–23:** redo drills 1–14; each is one BFS with a different node
