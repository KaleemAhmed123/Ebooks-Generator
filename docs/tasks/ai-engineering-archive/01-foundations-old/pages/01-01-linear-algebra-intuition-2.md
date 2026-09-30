### Linear independence and what it means for AI

- **Linearly independent** — no vector in a set can be written as a combination of the others. Independent vectors span the maximum possible space
- If two feature columns are perfectly correlated (linearly dependent), they contribute zero new information. The weight matrix becomes **rank-deficient** — no unique solution exists for the weights, and training becomes numerically unstable
- **Rank** — the number of linearly independent columns (= rows) in a matrix. Full rank = model is well-conditioned

:::note
Every attention score in a transformer is a dot product. Every similarity search in a vector database is a dot product. Every recommendation score in a two-tower model is a dot product. The dot product is the central operation of modern AI.
:::

### Why matrices are transformations, not just grids

Multiplying a matrix by a vector rotates, scales, shears, or projects that vector. Neural network weights *are* these transformations — each layer maps its input space to a new space where the problem is more linearly separable.
