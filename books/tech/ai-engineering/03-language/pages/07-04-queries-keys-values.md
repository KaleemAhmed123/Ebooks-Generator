## Queries, keys, and values

- Where do the query, key, and value come from? Each token's embedding is multiplied by **three learned weight matrices** — `Wq`, `Wk`, `Wv` — producing three vectors per token.
- The three matrices are the *only* learned parameters in attention. Training tunes them; the attention operation itself has no weights of its own.

:::mint
```python
# X: (n tokens, d_model)   the input embeddings
Q = X @ Wq     # (n, d_k)  "what each token is looking for"
K = X @ Wk     # (n, d_k)  "what each token offers as a match"
V = X @ Wv     # (n, d_v)  "what each token passes on if attended to"
```
:::

### Why three separate roles

- A token needs to play different parts at once. As a **query** it asks a question; as a **key** it advertises what it can answer; as a **value** it carries the content to hand over. One vector cannot do all three well.
- Splitting them lets the model learn, for example, that a verb should *seek* its subject (query), that a noun should *announce* "I'm a subject" (key), and separately what information the noun contributes (value).

<svg viewBox="0 0 340 84" role="img" aria-label="One token embedding projected through three matrices into query, key, and value vectors" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="34" width="52" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="47" text-anchor="middle">token xᵢ</text>
  <g stroke="#1a1a1a"><path d="M66 40 L120 18" marker-end="url(#qkv)"/><path d="M66 43 L120 43" marker-end="url(#qkv)"/><path d="M66 46 L120 68" marker-end="url(#qkv)"/></g>
  <text x="92" y="22" font-size="7" fill="#6b6b6b">·Wq</text><text x="92" y="39" font-size="7" fill="#6b6b6b">·Wk</text><text x="92" y="66" font-size="7" fill="#6b6b6b">·Wv</text>
  <rect x="124" y="10" width="120" height="16" rx="3" fill="#1a3a2a"/><text x="184" y="22" text-anchor="middle" fill="#fff">query — what I seek</text>
  <rect x="124" y="35" width="120" height="16" rx="3" fill="#24405e"/><text x="184" y="47" text-anchor="middle" fill="#fff">key — what I offer</text>
  <rect x="124" y="60" width="120" height="16" rx="3" fill="#6a9bd0"/><text x="184" y="72" text-anchor="middle" fill="#fff">value — what I give</text>
  <defs><marker id="qkv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Keys and queries share a dimension `d_k` because they must be dot-producted together (next page). Values can be a different size `d_v`. Getting these shapes right is most of the work of coding attention correctly — a shape mismatch is the single most common bug when writing it from scratch.
:::
