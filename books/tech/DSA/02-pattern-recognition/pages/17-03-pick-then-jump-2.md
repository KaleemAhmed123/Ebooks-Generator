### Variations

- **Weighted Job Scheduling (GFG):** the same recurrence; the GFG version sorts by end and searches backwards for the last compatible job, a mirror image of the same idea
- **Maximum Number of Events That Can Be Attended II (LeetCode 1751):** at most k events, so the state grows to `dp[k][left]`. End days are inclusive: the jump target is the first start **> end**
- **Two Best Non-Overlapping Events (LeetCode 2054):** k = 2 with inclusive ends; a suffix maximum of values plus one binary search per event is enough
- **Maximum Earnings From Taxi (LeetCode 2008):** profit = end − start + tip; a new ride may start exactly where the last one ended
- **Maximum Length of Pair Chain (LeetCode 646):** every item weighs 1, so the greedy "earliest end first" is already optimal and no DP is needed

### The failure

- **Greedy by end time with weights.** Jobs `[1,2]:1`, `[2,3]:1`, `[1,3]:5`: earliest-end-first takes the two short jobs for 2; the answer is 5. The greedy is only safe when every job is worth the same
- **Wrong bound for the boundary rule.** In LeetCode 1235 a job may start exactly when the previous ends. Searching for start **> end** instead of ≥ drops such chains: `[1,2]:50`, `[2,3]:50` scores 50 instead of 100. LeetCode 1751 and 2054 use inclusive ends and need the strict search. Read which rule the statement uses
- **A linear scan for the next job.** Correct, but O(n²) at n = 5·10⁴ is 2.5·10⁹ steps

:::interview
"Why sort by start?" — So that the jobs compatible with a pick form a suffix. Then `dp[k]` is one number, skip reads `dp[k + 1]`, and pick reads the dp of the first start at or after this job's end, found by binary search. O(n log n) for the sort and n searches.
:::
