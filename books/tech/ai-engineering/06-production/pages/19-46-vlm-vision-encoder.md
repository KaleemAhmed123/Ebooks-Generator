## VLM: vision encoder and patches

- A **Vision Transformer (ViT)** treats an image like a sentence: cut it into fixed-size **patches**, flatten each into a vector (a "visual word"), add positional embeddings, and run a transformer. Booklet 2 introduced ViT; here is the patchify step in code.

:::mint
```python
import torch, torch.nn as nn

class PatchEmbed(nn.Module):
    def __init__(self, img=224, patch=16, in_ch=3, d_model=768):
        super().__init__()
        self.n_patches = (img // patch) ** 2          # 224/16 -> 14x14 = 196
        # a conv with stride=patch IS non-overlapping patchify + linear proj
        self.proj = nn.Conv2d(in_ch, d_model, kernel_size=patch, stride=patch)
    def forward(self, x):                              # x: (B, 3, 224, 224)
        x = self.proj(x)                               # (B, d_model, 14, 14)
        return x.flatten(2).transpose(1, 2)            # (B, 196, d_model)
```
:::

- **Patchify is a strided convolution.** A `Conv2d` with `kernel=stride=patch` slices the image into non-overlapping patches *and* linearly projects each to `d_model` in one op — 196 patch-tokens for a 224×224 image at patch 16. Those tokens then flow through a standard transformer stack (the block from Flagship 1, without the causal mask — vision is bidirectional).
- **The patch count is the resolution/cost knob** (Booklet 5, 17-28b): more patches (higher resolution or smaller patch size) capture fine detail — small document text, chart labels — but multiply the visual-token count, inflating the LLM's prefill. This is *the* VLM serving tradeoff.

:::note
Patches are why VLMs "see": once an image is a sequence of patch-token vectors, attention treats it exactly like a sequence of word vectors, so all the transformer machinery from Flagship 1 transfers unchanged. The only VLM-specific parts are (1) patchify (here) and (2) the projector that aligns those patch tokens to the LLM's space (next page). A document-QA model that struggles with small text is almost always resolution-starved — too few patches over the region with the answer — which is a patch-count decision, not a model-capability one.
:::
