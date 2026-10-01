## Why does "bank" get one vector in word2vec but different vectors in BERT?

- **Static embeddings** (word2vec/GloVe) assign each word one vector, fixed at training time. "bank" is the average of all its senses — river and finance blended into one point.
- **Contextual embeddings** (BERT, any transformer) compute a token's vector **from the whole sentence** via attention. "river bank" and "savings bank" produce different "bank" vectors because the surrounding tokens shaped them.
- This is the core upgrade transformers brought to NLP: representations that **disambiguate by context**, enabling far better performance on meaning-sensitive tasks.
- Consequence for engineering: you can't precompute a static lookup table of meaning; the embedding depends on the input, which is why modern retrieval runs text through an encoder at index time.

:::interview
What's really being tested:

the static-vs-contextual distinction and that attention is the mechanism that makes a word's vector depend on its sentence.
:::
