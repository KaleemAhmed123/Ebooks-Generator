## Recognition drills: Linked Lists <span class="lv lv1"></span> - continued

| Problem | Move & the pointer to protect |
|---|---|
| 12. [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) (LeetCode 142) | **Meet inside the loop,** then restart one pointer at the head |
| 13. [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) (LeetCode 2) | **Dummy + carry;** one extra node for a final carry |
| 14. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) (LeetCode 21) | **Dummy + tail** |
| 15. [Sort List](https://leetcode.com/problems/sort-list/) (LeetCode 148) | **Split at the middle,** sort, merge |
| 16. [Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/) (LeetCode 328) / [Segregate Evens and Odds in a Linked List](https://www.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5035/1) (GFG) | **Two dummies,** then join and terminate |
| 17. [Partition List](https://leetcode.com/problems/partition-list/) (LeetCode 86) | **Two dummies,** order preserved |
| 18. [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) (LeetCode 138) | **Weave the copies;** `copy.random = x.random.next` |

### Score yourself

- **15–18:** you name the pointer that must be saved before you write the loop
- **9–14:** reread 12-01 and 12-02; nearly every bug is a lost `next` or a head special case
- **0–8:** draw boxes and arrows for drills 1, 4, 9 and 12 before coding anything
