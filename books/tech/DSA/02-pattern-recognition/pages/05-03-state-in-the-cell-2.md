### Where it appears

| Problem | How the cell encodes two states |
|---|---|
| [Game of Life](https://leetcode.com/problems/game-of-life/) (LeetCode 289) | bit 0 = old, bit 1 = new; final `>>= 1` |
| [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) (LeetCode 73) | row 0 and col 0 as flag arrays; one extra boolean for col 0 |

:::interview
"Why not just use a copy of the board?"

You can — it is O(m·n) space and works fine. The bit trick fits the "O(1) extra space" follow-up. The insight is that each cell is 0 or 1, leaving 31 unused bits. Packing the new state into bit 1 lets both states coexist without a separate board.
:::
