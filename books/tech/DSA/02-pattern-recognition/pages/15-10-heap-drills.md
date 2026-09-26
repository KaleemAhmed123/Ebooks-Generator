## Recognition drills: Heaps & Ordered Sets <span class="lv lv1"></span>

Hide the right column. Say what sits at the top of the heap (or what neighbour query the set answers) and when elements leave.

| Problem | What the top means |
|---|---|
| 1. [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215) / [k Largest Elements](https://www.geeksforgeeks.org/problems/k-largest-elements4206/1) (GFG) | **Min-heap of size k:** the top is the k-th largest; quickselect is O(n) average |
| 2. [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (LeetCode 23) / [Merge k Sorted Arrays](https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1) (GFG) | **Heads of every list;** pop one, push its successor |
| 3. [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) (LeetCode 373) | **Frontier of pairs** `(i, j)`: seed `(i, 0)` for each i, push `(i, j + 1)` after popping |
| 4. [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/) (LeetCode 632) / [Smallest Range in K Lists](https://www.geeksforgeeks.org/problems/find-smallest-range-containing-elements-from-k-lists/1) (GFG) | **Heads of every list + the current max;** the range is `[top, max]`, advance the top's list |
| 5. [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295) | **Two heaps,** tops are the middle |
| 6. [Min Cost to Connect Ropes](https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1) (GFG) | **Merge the two smallest** |
| 7. [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) (LeetCode 1046) | **Two heaviest** from a max-heap |
| 8. [Reorganize String](https://leetcode.com/problems/reorganize-string/) (LeetCode 767) / [Rearrange To Make Adjacent Different](https://www.geeksforgeeks.org/problems/rearrange-characters4649/1) (GFG) | **Most frequent letter first;** hold the last used letter out for one round |
| 9. [Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) (LeetCode 871) | **Passed stations;** regret the largest when stuck |

### Score yourself

- **8–9:** you know what the top means before you choose min or max
- **5–7:** reread 15-04 to 15-06; most misses mix "best now" with "best to regret"
- **0–4:** reread 15-01 and Module 07 01-10, then redo drills 1–5
