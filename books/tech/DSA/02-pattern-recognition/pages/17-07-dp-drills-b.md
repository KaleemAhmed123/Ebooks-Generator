## Recognition drills: DP & Games <span class="lv lv2"></span> - continued

| Problem | Signature · transition |
|---|---|
| 12. Count All Valid Pickup and Delivery Options (LeetCode 1359) | **`f(n) = f(n−1) · n · (2n − 1)`**: choose 2 of the 2n positions for the new pair |
| 13. Mobile Numeric Keypad (GFG) | **`f(len, digit)`** = sum over the digit's neighbours and itself |
| 14. 0/1 Knapsack (GFG) / Subset Sum (GFG) / Partition (LeetCode 416) | **`f(i, cap)`**, move on after a pick (Module 06, 03-03, 03-05) |
| 15. Coin Change (GFG / LeetCode 322, 518) / ways to reach a score (GFG) | **`f(i, amount)`**, stay at i after a pick; items in the outer loop count combinations (Module 06, 03-04) |
| 16. Perfect Squares (LeetCode 279) | **Unbounded:** `f(n) = 1 + min f(n − s²)` |
| 17. Maximize the Cut Segments (GFG) | **Unbounded:** `f(n) = 1 + max(f(n−x), f(n−y), f(n−z))`; impossible = −∞, not 0 |
| 18. Minimum cost to fill a given weight in a bag (GFG) | **Unbounded knapsack;** a cost of −1 means the packet does not exist |
| 19. Number of Dice Rolls With Target Sum (LeetCode 1155) | **`f(dice, target)`,** loop faces 1 … k |
| 20. Greatest Sum Divisible by Three (LeetCode 1262) | **`f(i, sum mod 3)`**: three numbers per index |
| 21. Count subsequences with product < K (GFG) | **Pick/skip with the running product;** prune when it reaches K |
| 22. Painting the Walls (LeetCode 2742) | **Knapsack:** a paid wall covers `time[i] + 1` walls; `f(i, wallsLeft)` |
| 23. Gold Mine (GFG) | **Grid, column by column,** three moves in |
| 24. Maximal Square (LeetCode 221) | **`1 + min(up, left, diag)`** |
| 25. Assembly Line Scheduling (GFG) | **`f(station, line)`**: stay, or switch and pay the transfer |
