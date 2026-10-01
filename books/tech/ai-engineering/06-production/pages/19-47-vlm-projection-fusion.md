## VLM: projection and fusion

- The vision encoder outputs patch features in *its* space; the LLM expects tokens in *its* embedding space. The **projector** bridges them — the LLaVA design is a small MLP that maps each patch feature to an LLM-dimension token.

:::mint
```python
class Projector(nn.Module):                # LLaVA-style MLP bridge
    def __init__(self, vision_dim=768, llm_dim=4096):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(vision_dim, llm_dim), nn.GELU(),
            nn.Linear(llm_dim, llm_dim))
    def forward(self, patches):            # (B, n_patches, vision_dim)
        return self.net(patches)           # (B, n_patches, llm_dim)

def build_inputs(image_tokens, text_ids, llm_embed):
    text_emb = llm_embed(text_ids)                       # (B, T, llm_dim)
    # prepend projected image tokens to the text embeddings
    return torch.cat([image_tokens, text_emb], dim=1)    # (B, n_patches+T, llm_dim)
```
:::

- **Fusion is concatenation, then attention.** The projected image tokens are *prepended* to the text token embeddings, and the LLM runs normally over the combined sequence — every text token can attend to every image token. That is the whole "fusion": the image becomes a prefix of visual tokens the LLM reads like context.
- **Cross-attention is the alternative** (Flamingo, Booklet 5): instead of prepending, add new attention layers inside the LLM that read the image while keeping the LLM frozen. Prepend-projector is simpler and the common default; cross-attention preserves the base LLM's language skill by not touching its weights.

:::note
The projector is small but load-bearing: it is the *only* new component that must learn the vision↔language alignment, which is why VLM training (next page) can freeze both the vision encoder and the LLM and train mostly the projector first. Seeing fusion as "project patches to tokens, prepend, attend as usual" removes the mystery — a VLM is an LLM whose context happens to begin with image-derived tokens, and the engineering is getting the projector to place those tokens where the LLM can use them.
:::
