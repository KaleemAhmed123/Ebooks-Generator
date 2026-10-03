### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206) | Pure pointer manipulation drill |
| [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) (LeetCode 21) | Splicing nodes without shifting |
| [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146) | Doubly linked list for O(1) splice to front |
| [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (LeetCode 141) | Floyd's cycle detection on scattered nodes |

:::interview
"If I need to frequently insert elements into the middle of a list, should I use a Linked List?"

Usually no. A Linked List can *insert* in O(1), but you have to *find* the insertion point first, which takes O(N) traversal. A Dynamic Array also takes O(N) to insert (due to shifting). Because array shifting has perfect spatial locality, the Array is almost always faster in practice unless the list is massive and you already hold a pointer to the insertion site.
:::
