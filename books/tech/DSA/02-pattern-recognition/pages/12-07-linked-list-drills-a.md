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
| 11. Linked List Cycle (LeetCode 141) | **Slow/fast** meet (12-04) |
