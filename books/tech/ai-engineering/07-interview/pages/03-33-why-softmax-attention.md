## Why does attention use softmax, and what would change without it?

- **Softmax** turns raw scores into a probability distribution: all weights positive, summing to 1. So attention is a **convex combination** (a weighted average) of the Value vectors — a stable, bounded output.
- Positivity + normalisation matter: they keep the output in the same scale regardless of sequence length, and give a clean gradient that focuses mass on the most relevant tokens without letting any single score dominate uncontrollably.
- Without softmax (e.g. raw linear weights), outputs could blow up with length, weights could be negative or unnormalised, and training destabilises.
- Alternatives exist — **linear attention** replaces softmax with kernel feature maps to get O(n) cost, trading some expressivity. The softmax is the main obstacle to making attention linear, which is why so much research targets it.

:::interview
What's really being tested:

that softmax gives a normalised, length-invariant weighted average with good gradients — and that it's precisely what linear-attention methods try to remove for speed.
:::
