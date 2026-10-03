## What is FlashAttention, and how is it faster without changing the math?

- FlashAttention computes **exact** attention — same output — but reorders the computation to avoid the memory bottleneck. It is an **IO-aware** algorithm, not an approximation.
- The naive path materialises the full n×n score matrix in slow GPU memory (HBM), writing and re-reading it. That memory traffic, not the arithmetic, is the bottleneck.
- FlashAttention **tiles** the computation and uses an **online softmax**: it streams blocks of K,V through fast on-chip SRAM, accumulating the result without ever writing the full matrix to HBM. Far fewer memory reads/writes → large speedups and O(n) memory instead of O(n²).
- Later versions (FlashAttention-2, -3) add better GPU utilisation and hardware-specific kernels.

:::note
The lesson generalises: on modern GPUs, moving data is the cost, not the math. Many "speedups" are really memory-traffic reductions.
:::

:::interview
What's really being tested:

that it's *exact* (not approximate), the bottleneck is HBM traffic, and the fix is tiling + online softmax to keep work in SRAM.
:::
