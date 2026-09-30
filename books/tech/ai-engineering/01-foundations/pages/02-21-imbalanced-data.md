## Imbalanced data

- Many real problems are lopsided: 1 fraud per 1,000 transactions, a rare disease, a rare defect. The interesting class is the tiny one.
- A model trained naively learns the laziest rule — "always predict the majority" — and scores high accuracy while catching none of what matters.

### What to do instead

- **Resample.** Oversample the rare class (duplicate or synthesize with **SMOTE**, which interpolates new minority examples) or undersample the common one.
- **Reweight.** Tell the loss that a mistake on the rare class costs more, so the model cannot ignore it.
- **Change the metric.** Track precision, recall, and F1 on the rare class — never bare accuracy.
- **Move the threshold.** Lower the 0.5 cutoff so borderline cases are caught, trading precision for recall where misses are costly.

:::warn
Apply resampling to the **training set only**. Oversampling before you split leaks copies of the same points into both training and test, so the model "sees the answers" and your scores look far better than reality. Split first, resample second.
:::

:::note
Ask which error hurts more. A missed fraud (false negative) may cost thousands; a false alarm costs a phone call. That asymmetry, not accuracy, should drive every choice on this page.
:::
