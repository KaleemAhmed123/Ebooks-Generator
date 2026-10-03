### Why it fails on non-standard coins

If our coins are `[1, 3, 4]`, and we want 6 cents.
- Step 1: Greedy takes 4. Optimal takes 3. Greedy is "ahead".
- Step 2: Greedy is forced to take 1. Total = 5. Optimal takes 3. Total = 6. Optimal just overtook Greedy.
- Because `3+3=6` uses two coins, but the Greedy equivalent requires `4+1+1` (three coins), the structural constraint is broken. Greedy falls behind.

### Interview Application

When testing a Greedy hypothesis, ask yourself: *"If I make this greedy choice, is there any possible way an alternative choice could unlock a secret combo that overtakes me later?"* If the answer is yes, you need Dynamic Programming.
