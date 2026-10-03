### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416) | Direct subset sum with target = totalSum/2 |
| [Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/) (LeetCode 1049) | Minimise difference between two subsets |
| [Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/) (LeetCode 473) | Partition into four equal-sum subsets |

### Partition Equal Subset Sum

- **The Problem:** Given an array, determine if you can partition the array into two subsets such that the sum of elements in both subsets is equal.
- **Example:** `[1, 5, 11, 5]` -> True (`[1, 5, 5]` and `[11]`).
- **The Solution:** 
  1. Calculate the total sum of the array.
  2. If the total sum is odd, it is mathematically impossible to divide it in half. Return `false`.
  3. If it is even, the target sum for each half is exactly `totalSum / 2`.
  4. The problem has now perfectly transformed into standard Subset Sum with `targetSum = totalSum / 2`. Just run the `canPartition` function above.
