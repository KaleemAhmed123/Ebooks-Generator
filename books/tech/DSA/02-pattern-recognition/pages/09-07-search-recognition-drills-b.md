## Recognition drills: Search Space 🟢 - continued

| Problem | Search Pattern & Justification |
|---|---|
| 6. Given an array of items with weights and values, find the subset with maximum value that fits in a knapsack of capacity W. N=40. | **Meet in the Middle.** N=40 means DFS will TLE. Split the array. Generate `(weight, value)` pairs for both halves. Sort the left half by weight, removing Pareto-dominated pairs. For each pair in the right half, binary search the left half. |
| 7. Find the shortest path visiting all N cities exactly once (Traveling Salesperson). N=15. | **DFS with Bitmask + Memoization (or DP with Bitmask).** We need to visit all cities, so we must track which ones we've visited. N=15 means the visited state fits in a 16-bit integer mask. Memoize `(currentCity, visitedMask)`. |
| 8. Solve a 9x9 Sudoku puzzle. | **Backtracking with Pruning.** The state space is 9⁸¹, but it's heavily constrained. We prune paths immediately if placing a number violates the row, column, or grid rules. (Bitmasks are often used here to track used numbers). |

### Score yourself
- **7-8 correct:** You can accurately map the constraints (N=20 vs N=40) and the output requirements ("all combinations" vs "minimum speed") to the correct search topology
- **4-6 correct:** You might be trying to use Backtracking for everything, or missing the Meet in the Middle fingerprints
- **0-3 correct:** Review the Feasibility page (18-13) and Meet in the Middle (19-09)
