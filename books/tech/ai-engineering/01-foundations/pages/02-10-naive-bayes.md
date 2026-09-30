## Naive Bayes

- **Naive Bayes** applies Bayes' theorem (Module 1) to classify, with one bold shortcut: it assumes every feature is independent of the others.
- That assumption is almost always false — "free" and "money" co-occur in spam — hence "naive". Yet it works remarkably well, especially for text.

### Why the wrong assumption still wins

- Independence lets it multiply per-feature probabilities instead of modelling their interactions. That makes it blazing fast and able to learn from very little data.
- For classification you only need the *ranking* of classes to be right, not the exact probabilities — and the naive assumption usually preserves the ranking even when the numbers are off.

:::mint
```python
# spam score: combine independent word probabilities (in log space)
import numpy as np
p_spam = np.log(0.4)                       # prior: 40% of mail is spam
for word in ["free", "money", "now"]:
    p_spam += np.log(p_word_given_spam[word])   # add, don't multiply → stable
```
:::

:::note
Naive Bayes was the original spam filter and is still a strong, near-instant baseline for text classification. Reach for it first on a new text task: it trains in one pass and tells you quickly whether the problem is even learnable.
:::
