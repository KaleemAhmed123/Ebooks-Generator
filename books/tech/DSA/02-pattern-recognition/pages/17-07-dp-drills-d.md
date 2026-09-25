## Recognition drills: DP & Games 🟡 - continued

| Problem | Signature · transition |
|---|---|
| 40. Minimum jumps to reach the end (GFG) | **Greedy reach** (08-02) |
| 41. LCS / Edit Distance (LeetCode 1143, 72) | **Two strings** (Module 06, 03-01, 03-02) |
| 42. Longest Repeating Subsequence (GFG) | **LCS of s with itself,** matching only when i ≠ j |
| 43. LCS of three strings (GFG) | **`f(i, j, k)`** |
| 44. Longest Common Substring (GFG) | **Match: `dp[i−1][j−1] + 1`; mismatch: 0** |
| 45. Interleaving String (LeetCode 97) | **`f(i, j)`;** the next char of s3 is at `i + j` |
| 46. Regular Expression Matching (LeetCode 10) | **`f(i, j)`;** `x*` skips the pair, or eats one char and stays |
| 47. Word Break (LeetCode 139) / Extra Characters in a String (LeetCode 2707) | **`f(i)`:** try every dictionary word starting at i |
| 48. Word Wrap (GFG) | **`f(i)`:** try every line end j, pay the line's cost |
| 49. Longest Palindromic Subsequence (LeetCode 516) | **LCS of s and reverse(s),** or range DP |
| 50. Count palindromic subsequences (GFG) | **Range:** equal ends `f(i+1,j) + f(i,j−1) + 1`; else subtract `f(i+1,j−1)` |
| 51. Longest Palindromic Substring (LeetCode 5) | **Grow from the centre** (06-02) |
| 52. Matrix Chain / Boolean Parenthesization / Optimal BST / Palindrome Partitioning II / Minimum Cost to Cut a Stick | **Try every split** (17-05) |
| 53. Egg Dropping (GFG / LeetCode 887) | **`f(eggs, floors)`** tries every floor; flip it to "floors checkable in m moves" for large n |
