### Where it appears

| Problem | What each element "owns" |
|---|---|
| [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) (LeetCode 907) | subarrays where it is the min |
| [Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/) (LeetCode 2104) | sum of maxes − sum of mins |

:::interview
"Why make one boundary strict and the other non-strict for ties?"

With `[1, 1]`, the subarray `[1, 1]` has minimum 1 — but which index "owns" it? If both boundaries are `<`, each 1 claims it — double-counted. If both are `<=`, neither claims it — missed. Making one side strict and the other non-strict assigns exactly one owner per subarray, always.
:::
