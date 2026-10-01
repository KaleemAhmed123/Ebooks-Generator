## What is label smoothing, and why would you use it?

- Standard training targets are **hard** one-hot labels: the true class is 1, all others 0. **Label smoothing** softens them — true class gets `1−ε` (e.g. 0.9), the rest share `ε` (e.g. 0.1 split across classes).
- Why: hard targets push the model to make the correct logit **infinitely** larger than the rest, encouraging over-confidence and over-fitting. Smoothing caps that drive, improving **calibration** (predicted probabilities match real accuracy) and often generalisation.
- Cost: the model becomes deliberately less confident, which can slightly hurt tasks where you later use the raw probabilities (e.g. knowledge distillation, some retrieval). Use judiciously.
- Common in image classification and machine translation; a small, cheap regulariser.

:::interview
What's really being tested:

that you know it fights over-confidence/miscalibration by denying the model a zero-loss target, and that it trades a little confidence for better generalisation.
:::
