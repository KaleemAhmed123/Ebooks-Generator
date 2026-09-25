### Variations

- **Path Sum (LeetCode 112) / Path Sum II (LeetCode 113):** carry the remaining sum; at a *leaf*, check it is 0. For II, also carry the path in a shared array and pop on return
- **Sum Root to Leaf Numbers (LeetCode 129):** carry `num · 10 + node.val`; add it at each leaf
- **Maximum Difference Between Node and Ancestor (LeetCode 1026):** carry both the minimum and the maximum on the path; the answer at a node is the larger of `|val − min|` and `|val − max|`
- **Path Sum III (LeetCode 437) / Print all k-sum paths (GFG):** paths may start anywhere below the root. Carry a *map of prefix sums* on the path (page 03-03): add `count[sum − k]` at each node, insert `sum` before recursing, remove it after
- **Validate Binary Search Tree (LeetCode 98):** carry the allowed range `(lo, hi)`; Module 03 walks through it

### The failure

- **Treating any node as a leaf.** In Path Sum, a node with one child is not a leaf. Checking `remaining === 0` at a `null` child counts a path that stops half-way: a root `1` with only a right child `2` and target 1 must return false
- **Mutating a shared path without undo.** In Path Sum II and III, a shared array or map must be restored after the recursive calls, or later branches see nodes from finished ones

:::interview
"How do you know whether to pass information down or return it up?" — If the node needs something about its ancestors, such as the maximum on the path or the remaining sum, it arrives as a parameter. If it needs something about its descendants, such as height or subtree sum, it comes back as a return value. Good Nodes only looks up the path, so a single parameter and one pre-order pass solve it in O(n).
:::
