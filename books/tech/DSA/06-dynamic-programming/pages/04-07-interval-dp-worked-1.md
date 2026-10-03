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
