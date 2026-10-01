## What does dropout do, and why is it like training an ensemble?

- **Dropout** randomly zeros a fraction of activations each training step. The network can't rely on any single neuron, so it learns **redundant, distributed** representations that generalise better.
- The ensemble view: each random mask is a different thinned sub-network sharing weights. Training with dropout approximately trains an **exponential ensemble** of sub-networks; at inference you use the full network (with scaling), which approximates averaging them.
- At inference dropout is **off** — you keep all neurons and scale activations so expected magnitudes match training. Forgetting to switch to eval mode is a classic bug (randomness leaks into predictions).
- Less used in large transformers trained on huge data (plenty of regularisation from data scale), but standard in smaller/fine-tuning regimes.

:::warn
In PyTorch, `model.eval()` disables dropout and freezes norm stats. Leaving the model in `train()` at inference gives noisy, non-reproducible outputs — a frequent silent bug.
:::

:::interview
What's really being tested:

the ensemble intuition plus the practical train/eval switch — interviewers love the "why does eval mode matter" follow-up.
:::
