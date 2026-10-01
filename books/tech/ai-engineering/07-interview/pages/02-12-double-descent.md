## Classical theory says bigger models overfit. Why do huge models often generalize better?

- Classical bias-variance predicts a U-shaped test error: past some capacity, variance dominates and test error climbs. Modern overparameterised nets break that curve.
- **Double descent:** as capacity grows, test error first drops (underfit), rises near the **interpolation threshold** (just barely able to fit the training data — the worst spot), then **drops again** as capacity grows well past it.
- In the overparameterised regime there are many zero-training-error solutions, and SGD is biased toward **simpler, flatter** ones that generalise — an implicit regularisation.

<svg viewBox="0 0 260 86" role="img" aria-label="Test error falls, rises to a peak at the interpolation threshold, then falls again as capacity keeps growing" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M14 20 L14 72 L246 72" stroke="#888" fill="none"/>
  <path d="M20 40 C50 58, 70 60, 90 30 C110 64, 120 64, 130 64 C170 64, 200 36, 240 32" stroke="#24405e" fill="none" stroke-width="2"/>
  <line x1="110" y1="20" x2="110" y2="72" stroke="#c0392b" stroke-dasharray="3 3"/>
  <text x="80" y="16" fill="#c0392b" font-size="7">interpolation threshold</text>
  <text x="150" y="28" fill="#24405e" font-size="7">2nd descent</text>
  <text x="110" y="84" text-anchor="middle" fill="#6b6b6b">model capacity →</text>
</svg>

:::warn
This does not mean "always go bigger." The peak is real — a model *just* big enough to memorise is often the worst choice. You want to be clearly left of, or well past, the threshold.
:::

:::interview
What's really being tested:

that you know the classical U-curve is incomplete, can describe double descent, and attribute the second descent to SGD's implicit bias toward simple solutions.
:::
