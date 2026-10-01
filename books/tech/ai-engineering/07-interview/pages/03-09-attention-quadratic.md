## Why is attention O(n²) in sequence length, and why does that matter?

- Every token attends to every other token, so the score matrix `Q·Kᵀ` is **n × n** for a sequence of length n. Both the compute and the memory to hold it scale with **n²**.
- Double the context (n → 2n) and attention cost quadruples. This is *the* bottleneck for long context: a 100k-token prompt makes the attention matrix astronomically expensive.
- Two separate costs: **compute** (the matmuls) and **memory** (materialising the n×n matrix). FlashAttention attacks the memory cost; sparse/sliding-window attention attacks the compute cost by not attending to everything.
- The feed-forward layers are only O(n), so at long context attention dominates — which is why nearly every efficiency trick targets attention.

<svg viewBox="0 0 240 70" role="img" aria-label="Attention cost grows as the square of sequence length, far faster than linear" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M20 60 L220 60 M20 60 L20 8" stroke="#888"/>
  <path d="M20 58 Q120 50 220 12" stroke="#c0392b" fill="none" stroke-width="2"/><text x="150" y="24" fill="#c0392b">O(n²) attention</text>
  <path d="M20 58 L220 46" stroke="#24405e" fill="none" stroke-width="1.5" stroke-dasharray="3 3"/><text x="150" y="52" fill="#24405e">O(n) FFN</text>
  <text x="120" y="70" text-anchor="middle" fill="#6b6b6b">sequence length →</text>
</svg>

:::interview
What's really being tested:

that you locate the n² in the n×n score matrix, separate compute vs memory, and know which efficiency trick attacks which — the setup for FlashAttention and sparse attention.
:::
