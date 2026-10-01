### Where it appears

| Problem | The subset in the mask |
|---|---|
| Minimum XOR Sum of Two Arrays (LeetCode 1879) | which nums2 indices are used |
| Partition to K Equal Sum Subsets (LeetCode 698) | which numbers are placed |
| Shortest Path Visiting All Nodes (LeetCode 847) | set of visited nodes (BFS over masks) |
| Maximum Students Taking Exam (LeetCode 1349) | seating of one row |
| Number of Ways to Wear Different Hats (LeetCode 1434) | which people have a hat |

- **Go deeper:** travelling-salesman `dp[mask][last]`, submask enumeration and SOS DP are in Module 06; the subset-as-set idea is 11-04.

:::interview
"When does a problem call for bitmask DP?"

Two signals together: a tiny n (≤ ~20) and a state that is "which subset is done", not a running count. The small n makes 2ⁿ states affordable; the subset state means an integer's bits are the natural key. If n is large or the state is a plain index or sum, it is ordinary DP, not bitmask.
:::
