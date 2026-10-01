## Your training loss suddenly becomes NaN. What's happening and how do you track it down?

- **NaN** (not-a-number) means an operation produced an undefined value — usually `∞ − ∞`, `0/0`, `log(0)`, or `sqrt(negative)`. Once one appears it contaminates every downstream weight.
- Most common causes:
  - **Learning rate too high** → weights explode → `inf` → NaN. First thing to lower.
  - **`log(0)` in the loss** → clamp probabilities, or use the numerically stable combined op (log-softmax, BCE-with-logits).
  - **Exploding gradients** → add gradient clipping.
  - **Bad input data** → an actual NaN/inf in a feature, or a divide-by-zero in a custom layer.
  - **Mixed precision overflow** → fp16 range is small; use loss scaling or bf16.
- **Track it:** turn on anomaly detection, log gradient norms, and bisect — lower LR first; if that fixes it, it was explosion.

:::mint
```text
unstable:  log(softmax(x))         # softmax can underflow to 0
stable:    log_softmax(x)          # fused, uses log-sum-exp trick
```
:::

:::interview
What's really being tested:

a systematic debugging order (LR → loss numerics → gradients → data → precision) rather than one guess, plus the log-sum-exp stability trick.
:::
