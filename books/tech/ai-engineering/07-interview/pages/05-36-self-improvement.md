## Can agents self-improve, and what's the fundamental ceiling?

- There's real work on agents that improve themselves: **STaR** (train on the model's own correct reasoning), **AlphaEvolve**-style evolutionary search over programs, and systems that propose, test, and keep improvements. The common engine is **propose → evaluate → keep what's better**. [VERIFY: frontier specifics.]
- The hard limit is the **verification bottleneck**: self-improvement only works as far as you can **reliably evaluate** a candidate. Where correctness is checkable (code tests, math proofs, game score), the loop can run and genuinely improve. Where it isn't (open-ended quality, novel judgment), the model can only optimise a proxy and will **hack it** or drift.
- So "recursive self-improvement" is **bounded by verification**, not by cleverness — the evaluator is the ceiling.
- Practical read for a senior: build self-improvement loops **only around a trustworthy verifier**; without one, you get confident degradation, not progress.

:::interview
What's really being tested: that self-improvement is a propose-evaluate-keep loop gated by verification — strong where correctness is checkable, bounded (and gameable) where it isn't.
:::
