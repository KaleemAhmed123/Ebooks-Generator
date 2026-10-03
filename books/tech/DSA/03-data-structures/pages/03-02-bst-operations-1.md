## Binary Search Trees (BST) <span class="lv lv1"></span>

- **What it is:** A Binary Tree governed by a strict invariant: Left children are strictly smaller, Right children are strictly larger
- **The Contract:** O(log N) insertions, deletions, and lookups, while maintaining a perfectly sorted dataset
- **Why it works:** It is the data structure manifestation of Binary Search. Every step down the tree permanently eliminates half of the remaining data

### The Array Bottleneck

- If you want to binary search, you need a sorted array.
- But what if you need to continually *add* new numbers to your dataset?
- Inserting into a sorted array is O(N) because you have to shift elements. A BST solves this by linking nodes dynamically. Finding the insertion point is O(log N), and linking the node is O(1).

### The Worst-Case Reality

- A BST only guarantees O(log N) operations if it is **balanced** (the left and right subtrees have roughly the same height).
- If you insert elements in already-sorted order `[1, 2, 3, 4]`, every node is placed as the right child of the previous node.
- The tree devolves into a Linked List. Lookups and insertions crash to O(N).
- **The Fix:** Self-balancing BSTs (AVL Trees, Red-Black Trees). They detect imbalance and perform O(1) "rotations" to pull the tree back into a logarithmic shape.
