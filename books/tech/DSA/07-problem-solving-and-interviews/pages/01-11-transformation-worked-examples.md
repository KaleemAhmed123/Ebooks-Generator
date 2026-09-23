## Transformation Worked Examples

To cement the concept of Problem Transformation, cover the right side of this table and try to identify the transformation yourself.

| The Problem | The Transformation |
| :--- | :--- |
| **1.** You have a dictionary of words. Find if two words can be chained together where the last letter of word A matches the first letter of word B. | **String Array to Graph.** Words are edges. First and last letters are nodes. The problem is finding an Eulerian Path. |
| **2.** Given a string, find the longest palindromic substring. | **Interval to 2D Array (DP).** Transform the string into a 2D boolean grid `dp[i][j]` where true means the interval `i...j` is a palindrome. |
| **3.** You have N meetings with start and end times. Find the minimum number of conference rooms required. | **Intervals to Sweep Line.** Transform the `[start, end]` intervals into two independent events: `(start, +1)` and `(end, -1)`. Sort the events and keep a running sum. The peak sum is the answer. |
| **4.** Given a 2D matrix of 0s and 1s, find the largest rectangle containing only 1s. | **2D Grid to 1D Histogram.** Transform each row into the base of a histogram, where the height is the number of consecutive 1s above it. Run the O(N) "Largest Rectangle in Histogram" Monotonic Stack algorithm on every row. |
| **5.** You have a list of equations: `A / B = 2.0`, `B / C = 3.0`. Find the value of `A / C`. | **Equations to Graph.** Variables are nodes. The division result is a directed, weighted edge. Run DFS to find the product of weights on the path from `A` to `C`. |
| **6.** Given an array, find the maximum XOR of any two elements. | **Numbers to Trie.** Treat the 32-bit binary representation of each number as a 32-character string. Build a Trie. For each number, walk down the Trie preferring the *opposite* bit to maximize XOR. |
| **7.** Find the number of valid permutations of a sequence that satisfy certain constraints, modulo 10⁹ + 7. | **Permutations to Bitmask DP.** A permutation is just building a set one element at a time. The state is the set of elements used so far (Bitmask). |

### The Meta-Skill

When you look at a problem, don't ask "What algorithm solves this?"
Ask: **"If I transformed the input into a Graph / Trie / Histogram / Bitmask / Sorted Array / Prefix Sum Array, would a known algorithm suddenly work?"**
