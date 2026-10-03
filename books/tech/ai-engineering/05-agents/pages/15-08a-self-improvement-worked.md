## Self-improvement: a worked loop

- Trace an AlphaEvolve-style loop (15-06) on a concrete task — optimizing a sorting-related routine — so the propose→evaluate→keep engine (15-04) is unambiguous.

:::mint
```text
Goal: make this function faster. Evaluator: run it, measure ms (lower=better).
Baseline: 100ms.

gen 1  LLM proposes 4 variants of the code:
   v1: swap loop order        → eval: 92ms  ✓ keep
   v2: add a cache            → eval: 105ms ✗ discard (slower)
   v3: early-exit condition   → eval: 88ms  ✓ keep (new best)
   v4: rewrite as vectorized  → eval: FAILS tests ✗ discard

gen 2  LLM mutates survivors (v1, v3) → 81ms, then 79ms ✓
gen N  plateaus ~74ms → stop. 100ms → 74ms, all verified correct.
```
:::

- **Read the engine:** each generation the LLM *proposes* mutations, the *evaluator runs each* and measures (15-10), winners are *kept* and mutated further. Crucially v4 was faster-looking but **failed the tests** — caught and discarded. Without that correctness check, the loop "optimizes" into a wrong answer.
- **Why it plateaus:** early gens find big wins, later ones diminishing gains — the bounded ceiling (15-09), because the *improver* (LLM ideas + fixed evaluator) does not itself get more capable.
- **What makes it work:** a **correct, fast evaluator** and **kept diversity** (mutate several survivors, not just the best, to escape local optima — 14-17).

:::interview
"Walk through how a self-improving system actually improves code."

Propose-evaluate-keep in a loop with a ground-truth evaluator. Each generation the LLM proposes several code mutations; an executable evaluator runs each and measures quality (speed) *and* correctness (tests); winners are kept and mutated further, losers discarded. A faster-but-wrong variant gets caught by the tests and dropped — without that check the loop would optimize into a wrong answer. It finds big wins early, plateaus as gains shrink (bounded improvement, capped by the search space and the base model), and needs two things: a trustworthy evaluator and kept diversity to escape local optima. The magic is disciplined search, not bootstrapping intelligence.
:::
