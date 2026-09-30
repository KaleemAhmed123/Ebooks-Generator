# AI Engineering: From Scratch

## Linear Algebra: Embedded State

Vectors represent state; matrices represent transformation. Neural networks are fundamentally series of matrix transformations interleaved with non-linear scalar functions.

### Vectors as Embedded State

A vector is an ordered coordinate array in an $n$-dimensional space. In machine learning, a vector uniquely defines a continuous representation of discrete data (an embedding). A 768-dimensional vector representing a word is a point in a 768-dimensional space.

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <!-- Axes -->
  <line x1="50" y1="150" x2="350" y2="150" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="50" y1="150" x2="50" y2="20" stroke="black" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Vector -->
  <line x1="50" y1="150" x2="250" y2="50" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow)"/>
  <text x="260" y="45" font-family="monospace" font-size="14">[0.82, 0.45]</text>
  <text x="130" y="90" font-family="sans-serif" font-size="14" fill="#2563eb" transform="rotate(-26.5 130 90)">Embedding Vector</text>
</svg>

### Similarity and the Dot Product

The dot product measures the projection of one vector onto another. It is the core mathematical operation underpinning attention mechanisms (Query-Key projection) and Retrieval-Augmented Generation (RAG) vector searches.

$$ \mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos(\theta) $$

When vectors are normalized ($\|\mathbf{a}\| = 1$), the dot product strictly equals the cosine similarity. If $\mathbf{a} \cdot \mathbf{b} = 1$, the vectors are identical. If $\mathbf{a} \cdot \mathbf{b} = 0$, the vectors are orthogonal and semantically unrelated.
