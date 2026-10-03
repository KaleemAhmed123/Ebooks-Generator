### Where it appears

| Problem | Summary the window keeps |
|---|---|
| [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) (LeetCode 643) | a running sum |
| [Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/) (LeetCode 1456) | a count of vowels |
| [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) (LeetCode 438) | a letter frequency map; compare with `p`'s map |
| [Permutation in String](https://leetcode.com/problems/permutation-in-string/) (LeetCode 567) | same map; one `missing` counter for O(1) validity |
| [K Radius Subarray Averages](https://leetcode.com/problems/k-radius-subarray-averages/) (LeetCode 2090) | a running sum, centred at `i − k` |
| [Substrings of Size Three with Distinct Characters](https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/) (LeetCode 1876) | a 3-char set |

:::interview
"When would you not use a fixed window even though k is given?"

When the summary cannot undo a removal. A *max* inside the window cannot be subtracted out — removing a non-max changes nothing, removing the max needs a rescan. Use a monotonic deque (10-10) instead.
:::
