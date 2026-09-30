## Feature engineering

- **Feature engineering** is turning raw data into inputs a model can use well. For classical ML it is where most of the accuracy is won or lost.
- A model is only as good as its features. The right transformation can make a simple model beat a complex one on bad features.

### The everyday moves

- **Scaling** — put features on the same range (mean 0, variance 1). Without it, a feature measured in the thousands drowns out one measured in decimals.
- **Encoding** — turn categories into numbers. **One-hot encoding** gives each category its own 0/1 column, so the model does not read a false order into them.
- **Crossing and binning** — combine features (`price per room`) or bucket a continuous one (`age → child/adult/senior`) to expose patterns.

:::warn
Fit every transformation on the **training data only**, then apply the same numbers to validation and test. Computing the mean or the scaling range over the whole dataset first leaks test information into training — **data leakage** — and inflates your scores in a way that vanishes in production.
:::

:::note
Deep learning's headline win is that it *learns* features from raw data, retiring much of this manual work for images, text, and audio. But on tabular data, hand-built features still matter — and clean features help every model, learned or not.
:::
