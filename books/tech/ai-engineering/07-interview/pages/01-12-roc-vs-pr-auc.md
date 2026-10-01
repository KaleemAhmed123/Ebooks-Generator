## ROC-AUC vs PR-AUC — when does ROC-AUC mislead you?

- **ROC-AUC** plots true-positive rate against false-positive rate across all thresholds; the area is the chance the model ranks a random positive above a random negative. 0.5 = coin flip, 1.0 = perfect.
- The problem: the false-positive rate has the large negative class in its denominator. On **heavy imbalance**, even many false positives barely move FPR, so ROC-AUC stays optimistically high while the model is useless in practice.
- **PR-AUC** (precision vs recall) has no true-negative term, so it stays honest under imbalance — it tracks exactly the rare-positive performance you care about.
- Rule of thumb: **balanced classes or you care about both classes → ROC-AUC. Rare positives → PR-AUC.**

:::interview
What's really being tested:

that you know ROC-AUC's blind spot under class imbalance and default to PR-AUC for rare-event problems (fraud, retrieval, anomaly).
:::
