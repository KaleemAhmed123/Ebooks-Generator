## Bias-variance tradeoff and regularization

- **Bias** — systematic error from an underpowered model. A linear model fit to a parabola consistently misses the curve regardless of how much data you add. *Training error: high. Test error: high. Gap: small*
- **Variance** — sensitivity to training data. A degree-20 polynomial threads every training point but oscillates wildly on new inputs. *Training error: low. Test error: high. Gap: large*
- **Irreducible noise** — inherent randomness in the labels (measurement error, intrinsic uncertainty). No model can do better than this floor

### The decomposition and the U-curve

<svg viewBox="0 0 460 104" role="img" aria-label="U-shaped total error curve: high bias at low complexity, high variance at high complexity, minimum total error at sweet spot in the middle" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="14">Error</text>
  <line x1="8" y1="16" x2="8" y2="96" stroke="#1a1a1a"/>
  <line x1="8" y1="96" x2="456" y2="96" stroke="#1a1a1a"/>
  <text x="456" y="100">Complexity</text>
  <!-- bias^2 curve: decreasing -->
  <path d="M16 22 Q80 24 160 48 Q240 72 440 88" fill="none" stroke="#e04040" stroke-width="1.5"/>
  <text x="80" y="38" fill="#e04040" font-size="8">Bias²</text>
  <!-- variance curve: increasing -->
  <path d="M16 88 Q80 82 160 68 Q240 42 440 22" fill="none" stroke="#2480e4" stroke-width="1.5"/>
  <text x="360" y="36" fill="#2480e4" font-size="8">Variance</text>
  <!-- total error: U-shape -->
  <path d="M16 30 Q100 38 200 52 Q260 60 300 58 Q350 56 440 68" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="170" y="48" font-size="8" fill="#6b6b6b">Total error</text>
  <!-- sweet spot -->
  <line x1="296" y1="20" x2="296" y2="96" stroke="#24405e" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="298" y="18" font-size="8" fill="#24405e">optimum</text>
</svg>

`Total error = Bias² + Variance + Noise`

### Diagnosing from train/test curves

| Symptom | Diagnosis | Fix |
|---|---|---|
| Train error high, Test error high | High bias (underfit) | More complex model, more features |
| Train error low, Test error high | High variance (overfit) | More data, regularization, dropout |
| Both errors low, small gap | Good fit | Ship it |
