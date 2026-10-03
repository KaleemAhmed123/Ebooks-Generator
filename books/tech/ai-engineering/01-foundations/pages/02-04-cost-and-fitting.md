## Fitting a line: the cost function

- "Fitting" means choosing the weights that make the line pass as close to the points as possible. To do that you need a number for *how far off* the line is.
- That number is the **cost** (or loss). For regression it is **mean squared error (MSE)**: the average of the squared gaps between prediction and truth.


### Why square the errors

- Squaring makes every gap positive, so errors above and below the line do not cancel out.
- It punishes big misses far more than small ones — a gap of 4 costs 16, a gap of 2 costs 4. The line is pulled hard toward outliers.

### Two ways to find the minimum

- **Normal equation** — solve for the exact best weights in one shot with linear algebra. Perfect, but it inverts a matrix, so it is only practical for a modest number of features.
- **Gradient descent** — walk downhill on the cost, as in Module 1. Slower per answer, but it scales to millions of features and is how every large model is trained.

:::warn
Because MSE squares the gaps, a single wild outlier can dominate the cost and tilt the whole line toward it. When data has heavy outliers, use a robust loss (such as Huber) or clean the data first.
:::
