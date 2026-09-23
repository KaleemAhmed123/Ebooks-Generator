## DP Recognition Drills

Read the following scenarios. Identify the State and the specific DP Pattern. (Cover the answers on the right).

| Scenario | Pattern & State |
| :--- | :--- |
| **1.** You have a grid representing a maze. Return the minimum health required to survive from top-left to bottom-right. | **Reverse Grid DP.** `dp[r][c]` = min health needed before entering `(r, c)`. |
| **2.** Given an array of integers, return the length of the longest strictly increasing subsequence. | **1D LIS.** `dp[i]` = longest length strictly ending at index `i`. |
| **3.** You want to buy and sell stocks. You can complete at most K transactions. Maximize profit. | **State-Machine / 2D DP.** `dp[i][k][holding]` = max profit on day `i`, with `k` transactions remaining, currently holding (0/1). |
| **4.** Given two strings, find the minimum insertions and deletions required to make them identical. | **2D String DP (LCS).** `dp[i][j]` = LCS of prefix `i` and prefix `j`. (Ans: `len1 + len2 - 2*LCS`). |
| **5.** You have 15 students and 15 tasks. Each student has a varying aptitude score for each task. Find the maximum total score. | **Bitmask DP.** `dp[mask]` = max score using the subset of students in `mask` for the first `popcount(mask)` tasks. |
| **6.** Count how many numbers between 1 and 10¹⁵ do not contain the digit `4`. | **Digit DP.** `dfs(index, isTight)` skipping digit `4` in the loop. |
| **7.** Given an array, find if you can split it into two subsets with equal sums. | **Subset Sum (0/1 Knapsack).** `dp[w]` = boolean, backwards 1D loop. |
| **8.** Find the longest palindromic substring in a given string. | **Interval DP.** `dp[i][j]` = boolean (is the substring from `i` to `j` a palindrome). Loops run bottom-to-top, left-to-right. |
