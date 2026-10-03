## GPT from scratch: the transformer block

- A **transformer block** wraps attention and a feed-forward network with residuals and layer norm. Stacking N of these *is* the model's depth.

:::mint
```python
class Block(nn.Module):
    def __init__(self, d_model, n_heads, block):
        super().__init__()
        self.ln1, self.ln2 = nn.LayerNorm(d_model), nn.LayerNorm(d_model)
        self.attn = MultiHeadAttention(d_model, n_heads, block)
        self.mlp = nn.Sequential(nn.Linear(d_model, 4*d_model), nn.GELU(),
                                 nn.Linear(4*d_model, d_model))   # FFN, ×4 expand
    def forward(self, x):
        x = x + self.attn(self.ln1(x))               # residual + pre-norm attn
        x = x + self.mlp(self.ln2(x))                # residual + pre-norm mlp
        return x
```
:::

- **Two sub-layers, two residuals.** Attention lets tokens *mix information*; the MLP lets each token *process* its representation (the 4× expansion holds most parameters).
- **Pre-norm** (LayerNorm *before* the sub-layer) is the modern default — it keeps the residual path clean so deep stacks train (Booklet 3).

<svg viewBox="0 0 300 96" role="img" aria-label="A block: input splits to a residual and a pre-norm attention, sums, then residual and pre-norm MLP, sums" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="42" width="30" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="25" y="52" text-anchor="middle">x</text>
  <rect x="60" y="20" width="54" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="87" y="30" text-anchor="middle">ln1→attn</text>
  <circle cx="134" cy="49" r="7" fill="#eaf6ea" stroke="#1a3a2a"/><text x="134" y="52" text-anchor="middle">+</text>
  <rect x="158" y="20" width="54" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="185" y="30" text-anchor="middle">ln2→mlp</text>
  <circle cx="232" cy="49" r="7" fill="#eaf6ea" stroke="#1a3a2a"/><text x="232" y="52" text-anchor="middle">+</text>
  <rect x="256" y="42" width="34" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="273" y="52" text-anchor="middle">out</text>
  <path d="M40 49 L127 49" stroke="#888" marker-end="url(#bk)"/><path d="M40 49 L60 30 M114 27 L131 43" stroke="#888" fill="none"/>
  <path d="M141 49 L225 49" stroke="#888" marker-end="url(#bk)"/><path d="M141 49 L158 30 M212 27 L229 43" stroke="#888" fill="none"/>
  <path d="M239 49 L254 49" stroke="#888" marker-end="url(#bk)"/>
  <defs><marker id="bk" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

:::note
The residual connection is the quiet hero: `x + sublayer(x)` gives gradients a direct path back through every layer, making a deep stack trainable (Booklet 2's vanishing gradients). That one `x +` is why "just add more layers" works.
:::
