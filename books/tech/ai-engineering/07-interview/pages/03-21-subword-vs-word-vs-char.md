## Subword vs word vs character tokenization — what's the tradeoff?

- **Word-level:** one token per word. Short sequences, but a huge vocabulary, and any unseen word is an **unknown token** — brittle for typos, new words, morphology.
- **Character-level:** tiny vocabulary, no unknowns ever, but sequences become very long → more compute and a harder time modelling long-range meaning.
- **Subword (BPE, WordPiece, Unigram):** the compromise everyone uses. Frequent words stay whole, rare words split into pieces. Bounded vocabulary, no unknowns (down to bytes), reasonable sequence length.
- Subword is why models handle misspellings, new slang, and morphologically rich languages gracefully — they fall back to smaller pieces instead of failing.

<svg viewBox="0 0 280 54" role="img" aria-label="unbelievable splits into un, believ, able under subword tokenization" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="6" y="16" fill="#6b6b6b">word:</text><rect x="46" y="8" width="90" height="12" fill="#e8f4fd" stroke="#24405e"/><text x="91" y="17" text-anchor="middle">unbelievable</text>
  <text x="6" y="36" fill="#6b6b6b">subword:</text><rect x="60" y="28" width="22" height="12" fill="#e8f4fd" stroke="#24405e"/><text x="71" y="37" text-anchor="middle">un</text><rect x="84" y="28" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><text x="104" y="37" text-anchor="middle">believ</text><rect x="126" y="28" width="30" height="12" fill="#e8f4fd" stroke="#24405e"/><text x="141" y="37" text-anchor="middle">able</text>
</svg>

:::interview
What's really being tested:

that you weigh vocabulary size vs sequence length vs unknown-token robustness, and know subword wins by getting the best of both ends.
:::
