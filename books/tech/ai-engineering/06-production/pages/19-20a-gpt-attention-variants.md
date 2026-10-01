## GPT from scratch: attention variants

- The multi-head attention of 19-20 is the original design. Every production model uses a *variant* that changes the serving economics — and they're small code changes to what you built. The key one is **grouped-query attention (GQA)**, because it directly shrinks the KV cache (17-11).

:::mint
```python
# GQA: many query heads SHARE a smaller number of key/value heads
class GQAttention(nn.Module):
    def __init__(self, d_model, n_q_heads, n_kv_heads, block):
        super().__init__()
        self.nq, self.nkv, self.dh = n_q_heads, n_kv_heads, d_model // n_q_heads
        self.q  = nn.Linear(d_model, n_q_heads  * self.dh)
        self.kv = nn.Linear(d_model, 2 * n_kv_heads * self.dh)   # FEWER k/v
        # ... at attention time, each group of q-heads reuses one k/v-head
```
:::

- **The KV-cache payoff.** Standard multi-head attention (MHA) stores K,V for *every* head. GQA stores them for far fewer KV-heads (e.g. 8 KV-heads for 64 query-heads), shrinking the KV cache by that ratio — the exact term in the KV-size formula (17-11). **MQA** (multi-query) is the extreme: one KV-head. GQA is the sweet spot: near-MHA quality, near-MQA cache size.
- **Other serving-relevant variants.** *RoPE* (rotary position embeddings) replaces the learned positional table (19-19) and enables context-length extension. *Sliding-window attention* caps how far back each token attends, bounding the KV cache for very long contexts. All are drop-in modifications to the block you built.

:::note
This is why building attention from scratch pays off in *serving*: GQA isn't a mysterious optimisation, it's "use fewer K/V projections so the cache is smaller," a change you can now read in a model config and reason about. When a model card says "8 KV heads, 64 query heads," you know its KV cache is 8× smaller than naive MHA — which sets how many users a GPU serves (17-11). The frontier's attention variants are all trading a little quality or generality for a smaller, faster KV cache, and they're small edits to the mechanism in 19-20.
:::
