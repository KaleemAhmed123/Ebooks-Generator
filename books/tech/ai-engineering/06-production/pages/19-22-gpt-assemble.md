## GPT from scratch: assembling the model

- Put it together: embeddings → a stack of blocks → a final norm → a projection to vocabulary logits. This full `GPT` class is architecturally GPT-2.

:::mint
```python
class GPT(nn.Module):
    def __init__(self, vocab, d_model=768, n_heads=12, n_layers=12, block=1024):
        super().__init__()
        self.emb = Embeddings(vocab, d_model, block)
        self.blocks = nn.ModuleList(
            [Block(d_model, n_heads, block) for _ in range(n_layers)])
        self.ln_f = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, vocab, bias=False)
        self.head.weight = self.emb.tok.weight        # weight tying

    def forward(self, x, targets=None):
        h = self.emb(x)
        for b in self.blocks: h = b(h)
        logits = self.head(self.ln_f(h))              # (B, T, vocab)
        loss = None
        if targets is not None:
            loss = F.cross_entropy(
                logits.view(-1, logits.size(-1)), targets.view(-1))
        return logits, loss
```
:::

- **Weight tying** (`head.weight = emb.tok.weight`) shares the input embedding and output projection — transposes of the same "token ↔ vector" map, saving parameters and improving quality. A standard GPT-2 trick.
- **The config *is* the model size.** `d_model=768, n_layers=12, n_heads=12` is GPT-2 small (~124M params). Scale those three numbers for GPT-2 medium/large/XL — and, scaled far with MoE, the frontier. The architecture does not change; the numbers do.
- **Generation** is the naive inference loop: forward the last `block` tokens, softmax the final position, sample, append, repeat.

:::note
That generation loop re-runs the whole `block`-length context every step — exactly the O(T²) waste the **KV cache** (17-11) eliminates in production. You are looking at the un-optimised version of what vLLM serves. Seeing generation as "forward → sample last token → append → repeat" makes every serving concept — batching, caching, speculative decoding — click into place as *optimisations of this one loop*.
:::
