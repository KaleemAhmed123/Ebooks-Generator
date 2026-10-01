## Formally, what is a language model?

- A **language model** is a probability distribution over sequences of tokens. Concretely, it models `P(next token | all previous tokens)` and, by the chain rule of probability, the probability of a whole sequence is the product of those per-token conditionals.
- Everything else follows from this one object:
  - **Generation** = repeatedly sampling from `P(next | context)`.
  - **Scoring/ranking** = evaluating `P(sequence)` (used for perplexity, re-ranking, classification-by-likelihood).
  - **Training** = maximising the likelihood of real text under this distribution (= minimising cross-entropy).
- It is *not* a database or a reasoning engine by design — it's a next-token predictor whose useful behaviours (answering, reasoning, coding) **emerge** from being very good at that single objective.

:::mint
```text
P(w₁..wₙ) = Π P(wᵢ | w₁..wᵢ₋₁)      # chain rule; the model supplies each factor
```
:::

:::interview
What's really being tested:

that you can state the formal definition (distribution over sequences via next-token conditionals) and derive generation, scoring, and training from it.
:::
