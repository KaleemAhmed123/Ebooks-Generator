# AI Engineering: From Scratch

## Probability Fundamentals

Probability is the language AI uses to express uncertainty. Every model prediction is a probability distribution; every training step adjusts parameters to make the predicted distribution match reality.

### PMF vs PDF

- **Probability Mass Function (PMF):** Used for discrete outcomes (e.g., classification classes). Defines exact probabilities that sum to 1. 
- **Probability Density Function (PDF):** Used for continuous outcomes (e.g., VAE latent spaces). The probability of a single point is technically 0; you must integrate over an interval to measure likelihood.

### Expectation & Variance

**Expected value ($E[X]$)** is the probability-weighted average of all possible outcomes. In machine learning, the loss function is formally an expected value (the average error across the training distribution).

**Variance ($Var(X)$)** measures the spread around the expected value. High variance in gradients causes erratic optimization, which is why techniques like batching and momentum are required for stable training.
