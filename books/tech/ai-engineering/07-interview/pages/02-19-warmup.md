## Why do transformers need learning-rate warmup?

- **Warmup** starts the learning rate near zero and ramps it up over the first few hundred/thousand steps, then decays it.
- Early in training the weights are random and the gradient estimates (especially Adam's variance term) are unreliable. A full-size step now can throw the model into a bad region it never recovers from — training diverges or lands in a poor basin.
- Warmup lets the adaptive optimizer **accumulate stable statistics** before taking large steps. It's most critical for deep, layer-normed, Adam-trained models — i.e. transformers.
- Typical schedule: **linear warmup → cosine decay**. Skipping warmup on a large transformer is a common cause of early loss spikes.

:::interview
What's really being tested:

that warmup protects against the unstable early phase (random weights + noisy adaptive estimates), not a magic ritual — and that warmup-then-decay is the standard schedule.
:::
