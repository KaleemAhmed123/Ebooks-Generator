## Recognition drills — Foundations

You have 20 seconds per problem. **Do not solve.** Identify:
1. The likely constraint class (what complexity ceiling does n imply?)
2. The derivation branch (remember, eliminate, preprocess, exploit monotonicity, or data structure?)

| # | Problem sketch | Constraint | Your answer |
|---|---|---|---|
| 1 | Given an array of n integers, find two elements that sum to a target | n ≤ 10⁵ | |
| 2 | Given n ≤ 20 items with weights and values, find the maximum value subset that fits in a knapsack | n ≤ 20 | |
| 3 | Given a sorted array, find if a target value exists | n ≤ 10⁶ | |
| 4 | Given an array, answer Q queries asking for the sum of elements from index L to R. No updates | n, Q ≤ 10⁵ | |
| 5 | Given a string of length n, find the longest substring with at most k distinct characters | n ≤ 10⁵ | |
| 6 | Given n ≤ 40 integers, determine if any subset sums to a target | n ≤ 40 | |
| 7 | Given an array of stock prices, for each day find the next day with a higher price | n ≤ 10⁵ | |
| 8 | Given a tree with n nodes, find the diameter (longest path between any two nodes) | n ≤ 10⁵ | |
| 9 | Given n intervals, find the maximum number of non-overlapping intervals | n ≤ 10⁵ | |
| 10 | A recursive function calls itself twice with input size n-1. What is the time complexity? | — | |
| 11 | Given an array, find the length of the longest subarray with sum ≤ K (all elements positive) | n ≤ 10⁶ | |
| 12 | Given n ≤ 10⁵ points in 2D, find the closest pair of points | n ≤ 10⁵ | |

:::note
**Answers:**

1. **O(n) → remember.** Hash map stores seen values. For each element, check if `target - element` exists. Derivation: brute force checks all pairs O(n²) → inner loop is a lookup → replace with hash map
2. **O(2²⁰) → bitmask/brute force.** n ≤ 20 is the bitmask DP fingerprint. Enumerate all 2²⁰ ≈ 10⁶ subsets
3. **O(log n) → eliminate.** Sorted + search = binary search. Each comparison eliminates half the candidates
4. **O(n + Q) → preprocess.** Build prefix sum array in O(n). Each query becomes O(1) subtraction
5. **O(n) → exploit monotonicity.** Sliding window. As right pointer extends, distinct count only increases. Shrink from left to restore the constraint. Both pointers move monotonically forward
6. **O(2²⁰) → meet in the middle.** n ≤ 40 is too large for 2⁴⁰ brute force, but split into two halves of 20. Generate all 2²⁰ subset sums for each half, then check if any pair across halves sums to target
7. **O(n) → exploit monotonicity.** Monotonic stack. A decreasing stack holds indices waiting for a larger element. Each element pushed and popped exactly once
8. **O(n) → eliminate/preprocess.** Two BFS/DFS passes. First finds the farthest node from any start. Second finds the farthest node from that — the distance is the diameter
9. **O(n log n) → preprocess + greedy.** Sort by end time. Greedily select the earliest-ending non-overlapping interval. Exchange argument proves optimality
10. **O(2ⁿ) — not O(n²).** Two branches at each level, depth n. Total nodes in the recursion tree: 2⁰ + 2¹ + ... + 2ⁿ = 2ⁿ⁺¹ - 1. This is exponential, not quadratic
11. **O(n) → exploit monotonicity.** Sliding window. All elements positive guarantees that expanding increases the sum and shrinking decreases it. Monotonic property holds
12. **O(n log n) → preprocess + eliminate.** Sort by x-coordinate, divide and conquer. Each level does O(n) merge work. Master theorem: T(n) = 2T(n/2) + O(n) → O(n log n)
:::
