### Where it appears

| Problem | What breaks the window |
|---|---|
| [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (LeetCode 3) | a character count > 1 |
| [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/) (LeetCode 904) | > 2 distinct values |
| [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) (LeetCode 424) | > k cells to change (len − maxFreq > k) |
| [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) (LeetCode 1004) | > k zeros |
| [Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/) (LeetCode 1493) | > 1 zero |
| [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (LeetCode 76) | `missing > 0` (shortest; one counter tracks unmet letters) |
| [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) (LeetCode 209) | sum < target (shortest; record while valid) |

:::interview
"Why not count 'exactly K distinct' in one pass?"

For a fixed `right`, the valid starts for "at most K" form one block `[left, right]`, so one pointer counts them. For "exactly K" the valid starts sit in a smaller range whose left bound needs a second pointer. Two "at most" passes cancel out to the exact count — see 02-05.
:::
