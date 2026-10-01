## Why can't you initialize all weights to zero, and what do Xavier/He fix?

- **All zeros** → every neuron in a layer computes the same thing and receives the same gradient, so they update identically forever. The layer never breaks **symmetry** and behaves like a single neuron. You must start with random weights.
- But random *scale* matters. Too large → activations and gradients explode; too small → they vanish. The goal is to keep the **variance of activations stable** as signal passes through many layers.
- **Xavier/Glorot** sets the scale for tanh/sigmoid (balances variance in and out). **He initialisation** doubles the variance to account for ReLU zeroing half its inputs.
- Get this wrong on a deep net and it won't train at all — not a tuning detail, a prerequisite.

:::interview
What's really being tested:

the symmetry-breaking reason zeros fail, and that init scale is really about preserving variance across depth (He for ReLU, Xavier for tanh).
:::
