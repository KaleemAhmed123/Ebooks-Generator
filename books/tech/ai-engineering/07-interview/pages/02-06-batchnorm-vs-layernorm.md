## Batch norm vs layer norm — what does each normalise, and why do transformers use layer norm?

- **Normalisation** rescales activations to mean 0 / variance 1 (then learns a scale and shift) to stabilise and speed training.
- **Batch norm** normalises each feature **across the batch**. It needs a reasonably large, representative batch, and it behaves differently at train vs inference (running stats). It shines in CNNs.
- **Layer norm** normalises **across the features of a single example** — no dependence on other examples in the batch.
- Transformers use **layer norm** because: sequence lengths and batch composition vary, batch stats are noisy for variable-length text, and autoregressive inference runs effectively one token at a time where batch statistics are meaningless. Layer norm is per-token, so none of that matters.
- Modern LLMs often use **RMSNorm** (drops the mean-centring) — cheaper, equally effective.

:::interview
What's really being tested:

the *axis* each normalises over (batch vs feature) and the concrete reason layer norm fits variable-length, autoregressive sequence models.
:::
