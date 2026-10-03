### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Digit One](https://leetcode.com/problems/number-of-digit-one/) (LeetCode 233) | Count occurrences of digit 1 up to n |
| [Digit Count in Range](https://leetcode.com/problems/digit-count-in-range/) (LeetCode 1067) | Generalised to any digit d in range [low, high] |
| [Count Numbers with Unique Digits](https://leetcode.com/problems/count-numbers-with-unique-digits/) (LeetCode 357) | Digit DP with distinctness constraint |

### The Leading Zero Trap

In some Digit DP problems, leading zeros drastically change the math. (e.g., "Count numbers where no two adjacent digits are the same". `007` would fail the rule, but `7` is a valid number, meaning the implicit leading zeros shouldn't be evaluated).
If a problem cares about leading zeros, you add a 4th boolean parameter to your state: `isLeadingZero`. 
- If `isLeadingZero` is true and `digit === 0`, you pass `true` to the next state, and do *not* trigger the problem's mathematical rules.
- If `digit > 0`, you pass `false` to the next state.
