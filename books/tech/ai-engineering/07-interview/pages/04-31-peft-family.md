## Besides LoRA, what other parameter-efficient fine-tuning methods exist?

- **PEFT (parameter-efficient fine-tuning)** = adapt a model by training a small set of extra/selected parameters while freezing the base. The family:
  - **LoRA / QLoRA** — low-rank weight updates; the dominant choice.
  - **DoRA** — splits the update into magnitude + direction; often a bit better than LoRA at similar cost. [VERIFY.]
  - **Adapters** — small bottleneck layers inserted between transformer sublayers; trained, base frozen. Add a little inference latency.
  - **Prefix / prompt tuning** — prepend trainable "virtual tokens" to the input; the model and real tokens stay frozen. Very few parameters, weaker for hard tasks.
  - **(IA)³** — learn to rescale activations with tiny vectors; extremely few parameters.
- They trade off **capacity vs parameter count vs inference overhead**. LoRA won because it adds **zero inference latency** (adapters can be merged into `W`) while matching heavier methods.

:::interview
**What's really being tested:** that you can place LoRA in a family and name the axis — how much they train, whether they add inference latency — and why LoRA's mergeability made it the default.
:::
