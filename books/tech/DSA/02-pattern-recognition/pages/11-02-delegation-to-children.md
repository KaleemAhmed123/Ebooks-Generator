# Delegation to Children (Bottom-Up Bubbling)

## The Mental Model
The realization that in trees, the root delegates to its children. Covers tags: `handleRoot CallChild`, `Travel And Change`, and `PostOrder`.

## Algorithm Derivation
**Brute force:** To find the diameter of a tree, find the depth of the left and right subtree for *every* node from the top down. $O(N^2)$.
**↓**
**What is being repeated?** Depth is recalculated multiple times for the same nodes.
**↓**
**Can we reorder operations?** Yes. Process children *before* the parent.
**↓**
**Optimized Idea:** Use Post-Order Traversal. The left child returns its depth, the right child returns its depth. The parent calculates `max(left, right) + 1` and updates the global diameter `left + right`. $O(N)$ time.

## The Rule of Thumb
If a parent needs information from its children to make a decision, use **Post-Order DFS**.
