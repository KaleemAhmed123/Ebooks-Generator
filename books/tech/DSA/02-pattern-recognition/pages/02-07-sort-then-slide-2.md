### Where it appears

| Problem | Why sort first |
|---|---|
| [Frequency of the Most Frequent Element](https://leetcode.com/problems/frequency-of-the-most-frequent-element/) (LeetCode 1838) | cheapest values to raise sit next to each other |
| [Chocolate Distribution Problem](https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1) (GFG) | min max−min of m packets = fixed-size window on sorted values |
| [Minimum Difference Between Highest and Lowest of K Scores](https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/) (LeetCode 1984) | same as chocolate: fixed window of k |
| [Maximum Beauty of an Array After Applying Operation](https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/) (LeetCode 2779) | each value covers a range ±k; longest overlap = variable window |

:::interview
"If you sort, don't you lose the original indices?"

Yes, and that is fine here because the problem asks for a count or a value, not a position. When the answer needs original indices — "return the pair of indices" — sorting destroys them. Use a hash map (03-05) or carry the index alongside the value instead.
:::
