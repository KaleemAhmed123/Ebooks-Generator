## Recognition drills: Linked Lists 🟢

Hide the right column. Name the move (dummy, reverse, split-reverse-weave, meet in the loop, fixed gap, weave copies) and the one pointer you must not lose.

| Problem | Move & the pointer to protect |
|---|---|
| 1. Reverse Linked List (LeetCode 206) | **Reverse in place;** save `next` before flipping |
| 2. Reverse Nodes in k-Group (LeetCode 25) | **Reverse per group;** keep `groupPrev` and the group's old first node |
| 3. Reverse a linked list in groups of given size (GFG) | **Same,** but the last short group is reversed too |
| 4. Delete Node in a Linked List, no head given (LeetCode 237) | **Copy the next node's value into this one, unlink the next.** Impossible for the tail |
| 5. Middle of the Linked List (LeetCode 876) | **Slow/fast;** `while (fast && fast.next)` gives the second middle |
| 6. Palindrome Linked List (LeetCode 234) | **Split, reverse, compare** |
| 7. Reorder List (LeetCode 143) | **Split, reverse, weave;** cut the first half |
| 8. Remove Duplicates from Sorted List (LeetCode 83) | **One pointer:** skip `next` while it equals the current value |
| 9. Remove duplicates from an unsorted linked list (GFG) | **`prev` + a hash set** of values seen |
| 10. Remove Duplicates from Sorted List II (LeetCode 82) | **Dummy + prev:** drop every copy of a repeated value |
| 11. Rotate List (LeetCode 61) | **Ring and cut** at `len − k % len` |
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
| 23. Segregate even and odd nodes (GFG) / Odd Even Linked List (LeetCode 328) | **Two dummies,** then join and terminate |
| 24. Partition List (LeetCode 86) | **Two dummies,** order preserved |
| 25. Sort a linked list of 0s, 1s and 2s (GFG) | **Three dummies** |
| 26. Copy List with Random Pointer (LeetCode 138) | **Weave the copies;** `copy.random = x.random.next` |
| 27. Maximum Twin Sum of a Linked List (LeetCode 2130) | **Split and reverse** the back half |
| 28. LRU Cache (LeetCode 146) | **Doubly linked list + map** (10-11) |

### Score yourself

- **24–28:** you name the pointer that must be saved before you write the loop
- **15–23:** reread 12-01 and 12-02; nearly every bug is a lost `next` or a head special case
- **0–14:** draw boxes and arrows for drills 1, 6, 12 and 15 before coding anything
