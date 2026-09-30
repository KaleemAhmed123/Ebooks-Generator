# AI Engineering: From Scratch

## Logistic Regression

Linear regression outputs unbounded numbers (e.g., -5, 42, 100). If you are trying to classify Spam vs. Not Spam, unbounded numbers are useless. You need bounded probabilities between 0.0 and 1.0.

Despite its name, Logistic Regression is the baseline **classification** algorithm.

### The Sigmoid Function

It passes the linear equation $z = w^T x + b$ through the sigmoid function:

$$ \sigma(z) = \frac{1}{1 + e^{-z}} $$

Any large positive number becomes $\approx 1.0$. Any large negative number becomes $\approx 0.0$. Zero becomes exactly $0.5$.

### Binary Cross-Entropy Loss

You cannot use MSE with sigmoid. It creates a rippled, non-convex cost surface filled with local minima. Instead, Logistic Regression uses Binary Cross-Entropy (Log Loss).

$$ Loss = - \frac{1}{N} \sum \left[ y \log(\hat{y}) + (1-y) \log(1-\hat{y}) \right] $$

This formula heavily penalizes confident but wrong predictions. If the true label is 1, and the model predicts 0.001, $\log(0.001)$ drives the penalty through the roof.

### Evaluation Metrics

Accuracy lies when data is imbalanced (e.g., 99% benign tumors). You evaluate classifiers using:
- **Precision:** Of the times it yelled "Wolf!", how many were actual wolves? (Reduces False Positives).
- **Recall:** Of all the actual wolves, how many did it catch? (Reduces False Negatives).
- **F1 Score:** The harmonic mean of precision and recall.
