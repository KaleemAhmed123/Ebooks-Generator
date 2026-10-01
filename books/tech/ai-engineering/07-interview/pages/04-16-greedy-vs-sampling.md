## Greedy vs sampling decoding — and what does temperature do?

- At each step the model outputs a probability over the next token. **Decoding** is how you pick one.
- **Greedy:** always take the highest-probability token. Deterministic, but repetitive and dull, and it can get stuck in loops. Fine for short, closed tasks (classification, extraction).
- **Sampling:** draw from the distribution, so outputs vary. Needed for anything creative or open-ended.
- **Temperature** reshapes the distribution before sampling:
  - **T < 1** sharpens it (more confident, closer to greedy).
  - **T = 1** uses the raw distribution.
  - **T > 1** flattens it (more random, more diverse, more errors).
  - **T → 0** approaches greedy.

:::mint
```text
p'ᵢ = softmax(logitsᵢ / T)      # T<1 sharpens, T>1 flattens
```
:::

:::interview
What's really being tested:

that temperature scales logits before softmax (not after), the sharpen/flatten effect, and matching greedy vs sampling to the task type.
:::
