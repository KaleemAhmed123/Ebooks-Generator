## Graph Recognition Drills

Read the following scenarios. What Graph Algorithm should you use? (Cover the answers on the right).

| Scenario | Algorithm |
| :--- | :--- |
| **1.** You have a grid of 0s (water) and 1s (land). Return the number of islands. | **DFS / BFS.** Simple connected components on an implicit graph. |
| **2.** You have a dictionary of words. Find the shortest way to transform `hit` to `cog` by changing one letter at a time. | **BFS.** Shortest path on an unweighted, implicit state-space graph. |
| **3.** You must take N courses. Some courses have prerequisites. Is it possible to graduate? | **Topological Sort (Kahn's).** Or DFS cycle detection. |
| **4.** You are routing internet traffic. Each connection has a latency in milliseconds. Find the fastest route. | **Dijkstra.** Shortest path on a weighted graph with positive weights. |
| **5.** You want to group users into two servers. Some users hate each other and cannot be on the same server. Is it possible? | **Bipartite Check.** BFS/DFS coloring with 2 colors. |
| **6.** You have a list of currency exchange rates (e.g., USD -> EUR -> JPY -> USD). Is there a way to make infinite money? | **Bellman-Ford.** Looking for a negative weight cycle (where the logarithm of exchange rates forms negative edges). |
| **7.** You have 100 cities. What is the cheapest way to build roads so every city is connected? | **Kruskal's / Prim's.** Minimum Spanning Tree. |
| **8.** In a social network, find if a user is in a closed echo chamber where everyone they follow also follows them back (directly or indirectly). | **Kosaraju's / Tarjan's.** Strongly Connected Components. |
