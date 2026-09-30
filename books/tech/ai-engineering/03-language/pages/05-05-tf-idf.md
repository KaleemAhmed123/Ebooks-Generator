## TF-IDF

- Bag of words treats *"the"* and *"pneumonia"* as equally important. **TF-IDF** fixes that by reweighting each count by how rare the word is across the corpus.
- The name is two parts multiplied: **term frequency** (how often the word appears in *this* document) times **inverse document frequency** (how rare it is across *all* documents).

:::mint
```
TF-IDF(w, d) = TF(w, d) · IDF(w)
             = count(w in d) / |d|  ·  log( N / df(w) )
```
`|d|` = words in document d · `N` = total documents ·
`df(w)` = documents containing w
:::

### Reading the formula

- A word in **every** document: `df ≈ N`, so `log(N/df) ≈ log(1) = 0`. It gets crushed to near zero. That kills *"the", "is", "of"* automatically — no stopword list needed.
- A word **frequent in one document, rare overall**: high TF, high IDF, high score. That is the signal — the words that make a document distinctive.
- The `log` keeps ubiquitous-word weights bounded instead of exploding.

<svg viewBox="0 0 360 74" role="img" aria-label="Common words get low weight, rare distinctive words get high weight" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="30" y1="58" x2="330" y2="58" stroke="#1a1a1a"/><text x="180" y="70" text-anchor="middle" fill="#6b6b6b">rarer across corpus  →</text>
  <text x="20" y="20" fill="#6b6b6b">weight</text>
  <rect x="45" y="50" width="26" height="8" fill="#c9d6e5"/><text x="58" y="46" text-anchor="middle">the</text>
  <rect x="150" y="34" width="26" height="24" fill="#6a9bd0"/><text x="163" y="30" text-anchor="middle">cat</text>
  <rect x="270" y="16" width="26" height="42" fill="#24405e"/><text x="283" y="12" text-anchor="middle">pneumonia</text>
</svg>

:::note
TF-IDF is still a strong 2026 baseline. On well-defined classification and keyword search it is fast, needs no GPU, and often ties a heavy embedding model. Reach for embeddings only when *meaning* beyond exact-word-match matters. Never assume the neural option wins — measure it against TF-IDF first.
:::
