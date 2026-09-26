## Recognition drills: Linked Lists <span class="lv lv1"></span>

Hide the right column. Name the move (dummy, reverse, split-reverse-weave, meet in the loop, fixed gap, weave copies) and the one pointer you must not lose.

| Problem | Move & the pointer to protect |
|---|---|
| 1. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206) | **Reverse in place;** save `next` before flipping |
| 2. [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) (LeetCode 25) | **Reverse per group;** keep `groupPrev` and the group's old first node |
| 3. [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) (LeetCode 876) | **Slow/fast;** `while (fast && fast.next)` gives the second middle |
| 4. [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) (LeetCode 234) | **Split, reverse, compare** |
| 5. [Reorder List](https://leetcode.com/problems/reorder-list/) (LeetCode 143) | **Split, reverse, weave;** cut the first half |
| 6. [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) (LeetCode 83) | **One pointer:** skip `next` while it equals the current value |
| 7. [Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) (LeetCode 82) | **Dummy + prev:** drop every copy of a repeated value |
| 8. [Rotate List](https://leetcode.com/problems/rotate-list/) (LeetCode 61) | **Ring and cut** at `len − k % len` |
| 9. [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) (LeetCode 19) | **Fixed gap** of n + 1 from a dummy |
| 10. [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) (LeetCode 160) / [Intersection in Y Shaped Lists](https://www.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1) (GFG) | **Switch heads** so both walk `lenA + lenB` |
| 11. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (LeetCode 141) | **Slow/fast** meet (12-04) |
