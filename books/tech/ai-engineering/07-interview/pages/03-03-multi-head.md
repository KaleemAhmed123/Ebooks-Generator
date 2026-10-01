## Why multi-head attention instead of one big attention?

- **Multi-head attention** splits the model dimension into several smaller heads, runs attention independently in each, then concatenates and projects the results.
- One big head can only form **one** weighted average per token — one notion of relevance. Multiple heads let the model attend to different things at once: one head tracks syntax, another co-reference, another nearby tokens.
- It's cheap: splitting `d` into `h` heads of size `d/h` keeps total compute roughly the same as one full-width head. You get diversity for free.
- Heads are not hand-assigned roles — they specialise during training, and many are redundant (which is what later head-pruning and GQA exploit).

:::warn
"Each head learns a clean linguistic role" is overstated. Probing shows some interpretable heads, but many are diffuse or redundant. Don't claim crisp role assignment in an interview.
:::

:::interview
What's really being tested:

that multiple heads = multiple simultaneous relevance patterns at ~no extra cost, plus the honesty that head roles are emergent and messy.
:::
