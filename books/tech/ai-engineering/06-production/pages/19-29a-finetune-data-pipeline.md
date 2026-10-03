## Fine-tuning: the data pipeline

- Training compute is wasted if the GPU waits on data. For large corpora, you pre-tokenize once into a memory-mappable format so the training loop *streams* tokens at GPU speed instead of tokenizing on the fly.

:::mint
```python
import numpy as np
# pre-tokenize the whole corpus ONCE into a flat memory-mapped array
def build_bin(texts, tokenizer, path):
    ids = np.concatenate([tokenizer(t).input_ids + [tokenizer.eos_token_id]
                          for t in texts]).astype(np.uint16)   # 2 bytes/token
    ids.tofile(path)                                            # e.g. train.bin
# training reads slices with a memory-map — no full load, no re-tokenize
def get_batch(path, block, bs):
    data = np.memmap(path, dtype=np.uint16, mode="r")           # lazy, on-demand
    ix = np.random.randint(len(data) - block, size=bs)
    x = np.stack([data[i   : i+block]   for i in ix])
    y = np.stack([data[i+1 : i+block+1] for i in ix])
    return torch.from_numpy(x), torch.from_numpy(y)
```
:::

- **Pre-tokenize once, memory-map to read.** Tokenizing during training wastes CPU and stalls the GPU; instead tokenize the whole corpus into a flat binary of `uint16` token IDs (2 bytes each — the vocab fits) and `memmap` it, so the OS pages in only the slices you sample — how nanoGPT-style training keeps a GPU fed. Larger setups use sharded formats (HDF5, WebDataset) for multi-node streaming.
- **Data quality is the other half** (Booklet 4). Deduplicate (near-duplicates waste compute and worsen memorisation, 18-39a), filter low-quality and toxic content, and **decontaminate** — remove any eval-benchmark text from training, or your scores are inflated and meaningless (18-43).

:::note
The pipeline reflects a rule that governs all large-scale training: **the bottleneck is often data movement, not compute.** A GPU that tokenizes on the fly, reloads data, or waits on disk is an expensive idle GPU; pre-tokenizing to a memory-mapped binary makes data delivery essentially free, so it stays saturated. The same instinct scales to sharded formats and prefetching for distributed runs (Flagship 15): feed the GPU at its own speed, or the fanciest parallelism just makes more GPUs wait.
:::
