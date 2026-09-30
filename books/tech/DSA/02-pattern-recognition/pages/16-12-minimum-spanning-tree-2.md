## Minimum Spanning Tree - continued

### Where it appears

| Problem | The graph to span |
|---|---|
| Min Cost to Connect All Points (LeetCode 1584) | complete graph, Manhattan weights |
| Connecting Cities With Minimum Cost (LeetCode 1135) | given weighted edges |
| Optimize Water Distribution (LeetCode 1168) | a well = an edge to a virtual node 0 |

- **Go deeper:** Prim's heap-based MST, and why the cut property holds, are in Module 05.

:::interview
"Kruskal or Prim — when does it matter?"

Both build a minimum spanning tree. Kruskal sorts edges and uses union–find: O(E log E), best when edges are sparse or already sortable. Prim grows one tree with a heap of frontier edges: O(E log V), better on dense graphs where E approaches V². The cut property — the cheapest edge leaving any group is safe — is what makes both correct.
:::
