## Recognition drills: Heaps & Ordered Sets 🟢

Hide the right column. Say what sits at the top of the heap (or what neighbour query the set answers) and when elements leave.

| Problem | What the top means |
|---|---|
| 1. k largest elements (GFG) / Kth Largest Element (LeetCode 215) | **Min-heap of size k:** the top is the k-th largest; quickselect is O(n) average |
| 2. Heap Sort (GFG) | **Build a max-heap in O(n),** swap the top to the end, sift down, repeat |
| 3. Merge k Sorted Arrays / Lists (GFG / LeetCode 23) | **Heads of every list;** pop one, push its successor |
| 4. Find K Pairs with Smallest Sums (LeetCode 373) | **Frontier of pairs** `(i, j)`: seed `(i, 0)` for each i, push `(i, j + 1)` after popping |
| 5. Smallest range covering elements from K lists (GFG / LeetCode 632) | **Heads of every list + the current max;** the range is `[top, max]`, advance the top's list |
| 6. Kth Smallest Element in a Sorted Matrix (LeetCode 378) | **Row heads** (heap), or value binary search (09-04) |
| 7. Find Median from Data Stream (LeetCode 295) | **Two heaps,** tops are the middle |
| 8. Connect n ropes with minimum cost (GFG) | **Merge the two smallest** |
| 9. Huffman Encoding (GFG) | **Merge the two smallest** nodes into a tree |
| 10. Last Stone Weight (LeetCode 1046) | **Two heaviest** from a max-heap |
| 11. Reorganize String / Rearrange characters (LeetCode 767 / GFG) | **Most frequent letter first;** hold the last used letter out for one round |
| 12. Task Scheduler (LeetCode 621) | **Formula** (08-08) or a max-heap of counts with a cooldown queue |
| 13. Minimum Number of Refueling Stops (LeetCode 871) | **Passed stations;** regret the largest when stuck |
| 14. Course Schedule III (LeetCode 630) | **Durations taken;** drop the longest when late |
| 15. Total Cost to Hire K Workers (LeetCode 2462) | **Two min-heaps,** the first and last `candidates` workers; refill from the matching side |
| 16. K-th largest sum of a contiguous subarray (GFG) | **Min-heap of size k** over all O(n²) subarray sums, built from prefix sums |
| 17. Merge two binary max-heaps (GFG) | **Concatenate, then build** bottom-up in O(n) |
| 18. Convert min-heap to max-heap (GFG) | **Heapify bottom-up** from `⌊n/2⌋ − 1` to 0, O(n) |
| 19. Is Binary Tree Heap (GFG) | **Complete** (level-order, no node after a gap) **and** every parent ≥ its children |
| 20. Convert BST to Min Heap (GFG) | **In-order values fill a pre-order walk:** every node is smaller than everything below it |
| 21. Minimum Absolute Difference with Constraint (LeetCode 2817) | **Ordered set:** successor and predecessor of each value |
| 22. Replace every element with the least greater element on its right (GFG) | **Ordered set** from the right, successor query |
| 23. Sliding Window Maximum (LeetCode 239) | **Not a heap:** a monotonic deque is O(n) (10-10) |

### Score yourself

- **19–23:** you know what the top means before you choose min or max
- **12–18:** reread 15-04 to 15-06; most misses mix "best now" with "best to regret"
- **0–11:** reread 15-01 and 15-02, then redo drills 1–6
