## Tensors, broadcasting, and GPU memory layout

- **Tensor** — a multi-dimensional array with a fixed dtype. Rank 0 = scalar, rank 1 = vector, rank 2 = matrix, rank N = tensor. The **shape** is a tuple of sizes per axis; the **strides** tell the kernel how many elements to skip per axis step
- **Contiguity** — a tensor whose elements are stored consecutively in memory along its last axis. Transpose swaps strides without moving data, making the tensor **non-contiguous**. Some operations require `tensor.contiguous()` before they run
- **Broadcasting** — NumPy/PyTorch's rule for operating on tensors of different shapes by implicitly expanding size-1 dimensions. Align shapes from the right; a dimension of 1 broadcasts to match its counterpart

### Canonical tensor shapes in AI

<svg viewBox="0 0 460 80" role="img" aria-label="Four canonical tensor shapes: vision BCHW, NLP BTD, attention BHTD, linear weight out_in" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="8" width="104" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="56" y="26" text-anchor="middle" font-weight="bold">Vision</text>
  <text x="56" y="42" text-anchor="middle">(B, C, H, W)</text>
  <text x="56" y="58" text-anchor="middle" fill="#6b6b6b">32,3,224,224</text>
  <rect x="118" y="8" width="104" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="170" y="26" text-anchor="middle" font-weight="bold">NLP</text>
  <text x="170" y="42" text-anchor="middle">(B, T, D)</text>
  <text x="170" y="58" text-anchor="middle" fill="#6b6b6b">16, 128, 768</text>
  <rect x="232" y="8" width="104" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="284" y="26" text-anchor="middle" font-weight="bold">Attention</text>
  <text x="284" y="42" text-anchor="middle">(B, H, T, D)</text>
  <text x="284" y="58" text-anchor="middle" fill="#6b6b6b">16, 12, 128, 64</text>
  <rect x="346" y="8" width="110" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="401" y="26" text-anchor="middle" font-weight="bold">Linear weight</text>
  <text x="401" y="42" text-anchor="middle">(out, in)</text>
  <text x="401" y="58" text-anchor="middle" fill="#6b6b6b">768, 3072</text>
</svg>

### Einsum — one notation for all tensor contractions

:::mint
```python
import torch
# matrix multiply:       'ik,kj->ij'
# batch matmul:          'bij,bjk->bik'
# attention scores:      'bhtd,bhsd->bhts'
# dot product:           'i,i->'
scores = torch.einsum('bhtd,bhsd->bhts', Q, K)
```
:::

Axes present in inputs but absent from the output are **summed** (contracted). This is the general rule; all other tensor operations are special cases.

:::warn
PyTorch uses **channels-first** layout (BCHW) by default; TensorFlow defaults to **channels-last** (BHWC). Loading a PyTorch model into TensorFlow (or vice versa) without a transpose silently produces garbage output — the computation runs, produces no error, and yields incorrect results. Always verify layout when crossing framework boundaries.
:::
