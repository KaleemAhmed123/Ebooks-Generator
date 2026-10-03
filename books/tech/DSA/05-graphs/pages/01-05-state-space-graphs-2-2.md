### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Sliding Puzzle](https://leetcode.com/problems/sliding-puzzle/) (LeetCode 773) | BFS over board configurations as state-space nodes |
| [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752) | Each 4-digit combo is a node, each turn is an edge |
| [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) (LeetCode 433) | Gene strings as states, single-char mutations as edges |

:::interview
"Could we use DFS to solve the Sliding Puzzle?"

No. DFS dives deep. It might find a path that takes 50,000 moves, and it will eventually explore the shortest path, but keeping track of the absolute shortest path while avoiding cycles in a massive state-space is incredibly inefficient with DFS. If you need the *minimum* operations on an unweighted graph, it must be BFS.
:::
