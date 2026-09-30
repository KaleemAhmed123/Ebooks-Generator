## Regularization — preventing memorisation

- **Overfitting** — the model memorises training-set quirks instead of learning the underlying pattern. Zhang et al. (2017) trained standard networks on ImageNet with *random labels* and reached near-zero training loss. No pattern to learn; pure memorisation. Test accuracy: zero
- **Dropout** — during training, zero each activation independently with probability `p`. The network cannot rely on any single neuron; it must learn redundant representations. At test time, all neurons are on (no scaling needed when using **inverted dropout** during training)
- **Weight decay (L2)** — adds `λ‖w‖²` to the loss; shrinks weights at every step. Prevents any single weight from growing large. Use `AdamW` for correct decoupled weight decay with Adam

### BatchNorm vs LayerNorm vs RMSNorm

<svg viewBox="0 0 460 80" role="img" aria-label="Three normalisation strategies: BatchNorm normalises across the batch dimension, LayerNorm normalises across the feature dimension per sample, RMSNorm normalises by root mean square without mean subtraction" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="138" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="73" y="26" text-anchor="middle" font-weight="bold">BatchNorm</text>
  <text x="73" y="40" text-anchor="middle" fill="#6b6b6b">normalise across</text>
  <text x="73" y="52" text-anchor="middle" fill="#6b6b6b">mini-batch (B dim)</text>
  <text x="73" y="64" text-anchor="middle" fill="#6b6b6b">CNNs, FC layers</text>
  <rect x="162" y="8" width="138" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="231" y="26" text-anchor="middle" font-weight="bold">LayerNorm</text>
  <text x="231" y="40" text-anchor="middle" fill="#6b6b6b">normalise across</text>
  <text x="231" y="52" text-anchor="middle" fill="#6b6b6b">features (D dim)</text>
  <text x="231" y="64" text-anchor="middle" fill="#24405e">Transformers ✓</text>
  <rect x="320" y="8" width="136" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="388" y="26" text-anchor="middle" font-weight="bold">RMSNorm</text>
  <text x="388" y="40" text-anchor="middle" fill="#6b6b6b">no mean subtract</text>
  <text x="388" y="52" text-anchor="middle" fill="#6b6b6b">just √(Σx²/d)</text>
  <text x="388" y="64" text-anchor="middle" fill="#6b6b6b">LLaMA, Mistral</text>
</svg>

**BatchNorm** needs a large enough batch to estimate mean and variance — breaks at batch size 1 and with variable-length sequences. **LayerNorm** normalises per sample across features: independent of batch size, works with any sequence length. **RMSNorm** drops the mean subtraction (10% faster, empirically equivalent for LLMs).

:::mint
```python
import torch.nn as nn
# inverted dropout — test code needs no modification
dropout = nn.Dropout(p=0.1)   # 10% rate for transformer hidden layers
# layer norm — applied before attention and FFN in pre-norm transformers
norm = nn.LayerNorm(d_model)  # normalises across last dimension
```
:::

:::warn
**BatchNorm has two modes: training and eval.** During training it normalises using the batch statistics; during inference it uses running statistics accumulated during training. Forgetting `model.eval()` before inference keeps BatchNorm in training mode — it computes statistics from whatever single sample or small batch you feed it, producing completely different (wrong) outputs. Always call `model.eval()` before inference and `model.train()` before resuming training.
:::
