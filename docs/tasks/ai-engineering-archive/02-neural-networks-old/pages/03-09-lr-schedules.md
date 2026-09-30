## Learning rate schedules and warmup

- The learning rate is the single most important hyperparameter. Too high → loss diverges in steps. Too low → training crawls. Constant rate at any value → oscillates around the minimum, never settling
- The optimal learning rate changes during training. Large steps early cover ground quickly; small steps late converge precisely. A schedule encodes this lifecycle
- **Warmup** — at step 0, Adam's moment estimates are initialised to zero. The first updates are based on stale statistics. Starting with a large learning rate here takes huge, poorly-directed steps. Warmup linearly ramps lr from 0 to `lr_max` over N steps while moments stabilise

### The modern default: linear warmup + cosine decay

<svg viewBox="0 0 460 80" role="img" aria-label="Learning rate schedule: linear ramp up from zero to lr_max during warmup steps, then smooth cosine decay to lr_min over the rest of training" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="24" y1="8" x2="24" y2="70" stroke="#1a1a1a"/>
  <line x1="24" y1="70" x2="450" y2="70" stroke="#1a1a1a"/>
  <text x="12" y="12" font-size="7">lr_max</text>
  <text x="12" y="68" font-size="7">lr_min</text>
  <text x="450" y="77" font-size="7">steps</text>
  <!-- warmup ramp -->
  <path d="M28 68 L110 14" stroke="#24405e" stroke-width="2" fill="none"/>
  <line x1="110" y1="8" x2="110" y2="70" stroke="#aaa" stroke-width="0.8" stroke-dasharray="3 2"/>
  <text x="112" y="77" font-size="7" fill="#6b6b6b">warmup</text>
  <!-- cosine decay -->
  <path d="M110 14 Q210 16 280 36 Q350 56 440 66" stroke="#1a3a2a" stroke-width="2" fill="none"/>
  <text x="240" y="36" font-size="8" fill="#6b6b6b">cosine decay</text>
</svg>

:::mint
```python
def lr_lambda(step):
    if step < warmup_steps:
        return step / warmup_steps              # linear ramp
    progress = (step - warmup_steps) / (total_steps - warmup_steps)
    return 0.1 + 0.5 * 0.9 * (1 + math.cos(math.pi * progress))  # cosine

scheduler = torch.optim.lr_scheduler.LambdaLR(optimizer, lr_lambda)
```
:::

### Published schedules as ground truth

| Model | Peak lr | Warmup | Schedule |
|---|---|---|---|
| LLaMA 3 (Meta, 2024) | 3×10⁻⁴ | 2,000 steps | Cosine → 3×10⁻⁵ |
| GPT-3 (OpenAI, 2020) | 6×10⁻⁴ | 375M tokens | Cosine |
| ResNet-50 (He, 2015) | 0.1 | — | Step ÷10 at epochs 30/60/90 |

When in doubt, match the schedule from the paper your architecture is based on. Deviating requires a sweep to justify.

:::warn
**Not calling `scheduler.step()` every step.** The most common LR schedule bug: calling the scheduler once per epoch instead of once per optimiser step, or forgetting to call it at all. The loss plateau you blame on overfitting is often just a stuck learning rate. Always place `scheduler.step()` immediately after `optimizer.step()` inside the training loop.
:::
