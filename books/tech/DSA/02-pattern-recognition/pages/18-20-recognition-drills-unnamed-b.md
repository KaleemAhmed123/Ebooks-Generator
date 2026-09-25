## Recognition drills: Unnamed Patterns 🟡 - continued

| Problem | Unnamed Pattern & Justification |
|---|---|
| 7. Minimum number of days to make M bouquets using K adjacent flowers. Flowers bloom on different days. | **Boundary Finding (Feasibility).** "Minimum days" = optimize. `isPossible(days)`: wait `days`, check if we can make M bouquets. Monotonic `[F, F, T, T]`. |
| 8. A robot cleans a room. Some squares are dirty. Find the minimum time to clean all squares. | **Frontier Maintenance (State-space BFS).** The frontier state is `(r, c, bitmask_of_cleaned_squares)`. Selection rule is FIFO (unit time). |
| 9. Given N rectangles, find the area of their union. | **Dominated Candidate Elimination (Sweep Line).** As the sweep line moves, rectangles enter and exit the active set. Rectangles fully contained within taller ones are effectively dominated for that x-interval. |
| 10. XOR queries on a subarray `[L, R]`. | **Precompute (Prefix XOR).** Static data, lots of queries. XOR is invertible (`A ^ A = 0`), so `prefix[R] ^ prefix[L-1]` gives the answer in O(1). |

### Score yourself
- **8-10 correct:** You are seeing the matrix. You recognize structural skeletons over surface keywords
- **5-7 correct:** You are probably still leaning on technique names. Review the 4 diagnostic questions
- **0-4 correct:** Reread Chapter 18. Focus on the abstract mechanisms, not the code
