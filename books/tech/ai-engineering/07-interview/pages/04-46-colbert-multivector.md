## What is late interaction / multi-vector retrieval (ColBERT), and when is it worth it?

- A standard bi-encoder squashes a whole chunk into **one** vector — fast, but it loses token-level detail, so fine-grained matches blur.
- **ColBERT (late interaction)** keeps **one vector per token** for both query and document. At scoring time it computes, for each query token, its best-matching document token (MaxSim), then sums — capturing token-level relevance a single vector can't.
- "Late" = the heavy query-document interaction happens at scoring, not baked into one embedding, so you keep more signal than a bi-encoder while staying far cheaper than a full cross-encoder.
- Cost: **storage blows up** (many vectors per chunk) and indexing is more complex. Worth it when single-vector retrieval plateaus on precision and a cross-encoder re-ranker is too slow for your scale. ColPali applies the same idea to document images. [VERIFY: ColBERT/ColPali current.]

:::interview
What's really being tested: that multi-vector retrieval keeps token-level detail (MaxSim late interaction) for better precision, at a real storage cost — a middle point between bi- and cross-encoders.
:::
