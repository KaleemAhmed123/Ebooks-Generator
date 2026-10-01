## How are static word embeddings like word2vec trained, and what's their limitation?

- **word2vec** learns a vector per word from the **distributional hypothesis**: words in similar contexts have similar meaning. It trains a shallow net to predict a word from its neighbours (CBOW) or neighbours from the word (skip-gram).
- **GloVe** reaches similar vectors by factorising a global word-co-occurrence matrix. Both give the famous arithmetic: `king − man + woman ≈ queen`.
- The hard limitation: they are **static** — one fixed vector per word, regardless of context. "bank" (river) and "bank" (money) collapse into a single averaged vector.
- That's exactly what contextual models (BERT, GPT) fixed: the embedding is computed *from the sentence*, so the same word gets different vectors in different contexts.

:::interview
What's really being tested:

the distributional hypothesis as the training signal, and the one-vector-per-word limitation that motivated contextual embeddings.
:::
