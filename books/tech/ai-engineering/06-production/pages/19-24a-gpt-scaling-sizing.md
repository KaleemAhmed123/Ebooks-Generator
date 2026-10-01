## GPT from scratch: scaling and sizing

- You built a model whose size is three numbers (19-22). **Scaling laws** (Booklet 3) tell you how to *choose* those numbers — how big a model, and how much data, for a compute budget — and the answer shapes every training and serving decision.
- The core finding: performance improves *predictably* with scale, and for a fixed compute budget there's an *optimal* balance between model size and training tokens.

:::mint
```text
Params ≈ 12 · n_layers · d_model²      (the model's size, from 19-22)
Training FLOPs ≈ 6 · N · D             (N = params, D = training tokens)
Inference FLOPs ≈ 2 · N  per token

Chinchilla-optimal (compute-efficient TRAINING): D ≈ 20 · N
  a compute budget buys the best model by balancing size and data ~20 tok/param.

BUT for cheap INFERENCE: over-train a SMALLER model (D ≫ 20·N)
  e.g. Llama-3 8B on ~15T tokens (~1800 tok/param) — more train cost,
  far cheaper to serve forever. The serving bill outlives the training bill.
```
:::

- **Chinchilla-optimal balances training compute** — for a fixed budget, ~20 tokens per parameter gives the best model. But that optimises the *wrong* thing for a product: it minimises *training* cost, ignoring that you'll pay *inference* cost on every request for the model's whole life.
- **So production over-trains smaller models.** A smaller model trained on far more data than Chinchilla-optimal costs more to train but is *much cheaper to serve* (fewer params = less memory, faster decode, 17-11) — and the inference bill dwarfs the training bill over a deployed model's life. This is why recent open models are "small but trained on trillions of tokens."

:::interview
"Bigger model or train a smaller one longer?"

Depends on whether you're optimising training or serving cost, and for a product it's serving. **Chinchilla** says ~20 tokens/param is compute-optimal *for training* — but that ignores that you pay inference on every request forever, and inference cost scales with model size (memory, decode speed). So the production move is to **over-train a smaller model** (far more than 20 tok/param), paying more once at training to get a model that's much cheaper to serve for its whole life — which is why models like Llama-3 8B are trained on trillions of tokens. The framing that scores: the serving bill outlives the training bill, so size the model for inference economics, not training-compute-optimality.
:::
