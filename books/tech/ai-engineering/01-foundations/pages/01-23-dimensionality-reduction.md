## Dimensionality reduction

- Real data has many features — thousands of pixels, hundreds of embedding dimensions. Most of them are redundant or noise.
- **Dimensionality reduction** squeezes data into fewer numbers while keeping what matters. It speeds up models, cuts memory, and makes data visible.

### The curse it solves

- In high dimensions, everything is far from everything else, and "nearest neighbour" stops meaning much. This is the **curse of dimensionality**. Fewer, better dimensions restore signal.

### The three you should know

| Method | Keeps | Best for |
|---|---|---|
| **PCA** | directions of greatest variance | fast linear compression, preprocessing |
| **t-SNE** | local neighbourhoods | plotting clusters (visualization only) |
| **UMAP** | local *and* some global structure | visualization, faster than t-SNE |

- **PCA (Principal Component Analysis)** is the workhorse: it finds the eigenvectors of the data's covariance (from the eigenvector page) and keeps the top few — the axes along which the data spreads most.

:::warn
t-SNE and UMAP are for *looking*, not for feeding downstream models. They warp distances to make clusters pop, so the gaps between clusters in a t-SNE plot are not meaningful. Never read cluster sizes or between-cluster distances off one.
:::
