## Evaluation metrics

- **Accuracy** — the fraction of predictions that are correct — is the obvious metric and often the wrong one.
- On a dataset that is 99% "not fraud", a model that always says "not fraud" scores 99% accuracy and catches zero fraud. You need metrics that see the errors that matter.

### Precision and recall

- **Precision** — of the cases the model flagged, how many were right? (Punishes false alarms.)
- **Recall** — of the cases that were truly positive, how many did the model catch? (Punishes misses.)
- They trade off. A cancer screen wants high **recall** (miss nothing). A spam filter wants high **precision** (never bin real mail).
- **F1 score** — the harmonic mean of the two, when you need one number balancing both.

<svg viewBox="0 0 300 92" role="img" aria-label="A confusion matrix showing true and false positives and negatives" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="90" y="20" width="90" height="26" fill="#eafaf0" stroke="#1a3a2a"/><text x="135" y="36" text-anchor="middle">true positive</text>
  <rect x="180" y="20" width="90" height="26" fill="#fdecea" stroke="#c0392b"/><text x="225" y="36" text-anchor="middle">false positive</text>
  <rect x="90" y="46" width="90" height="26" fill="#fdecea" stroke="#c0392b"/><text x="135" y="62" text-anchor="middle">false negative</text>
  <rect x="180" y="46" width="90" height="26" fill="#eafaf0" stroke="#1a3a2a"/><text x="225" y="62" text-anchor="middle">true negative</text>
  <text x="45" y="36" text-anchor="middle" fill="#6b6b6b">pred +</text><text x="45" y="62" text-anchor="middle" fill="#6b6b6b">pred −</text>
</svg>

:::warn
Always ask what a metric hides. A single accuracy figure on imbalanced data is the classic way benchmarks lie. Report precision and recall together, or the F1, and know which error is the costly one for your problem.
:::
