## Feature engineering — the highest-leverage activity in classical ML

- **Feature engineering** — transforming raw data into representations that reveal patterns more clearly. The algorithm only sees numbers; the quality of those numbers determines the ceiling on performance
- **Standardisation** `x = (x − μ) / σ` — maps to mean=0, std=1. Required for any distance-based algorithm (KNN, SVM, PCA) where the scale of one feature would otherwise dominate
- **Log transform** — compresses right-skewed distributions (income, word counts). Turns a feature ranging 1–10,000,000 into one ranging 0–7. Makes multiplicative relationships additive

### Categorical encoding and the data-leakage trap

<svg viewBox="0 0 460 80" role="img" aria-label="Three encoding methods: one-hot for low cardinality, label encoding for trees only, target encoding risk of data leakage" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="138" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="73" y="26" text-anchor="middle" font-weight="bold">One-hot</text>
  <text x="73" y="40" text-anchor="middle" fill="#6b6b6b">red → [1,0,0]</text>
  <text x="73" y="52" text-anchor="middle" fill="#6b6b6b">blue → [0,1,0]</text>
  <text x="73" y="64" text-anchor="middle" fill="#6b6b6b">Low cardinality ✓</text>
  <rect x="162" y="8" width="138" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="231" y="26" text-anchor="middle" font-weight="bold">Label encode</text>
  <text x="231" y="40" text-anchor="middle" fill="#6b6b6b">red → 0, blue → 1</text>
  <text x="231" y="52" text-anchor="middle" fill="#6b6b6b">Trees only; implies</text>
  <text x="231" y="64" text-anchor="middle" fill="#6b6b6b">false ordering</text>
  <rect x="320" y="8" width="136" height="64" rx="3" fill="#fff0f0" stroke="#c04040"/>
  <text x="388" y="26" text-anchor="middle" font-weight="bold" fill="#c04040">Target encode</text>
  <text x="388" y="40" text-anchor="middle" fill="#6b6b6b">city → mean(price)</text>
  <text x="388" y="52" text-anchor="middle" fill="#c04040">Leakage risk!</text>
  <text x="388" y="64" text-anchor="middle" fill="#6b6b6b">Compute on train only</text>
</svg>

### TF-IDF — weighting words by distinctiveness

:::mint
```
TF(word, doc) = count(word in doc) / total_words_in_doc
IDF(word)     = log(N_docs / docs_containing_word)
TF-IDF        = TF × IDF
```
:::

Common words ("the", "a") have high TF but low IDF — near-zero weight. Rare, distinctive words have high TF-IDF. This de-noises count vectors without removing information.
