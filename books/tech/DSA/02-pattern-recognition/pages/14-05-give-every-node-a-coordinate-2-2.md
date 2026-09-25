### The failure

- **DFS for the top view.** Recursion reaches a deep left-subtree node in column 1 before the shallow right child in column 1, and "first seen" keeps the wrong one. Either use BFS, or store the row and keep the smallest
- **Ignoring the tie rule.** Nodes sharing both row and column (possible after a left-right and a right-left step) must be ordered by value in LeetCode 987. Sorting by column and row only makes the output depend on traversal order

:::interview
"How do you print the top view of a binary tree?" — Give each node a column (left −1, right +1) and traverse breadth-first, so rows are visited top to bottom. The first node seen in each column is the one visible from above. Collect the columns in order with a map plus the minimum and maximum column, O(n) time apart from ordering the columns.
:::
