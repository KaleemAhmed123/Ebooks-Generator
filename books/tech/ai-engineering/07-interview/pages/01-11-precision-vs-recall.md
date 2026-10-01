## Precision vs recall — when do you optimize which, and what does F1 hide?

- **Precision** = of the things we flagged, how many were right (`TP / (TP+FP)`). **Recall** = of the things we should have flagged, how many we caught (`TP / (TP+FN)`).
- Optimise **recall** when a miss is expensive: cancer screening, fraud, safety filters. You tolerate false alarms to avoid missing a true case.
- Optimise **precision** when a false alarm is expensive: a spam filter that deletes real mail, an auto-ban system. You'd rather miss some than wrongly flag.
- **F1** is their harmonic mean — one number, but it assumes precision and recall matter *equally* and ignores true negatives. If your costs are lopsided, F1 optimises the wrong balance.

:::mint
```text
Fβ = (1+β²)·P·R / (β²·P + R)     # β>1 weights recall, β<1 weights precision
```
:::

:::interview
What's really being tested:

that you tie the metric to the *cost of each error type* for this product, and that you know F1's equal-weight assumption is a choice, not a law.
:::
