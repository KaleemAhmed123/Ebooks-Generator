## Context length and its limits

- A model's **context length** is how many tokens it can attend to at once — its working memory. It has grown from 512 (BERT) to millions of tokens by 2026. But "supported" and "usable" are different numbers, and three walls explain why.

### The three walls

- **Compute — the quadratic cost.** Attention compares every token to every other, so cost scales with length **squared**. Double the context, quadruple the attention work. FlashAttention and sparse attention push this back but do not remove it.
- **Memory — the KV cache.** It grows *linearly* with length (page 07-17) and, at long context, dwarfs the model weights — capping how many users a GPU can serve.
- **Quality — position extrapolation.** A model trained on 8K positions has never seen position 500K; it degrades past its trained window unless positional encodings are explicitly stretched (RoPE scaling, page 07-07).

<svg viewBox="0 0 340 66" role="img" aria-label="Attention compute grows with the square of context length" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="30" y1="52" x2="320" y2="52" stroke="#1a1a1a"/><line x1="30" y1="52" x2="30" y2="8" stroke="#1a1a1a"/>
  <text x="20" y="14" fill="#6b6b6b" font-size="7">cost</text><text x="180" y="64" text-anchor="middle" fill="#6b6b6b">context length →</text>
  <path d="M32 50 Q220 48 300 12" fill="none" stroke="#c0392b" stroke-width="2"/><text x="250" y="30" fill="#c0392b" font-size="7">∝ length²</text>
</svg>

:::warn
Even inside the supported window, quality is uneven: models use facts at the **start and end** well and quietly ignore the **middle** ("lost in the middle", page 05-37). The practical rule for building systems (Booklet 4): a giant context window is **not** a database and **not** a substitute for retrieval. Put the few most relevant chunks in the prompt — near the top — rather than dumping everything and hoping the model finds it.
:::
