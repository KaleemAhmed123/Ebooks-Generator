### Step 3: Can we eliminate starting points?

- **Key insight:** If you run BFS from *any* node and find the farthest node from it, that farthest node is guaranteed to be one endpoint of the diameter
- Why? If there were a longer path that doesn't include this farthest node, then the node you started from would have found something farther — contradiction
- **Transformation:** Run BFS twice. First BFS from any arbitrary node finds one endpoint of the diameter. Second BFS from that endpoint finds the other endpoint. The distance is the diameter

```ts
// Optimised: exactly 2 BFS passes
const endpointA = bfs(graph, 0).farthestNode;        // any start
const result = bfs(graph, endpointA);                  // from endpoint
const diameter = result.maxDistance;
```

- **Complexity:** Two BFS runs, each O(n). Total: O(n)

### The Derivation

- You wrote the brute force (BFS from every node). You saw the repetition (overlapping path discovery). You asked: can we eliminate starting points? The insight — that any BFS finds an endpoint of the diameter — let you drop from n starts to exactly 2. O(n²) → O(n)
- This is the same derivation path as Two Sum and Range Sum, applied to a tree. The method works on any structure

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543) | DFS finds longest path — same elimination of redundant traversals |
| [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) (LeetCode 310) | Leaf-peeling finds centers, which are diameter midpoints |
| [Sum of Distances in Tree](https://leetcode.com/problems/sum-of-distances-in-tree/) (LeetCode 834) | Two DFS passes eliminate repeated BFS from every node |

:::interview
"How do you find the diameter of a tree?"

Run BFS from any node; the farthest node found is one endpoint of the diameter. Run BFS again from that endpoint; the distance to the farthest node is the diameter. Two O(n) passes instead of n passes.
:::
