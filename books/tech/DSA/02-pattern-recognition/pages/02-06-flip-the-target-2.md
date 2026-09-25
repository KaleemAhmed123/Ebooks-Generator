### Variations

- **Maximum Points You Can Obtain from Cards (LeetCode 1423):** take exactly k cards from the ends. What stays is a fixed window of `n − k`. Answer = `total − min(sum of any n − k window)`, a fixed-size window from page 02-02
- **Maximum Sum Circular Subarray (LeetCode 918):** a circular subarray that wraps is the whole array minus a normal middle. Answer = `max(bestKadane, total − worstKadane)`. One guard: if every number is negative, `total − worst` is the empty array's 0, so return `bestKadane` instead
- **Minimum Swaps to Group All 1's Together (LeetCode 1151):** flip to "which window of length `ones` already holds the most 1s". Swaps = `ones − best`

### The failure

- **Greedy on the ends.** "Take the larger end while it fits" looks natural. On `[3, 5, 1, 4]` with x = 9 it grabs the 4, then the 3, then the 1, and is stuck needing 1 with a 5 left. The answer takes 3, 5, 1 from the left: three operations. Local choices at two ends interact; the kept middle does not
- **Using the flip on negative numbers.** The window shrink needs positives. With negatives, "longest subarray with sum = target" needs a prefix-sum map (page 03-03) instead

:::interview
"You can remove from either end — isn't that exponential?" — The removals are exponential; what remains is not. Any sequence of end-removals leaves one contiguous subarray, so I search over subarrays instead: longest one with sum `total − x`, one sliding-window pass, O(n) time, O(1) space.
:::
