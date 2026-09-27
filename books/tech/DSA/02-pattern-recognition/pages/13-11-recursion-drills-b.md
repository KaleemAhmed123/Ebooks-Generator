## Recognition drills after Chapter 13 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Combinations](https://leetcode.com/problems/combinations/) (LeetCode 77) | 13-05 | choose k, **order ignored**, no equal values: pick or skip with a size limit |
| 2 | [Decode String](https://leetcode.com/problems/decode-string/) (LeetCode 394) | 10-02 | **nested** `k[…]`: push the context on `[` |
| 3 | [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) (LeetCode 131) | 13-09 | contiguous **pieces**: try every end for the first piece |
| 4 | [Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/) (LeetCode 784) | 13-05 | **two choices** per letter, one per digit: the pick-or-skip tree |
| 5 | [Sum of All Subset XOR Totals](https://leetcode.com/problems/sum-of-all-subset-xor-totals/) (LeetCode 1863) | 11-02 | a sum over **all** subsets: a column with any 1 is set in half of them, so `OR(all) · 2ⁿ⁻¹` |
| 6 | [Permutations II](https://leetcode.com/problems/permutations-ii/) (LeetCode 47) | 13-08 | **orderings** with equal values: used[] plus the twin rule |
| 7 | [Path with Maximum Gold](https://leetcode.com/problems/path-with-maximum-gold/) (LeetCode 1219) | 13-04 | **no revisits**, best total along one walk: mark, try 4 moves, unmark |
| 8 | [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) (LeetCode 40) | 13-06 | used **once**, input has **repeats**: skip equal siblings |
| 9 | [K-th Symbol in Grammar](https://leetcode.com/problems/k-th-symbol-in-grammar/) (LeetCode 779) | 13-01 | row n is **built from row n − 1**: trust the call on the parent position |
| 10 | [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39) | 13-07 | **any number of times**, order ignored: stay at `go(i)` |
| 11 | [Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/) (LeetCode 526) | 13-08 | a rule **per position**: fill slot by slot, prune at each slot |
| 12 | [N-Queens](https://leetcode.com/problems/n-queens/) (LeetCode 51) | 13-10 | no **shared row, column or diagonal**: place, check sets, undo |
| 13 | [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79) | 13-04 | trace through **adjacent cells**, each used once: mark and restore |

### Score yourself

- **11–13:** you choose the start index of the next call before writing the loop
- **7–10:** reread 13-03; most misses are "once, reuse, or reorder?"
- **0–6:** write the hypothesis (13-01) for every drill before its code, then retry
