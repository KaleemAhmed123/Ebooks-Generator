### Variations

- **Binary Search Tree Iterator (LeetCode 173):** the same stack kept between calls. `next()` pops and pushes the right child's left spine; `hasNext()` checks the stack is non-empty
- **Two Sum IV – Input is a BST (LeetCode 653) / Brothers from different roots (GFG):** one iterator ascending, one descending (push *right* spines), then collision two pointers exactly as on a sorted array (page 02-08). O(h) memory, no array copy
- **Recover Binary Search Tree (LeetCode 99):** in order, a swapped pair shows up as one or two "drops" (`prev.val > cur.val`). The first node of the first drop and the second node of the last drop are the swapped pair
- **Minimum Absolute Difference in BST (LeetCode 530):** the minimum gap is between in-order neighbours; track `prev`
- **Convert BST to Greater Tree (LeetCode 538):** reverse in-order (right, root, left) with a running sum
- **Median of a BST in O(1) extra space (GFG):** the in-order walk without a stack needs Morris threading (Chapter 19)

### The failure

- **Collecting the whole in-order list.** Building an array of n values to read the k-th wastes O(n) memory and time when k is small; the iterator stops after k pops
- **Collecting the whole in-order list for Kth Smallest.** It costs O(n) time and memory even when k = 1. The stack walk stops after k pops: O(h + k). (BST validation traps: Module 03, 03-02)

:::interview
"Can you find the k-th smallest element in a BST without traversing the whole tree?" — Yes, iterative in-order with a stack: push the left spine, pop, count, then move to the right child. I stop after k pops, so the cost is O(height + k) time and O(height) memory. If the tree changes often and many k-th queries arrive, I would store subtree sizes in each node to answer in O(height).
:::
