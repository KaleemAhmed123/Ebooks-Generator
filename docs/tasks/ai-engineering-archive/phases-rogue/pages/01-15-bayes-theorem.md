# AI Engineering: From Scratch

## Bayes' Theorem

Probability tells you what to expect. Bayes' theorem tells you how to update your expectations when faced with new evidence.

$$ P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)} $$

### The Four Components

1. **Prior ($P(A)$):** Your baseline belief before observing evidence.
2. **Likelihood ($P(B|A)$):** How probable the evidence is, assuming the belief is true.
3. **Evidence ($P(B)$):** The total probability of observing the evidence under all scenarios. Acts as a normalizing constant.
4. **Posterior ($P(A|B)$):** Your updated, mathematically sound belief after observing the evidence.

### The Base Rate Fallacy

If a disease affects 1 in 10,000 people, and a test is 99% accurate, a positive result implies less than a 1% chance you are sick. The rare prior dominates the accurate likelihood. Every spam filter, anomaly detector, and diagnostic AI uses this theorem to avoid generating mostly false alarms.
