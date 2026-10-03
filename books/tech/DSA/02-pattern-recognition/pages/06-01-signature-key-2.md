### Where it appears

| Problem | What the signature encodes |
|---|---|
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49) | 26 letter counts joined by `#` |
| [Valid Anagram](https://leetcode.com/problems/valid-anagram/) (LeetCode 242) | letter counts must match exactly |
| [Rotate String](https://leetcode.com/problems/rotate-string/) (LeetCode 796) | `(s + s).includes(t)` |
| [Determine if Two Strings Are Close](https://leetcode.com/problems/determine-if-two-strings-are-close/) (LeetCode 1657) | same letter set + same sorted frequency list |

:::interview
"Why not just sort each word and use the sorted form as the key?"

Sorting each word is O(L log L). A letter-count key is O(L). For short words the difference is negligible, but for long strings the count approach is strictly faster. Both are correct — sorting is simpler to write under pressure, counts avoid the log factor.
:::
