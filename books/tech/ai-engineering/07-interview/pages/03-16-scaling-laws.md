## What are scaling laws, and what did Chinchilla change?

- **Scaling laws** are empirical power-law relationships: test loss falls predictably as you increase parameters, data, and compute. They let you *forecast* a model's loss before training it.
- The early (Kaplan) reading over-weighted model size. **Chinchilla** (DeepMind, 2022) showed that for a fixed compute budget, most large models were **undertrained** — you should scale **data and parameters together**, roughly **~20 tokens per parameter**.
- Practical impact: a smaller model trained on more data beats a bigger model trained on less, at equal compute. It reshaped how labs allocate budget.
- Newer wrinkle: for models that will be **served to many users**, it's worth *over*-training a smaller model past compute-optimal, trading extra training cost for cheaper inference forever.

:::interview
What's really being tested:

that you know the compute-optimal data:param ratio (~20:1), the Kaplan→Chinchilla correction, and the inference-cost reason to over-train small models.
:::
