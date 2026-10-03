### Where it appears

| Problem | What dominates what |
|---|---|
| [Car Fleet](https://leetcode.com/problems/car-fleet/) (LeetCode 853) | a faster car behind a slower one is absorbed |
| [Weak Characters in the Game](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/) (LeetCode 1996) | attack descending, defense ascending on ties |
| [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (LeetCode 354) | width up, height down on ties → LIS on height |
| [Maximum Width Ramp](https://leetcode.com/problems/maximum-width-ramp/) (LeetCode 962) | a decreasing stack of candidates from the left |

:::interview
"In Russian Doll Envelopes, why sort height descending on ties of width?"

If two envelopes have the same width, neither fits inside the other — so at most one can appear in the subsequence. Sorting height descending on ties ensures the LIS on height never picks two same-width envelopes: a later one always has a smaller height, so it cannot extend the subsequence from the earlier one.
:::
