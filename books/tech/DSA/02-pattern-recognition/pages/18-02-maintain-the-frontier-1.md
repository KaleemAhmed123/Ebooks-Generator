## Maintain the Frontier <span class="lv lv2"></span>

- **What it is:** Keep a set of discovered-but-unsettled candidates, the **frontier**. Repeatedly take the best one by some rule, settle it, and add its neighbours. BFS, Dijkstra and best-first search are this one loop with different rules for "best". DFS shares the loop with a stack, but not the guarantee: a stack pops the newest entry, not the best, so a popped node is not settled
- **Signal:** "minimum steps / cost / effort / time to reach", "expand from the sources", a grid or state space where each move has a cost, "the path whose worst step is smallest"
- **Not this page if:** edge costs can be negative → Module 05, 03-03 (Bellman–Ford): popping the smallest key settles nothing
- **Why it works:** If every path's key can only grow as it gets longer, then the smallest key in the frontier can never be improved by a detour through larger keys. Popping it settles it for good, so each node is settled once
