## What is the "residual stream," and why is it a useful way to think about a transformer?

- Because every sublayer is `x + f(x)`, each token carries a running vector — the **residual stream** — that every attention and FFN layer *reads from and writes back to* by addition.
- Think of it as a shared **communication bus** per token position: layers don't replace the representation, they incrementally add information to it. The final stream is decoded into the next-token distribution.
- This framing explains a lot: layers can specialise and contribute additively; information written early can persist to the end; and interpretability work traces "features" as directions written into this stream.
- Practically, it's why residual connections are structural, not optional — remove them and there's no stream for layers to communicate through, and training collapses.

:::interview
What's really being tested:

the mental model of a transformer as layers additively reading/writing a shared per-token vector — a sign you understand the architecture beyond the formula.
:::
