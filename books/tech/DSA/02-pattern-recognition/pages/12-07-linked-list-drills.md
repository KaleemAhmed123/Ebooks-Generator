## Recognition drills: Linked Lists <span class="lv lv1"></span>

Hide the right column. Name the move (dummy, reverse, split-reverse-weave, meet in the loop, fixed gap, weave copies) and the one pointer you must not lose.

| Problem | Move & the pointer to protect |
|---|---|
| 1. Reverse Linked List (LeetCode 206) | **Reverse in place;** save `next` before flipping |
| 2. Reverse Nodes in k-Group (LeetCode 25) | **Reverse per group;** keep `groupPrev` and the group's old first node |
| 3. Middle of the Linked List (LeetCode 876) | **Slow/fast;** `while (fast && fast.next)` gives the second middle |
| 4. Palindrome Linked List (LeetCode 234) | **Split, reverse, compare** |
| 5. Reorder List (LeetCode 143) | **Split, reverse, weave;** cut the first half |
| 6. Remove Duplicates from Sorted List (LeetCode 83) | **One pointer:** skip `next` while it equals the current value |
| 7. Remove Duplicates from Sorted List II (LeetCode 82) | **Dummy + prev:** drop every copy of a repeated value |
| 8. Rotate List (LeetCode 61) | **Ring and cut** at `len − k % len` |
| 9. Remove Nth Node From End of List (LeetCode 19) | **Fixed gap** of n + 1 from a dummy |
| 10. Intersection point of Y-shaped lists (GFG / LeetCode 160) | **Switch heads** so both walk `lenA + lenB` |
| 11. Linked List Cycle (LeetCode 141) | **Slow/fast** meet (02-09) |
| 12. Linked List Cycle II / Find the first node of loop (LeetCode 142) | **Meet inside the loop,** then restart one pointer at the head |
| 13. Add Two Numbers (LeetCode 2) | **Dummy + carry;** one extra node for a final carry |
| 14. Merge Two Sorted Lists (LeetCode 21) | **Dummy + tail** |
| 15. Merge k Sorted Lists (LeetCode 23) | **Heap of heads** (15-03) or pairwise merges |
| 16. Sort List / merge sort for linked lists (LeetCode 148) | **Split at the middle,** sort, merge |
| 17. Segregate even and odd nodes (GFG) / Odd Even Linked List (LeetCode 328) | **Two dummies,** then join and terminate |
| 18. Partition List (LeetCode 86) | **Two dummies,** order preserved |
| 19. Copy List with Random Pointer (LeetCode 138) | **Weave the copies;** `copy.random = x.random.next` |

### Score yourself

- **16–19:** you name the pointer that must be saved before you write the loop
- **10–15:** reread 12-01 and 12-02; nearly every bug is a lost `next` or a head special case
- **0–9:** draw boxes and arrows for drills 1, 4, 9 and 12 before coding anything
