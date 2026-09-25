## Recognition drills: Linked Lists <span class="lv lv1"></span>

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
