## Depth vs width — why go deeper rather than just wider?

- **Width** adds neurons per layer; **depth** adds layers. Both increase capacity, but depth is usually more *parameter-efficient*.
- A deep net composes features hierarchically: layer 1 learns edges, layer 2 corners, layer 3 object parts. Some functions need **exponentially more** neurons to represent with a shallow net than with a deep one — depth buys expressivity cheaply.
- But depth is harder to optimise (vanishing gradients), which is why it only took off with residual connections and normalisation. Width is easier to train and parallelise.
- In practice architectures balance both, and scaling laws tune the ratio. Very wide-shallow and very deep-narrow both underperform a sensible aspect ratio.

:::interview
What's really being tested:

the compositional/exponential-expressivity argument for depth, tempered by the optimisation cost that made residuals necessary — not a dogmatic "deeper is better."
:::
