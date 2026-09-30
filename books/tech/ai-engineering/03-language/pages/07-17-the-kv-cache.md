## The KV cache

- Generating token 100 means running attention over tokens 1–99. Token 101 runs it over 1–100. The keys and values for tokens 1–99 are **identical** both times — recomputing them is pure waste.
- The **KV cache** stores every token's key and value vectors as they are computed, so each new step only computes K and V for the *one* new token and reads the rest from cache.

<svg viewBox="0 0 360 74" role="img" aria-label="At each generation step only the new token's key and value are computed, the rest are read from cache" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="20" y="14" fill="#6b6b6b">step 4: generate token 4</text>
  <g fill="#6a9bd0"><rect x="20" y="26" width="34" height="20" rx="2"/><rect x="58" y="26" width="34" height="20" rx="2"/><rect x="96" y="26" width="34" height="20" rx="2"/></g>
  <text x="75" y="60" text-anchor="middle" font-size="7" fill="#6a9bd0">cached K,V (reused)</text>
  <rect x="134" y="26" width="34" height="20" rx="2" fill="#c0392b"/><text x="151" y="40" text-anchor="middle" fill="#fff" font-size="7">new</text>
  <text x="151" y="60" text-anchor="middle" font-size="7" fill="#c0392b">computed now</text>
  <path d="M172 36 L210 36" stroke="#1a1a1a" marker-end="url(#kv)"/>
  <text x="285" y="40" text-anchor="middle" fill="#6b6b6b">O(1) work per token, not O(n)</text>
  <defs><marker id="kv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- This turns generation from re-reading the whole sequence every step into constant work per token. **Every production LLM server uses it** — it is the single biggest inference speedup.

:::warn
The cache trades compute for **memory**, and that memory becomes the real bottleneck. Its size = layers × KV-heads × head-dim × 2 × **sequence length** × batch. At long context and high concurrency it dwarfs the model weights and caps how many users a GPU can serve at once. This is exactly what GQA (previous page) shrinks, what **paged attention** (vLLM) manages like virtual memory, and why long context is expensive to serve, not just to train.
:::
