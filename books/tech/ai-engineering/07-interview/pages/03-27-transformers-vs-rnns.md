## Why did transformers replace RNNs/LSTMs for sequence modelling?

- **RNNs/LSTMs** process tokens **sequentially**, carrying a hidden state. Two fatal limits at scale:
  - **No parallelism in time** — token t must wait for t−1, so training can't use the GPU fully. Transformers process all positions at once (within a sequence), so they train far faster.
  - **Long-range decay** — information must survive many sequential steps; gradients vanish through time and distant context fades. Attention gives every token a **direct** path to every other token — constant path length regardless of distance.
- The cost transformers pay is O(n²) attention vs RNN's O(n), but the parallelism and long-range modelling were decisive, and hardware favours the big matmuls.
- LSTMs added gates to mitigate long-range decay, but couldn't fix the sequential-training bottleneck.

:::interview
What's really being tested:

the two independent wins — training parallelism and direct long-range connectivity — not just "attention is better."
:::
