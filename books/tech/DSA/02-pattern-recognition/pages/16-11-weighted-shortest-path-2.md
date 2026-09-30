## Weighted Shortest Path - continued

### Where it appears

| Problem | The weighted graph |
|---|---|
| Network Delay Time (LeetCode 743) | signal time = max shortest distance |
| Path With Minimum Effort (LeetCode 1631) | edge weight is the height gap; minimise the max |
| Cheapest Flights Within K Stops (LeetCode 787) | add remaining stops to the state |
| Swim in Rising Water (LeetCode 778) | key by the highest tile so far → 18-02 |

- **Go deeper:** Dijkstra is one setting of the frontier loop in 18-02 — swap the heap key and you get BFS or best-first. Bellman–Ford, Floyd–Warshall and A* are in Module 05.

:::interview
"Why must Dijkstra settle a node on pop, not when it is first pushed?"

The first push records a tentative distance that a cheaper path found later can still beat. Settling on pop means the node leaves the heap only when it holds the global minimum tentative distance, which (with non-negative edges) no future path can undercut. Settling on push would lock in the wrong value — the case where S→B direct is 4 but S→A→B is 3.
:::
