### Where it appears

| Problem | What the hidden edge connects |
|---|---|
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721) | shared emails across accounts |
| [Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) (LeetCode 1319) | components − 1 = cables needed |
| [Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/) (LeetCode 990) | `==` unions; then check `!=` pairs |
| [Evaluate Division](https://leetcode.com/problems/evaluate-division/) (LeetCode 399) | weighted union–find or BFS along ratios |

:::interview
"Union–find works for undirected 'same group' relations. When does it break?"

When the relation is directed — A reaching B does not mean B reaches A. Union–find merges both directions, so it over-connects. Use BFS/DFS from each node instead, or model it as a DAG with reachability.
:::
