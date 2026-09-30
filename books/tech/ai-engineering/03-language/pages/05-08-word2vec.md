## word2vec

- **word2vec** (Mikolov et al., Google, 2013) is the method that made embeddings practical. It learns word vectors by training a tiny network on one fake task, then throwing the task away and keeping the vectors.
- The fake task comes in two shapes:
  - **Skip-gram** — given the center word, predict its neighbors. `cat → (the, sat, on)`.
  - **CBOW** — given the neighbors, predict the center. `(the, sat, on) → cat`.
- Skip-gram is slower but handles rare words better, so it became the default.

### The trick that made it fast

- The network has one hidden layer and no nonlinearity. After training you discard the output layer; **the hidden weights are the embeddings.**
- A softmax over 100,000 words per step is too slow. **Negative sampling** replaces it: for each real (center, context) pair, sample a handful of random non-neighbor words and train a yes/no classifier — "did these two really appear together?"

:::mint
```python
def skipgram_pairs(doc, window=2):
    pairs = []
    for i, center in enumerate(doc):
        for j in range(max(0, i-window), min(len(doc), i+window+1)):
            if i != j:
                pairs.append((center, doc[j]))   # (center, context)
    return pairs
# train so dot(W[center], W_ctx[context]) is high for real pairs,
# low for sampled negatives
```
:::

:::warn
word2vec gives each word **one fixed vector**, forever. *"bank"* (river) and *"bank"* (money) collapse into a single averaged point that fits neither. This is the **static embedding** limit. Fixing it — a different vector per context — is exactly what the transformer's attention will do later in this booklet.
:::
