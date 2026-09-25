### Variations

- **Balanced Binary Tree (LeetCode 110):** return the height, or −1 as soon as any subtree is unbalanced; a −1 from either child short-circuits the rest
- **Binary Tree Tilt (LeetCode 563):** return the subtree sum, record `|left sum − right sum|`
- **Distribute Coins in Binary Tree (LeetCode 979) / Distribute candies in a binary tree (GFG):** return the subtree's excess `coins − nodes`; every excess unit must cross the edge to the parent, so record `|left excess| + |right excess|` moves
- **Maximum Product of Splitted Binary Tree (LeetCode 1339):** pass 1 gets the total; pass 2 returns subtree sums and records `sub · (total − sub)` for every edge
- **Binary Tree Cameras (LeetCode 968) 🔴:** return one of three states (needs cover / has camera / covered) and record a camera whenever a child needs cover. A post-order greedy with a three-valued return
- **Binary Tree Maximum Path Sum (LeetCode 124):** the same split with values and negatives; Module 06 works it through

### The failure

- **Returning the answer instead of the extendable part.** If `height` returned `1 + l + r` the parent would extend a path that already bends, which is not a path at all. A root whose left child has two chains of 2 below it, and whose right child is a leaf, records 6; the true diameter is 4
- **Recomputing heights top-down.** Calling a separate `height(node.left) + height(node.right)` at every node re-walks each subtree from every ancestor: O(n²) on a chain

:::interview
"Why do you need a global variable for the diameter?" — The parent can only extend a path that goes *down* from the child, so the child must return its height. But the longest path might bend at the child itself, and that value cannot be passed upward as a height. So I return the height and record the bend in an outer variable. Each node is visited once, O(n).
:::
