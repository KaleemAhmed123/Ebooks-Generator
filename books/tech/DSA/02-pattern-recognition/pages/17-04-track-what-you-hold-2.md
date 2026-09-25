### Variations

- **Best Time to Buy and Sell Stock (LeetCode 121):** k = 1; the machine collapses to "lowest price so far"
- **Best Time to Buy and Sell Stock III (LeetCode 123) / at most twice (GFG):** k = 2 in the template
- **Best Time to Buy and Sell Stock II (LeetCode 122):** unlimited trades; one `hold` and one `free` scalar, or sum every rise
- **With Cooldown (LeetCode 309):** a third state, "just sold", that can only rest into `free`. Update from yesterday's values, not today's
- **With Transaction Fee (LeetCode 714):** subtract the fee on the sell edge
- **k ≥ n / 2:** at most ⌊n / 2⌋ trades are possible, so the limit stops binding; treat it as LeetCode 122 and skip the O(n · k) table

### The failure

- **Taking the k largest rising runs.** On `[1, 5, 3, 8]` with k = 1, the largest run is 3 → 8 for 5; one trade from 1 to 8 earns 7. Runs can merge across a dip; the machine keeps that option open
- **Summing every rise when k is limited.** On `[1, 2, 1, 2, 1, 2]` summing rises gives 3; with k = 2 the answer is 2

:::interview
"How do you handle at most k transactions?" — Two arrays indexed by trades used: best cash while holding a share and while free. Each price updates `hold[j]` from `free[j − 1] − p` and `free[j]` from `hold[j] + p`. O(n · k) time, O(k) space; if k ≥ n / 2 the limit never binds and I use the unlimited version.
:::
