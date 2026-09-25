### Variations

- **Partition List (LeetCode 86):** two dummies, `less` and `rest`. Append each node to one of them, then join `lessTail.next = rest.next` and **terminate** `restTail.next = null`
- **Odd Even Linked List (LeetCode 328) / Segregate even and odd nodes (GFG):** the same two-dummy split by position or by value parity
- **Sort a linked list of 0s, 1s and 2s (GFG):** three dummies, joined in order; no counting and rewriting values needed
- **Remove Linked List Elements (LeetCode 203) / Remove Duplicates from Sorted List II (LeetCode 82):** walk with `prev` starting at the dummy; skip nodes by rewiring `prev.next`. The head can vanish without a special case
- **Add Two Numbers (LeetCode 2):** build the sum list behind a dummy while carrying; append one last node if the carry is left over

### The failure

- **Special-casing the head.** Code that handles "the first node" separately usually duplicates the loop body, and the copy is where bugs live: deleting the head, or a list whose every node is deleted
- **Forgetting to terminate a rebuilt list.** After a partition, the last node of the second list may still point into the first list, creating a cycle. Always set the final tail's `next` to `null`

:::interview
"Why use a dummy node?" — It gives the real head a predecessor. Every insertion or deletion is then 'rewire the predecessor's next', with no branch for the first node, and the new head is simply `dummy.next`. It costs one allocation and removes the most common class of linked-list bugs.
:::
