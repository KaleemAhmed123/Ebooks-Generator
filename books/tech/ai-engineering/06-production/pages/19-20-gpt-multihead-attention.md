## GPT from scratch: multi-head attention

- The heart of the model. **Causal multi-head self-attention** (Booklet 3): each token attends to earlier tokens, in several parallel "heads," with a mask that forbids looking ahead.

:::mint
```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads, block):
        super().__init__()
        self.nh, self.dh = n_heads, d_model // n_heads
        self.qkv, self.proj = nn.Linear(d_model, 3*d_model), nn.Linear(d_model, d_model)
        self.register_buffer("mask", torch.tril(torch.ones(block, block)).bool())
    def forward(self, x):                                    # x: (B,T,C)
        B, T, C = x.shape
        q, k, v = self.qkv(x).split(C, dim=2)
        sp = lambda t: t.view(B, T, self.nh, self.dh).transpose(1, 2)  # (B,nh,T,dh)
        q, k, v = map(sp, (q, k, v))
        att = (q @ k.transpose(-2, -1)) / self.dh**0.5       # scaled scores
        att = att.masked_fill(~self.mask[:T, :T], float("-inf"))  # causal
        out = (F.softmax(att, -1) @ v).transpose(1, 2).reshape(B, T, C)
        return self.proj(out)                                # recombine heads
```
:::

- **The four moves:** project to Q, K, V; score every query against every key (`q @ kᵀ`), scaled by `1/√d_head` to keep gradients stable; **mask** the upper triangle so token *t* cannot see *t+1*; softmax to weights, then weight the values.
- **Heads split the channel dimension** — `n_heads` parallel attentions over `d_head = d_model/n_heads` each, recombined by `proj`. Different heads learn different relationships (syntax, coreference, position) in one matmul.

:::note
This causal mask is what makes it a *generative* GPT rather than a bidirectional BERT (Booklet 3): forbidding a token from attending to the future is exactly what lets the trained model generate left-to-right, one token at a time, at inference. In production the same computation is what the **KV cache** (Module 17) accelerates — it stores the K and V for past tokens so each new token's attention is O(1), not O(T).
:::
