## Your classes are 99:1. Why is accuracy useless, and what do you do?

- With 99% negatives, a model that always predicts "negative" scores 99% accuracy while catching zero positives. **Accuracy rewards the majority class** and hides total failure on the one you care about.
- Measure what matters instead: **precision/recall**, **PR-AUC** (area under the precision-recall curve), and the confusion matrix. Pick the threshold from the cost of a false negative vs false positive, not 0.5.
- **Data fixes:** oversample the minority (SMOTE synthesises new minority points), undersample the majority, or combine. **Loss fixes:** class weights or focal loss (down-weights easy majority examples).
- Often the cleanest lever is the **decision threshold**: train normally, then move the cutoff to hit the recall the business needs.

:::warn
Resample only the training fold. Oversampling before the split leaks duplicated minority points into validation and inflates the score — a leakage trap hiding inside an imbalance fix.
:::

:::interview
What's really being tested:

that you reach for the right metric first, and that you know threshold-tuning and class weights often beat resampling — with the leakage caveat.
:::
