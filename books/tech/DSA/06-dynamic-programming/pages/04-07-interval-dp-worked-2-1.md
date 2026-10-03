### Longest Palindromic Subsequence (LC 516)

- **Problem:** Given a string `s`, return the length of the longest subsequence that reads the same forwards and backwards
- **State:** `dp[i][j]` = LPS length within `s[i..j]`
- **Transition:** If `s[i] === s[j]`, those two characters extend the palindrome: `dp[i][j] = dp[i+1][j-1] + 2`. Otherwise, skip one end: `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`
- **Base case:** Every single character is a palindrome of length 1
- **Evaluation order:** Fill by increasing length, or iterate `i` from bottom to top (since `dp[i]` depends on `dp[i+1]`)

### Palindrome Partitioning II (LC 132) — Partition DP

- **Partition DP** asks: what is the minimum number of cuts to split a string so that every piece satisfies a property (here, each piece is a palindrome)?
- **State:** `dp[i]` = minimum cuts for `s[0..i]`
- **Precompute:** Build a 2D boolean table `isPalin[i][j]` using interval DP: `isPalin[i][j] = s[i] === s[j] && isPalin[i+1][j-1]`
- **Transition:** For every `j ≤ i`, if `isPalin[j][i]` is true, then `dp[i] = min(dp[i], dp[j-1] + 1)`. If the entire prefix `s[0..i]` is a palindrome, `dp[i] = 0`

### The trap

- **Burst balloons: thinking forward.** "Which to burst first" creates overlapping, shifting subproblems. "Which to burst last" in each interval creates clean, independent subproblems. The reframe is the entire insight
- **LPS: wrong loop direction.** Filling `i` top-down reads `dp[i+1]` which is not computed yet. Fill `i` from `n-1` down to `0`, or use the length-based loop
