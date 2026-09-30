## Bag of words

- The oldest trick that still works: **bag of words (BoW)** turns a document into a fixed-length vector by *counting* each vocabulary word. Order is thrown away — hence "bag."
- Vector length = vocabulary size. Position `i` holds the count of word `i`. A 20,000-word vocabulary gives every document a 20,000-long vector, mostly zeros.

:::mint
```python
def bag_of_words(docs, vocab):          # vocab: {word: index}
    m = [[0] * len(vocab) for _ in docs]
    for i, doc in enumerate(docs):
        for tok in doc:
            if tok in vocab:
                m[i][vocab[tok]] += 1
    return m

docs = [["cat","sat","on","mat"], ["cat","cat","ran"]]
# vocab = {cat:0, sat:1, on:2, mat:3, ran:4}
# -> [[1,1,1,1,0], [2,0,0,0,1]]   doc 2 has "cat" twice
```
:::

### Why it survives

- **Fast and interpretable.** You can read a trained classifier's weights and see which words push toward "spam." You cannot do that with a 768-number embedding.
- Still the first thing to try on narrow classification — spam, topic, log anomaly — where **word presence** is the whole signal.

:::warn
BoW discards order, so *"dog bites man"* and *"man bites dog"* get identical vectors. It also cannot tell that *"good"* and *"great"* are related — each word is its own isolated column. These two blind spots (no order, no similarity) are exactly what embeddings and attention were invented to fix.
:::
