## Recognition drills: Search Space 🟢

Hide the right column. Identify the correct Search Space technique (Binary Search on Answer, Backtracking, Meet in the Middle, Branch & Bound, Staircase Search) and justify your answer.

| Problem | Search Pattern & Justification |
|---|---|
| 1. Find all combinations of numbers that sum to exactly K. Array size is 20. | **Backtracking.** We need *all* combinations, not just the best one, so optimization boundaries don't help. N=20 means 2²⁰ operations, which easily runs in time using standard DFS. |
| 2. Given a sorted matrix where every row and column is sorted, find if target exists. | **Staircase Search (05-04).** Because the matrix is sorted in two dimensions, we can start at the top-right corner. If the target is smaller, move left. If larger, move down. O(N+M) time. |
| 3. Find the minimum speed K required to eat all bananas within H hours. | **Binary Search on Answer.** The search space for K is `[1, max(pile)]`. The condition "can we eat them in H hours at speed K?" is monotonic (`[F, F, T, T]`). We Binary Search for the boundary. |
| 4. Find if a subset of an array sums to exactly K. Array size is 40. | **Meet in the Middle.** N=40 means Backtracking (O(2⁴⁰)) will TLE. Split into two halves of 20. Generate sums for both halves (O(2²⁰) each). Store left half in a Hash Set, iterate through right half to find the complement. |
| 5. Find the shortest path through a maze where you can break at most 3 walls. | **State-space BFS.** This is a graph problem, not a backtracking search space. The state is `(r, c, walls_broken)`. Because edge costs are all 1, BFS guarantees the shortest path. |
