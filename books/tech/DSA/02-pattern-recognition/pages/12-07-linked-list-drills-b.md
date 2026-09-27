## Recognition drills after Chapter 12 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Swapping Nodes in a Linked List](https://leetcode.com/problems/swapping-nodes-in-a-linked-list/) (LeetCode 1721) | 12-05 | k-th from the **end**: a follower k nodes behind the leader |
| 2 | [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) (LeetCode 142) | 12-04 | the **node where** the loop starts, O(1) space: meet, then restart one pointer at the head |
| 3 | [Remove Element](https://leetcode.com/problems/remove-element/) (LeetCode 27) | 02-09 | an **array** in place: a reader and a writer, no links to rewire |
| 4 | [Reverse Nodes in Even Length Groups](https://leetcode.com/problems/reverse-nodes-in-even-length-groups/) (LeetCode 2074) | 12-02 | **reverse** a group, then stitch; the group size grows by one each time |
| 5 | [Partition List](https://leetcode.com/problems/partition-list/) (LeetCode 86) | 12-01 | two sides, order kept: **two dummies**, join, terminate |
| 6 | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) (LeetCode 138) | 12-06 | a second pointer to **any** node: weave each copy after its original |
| 7 | [Next Greater Node In Linked List](https://leetcode.com/problems/next-greater-node-in-linked-list/) (LeetCode 1019) | 10-05 | "first **later larger**": a monotonic stack; the list only fixes the order |
| 8 | [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) (LeetCode 24) | 12-02 | group reversal with **k = 2** |
| 9 | [Insertion Sort List](https://leetcode.com/problems/insertion-sort-list/) (LeetCode 147) | 12-01 | an insert may land **before the head**: a dummy |
| 10 | [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) (LeetCode 19) | 12-05 | **one pass**, from the end: gap n + 1 from a dummy |
| 11 | [Double a Number Represented as a Linked List](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/) (LeetCode 2816) | 12-02 | the **carry** moves toward the head: reverse, double, reverse back (or carry up through recursion, 13-02) |
| 12 | [Reorder List](https://leetcode.com/problems/reorder-list/) (LeetCode 143) | 12-03 | the front **meets the back**: split, reverse the back half, weave |

### Score yourself

- **10–12:** you name the pointer that must be saved before you write the loop
- **6–9:** reread the table on 12-01; nearly every bug is a lost `next` or a head special case
- **0–5:** draw boxes and arrows for drills 2, 8 and 10, then retry
