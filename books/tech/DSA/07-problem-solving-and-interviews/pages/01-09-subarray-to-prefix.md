## Transformation: Subarray Math to Prefix Math <span class="lv lv1"></span>

A subarray is contiguous. Finding the sum of a subarray requires iterating over it, taking O(K) time. If we need to check millions of subarrays, O(K) per check is too slow.

### The Signal

- "Find a contiguous subarray that sums to K..."
- "Count the number of subarrays with sum K..."
- "Find the longest subarray with equal numbers of 0s and 1s..."

### The Mapping

We transform the problem from asking about the **middle** of the array, to asking about the **beginning** of the array.

Any subarray `arr[i...j]` can be expressed mathematically as:
`PrefixSum[j] - PrefixSum[i-1]`

This changes the question "Does a subarray summing to K end at index j?" to "Have we previously seen a prefix sum equal to `PrefixSum[j] - K`?"

### Canonical Example: Subarray Sum Equals K

- **Problem:** Count the number of continuous subarrays whose sum equals K.
- **The Trap:** Using a Sliding Window. Sliding Window **fails completely** if the array contains negative numbers (because the sum is no longer monotonic—adding elements might decrease the sum).
- **The Transformation:**
  - Maintain a running `currentSum`.
  - Use a Hash Map to store the frequencies of all `PrefixSum`s we have seen so far. Initialize `map.set(0, 1)`.
  - As we iterate, if `map.has(currentSum - K)`, we add that frequency to our total count.
  - Then we add `currentSum` to the Hash Map.

### The Binary Transformation Twist

- **Problem:** Longest subarray with equal 0s and 1s.
- **The Transformation:** 
  - Change all `0`s to `-1`s.
  - Now, a subarray has equal 0s and 1s if and only if its sum is exactly `0`.
  - The problem perfectly transforms into "Longest subarray with sum 0". 
  - Use the exact same Prefix Sum Hash Map technique, but store the *first index* where a sum was seen to maximize length.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560) | Prefix sum + hash map counting complements |
| [Contiguous Array](https://leetcode.com/problems/contiguous-array/) (LeetCode 525) | Map 0 to -1, then longest subarray with prefix sum 0 |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | Prefix and suffix product arrays replace division |
| [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303) | Direct prefix sum for O(1) range queries |
