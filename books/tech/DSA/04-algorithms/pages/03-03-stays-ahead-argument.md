## The "Stays Ahead" Argument

- This is the second formal proof technique for Greedy algorithms.
- **The Core Idea:** You prove that at every single step of the process, the Greedy solution is at least as well-positioned (or better) than any hypothetical Optimal solution. Because Greedy "stays ahead" at step 1, step 2, and step K, it must be ahead (or tied) at the final step.

### Example: The Coin Change

Let's look at the US currency system: `[1, 5, 10, 25]`. We want to make change using the minimum number of coins.
- **Greedy Strategy:** Always pick the largest coin that doesn't exceed the remaining amount.

### The Proof

Let's prove Greedy "stays ahead" when making change for 87 cents.
1. **Step 1 (First Coin):**
   - Greedy picks 25. Total: 25.
   - Can an Optimal solution pick something else? Maybe 10. Total: 10.
   - Greedy is "ahead" because it covered 25 cents using 1 coin, while Optimal only covered 10 cents.
2. **The Structural Constraint (Why it works):**
   - For Greedy to truly stay ahead, we must prove Optimal cannot somehow "catch up" later with extreme efficiency.
   - In the US currency system, you need *more than two* 10-cent coins to equal a 25-cent coin (you need three: `10+10+5`). But if you ever use three smaller coins, you used 3 coins to achieve what Greedy did in 1 coin (25).
   - Therefore, any sequence of smaller coins is strictly less efficient (uses more coins) than using the larger coin.
3. **Conclusion:**
   - Because Greedy takes the largest chunk out of the total at every step, and no combination of smaller chunks can match that efficiency, Greedy stays strictly ahead in minimizing the coin count.

### Why it fails on non-standard coins

If our coins are `[1, 3, 4]`, and we want 6 cents.
- Step 1: Greedy takes 4. Optimal takes 3. Greedy is "ahead".
- Step 2: Greedy is forced to take 1. Total = 5. Optimal takes 3. Total = 6. Optimal just overtook Greedy!
- Because `3+3=6` uses two coins, but the Greedy equivalent requires `4+1+1` (three coins), the structural constraint is broken. Greedy falls behind.

### Interview Application

When testing a Greedy hypothesis, ask yourself: *"If I make this greedy choice, is there any possible way an alternative choice could unlock a secret combo that overtakes me later?"* If the answer is yes, you need Dynamic Programming.
