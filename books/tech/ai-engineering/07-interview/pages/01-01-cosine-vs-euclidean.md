# Foundations: Math & Classical ML

## Why do we compare embeddings with cosine similarity instead of Euclidean distance?

- An **embedding** is a vector of numbers that stands for a piece of text, image, or audio. Similar meaning → vectors that point the same way.
- **Cosine similarity** measures the *angle* between two vectors; it ignores their length. **Euclidean distance** measures straight-line gap, which grows with length.
- Embedding magnitude often tracks nuisance factors — document length, token frequency — not meaning. Cosine throws that away and keeps only *direction*, which is where meaning lives.
- On **unit-normalised** vectors (length forced to 1) the two agree: minimising Euclidean distance is the same as maximising cosine. Most vector stores normalise, so the choice is really "normalise, then either."

:::warn
"Cosine is always better" is the trap. If magnitude *is* signal (e.g. raw TF-IDF counts where a bigger count means more relevant), stripping it loses information. Know *why* your vectors have the magnitudes they do before discarding them.
:::

:::interview
What's really being tested:

whether you understand that direction encodes meaning and magnitude usually encodes nuisance — and that the "right" metric depends on how the vectors were produced, not on a rule of thumb.
:::
