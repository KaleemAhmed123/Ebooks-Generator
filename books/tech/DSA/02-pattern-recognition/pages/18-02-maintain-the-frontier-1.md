## Maintain the Frontier <span class="lv lv2"></span>

- **What it is:** Keep a set of discovered-but-unsettled candidates, the **frontier**. Repeatedly take the best one by some rule, settle it, and add its neighbours. BFS, Dijkstra, DFS and best-first search are this one loop with different rules for "best"
- **Signal:** "minimum steps / cost / effort / time to reach", "expand from the sources", a grid or state space where each move has a cost, "the path whose worst step is smallest"
- **Why it works:** If every path's key can only grow as it gets longer, then the smallest key in the frontier can never be improved by a detour through larger keys. Popping it settles it for good, so each node is settled once
