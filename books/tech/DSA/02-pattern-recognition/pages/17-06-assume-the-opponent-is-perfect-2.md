### Variations

- **Optimal Strategy for a Game (GFG):** asks for player 1's total: `(sum + lead) / 2`. The two-sided form `a[i] + min(f(i+2, j), f(i+1, j−1))` is the same game written from one player's view
- **Stone Game (LeetCode 877):** even count, odd total. Player 1 can take every even-indexed pile or every odd-indexed one, and one set sums higher, so the answer is always `true`
- **Stone Game II (LeetCode 1140):** the state gains M: `f(i, M)` over suffixes, with the suffix sum giving the total
- **Coin game winner, three choices (GFG):** win/lose DP: a position wins iff some move reaches a losing position
- **Nim Game (LeetCode 292):** the losing positions are multiples of 4; the DP collapses to `n % 4 !== 0`
- **Can I Win (LeetCode 464):** the position is the set of used numbers, a bitmask of up to 20 bits

### The failure

- **Playing the opponent as greedy.** On `[1, 5, 233, 7]` "take the larger end" gives player 1 only 12 against 234. Taking 1 first forces the opponent to open 233 to you; player 1 wins. Model the opponent as perfect, never as greedy
- **Letting player 1 maximise while player 2 "also maximises player 1's total".** Writing `a[i] + max(f(i+2, j), f(i+1, j−1))` hands player 1 the opponent's choice. The inner operator must be `min`: the opponent picks what is worst for you. On `[5, 3, 7, 10]` the `max` version claims 17; the true total is 15

:::interview
"How do you solve a two-player optimal game?" — Zero-sum, so I store the lead of whoever moves: `dp[i][j] = max(nums[i] − dp[i+1][j], nums[j] − dp[i][j−1])`. Player 1 wins if `dp[0][n−1] ≥ 0`. O(n²) time, O(n) space with one row. For totals, `(sum + lead) / 2`.
:::
