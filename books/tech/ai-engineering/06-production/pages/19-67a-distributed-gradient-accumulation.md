## Distributed training: the effective batch

- Large-model training needs a *large* batch for stable gradients, but a large batch doesn't fit in memory. The **effective batch size** is assembled from three multipliers, and getting it right is central to reproducing a training recipe.

:::mint
```text
effective_batch = per_gpu_batch × gradient_accumulation_steps × num_gpus

Example: target effective batch 512
  per_gpu_batch = 4      (what fits in memory with the model + activations)
  accumulation  = 8      (sum grads over 8 micro-batches before stepping)
  num_gpus      = 16     (data-parallel replicas)
  -> 4 × 8 × 16 = 512    ✓

Change ANY factor and you must adjust the others to keep 512,
or the learning dynamics (and the LR you tuned) change.
```
:::

- **Three ways to grow the batch, three costs.** *Per-GPU batch* — limited by memory (bigger model/context leaves less room). *Gradient accumulation* (19-28) — sum gradients over several micro-batches before one optimiser step; trades wall-clock time for a bigger effective batch with no extra memory. *Data-parallel GPUs* — more replicas, each on a slice; trades money for speed.
- **The effective batch couples to the learning rate.** A recipe tuned for effective batch 512 at some LR will behave differently at 256 — so when you have fewer GPUs, you raise accumulation to *keep* the effective batch, rather than silently training at a different one. This is the most common "why won't my fine-tune reproduce?" bug (19-28's interaction warning at scale).

:::note
The effective-batch identity is the bridge between a *published recipe* and *your hardware*: a paper reports an effective batch and LR; you reproduce it by choosing per-GPU batch (what fits), then accumulation and GPU count to hit the same effective batch. Distributed training doesn't change *what* you're optimising — it changes *how you assemble the batch* across memory, time, and machines. Keep the effective batch (and its paired LR) fixed as you move across hardware, and a recipe transfers; let it drift silently, and you're training a different, un-tuned configuration.
:::
