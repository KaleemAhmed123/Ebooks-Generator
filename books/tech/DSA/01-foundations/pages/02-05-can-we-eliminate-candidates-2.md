### The Branch and Bound elimination

- **The bottleneck:** "I am generating all subsets to find the minimum cost. It takes O(2ⁿ)."
- **The insight:** If the cost of the current partial subset is already greater than the best complete subset we have found so far, adding more items will only increase the cost
- **The transformation:** Stop generating this branch. Prune it. You eliminate all subsets that start with this partial prefix

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Binary Search](https://leetcode.com/problems/binary-search/) (LeetCode 704) | Each comparison eliminates half the sorted search space |
| [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (LeetCode 167) | Sorted order lets two pointers eliminate impossible pairs |
| [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33) | Modified binary search eliminates half despite rotation |
| [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) (LeetCode 153) | Binary search eliminates the half that cannot contain the minimum |
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | Binary search on answer eliminates infeasible eating speeds |

:::interview
"Why does Two Pointers work for the Two Sum problem on a sorted array?"

Because the sorted order guarantees monotonic behavior. If the sum is too large, the current right pointer cannot form a valid pair with *any* element to its right. We can permanently eliminate it and step left.
:::
