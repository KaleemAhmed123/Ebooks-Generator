## How do you know your learning rate is too high or too low?

- The **learning rate** scales each gradient step — the single most important hyperparameter in deep learning.
- **Too high:** loss spikes, oscillates, or diverges to NaN. The step overshoots the minimum and bounces up the far wall.
- **Too low:** loss falls painfully slowly or plateaus far above where it should; training wastes compute and can stall in a poor region.
- **Find it fast** with an LR range test: ramp the rate up over a few hundred steps and plot loss vs rate; pick the rate roughly an order of magnitude below where loss starts climbing.
- In practice you don't keep it fixed: **warmup** (ramp up to avoid early instability) then **decay** (cosine or linear down) is standard for transformers.

:::mint
```text
too high: loss ─╱╲╱╲ (diverges / NaN)
too low:  loss ─────  (barely moves)
good:     loss ╲____  (fast drop, then settle)
```
:::

:::interview
What's really being tested:

that you read loss-curve *shape* to diagnose the rate, and know warmup-then-decay is the default schedule, not a constant.
:::
