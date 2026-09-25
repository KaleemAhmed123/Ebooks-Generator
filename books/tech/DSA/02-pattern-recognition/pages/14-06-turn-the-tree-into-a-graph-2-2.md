### Variations

- **Amount of Time for Binary Tree to Be Infected (LeetCode 2385) / Burn a binary tree (GFG):** same BFS from the start node, run until the queue is empty; the answer is the number of levels minus one
- **K-th ancestor of a node (GFG):** only the parent edge matters; walk up k times. For many queries, binary lifting answers each in O(log n) (Module 03)
- **Find distance between two nodes (GFG):** BFS from one node works, but the lowest common ancestor gives it without a queue (page 14-07)
- **Delete Nodes And Return Forest (LeetCode 1110):** another "parent matters" problem, solved top-down by passing "is my parent deleted?" instead of storing parents

### The failure

- **Searching only downward from the target.** Recursing into the target's subtree finds 7 and 4 but never 1, which is reached through the parent. Every node above the target is invisible without parent links
- **No visited set.** With parent edges, the BFS from 5 reaches 3 and then 5 again through 3's left child. Without `seen`, levels contain duplicates and the walk never ends on "burn the whole tree"

:::interview
"How do you find all nodes at distance k from a node that is not the root?" — First add parent pointers with one DFS, which makes the tree an undirected graph. Then BFS from the target through left, right and parent edges with a visited set, and return level k. Both passes are O(n) time and space.
:::
