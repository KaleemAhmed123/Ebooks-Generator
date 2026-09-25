### Variations

- **Path With Minimum Effort (LeetCode 1631):** the key is the largest height *difference* along the path; same loop
- **Network Delay Time (LeetCode 743):** the key is the summed time: Dijkstra (Module 05, 03-01)
- **Shortest Path in Binary Matrix (LeetCode 1091):** every step costs 1, so the heap degrades to a queue: BFS
- **Minimum Obstacle Removal to Reach Corner (LeetCode 2290):** step costs are 0 or 1: a deque frontier, 0-1 BFS (Module 05, 02-06)
- **Beam search:** keep only the best B entries per step; fast, but it can discard the true optimum

### The failure

- **Stopping when the target is first *pushed*.** Here it happens to work, because a max never shrinks along a path. With summed costs it does not: edges A→T 5, A→B 1, B→T 1 push T at 5 before B's route reaches it at 2. A node is settled when it is *popped*

:::interview
"Why does one loop give BFS, Dijkstra and this?" — They all pop the frontier's best entry and settle it. The rule is safe whenever a path's key never decreases as the path grows: step counts, non-negative sums, and running maxima all qualify. Swap the container and the key, keep the loop. O(E log V) with a heap.
:::
