## Pre-norm vs post-norm transformers — why does placement matter?

- **Layer norm** can go either before the sublayer (**pre-LN**) or after the residual add (**post-LN**, the original).
- **Post-LN** (original transformer) puts normalisation on the residual path. It can give slightly better final quality but makes deep models **unstable to train** — it needs careful warmup and is prone to diverging.
- **Pre-LN** normalises the *input* to each sublayer, leaving a clean residual highway. Gradients flow much more stably, so you can train very deep models with less warmup. Nearly all modern large models use pre-LN (often RMSNorm).
- The lesson: a tiny architectural placement decision determines whether a 100-layer model trains at all.

:::mint
```text
post-LN:  x → sublayer → add → LayerNorm        (original, less stable deep)
pre-LN:   x → LayerNorm → sublayer → add         (stable, modern default)
```
:::

:::interview
What's really being tested:

that pre-LN keeps the residual path clean for stable deep training, which is why it replaced the original post-LN design.
:::
