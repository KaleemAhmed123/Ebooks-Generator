## Assume the Opponent Is Perfect 🟡

- **What it is:** **Minimax DP** for two-player, zero-sum, perfect-information games. Store one number per position: the **score lead of the player about to move**. Your move is worth what you gain minus the opponent's best lead from the position you leave them
- **Signal:** "two players take turns", "both play optimally", "predict whether player 1 wins", "maximum amount the first player can collect"
- **Why it works:** In a zero-sum game the opponent's best play is your worst case, so one function serves both sides. `lead = gain − lead(next)` flips perspective every turn without tracking whose turn it is

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Game tree for Predict the Winner on 1, 5, 2. Taking 1 leaves 5, 2 where the opponent's lead is 5 minus 2 equals 3, so this move is worth 1 minus 3 equals minus 2. Taking 2 leaves 1, 5 where the opponent's lead is 5 minus 1 equals 4, so this move is worth 2 minus 4 equals minus 2. The best lead is minus 2, so player 1 loses." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .me { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .op { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
  </style>
  <rect class="me" x="185" y="6" width="100" height="24" rx="4"/><text x="235" y="22" class="lb" text-anchor="middle">[1,5,2] → −2</text>
  <line x1="215" y1="30" x2="120" y2="54" stroke="#1a1a1a"/><line x1="255" y1="30" x2="350" y2="54" stroke="#1a1a1a"/>
  <text x="140" y="44" class="sm">take 1</text><text x="310" y="44" class="sm">take 2</text>
  <rect class="op" x="70" y="54" width="100" height="24" rx="4"/><text x="120" y="70" class="lb" text-anchor="middle">[5,2] → 3</text>
  <rect class="op" x="300" y="54" width="100" height="24" rx="4"/><text x="350" y="70" class="lb" text-anchor="middle">[1,5] → 4</text>
  <text x="120" y="96" class="lb" text-anchor="middle">1 − 3 = −2</text>
  <text x="350" y="96" class="lb" text-anchor="middle">2 − 4 = −2</text>
  <text x="235" y="120" class="sm" text-anchor="middle">blue: player to move is you · red: player to move is the opponent · each box = lead of whoever moves</text>
</svg>
:::

```ts
// Predict the Winner (LeetCode 486): may player 1 win or tie?
function predictTheWinner(nums: number[]): boolean {
  const n = nums.length;
  // lead[j] holds dp[i][j]: best lead of the mover on nums[i..j]
  const lead = [...nums];              // ranges of length 1
  for (let i = n - 2; i >= 0; i--)
    for (let j = i + 1; j < n; j++)
      lead[j] = Math.max(nums[i] - lead[j], nums[j] - lead[j - 1]);
  return lead[n - 1] >= 0;
}
```

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
