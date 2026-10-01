## Top-k vs top-p (nucleus) sampling — what's the difference and why prefer one?

- Both **truncate** the distribution before sampling, to cut off the long tail of absurd tokens that temperature alone would still occasionally pick.
- **Top-k:** keep only the k highest-probability tokens, renormalise, sample. Problem: a fixed k is wrong in two directions — when the model is confident, k is too many (lets in junk); when it's uncertain, k is too few (cuts good options).
- **Top-p (nucleus):** keep the smallest set of tokens whose cumulative probability ≥ p (e.g. 0.9), then sample. The set size **adapts** — small when the model is sure, large when it's unsure. Usually the better default.
- They compose: temperature (shape) + top-p (truncate tail) is a common combo. Min-p is a newer variant that thresholds relative to the top token.

:::interview
What's really being tested:

that top-p adapts the candidate set to the model's confidence while top-k is fixed-size, and that truncation exists to kill the bad tail temperature leaves in.
:::
