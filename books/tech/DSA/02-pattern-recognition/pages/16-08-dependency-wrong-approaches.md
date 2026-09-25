## The wrong approach: Dependency <span class="lv lv1"></span>

- **Naive idea:** Using a standard recursive DFS with a "visited" set to check if you can finish all courses
- **Why it looks right:** You traverse the graph. If you hit a node you've already visited, you declare there's a cycle
- **Why it breaks:** A DAG can have multiple valid paths converging on the same node. `A -> B -> D` and `A -> C -> D`. When you traverse the `C` path, you will see that `D` is already in the `visited` set. The naive DFS will falsely report this as a cycle.
- **The fix:** You must use a 3-state tracking mechanism in DFS (0 = unvisited, 1 = visiting/on current recursion stack, 2 = fully processed and safe). A cycle only exists if you hit a node that is currently in state 1. This is why Kahn's BFS (using in-degrees) is heavily preferred by interviewees: it is much harder to mess up the state tracking.

### Recognition drills

You have 20 seconds per problem. Identify which Dependency pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given a list of packages and their dependencies, output a valid installation order | |
| 2 | Find the minimum time required to complete N jobs where some jobs require others to finish first | |
| 3 | You have an alien dictionary with words sorted lexicographically. Find the alphabetical order of the alien letters | |
| 4 | Find the shortest path from a start node to all other nodes in a network with positive and negative edge weights, but no cycles | |

:::note
**Answers:** 
1. **Topological Sort.** A direct mapping to finding a valid order.
2. **Critical Path (DAG DP).** The minimum time for parallel dependencies is determined by the *longest* path of prerequisites.
3. **Topological Sort.** The sorted words provide directed edges between characters (e.g., if "ba" comes before "bc", then 'a' -> 'c'). You build the graph and sort it.
4. **DAG DP.** Since it has no cycles (it's a DAG), we don't need Bellman-Ford. We can just process it in topological order in O(V+E) time.
:::
