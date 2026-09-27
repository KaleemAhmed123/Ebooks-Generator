## Recognition drills after Chapter 6 - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Rotate String](https://leetcode.com/problems/rotate-string/) (LeetCode 796) | 06-01 | "first character to the end": every result is a rotation, and `s + s` holds them all |
| 2 | [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) (LeetCode 647) | 06-02 | "contiguous": count each successful step outward from 2n − 1 centres |
| 3 | [Find Longest Awesome Substring](https://leetcode.com/problems/find-longest-awesome-substring/) (LeetCode 1542) | 03-03 | "could be reordered": only each digit's parity matters; prefix masks equal or one bit apart |
| 4 | [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) (LeetCode 205) | 06-03 | "no two turning into the same one": a bijection, two maps |
| 5 | [Permutation in String](https://leetcode.com/problems/permutation-in-string/) (LeetCode 567) | 02-02 | "contiguous piece" of known length: a fixed window of letter counts |
| 6 | [Minimum Insertion Steps to Make a String Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/) (LeetCode 1312) | 17-02 | "insert anywhere": characters are matched out of order, a range DP `f(i, j)` |
| 7 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49) | 06-01 | "same letters, same counts": 26 counts with separators as the key |
| 8 | [Determine if Two Strings Are Close](https://leetcode.com/problems/determine-if-two-strings-are-close/) (LeetCode 1657) | 06-01 | swaps erase order, role swaps erase letter identity: key = the letter set plus the sorted counts |
| 9 | [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/) (LeetCode 680) | 06-02 | "at most one": close in from both ends, try each skip once at the first mismatch |
| 10 | [Minimum Number of Steps to Make Two Strings Anagram](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/) (LeetCode 1347) | 06-01 | "in any order": compare letter counts; the answer is the total surplus |
| 11 | [Find and Replace Pattern](https://leetcode.com/problems/find-and-replace-pattern/) (LeetCode 890) | 06-03 | "no two letters sharing a label": a bijection per word, or equal shape signatures |

### Score yourself

- **10–11:** you ask "does order matter, is it contiguous?" before anything else
- **7–9:** reread the "Not this page if" lines of 06-01 and 06-02
- **4–6:** reread 06-00; most misses are another chapter's pattern over characters
- **0–3:** redo 06-01 to 06-03, then this drill in a week
