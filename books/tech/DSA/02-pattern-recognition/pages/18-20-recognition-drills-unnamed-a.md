## Recognition drills: Unnamed Patterns <span class="lv lv2"></span>

Hide the right column. For each problem, do not write code. Identify which of the four Unnamed Patterns it uses and briefly justify your answer.

| Problem | Unnamed Pattern & Justification |
|---|---|
| 1. Find the smallest divisor such that the sum of the array divided by the divisor is ≤ threshold. | **Boundary Finding.** "Smallest divisor" is an optimization. `isPossible(divisor)` is monotonic (larger divisors give smaller sums, making it easier to be ≤ threshold). The sequence is `[F, F, T, T, T]`. We want the first T. |
| 2. Given a 2D grid with obstacles, find the path from top-left to bottom-right that destroys the minimum number of obstacles. | **Frontier Maintenance (0-1 BFS / Dijkstra).** We are expanding into an unknown grid. The selection rule is "minimum obstacles destroyed." We use a deque or min-heap frontier where state is `(r, c)`. |
| 3. Given a stream of numbers, at any time output the maximum element seen in the last K seconds. | **Dominated Candidate Elimination (Monotonic Deque).** If a new number is larger than an older number in the window, the older number is permanently dominated (it can never be the maximum). |
| 4. Find the longest substring where every character appears at least K times. | **Boundary Finding (or Divide and Conquer).** Is it possible to have a valid substring of length L? Unfortunately, this is a trick question. The length condition is *not* monotonic. This is a classic misdirection. |
| 5. You have an array of daily stock prices. Find the maximum profit from buying and selling once. | **Precompute (Prefix Min).** The profit if you sell on day `i` is `price[i] - min(price[0...i-1])`. You can precompute the prefix minimums in O(N) to answer the query for each day in O(1). |
| 6. Given N jobs with start time, end time, and profit. Find the maximum profit subset of non-overlapping jobs. | **Pick, then jump (17-03): DP + Binary Search.** Sort by end time. For each job, we either include it or skip it. If a previous subset has the same end time but lower profit, it is strictly dominated. |
