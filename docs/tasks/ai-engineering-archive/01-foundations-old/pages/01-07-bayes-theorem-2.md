### Where Bayes appears in AI

- **Naive Bayes classifier** — treats features as conditionally independent given the class. Multiplies likelihoods across features. Fast, interpretable, and still competitive on text classification
- **MAP estimation** (Maximum A Posteriori) — choosing the model parameters that maximize the posterior `P(params|data)`. Equivalent to maximum likelihood + a regularization term derived from the prior. L2 regularization = Gaussian prior on weights
- **Bayesian neural networks** — place distributions over weights rather than point estimates. Inference requires approximations (variational inference, MCMC). Still rare in production as of September 2026 due to computational cost

:::mint
```python
# Naive Bayes update (log space to avoid underflow)
log_posterior = log_prior.copy()
for word in email:
    log_posterior += log_likelihood[word]   # P(word|class) for each class
predicted_class = log_posterior.argmax()
```
:::

:::note
Bayes' theorem is symmetric — it inverts conditional probability. Most ML models are generative in structure (they model P(data|class)) but we want discriminative predictions (P(class|data)). Bayes' theorem is the bridge between the two.
:::
