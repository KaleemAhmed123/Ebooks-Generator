### Variations

- **Pre-order (LeetCode 144):** emit `cur` when the thread is *laid*, not when it is cut
- **Median of BST in O(1) space (GFG):** one Morris pass counts n, a second stops at the middle, finishing the walk to restore the tree
- **Recover Binary Search Tree (LeetCode 99):** the follow-up asks for O(1) space; during the Morris in-order, keep the first node larger than its successor and the last node smaller than its predecessor, then swap their values
- **Flatten Binary Tree to Linked List (LeetCode 114):** the same "rightmost node of the left subtree" hop, but the rewiring is permanent

### The failure

- **Returning mid-walk.** Stopping at the k-th node leaves every thread above it in place. The tree now has cycles: a later recursive walk overflows the stack, an iterative one loops forever. Keep walking to the end, or cut the threads before returning
- **Using it where the tree is shared.** The tree is modified during the walk. Another reader, or a tree with frozen nodes, sees broken structure. O(1) space is bought with temporary writes

:::interview
"Can you traverse in O(1) space?" — Morris: before going left, I point the predecessor's null right pointer at the current node. When I arrive through that thread, the left side is done, so I cut it, emit, and go right. O(n) time, since each thread is laid and cut once; the tree is restored when the walk finishes.
:::
