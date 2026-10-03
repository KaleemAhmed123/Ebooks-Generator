## Decode Ways <span class="lv lv1"></span>

This problem tests your ability to handle strict base cases and invalid states.

- **The Setup:** A message containing letters from A-Z is encoded into numbers (A -> 1, B -> 2 ... Z -> 26). Given a string of digits, determine the total number of ways to decode it.
- **Example:** `"226"` could be `BZ` (2, 26), `VF` (22, 6), or `BBF` (2, 2, 6). Total ways: 3.

### The State and Transition

- **State:** `dp[i]` = number of ways to decode the prefix of the string of length `i`.
- **Transition:** At index `i-1` (the ith character, since string index is 0-based), we can form a valid letter in two ways:
  1. **Single Digit:** If `s[i-1]` is between '1' and '9', it forms a valid letter. The number of ways to decode it is the same as the ways to decode the string up to `i-1`. (We just append the new letter).
  2. **Double Digit:** If the two characters `s[i-2]` and `s[i-1]` form a number between "10" and "26", they form a valid letter. The number of ways to decode it is the same as the ways to decode the string up to `i-2`.

`dp[i] = (validSingle ? dp[i-1] : 0) + (validDouble ? dp[i-2] : 0)`

### The Trap: Zeroes

- `"06"` is invalid. There is no letter for 0, and no letter for 06.
- If a single digit is `'0'`, `validSingle` is false. It contributes 0 to the sum.
- If the double digit is `"06"`, `"60"`, or `"27"`, `validDouble` is false.
