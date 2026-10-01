## What is the difference between a generative and a discriminative model?

- A **discriminative** model learns the boundary between classes — `P(y | x)` directly. "Given this input, which label?" Logistic regression, most classifiers, BERT fine-tuned for classification.
- A **generative** model learns how the data itself is produced — `P(x, y)` or `P(x)`. It can *sample* new data. Naive Bayes, VAEs, diffusion models, and every LLM (which models `P(next token | context)`).
- Discriminative models usually win at pure classification with enough data — they spend all capacity on the boundary. Generative models win when you need to generate, handle missing inputs, or detect out-of-distribution data.
- An **LLM is generative** at its core (predict the next token) but is used discriminatively all the time (classify, extract) by framing the task as text generation.

:::interview
What's really being tested:

the `P(y|x)` vs `P(x,y)` distinction, and that you realise modern AI eng blurs it — a generative next-token model does discriminative work through prompting.
:::
