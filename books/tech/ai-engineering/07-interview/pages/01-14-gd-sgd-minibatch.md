## Batch GD vs SGD vs mini-batch — and why is the noise in SGD useful?

- **Gradient descent** updates weights using the gradient over the *whole* dataset. Accurate direction, but one step needs a full pass — too slow and memory-heavy for large data.
- **Stochastic GD (SGD)** updates from a *single* example at a time. Cheap, fast, but the gradient is a noisy estimate, so the path jitters.
- **Mini-batch** uses a small batch (32–512). It is the practical default: enough samples to smooth the gradient, small enough to fit in GPU memory and vectorise efficiently.
- The **noise is a feature**: it lets training escape sharp local minima and saddle points, and it tends to settle in *flat* minima that generalise better. Full-batch GD can get stuck where SGD walks out.

:::warn
Batch size interacts with learning rate. Bigger batches give smoother gradients but lose the regularising noise — you often need the learning-rate warmup/scaling tricks to keep large-batch training generalising.
:::

:::interview
What's really being tested:

that mini-batch is the default *and why*, plus the counterintuitive point that gradient noise helps generalisation, not just speed.
:::
