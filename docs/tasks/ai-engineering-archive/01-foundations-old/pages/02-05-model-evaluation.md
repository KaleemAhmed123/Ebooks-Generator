## Model evaluation — the right metrics, the right splits

- **Accuracy** = (TP + TN) / total — fraction correct. **Misleading on imbalanced data**: a model that always predicts "not fraud" on 99%-non-fraud data gets 99% accuracy while catching zero fraud
- **Precision** = TP / (TP + FP) — of everything predicted positive, how many were actually positive. Optimise when false positives are costly (spam filter: marking real email as spam)
- **Recall** = TP / (TP + FN) — of all actual positives, how many were caught. Optimise when false negatives are costly (cancer screening: missing a tumour)
- **F1** = 2·P·R / (P + R) — harmonic mean. Use when neither precision nor recall clearly dominates

### Precision-recall tradeoff

<svg viewBox="0 0 460 80" role="img" aria-label="Precision-recall curve: as threshold drops, recall rises and precision falls; the operating point is chosen based on the cost of false positives vs false negatives" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="14">Precision</text>
  <line x1="8" y1="16" x2="8" y2="70" stroke="#1a1a1a" stroke-width="1"/>
  <line x1="8" y1="70" x2="440" y2="70" stroke="#1a1a1a" stroke-width="1"/>
  <text x="440" y="77">Recall</text>
  <path d="M16 20 Q100 22 180 35 Q260 52 340 68" fill="none" stroke="#24405e" stroke-width="2"/>
  <circle cx="200" cy="38" r="5" fill="#24405e"/>
  <text x="208" y="34" font-size="8" fill="#24405e">← operating point</text>
  <text x="60" y="60" font-size="8" fill="#6b6b6b">high threshold</text>
  <text x="310" y="28" font-size="8" fill="#6b6b6b">low threshold</text>
</svg>

### AUC-ROC — threshold-independent ranking quality

**AUC** (Area Under the ROC Curve) plots the true-positive rate against the false-positive rate across all thresholds. AUC = 0.5 means random guessing; AUC = 1.0 means perfect separation. It measures how well the model **ranks** positives above negatives, regardless of the chosen threshold.

### K-fold cross-validation

:::mint
```python
from sklearn.model_selection import StratifiedKFold, cross_val_score
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='f1')
print(f"F1: {scores.mean():.3f} ± {scores.std():.3f}")
```
:::

Use **stratified** K-fold on classification tasks: it preserves class ratios in every fold, preventing folds that accidentally contain no minority-class samples.

:::warn
**The test set must be touched exactly once.** If you look at test performance, adjust your model, then look again — it is no longer a test set. It has become a second validation set, and your reported number is optimistically biased. Treat the test set as the lock on the safe; the validation set is where all decisions are made.
:::
