## Capstone: build a transformer

- Every piece is now on the table. A working decoder-only transformer — a tiny GPT — is these parts stacked, and it fits on one screen in PyTorch.

:::mint
```python
import torch, torch.nn as nn

class Block(nn.Module):
    def __init__(s, d, h):
        super().__init__()
        s.ln1, s.ln2 = nn.LayerNorm(d), nn.LayerNorm(d)
        s.attn = nn.MultiheadAttention(d, h, batch_first=True)
        s.ffn = nn.Sequential(nn.Linear(d, 4*d), nn.GELU(), nn.Linear(4*d, d))
    def forward(s, x, mask):
        a,_ = s.attn(s.ln1(x), s.ln1(x), s.ln1(x), attn_mask=mask)
        x = x + a                        # attention + residual
        return x + s.ffn(s.ln2(x))       # feed-forward + residual

class TinyGPT(nn.Module):
    def __init__(s, vocab, d=128, h=4, layers=4, ctx=128):
        super().__init__()
        s.tok, s.pos = nn.Embedding(vocab, d), nn.Embedding(ctx, d)
        s.blocks = nn.ModuleList(Block(d, h) for _ in range(layers))
        s.head = nn.Linear(d, vocab)     # predict next token
    def forward(s, idx):
        n = idx.size(1)
        x = s.tok(idx) + s.pos(torch.arange(n, device=idx.device))
        mask = torch.triu(torch.full((n, n), float('-inf')), 1)  # causal
        for b in s.blocks: x = b(x, mask)
        return s.head(x)                 # logits over the vocabulary
```
:::

- **The whole booklet is in these lines:** token + positional embeddings (05-07, 07-07) → causal multi-head attention blocks (07-05, 07-06, 07-12) with residuals, LayerNorm (07-09) and a feed-forward net (07-08) → a head predicting the next token (07-14). Train it on next-token prediction over any text and it generates.

### How to read the architecture

Three structural ideas carry the whole design — grasp these and you can reason about any transformer variant, not just this one.

- **The residual stream is the backbone.** `x` starts as the embeddings and every block only ever *adds* to it (`x = x + ...`), never replaces it. Think of `x` as a shared notepad passed down the stack: each block reads it, writes a correction, and hands it on. That additive path is why gradients survive dozens of layers (07-10) — remove the `x +` and a deep stack stops training.
- **Each block does two orthogonal jobs.** Attention mixes information *across positions* (one token pulls in context from others); the feed-forward net then processes *each position on its own*. Mix, then think. Stacking that pair is the entire repeating motif — `layers=4` here, ~100 in a frontier model.
- **One line makes it a language model.** The causal `mask` sets every "future" score to `-inf` before the softmax, so position `n` can attend only to `≤ n`. Delete that line and you have a bidirectional encoder (BERT) instead; it is the single change that separates "predict the next token" from "fill in the blank."

:::note
What separates this from a frontier model is **not the architecture** — it is scale, data quality, and the serving engineering of the last pages (GQA, KV cache, FlashAttention, MoE, speculative decoding), plus the alignment Booklet 4 covers to turn a raw next-token predictor into an assistant. You now understand the machine.
:::
