## Interval DP Worked Problems <span class="lv lv2"></span>

### Burst Balloons (LC 312)

- **Problem:** Given n balloons with values `nums[i]`, burst them one at a time. When you burst balloon `i`, you gain `nums[left] × nums[i] × nums[right]` coins, where `left` and `right` are the nearest surviving neighbors. Maximise total coins
- **The wrong instinct:** Greedy — burst the smallest first, or the one giving the most coins now. This fails because bursting a balloon changes the neighbors of every remaining balloon. The problem has dependent subproblems
- **The interval DP reframe:** Instead of thinking "which balloon to burst first," think "which balloon to burst **last** in the interval `[i, j]`." If balloon `k` is the last one burst in `[i..j]`, then at that moment its neighbors are `nums[i-1]` and `nums[j+1]` (everything between is already gone). The subproblems `[i..k-1]` and `[k+1..j]` are independent

```ts
function maxCoins(nums: number[]): number {
  const vals = [1, ...nums, 1];  // pad with 1s for boundary handling
  const n = vals.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len < n; len++) {
    for (let i = 0; i + len < n; i++) {
      const j = i + len;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(dp[i][j],
          dp[i][k] + dp[k][j] + vals[i] * vals[k] * vals[j]);
      }
    }
  }
  return dp[0][n - 1];
}
```

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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | "Which to burst last" reframe |
| [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) (LeetCode 516) | Interval shrinks from both ends |
| [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) (LeetCode 132) | Minimum cuts with palindrome precomputation |
| [Minimum Cost Tree From Leaf Values](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) (LeetCode 1130) | Interval DP choosing which leaf pair to merge |

:::interview
"How do you recognise an interval DP problem?"

The problem collapses a contiguous range by combining or removing adjacent elements. After each operation, the remaining elements stay in their original relative order — nothing rearranges. If the subproblems are sub-intervals of the original range, interval DP applies.
:::
