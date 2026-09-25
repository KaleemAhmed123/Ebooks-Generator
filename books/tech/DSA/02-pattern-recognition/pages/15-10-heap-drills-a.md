## Recognition drills: Heaps & Ordered Sets <span class="lv lv1"></span>

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
