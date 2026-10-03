## Speculative decoding: the acceptance math

- The speedup from speculative decoding (17-37) is not a fixed "2×" — it is a function of the **acceptance rate**, and knowing the formula lets you predict the win and explain when it evaporates.
- Propose `k` draft tokens per step; let `α` be the probability the target accepts a given draft token (roughly the draft's agreement with the target). The expected number of tokens accepted per verification step is a geometric-style sum.

:::mint
```text
Draft k tokens, per-token accept prob α (i.i.d. approximation):
  expected accepted per step ≈ (1 − α^(k+1)) / (1 − α)

α = 0.8, k = 4:  (1 − 0.8^5)/(1 − 0.8) = (1 − 0.328)/0.2 ≈ 3.36 tokens/step
  vs 1 token/step baseline  ->  ~3.3× fewer target passes

α = 0.5, k = 4:  (1 − 0.5^5)/0.5 ≈ 1.94 tokens/step  -> ~1.9×
α = 0.9, k = 6:  ≈ 5.2 tokens/step                    -> big win

Net speedup = (tokens/step) ÷ (1 + draft_cost_fraction)
  the draft isn't free; a heavy drafter eats into the gain.
```
:::

- **Acceptance rate is everything, and it is workload-specific.** Predictable text (code with boilerplate, formulaic responses) accepts high; creative or surprising text accepts low. This is why you measure `α` on *your* traffic — the paper's number came from theirs.
- **The draft cost caps the win.** A stronger drafter (EAGLE-3) raises `α` but costs more compute per step; the net speedup is the accepted-tokens gain divided by the drafting overhead. Feature-level drafters win because they lift `α` a lot for little extra cost.

:::interview
"When does speculative decoding *not* help?"

Three cases, all from the math. **Low acceptance** — unpredictable/creative output means `α` is low, so few draft tokens survive and the overhead can exceed the gain. **Saturation** — at max batch the target is already compute-bound (17-37), so there is no spare compute to draft with, and speculation can regress. **Heavy drafter** — if the draft model is too expensive, its cost eats the accepted-token win. The win is largest at *low-to-medium load on predictable text with a cheap, accurate drafter*.
:::
