## Recognition drills: Linked Lists <span class="lv lv1"></span> - continued

| Problem | Move & the pointer to protect |
|---|---|
| 12. Remove Nth Node From End of List (LeetCode 19) | **Fixed gap** of n + 1 from a dummy |
| 13. Intersection point of Y-shaped lists (GFG / LeetCode 160) | **Switch heads** so both walk `lenA + lenB` |
| 14. Linked List Cycle (LeetCode 141) | **Slow/fast** meet (02-09) |
| 15. Linked List Cycle II / Find the first node of loop (LeetCode 142) | **Meet inside the loop,** then restart one pointer at the head |
| 16. Remove loop in linked list (GFG) | **Find the entrance,** then unlink the node before it inside the cycle |
| 17. Add 1 to a number represented as a linked list (GFG) | **Reverse, add, reverse,** or carry back up the recursion |
| 18. Add Two Numbers (LeetCode 2) | **Dummy + carry;** one extra node for a final carry |
| 19. Merge Two Sorted Lists (LeetCode 21) | **Dummy + tail** |
| 20. Merge k Sorted Lists (LeetCode 23) | **Heap of heads** (15-03) or pairwise merges |
| 21. Sort List / merge sort for linked lists (LeetCode 148) | **Split at the middle,** sort, merge |
| 22. Flattening a Linked List (GFG) | **Merge `bottom` lists** from the right |
