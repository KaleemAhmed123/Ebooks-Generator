## Segment Tree <span class="lv lv3"></span>

- **What:** a binary tree over the array where each node stores the answer for one contiguous block. The root covers all of it, leaves are single cells, every internal node merges its two children. **Point update** and **range query** both touch one root-to-leaf path: O(log n)
- **Spot it:** many `[L, R]` queries *interleaved* with updates, where the operation overlaps rather than subtracts — min, max, gcd, "assign this range" — so a prefix array (03-02) cannot undo it. Only sums with point updates → a Fenwick (83) is lighter
- **Why:** any range `[L, R]` is the union of O(log n) node-blocks, found by splitting at each node into the part inside and the part outside. Merging those blocks' stored answers rebuilds the range answer without rescanning its elements
