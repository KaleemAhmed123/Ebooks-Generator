## Parameter vs hyperparameter — and how do you tune without overfitting the validation set?

- A **parameter** is learned from data by training (weights, biases). A **hyperparameter** is set by you before training (learning rate, layers, regularisation strength, k in kNN).
- Tuning searches hyperparameters by scoring on the **validation set**. The trap: if you try hundreds of configs and keep the best val score, you've *fit the val set* — the number is optimistic.
- Defences: a **held-out test set** touched exactly once at the end; **nested cross-validation** (inner loop tunes, outer loop estimates honest performance); and limiting how many configs you try.
- Prefer **random search or Bayesian optimisation** over grid search: grids waste trials on unimportant dimensions; random search covers the important ones with far fewer runs.

:::warn
Every time you look at the test set and then change something, it becomes a second validation set. The test set is a one-shot measurement, not a dashboard.
:::

:::interview
What's really being tested:

that you understand "overfitting the validation set" is real, and that the test set must stay sacred for the final number to mean anything.
:::
