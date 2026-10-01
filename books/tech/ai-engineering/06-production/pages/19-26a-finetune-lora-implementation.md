## Fine-tuning: LoRA from scratch

- Full fine-tuning updates every weight — expensive, and it produces a whole new model per task. **LoRA** (Low-Rank Adaptation, Booklet 4) freezes the base weights and learns a tiny low-rank *update* alongside each, cutting trainable parameters ~100–1000× and yielding the swappable adapters multi-LoRA serving hosts (17-17b). Here it is, in code.

:::mint
```python
class LoRALinear(nn.Module):
    def __init__(self, base: nn.Linear, r=8, alpha=16):
        super().__init__()
        self.base = base                              # frozen original weight
        for p in self.base.parameters(): p.requires_grad = False
        d_in, d_out = base.in_features, base.out_features
        self.A = nn.Parameter(torch.randn(r, d_in) * 0.01)   # down-project
        self.B = nn.Parameter(torch.zeros(d_out, r))         # up-project (0 init)
        self.scale = alpha / r
    def forward(self, x):
        return self.base(x) + (x @ self.A.T @ self.B.T) * self.scale  # W·x + BA·x
```
:::

- **The low-rank idea.** The update to a weight matrix is approximated as `B·A`, where `A` and `B` are skinny (rank `r`, e.g. 8) — so instead of training a `d×d` matrix you train two `r×d` and `d×r` ones, a tiny fraction. `B` is zero-initialised so the adapter starts as a no-op and the model begins as the untouched base.
- **`r` and `alpha` are the knobs.** Rank `r` sets adapter capacity (higher = more expressive, more parameters); `alpha` scales its contribution. Small `r` (4–16) suffices for most tasks — the surprising empirical finding that fine-tuning updates are *low-rank*.

:::note
LoRA is why fine-tuning-as-a-service (17-17b) and cheap per-task customisation exist: adapters are a few megabytes, train on one GPU in hours, and swap in and out of a shared base at serving time. The code makes clear it's not magic — it's "learn a low-rank additive update, keep the base frozen." **QLoRA** goes further, quantising the frozen base to 4-bit so even a large model fine-tunes on a single consumer GPU, with the LoRA adapter in higher precision on top. Both are the same idea in the code above: freeze the expensive part, learn a tiny cheap part.
:::
