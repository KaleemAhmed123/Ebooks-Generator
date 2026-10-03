### Where it appears

| Problem | What "merge the two smallest" produces |
|---|---|
| [Minimum Cost to Connect Sticks](https://leetcode.com/problems/minimum-cost-to-connect-sticks/) (LeetCode 1167) | the combined stick goes back into the heap |
| [Huffman Encoding](https://www.geeksforgeeks.org/problems/huffman-encoding3345/1) (GFG) | the Huffman tree — tie-break by insertion order |
| [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) (LeetCode 1046) | max-heap: smash the two largest |
| [Minimum Operations to Halve Array Sum](https://leetcode.com/problems/minimum-operations-to-halve-array-sum/) (LeetCode 2208) | halve the largest each time |

:::interview
"Why does merging left to right in sorted order cost more than the heap approach?"

Sorted-order merging always takes the two absolute smallest, but the result grows monotonically — late merges are huge. The heap re-inserts the merged result, so if two large items merge early their combined cost does not keep compounding. Example: `[2, 2, 3, 3]` sorted gives 21; the heap can merge `2+2` and `3+3` first, then `4+6` = 20.
:::
