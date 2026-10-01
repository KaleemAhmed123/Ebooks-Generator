## Why do transformers need positional encodings at all?

- Attention is **permutation-invariant**: it computes weighted sums over a *set* of tokens with no built-in notion of order. "dog bites man" and "man bites dog" would look identical to raw attention.
- So we inject position explicitly. Three families:
  - **Sinusoidal** (original): fixed sine/cosine patterns added to embeddings. No parameters, extrapolates somewhat.
  - **Learned absolute** (BERT/GPT-2): a trainable vector per position. Simple, but caps at the trained length.
  - **Rotary (RoPE)**: rotates Q and K by an angle proportional to position, so attention depends on **relative** distance. Now dominant in modern LLMs.
- The trend is toward **relative** position (RoPE, ALiBi) because relative distance is what language actually depends on, and it extends to longer contexts better. [VERIFY: RoPE prevalence current as of 2026.]

:::interview
What's really being tested:

that attention is order-blind by construction, and that you know the sinusoidal → learned → rotary progression and *why* relative position won.
:::
