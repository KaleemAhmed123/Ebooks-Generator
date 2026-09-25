## Recognition drills: Heaps & Ordered Sets <span class="lv lv1"></span>

Hide the right column. Say what sits at the top of the heap (or what neighbour query the set answers) and when elements leave.

| Problem | What the top means |
|---|---|
| 1. k largest elements (GFG) / Kth Largest Element (LeetCode 215) | **Min-heap of size k:** the top is the k-th largest; quickselect is O(n) average |
| 2. Merge k Sorted Arrays / Lists (GFG / LeetCode 23) | **Heads of every list;** pop one, push its successor |
| 3. Find K Pairs with Smallest Sums (LeetCode 373) | **Frontier of pairs** `(i, j)`: seed `(i, 0)` for each i, push `(i, j + 1)` after popping |
| 4. Smallest range covering elements from K lists (GFG / LeetCode 632) | **Heads of every list + the current max;** the range is `[top, max]`, advance the top's list |
| 5. Find Median from Data Stream (LeetCode 295) | **Two heaps,** tops are the middle |
| 6. Connect n ropes with minimum cost (GFG) | **Merge the two smallest** |
| 7. Last Stone Weight (LeetCode 1046) | **Two heaviest** from a max-heap |
| 8. Reorganize String / Rearrange characters (LeetCode 767 / GFG) | **Most frequent letter first;** hold the last used letter out for one round |
| 9. Minimum Number of Refueling Stops (LeetCode 871) | **Passed stations;** regret the largest when stuck |

### Score yourself

- **8–9:** you know what the top means before you choose min or max
- **5–7:** reread 15-04 to 15-06; most misses mix "best now" with "best to regret"
- **0–4:** reread 15-01 and Module 07 01-10, then redo drills 1–5
