## Recognition drills: Unnamed Patterns <span class="lv lv2"></span>

Hide the right column. For each problem, do not write code. Identify which of the four Unnamed Patterns it uses and briefly justify your answer.

| Problem | Unnamed Pattern & Justification |
|---|---|
| 1. Find the smallest divisor such that the sum of the array divided by the divisor is ≤ threshold. | **Boundary Finding.** "Smallest divisor" is an optimization. `isPossible(divisor)` is monotonic (larger divisors give smaller sums, making it easier to be ≤ threshold). The sequence is `[F, F, T, T, T]`. We want the first T. |
| 2. Given a 2D grid with obstacles, find the path from top-left to bottom-right that destroys the minimum number of obstacles. | **Frontier Maintenance (0-1 BFS / Dijkstra).** We are expanding into an unknown grid. The selection rule is "minimum obstacles destroyed." We use a deque or min-heap frontier where state is `(r, c)`. |
| 3. Given a stream of numbers, at any time output the maximum element seen in the last K seconds. | **Dominated Candidate Elimination (Monotonic Deque).** If a new number is larger than an older number in the window, the older number is permanently dominated (it can never be the maximum). |
| 4. Find the longest substring where every character appears at least K times. | **Boundary Finding (or Divide and Conquer).** Is it possible to have a valid substring of length L? Unfortunately, this is a trick question. The length condition is *not* monotonic. This is a classic misdirection. |
| 5. Minimum number of days to make M bouquets using K adjacent flowers. Flowers bloom on different days. | **Boundary Finding (Feasibility).** "Minimum days" = optimize. `isPossible(days)`: wait `days`, check if we can make M bouquets. Monotonic `[F, F, T, T]`. |
| 6. A robot cleans a room. Some squares are dirty. Find the minimum time to clean all squares. | **Frontier Maintenance (State-space BFS).** The frontier state is `(r, c, bitmask_of_cleaned_squares)`. Selection rule is FIFO (unit time). |
| 7. Given N rectangles, find the area of their union. | **Dominated Candidate Elimination (Sweep Line).** As the sweep line moves, rectangles enter and exit the active set. Rectangles fully contained within taller ones are effectively dominated for that x-interval. |

### Score yourself
- **6–7 correct:** You are seeing the matrix. You recognize structural skeletons over surface keywords
- **4–5 correct:** You are probably still leaning on technique names. Review the 4 diagnostic questions
- **0–3 correct:** Reread this chapter. Focus on the abstract mechanisms, not the code
