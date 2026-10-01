## What is the curse of dimensionality, and why should an AI engineer care?

- In high dimensions, volume grows so fast that data becomes **sparse**: points you'd call "nearby" in 3-D are all roughly equidistant in 1000-D. Distance loses its discriminating power.
- Consequence for **retrieval**: raw nearest-neighbour search degrades; the ratio between nearest and farthest neighbour approaches 1, so "top-k closest" means less. This is why we use learned embeddings (which concentrate signal into fewer effective dimensions) and ANN indexes, not brute-force distance on raw features.
- Consequence for **models**: the data needed to cover a space grows exponentially with dimensions, so high-dimensional models overfit without heavy regularisation or dimensionality reduction.
- The escape is that real data lives on a low-dimensional **manifold** (a curved surface) inside the high-dimensional space. Embeddings and PCA exploit exactly that.

:::interview
What's really being tested:

whether you connect an abstract geometry fact to concrete failures — why kNN rots, why you need embeddings over raw features, why more features is not always better.
:::
