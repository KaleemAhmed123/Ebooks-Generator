## Your model's loss is flat from step one — it isn't learning. How do you debug it?

- Work from cheapest hypothesis to most expensive:
  - **Can it overfit 10 examples?** Train on a tiny batch with no regularisation. If it can't drive that loss to ~0, the bug is in the model/pipeline, not the data size.
  - **Learning rate** — flat loss often means LR far too low (no movement) or too high (diverged then stuck). Sweep it.
  - **Data wiring** — are inputs and labels aligned? Normalised? Is the label actually in the batch? Shuffled? A constant-output bug usually means broken labels.
  - **Loss/output mismatch** — softmax + cross-entropy expects logits, not probabilities; a double-softmax flattens gradients.
  - **Gradients** — log their norms. All-zero → broken graph (detached tensor, wrong `requires_grad`, dead ReLUs).
- The overfit-tiny-batch test is the single most useful first move: it isolates "can this thing learn at all" from "does it generalise."

:::interview
What's really being tested:

a disciplined, ordered debugging process — especially the "overfit a tiny batch first" instinct — versus randomly changing hyperparameters.
:::
