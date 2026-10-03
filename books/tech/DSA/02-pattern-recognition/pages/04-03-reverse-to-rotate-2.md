### Where it appears

| Problem | What gets reversed |
|---|---|
| [Rotate Array](https://leetcode.com/problems/rotate-array/) (LeetCode 189) | whole array, then two halves |
| [Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) (LeetCode 151) | whole string, then each word |
| [Rotate Image](https://leetcode.com/problems/rotate-image/) (LeetCode 48) | transpose + reverse each row (→ 05-02) |

:::interview
"Why three reversals instead of a temp array?"

A temp array costs O(n) space. Three in-place reversals cost O(1) space — each is just swapping from both ends. The trick works because `(AB)ᴿ = BᴿAᴿ`, and reversing each part undoes the internal flip while keeping the blocks swapped.
:::
