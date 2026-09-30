# Module 1 — Math Foundations

## Vectors, spaces, and the geometric view of AI

- A **vector** — a list of numbers that encodes a point or direction in n-dimensional space. `[3, 2]` is 3 units right, 2 units up. In AI every object gets turned into a vector: a word becomes 768 numbers, a user becomes a vector of preferences, an image becomes millions of pixel values
- **Vector space** — a set of vectors where addition and scalar multiplication are defined and well-behaved. All of linear algebra lives in a vector space
- The geometry of similarity: two vectors pointing in the same direction are *similar*. Perpendicular vectors are *unrelated*. Opposite vectors are *dissimilar*. This geometric fact powers every embedding search in existence

### The dot product as similarity

<svg viewBox="0 0 460 110" role="img" aria-label="Three dot-product cases: same direction positive, perpendicular zero, opposite direction negative" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="74" y="14" text-anchor="middle" font-weight="bold">a · b &gt; 0</text>
  <line x1="50" y1="80" x2="96" y2="44" stroke="#24405e" stroke-width="2" marker-end="url(#blu)"/>
  <line x1="50" y1="80" x2="98" y2="54" stroke="#1a1a1a" stroke-width="2" marker-end="url(#blk)"/>
  <text x="74" y="100" text-anchor="middle" fill="#6b6b6b">similar</text>
  <text x="230" y="14" text-anchor="middle" font-weight="bold">a · b = 0</text>
  <line x1="206" y1="80" x2="252" y2="80" stroke="#24405e" stroke-width="2" marker-end="url(#blu)"/>
  <line x1="206" y1="80" x2="206" y2="34" stroke="#1a1a1a" stroke-width="2" marker-end="url(#blk)"/>
  <text x="230" y="100" text-anchor="middle" fill="#6b6b6b">unrelated</text>
  <text x="386" y="14" text-anchor="middle" font-weight="bold">a · b &lt; 0</text>
  <line x1="386" y1="60" x2="430" y2="44" stroke="#24405e" stroke-width="2" marker-end="url(#blu)"/>
  <line x1="386" y1="60" x2="342" y2="76" stroke="#1a1a1a" stroke-width="2" marker-end="url(#blk)"/>
  <text x="386" y="100" text-anchor="middle" fill="#6b6b6b">dissimilar</text>
  <defs>
    <marker id="blu" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker>
    <marker id="blk" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker>
  </defs>
</svg>

:::mint
```
a · b = a₁b₁ + a₂b₂ + … + aₙbₙ

cosine similarity = (a · b) / (|a| × |b|)   # range [−1, 1]
```
:::
