## Critical Path Analysis <span class="lv lv2"></span>

- In dependency graphs (like job scheduling or build systems), you often need to find the **minimum time required to complete all tasks**
- Because tasks can run in parallel, the total time is not the sum of all task durations. The total time is dictated entirely by the **Critical Path** — the longest sequence of dependent tasks

### The Mechanism

- The critical path is simply the **longest path in a Directed Acyclic Graph (DAG)**, where the edge weights (or node weights) represent time
- Standard Dijkstra cannot find the longest path (it finds shortest). DFS can find it, but it's slow if there are many overlapping paths
- **The insight:** Because dependencies form a DAG (no cycles), we can process the nodes in **Topological Order**
- If we process nodes topologically, we guarantee that when we evaluate a node, all of its prerequisites have already been fully evaluated
