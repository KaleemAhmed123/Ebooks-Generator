## Recognition drills: Strings <span class="lv lv1"></span>

Most string problems are another chapter's pattern wearing text. Hide the right column and route each one: which chapter owns it, and what the string-specific twist is.

| Problem | Pattern & the twist |
|---|---|
| 1. [String Rotation Check](https://www.geeksforgeeks.org/problems/check-if-strings-are-rotations-of-each-other-or-not-1587115620/1) (GFG) | **Signature:** `(s + s).includes(t)` with equal lengths |
| 2. [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49) | **Signature key:** 26 counts with separators |
| 3. [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) (LeetCode 205) | **Two-way map,** or equal shape signatures |
| 4. [Word Pattern](https://leetcode.com/problems/word-pattern/) (LeetCode 290) | **Two-way map** plus a length check |
| 5. [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) (LeetCode 5) | **Grow from the centre,** odd and even centres |
| 6. [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) (LeetCode 14) | **Vertical scan;** a trie only if prefix queries repeat |
| 7. [Roman to Integer](https://leetcode.com/problems/roman-to-integer/) (LeetCode 13) | **Look one ahead:** subtract a symbol smaller than its right neighbour |
| 8. [Integer to Roman](https://leetcode.com/problems/integer-to-roman/) (LeetCode 12) | **Greedy, largest symbol first,** with `CM`, `XC`, `IV` in the table |
| 9. [Add Binary](https://leetcode.com/problems/add-binary/) (LeetCode 67) | **Carry from the right,** two pointers of different lengths |
| 10. [Longest Word in Dictionary through Deleting](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/) (LeetCode 524) / [Longest Matching in Dictionary with Removals](https://www.geeksforgeeks.org/problems/find-largest-word-in-dictionary2430/1) (GFG) | **Subsequence check** with two pointers per word; ties by length then lexicographic order |
| 11. [Recursively Remove All Adjacent Duplicates](https://www.geeksforgeeks.org/problems/recursively-remove-all-adjacent-duplicates0744/1) (GFG) | **Cancel against the top** (Chapter 10) |

### Score yourself

- **9–11:** you route strings by structure, not by the word "string"
- **6–8:** review 06-01 and 06-03; many misses are a missing signature
- **0–5:** redo this table after Chapters 10 and 13, which own most of the rest
