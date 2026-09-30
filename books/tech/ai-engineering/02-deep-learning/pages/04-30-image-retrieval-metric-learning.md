## Image retrieval and metric learning

- **Image retrieval** answers "find me more like this". Given a query image, return the most similar images from a large collection — reverse image search, product lookup, face matching.
- The engine is an **embedding**: turn each image into a vector so that similar images sit close together. Search then becomes finding nearest vectors, which is fast even over billions of items.
- **Metric learning** trains the encoder to make that space meaningful. The classic tool is the **triplet loss**: show an anchor, a positive (same identity), and a negative (different), and train so the anchor sits closer to the positive than the negative.

<svg viewBox="0 0 320 100" role="img" aria-label="A triplet: an anchor point pulled closer to a positive point of the same class and pushed away from a negative point" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <circle cx="150" cy="50" r="6" fill="#24405e"/><text x="150" y="40" text-anchor="middle">anchor</text>
  <circle cx="210" cy="45" r="6" fill="#1a3a2a"/><text x="228" y="48">positive</text>
  <circle cx="70" cy="70" r="6" fill="#c0392b"/><text x="30" y="74">negative</text>
  <path d="M156 49 L204 46" stroke="#1a3a2a" marker-end="url(#mr)"/><text x="180" y="35" fill="#1a3a2a">pull closer</text>
  <path d="M144 54 L78 68" stroke="#c0392b" stroke-dasharray="3 2" marker-end="url(#mn)"/><text x="95" y="92" fill="#c0392b">push apart</text>
  <defs><marker id="mr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker><marker id="mn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::note
This is the same shared-space idea as CLIP, aimed at one modality. Store every item's embedding once in a vector index (Booklet 4's retrieval covers the index side), and retrieval scales to web size. Hard-negative mining — training on the *most confusing* wrong matches — is what sharpens the space.
:::
