## What is transfer learning, and why does fine-tuning a pretrained model work so well?

- **Transfer learning** reuses a model trained on a large general task as the starting point for a smaller specific one. **Fine-tuning** continues training those pretrained weights on your data.
- Why it works: early layers learn **general features** (edges/textures in vision, syntax/semantics in language) that transfer across tasks. You only need to adapt the later, task-specific layers — so you need far less labelled data and compute.
- Spectrum of options: **feature extraction** (freeze the backbone, train a new head), **full fine-tuning** (update everything, best accuracy, most compute), and **parameter-efficient** methods (LoRA/adapters — update a tiny fraction).
- This is the entire basis of modern AI engineering: almost nobody trains from scratch; you adapt a foundation model.

:::warn
Fine-tuning on a small dataset with a high learning rate causes **catastrophic forgetting** — the model loses its general ability. Use a low LR, freeze lower layers, or prefer LoRA.
:::

:::interview
What's really being tested:

the general-to-specific feature hierarchy that makes transfer work, and awareness of the fine-tuning spectrum from frozen-head to LoRA to full.
:::
