## Recognition drills: Linked Lists 🟢 - continued

| Problem | Move & the pointer to protect |
|---|---|
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
