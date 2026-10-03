### Where it appears

| Problem | Why you need parent edges |
|---|---|
| [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) (LeetCode 863) | BFS must walk up, not just down |
| [Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/) (LeetCode 2385) | infection spreads to parent and children |
| [Burning Tree](https://www.geeksforgeeks.org/problems/burning-tree/1) (GFG) | same idea — fire spreads in all directions |

:::interview
"Why do you need a visited set when BFS-ing the converted graph? Regular tree BFS doesn't need one."

In a tree, edges point only downward — BFS never revisits a node. Once you add parent edges, the graph has cycles (child → parent → child). Without a visited set, BFS ping-pongs between parent and child forever.
:::
