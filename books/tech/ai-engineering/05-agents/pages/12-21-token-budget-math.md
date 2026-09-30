## The token-budget math

- VLM cost and latency are set by visual token count. Here is the arithmetic every VLM engineer should be able to do on a whiteboard.

:::mint
```text
patches_per_side = image_side / patch_size
tokens_per_tile  = patches_per_side²          # e.g. (336/14)² = 24² = 576
visual_tokens    = tokens_per_tile × (tiles + 1_global)   # AnyRes
                   ─ or ─  after k×k pooling: tokens_per_tile / k²

Example A — one 336px image, no tiling:
   576 tokens.
Example B — 1008×1008 doc, 3×3 AnyRes + global:
   576 × (9 + 1) = 5,760 tokens.
Example C — same doc, then 2×2 pooling:
   5,760 / 4 = 1,440 tokens.   (4× cheaper, coarser)
Example D — 30-frame video, 336px, 2×2 pooled:
   30 × (576/4) = 4,320 tokens.
```
:::

- **Pooling** merges neighboring patches after encoding (e.g. average or concatenate a 2×2 block into one token), cutting tokens by k² at the cost of spatial precision. Qwen2-VL and many video VLMs pool aggressively.
- **The three dials:** resolution (patches per tile), tiling (how many tiles), pooling (how hard you merge). Every VLM deployment is a choice of these three against a token budget.

:::interview
**"Estimate the token cost of sending a full-page PDF screenshot to a VLM."** Roughly: a ~1000 px page at 336 px tiles is a 3×3 grid + global = 10 passes × 576 ≈ **~5.7k tokens per page** before pooling. Ten pages ≈ 57k tokens — near many models' whole context. That is why document agents pool, cap tiles, or retrieve pages (ColPali, later) instead of stuffing them all in.
:::
