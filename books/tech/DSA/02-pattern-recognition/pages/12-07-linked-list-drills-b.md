## Recognition drills: Linked Lists <span class="lv lv1"></span> - continued

| Problem | Move & the pointer to protect |
|---|---|
| 12. Linked List Cycle II / Find the first node of loop (LeetCode 142) | **Meet inside the loop,** then restart one pointer at the head |
| 13. Add Two Numbers (LeetCode 2) | **Dummy + carry;** one extra node for a final carry |
| 14. Merge Two Sorted Lists (LeetCode 21) | **Dummy + tail** |
| 15. Sort List / merge sort for linked lists (LeetCode 148) | **Split at the middle,** sort, merge |
| 16. Segregate even and odd nodes (GFG) / Odd Even Linked List (LeetCode 328) | **Two dummies,** then join and terminate |
| 17. Partition List (LeetCode 86) | **Two dummies,** order preserved |
| 18. Copy List with Random Pointer (LeetCode 138) | **Weave the copies;** `copy.random = x.random.next` |

### Score yourself

- **15–18:** you name the pointer that must be saved before you write the loop
- **9–14:** reread 12-01 and 12-02; nearly every bug is a lost `next` or a head special case
- **0–8:** draw boxes and arrows for drills 1, 4, 9 and 12 before coding anything
