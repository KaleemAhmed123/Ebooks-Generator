### Where it appears

| Problem | What in-order reveals |
|---|---|
| [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) (LeetCode 230) | the k-th value in sorted order |
| [Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/) (LeetCode 173) | lazy in-order via an explicit stack |
| [Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) (LeetCode 653) | two iterators colliding inward (02-08) |
| [Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/) (LeetCode 530) | consecutive values are neighbours in order |

:::interview
"Recover BST: two nodes are swapped. How does in-order find them?"

In a valid BST, in-order is strictly increasing. A swap creates one or two "drops" (where `prev > current`). One drop means neighbours were swapped: swap the first node of the drop with the second. Two drops means distant nodes were swapped: swap the first node of the first drop with the second node of the second drop.
:::
