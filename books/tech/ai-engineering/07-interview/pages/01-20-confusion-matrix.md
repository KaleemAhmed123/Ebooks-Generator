## Why is a confusion matrix more useful than any single score?

- A **confusion matrix** is the 2×2 (or N×N) table of predicted vs actual: true positives, false positives, false negatives, true negatives. Every scalar metric is just one summary of it.
- A single number (accuracy, F1) **compresses away the error structure**. Two models with the same F1 can fail completely differently — one over-flags, one under-flags. The product cares which.
- From the matrix you derive *every* metric at your chosen threshold, and you see the **absolute counts**: "14 false negatives on 200 cases" is a business conversation; "0.93 F1" is not.
- In production triage it tells you *where* to spend: are errors mostly misses (push recall) or false alarms (push precision)?

<svg viewBox="0 0 220 86" role="img" aria-label="Confusion matrix: rows actual, columns predicted; diagonal is correct, off-diagonal is the two error types" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="70" y="10" fill="#6b6b6b">predicted</text>
  <rect x="60" y="14" width="70" height="28" fill="#e8f4ec" stroke="#24405e"/><text x="95" y="31" text-anchor="middle">TP</text>
  <rect x="130" y="14" width="70" height="28" fill="#fbeaea" stroke="#24405e"/><text x="165" y="31" text-anchor="middle">FP</text>
  <rect x="60" y="42" width="70" height="28" fill="#fbeaea" stroke="#24405e"/><text x="95" y="59" text-anchor="middle">FN</text>
  <rect x="130" y="42" width="70" height="28" fill="#e8f4ec" stroke="#24405e"/><text x="165" y="59" text-anchor="middle">TN</text>
  <text x="6" y="31" fill="#6b6b6b">actual +</text><text x="6" y="59" fill="#6b6b6b">actual −</text>
</svg>

:::interview
What's really being tested:

that you'd ask to see the full error breakdown before trusting a leaderboard number, because the two error types drive different product decisions.
:::
