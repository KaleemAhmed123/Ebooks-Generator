# State & Prefix Checkpoints

## The Mental Model
Using past states (prefixes) to instantly answer questions about the present. This covers your tags: `prefixSum and +1 -1 trick`, `hashing`, and `countWays`.

## Algorithm Derivation
**Brute force:** To find if any subarray sums to K, check all $O(N^2)$ subarrays.
**↓**
**What is being repeated?** The sum of `[i, j]` is just `sum[0, j] - sum[0, i-1]`.
**↓**
**Can we accumulate information so queries become cheap?** Yes. Keep a running prefix sum.
**↓**
**Can we remember it?** Store every seen prefix sum in a HashMap.
**↓**
**Optimized Idea:** If `CurrentPrefix - K` exists in the HashMap, we have found a valid subarray in $O(1)$ lookup time!

## The "+1 / -1 Trick"
When dealing with "equal number of 0s and 1s", change 0s to -1s. The problem magically transforms into "find a subarray with sum = 0".
