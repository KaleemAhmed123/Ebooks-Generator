## What is causal masking, and why does a text generator need it?

- A **decoder** generates one token at a time, left to right. During training we feed the whole sentence at once for efficiency — but each position must only use tokens **before** it, never after.
- **Causal masking** enforces this: before softmax, set the attention scores for all future positions to −∞, so their weights become 0. Each token attends only to itself and the past.
- Without it, the model would "see" the next token during training and learn nothing useful — it would cheat, then fail completely at inference when the future genuinely isn't available.
- This is also why training is parallel but generation is sequential: at train time all targets exist (masked), at inference each token must be produced before the next can attend to it.

:::mint
```text
scores before softmax:
  [ s11  −∞   −∞ ]
  [ s21  s22  −∞ ]      # upper triangle masked out
  [ s31  s32  s33]
```
:::

:::interview
What's really being tested:

that masking prevents information leakage from the future, and the insight that it's why training parallelises but decoding can't.
:::
