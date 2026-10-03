## Probability and Combinatorics DP <span class="lv lv2"></span>

Dynamic Programming isn't just for finding the "maximum" or "minimum" path. It is incredibly effective for calculating Probabilities and Expected Values.

### Expected Value (Dice Rolls)

- **The Problem:** You have a 6-sided die. You want to reach a total score of N. If your score exceeds N, you lose. What is the probability of landing exactly on N?
- **The State:** `dp[i]` = the probability of reaching exactly score `i`.
- **The Transition:** How do you land on score `i`? You must have been at a previous score (`i-1` through `i-6`), and then rolled the exact specific number needed to bridge the gap.
  - Since each face of the die has a 1/6 chance of appearing:
  - `dp[i] = (dp[i-1] + dp[i-2] + dp[i-3] + dp[i-4] + dp[i-5] + dp[i-6]) / 6.0`

### Soup Servings (A LeetCode Classic)

- **The Setup:** You have two types of soup: A and B. Initially you have `N` ml of each. You have 4 operations, each with a 25% probability:
  1. Serve 100ml of A and 0ml of B
  2. Serve 75ml of A and 25ml of B
  3. Serve 50ml of A and 50ml of B
  4. Serve 25ml of A and 75ml of B
- **The Question:** Return the probability that soup A becomes empty first, plus half the probability that they become empty at the exact same time.
