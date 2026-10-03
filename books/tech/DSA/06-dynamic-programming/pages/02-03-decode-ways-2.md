### Implementation

```ts
function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === '0') return 0; // Immediate failure

  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  
  dp[0] = 1; // Base case: 1 way to decode an empty string
  dp[1] = 1; // We already checked s[0] !== '0'

  for (let i = 2; i <= n; i++) {
    // 1-digit check (s[i-1] is the current character)
    const singleDigit = parseInt(s.substring(i - 1, i));
    if (singleDigit >= 1 && singleDigit <= 9) {
      dp[i] += dp[i - 1];
    }

    // 2-digit check
    const doubleDigit = parseInt(s.substring(i - 2, i));
    if (doubleDigit >= 10 && doubleDigit <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Decode Ways](https://leetcode.com/problems/decode-ways/) (LeetCode 91) | The original conditional Fibonacci problem |
| [Decode Ways II](https://leetcode.com/problems/decode-ways-ii/) (LeetCode 639) | Adds wildcard '*' multiplying branch counts |
| [Number of Ways to Separate Numbers](https://leetcode.com/problems/number-of-ways-to-separate-numbers/) (LeetCode 1977) | Partitioning a digit string with ordering constraints |

### The takeaway

Decode Ways is exactly Climbing Stairs, but with conditional logic that blocks you from taking a 1-step or a 2-step if the string characters are invalid.
