## Transformation: Subarray Math to Prefix Math

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
