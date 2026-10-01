## Fairness mitigations

- Measuring bias (18-36) and choosing a criterion (18-37) tells you *where* and *by what definition* a model is unfair. **Mitigations** are how you fix it, and they attach at three points in the pipeline — each with a different cost.

<svg viewBox="0 0 360 84" role="img" aria-label="Three mitigation points: pre-processing the data, in-processing the training, post-processing the outputs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="30" width="100" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="62" y="40" text-anchor="middle" font-size="6">pre-processing</text><text x="62" y="49" text-anchor="middle" font-size="5" fill="#6b6b6b">fix the data</text>
  <rect x="130" y="30" width="100" height="24" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="40" text-anchor="middle" font-size="6">in-processing</text><text x="180" y="49" text-anchor="middle" font-size="5" fill="#6b6b6b">fix the training</text>
  <rect x="248" y="30" width="100" height="24" rx="3" fill="#f3ede8" stroke="#8a6d3b"/><text x="298" y="40" text-anchor="middle" font-size="6">post-processing</text><text x="298" y="49" text-anchor="middle" font-size="5" fill="#6b6b6b">fix the outputs</text>
  <path d="M112 42 L128 42 M230 42 L246 42" stroke="#888" marker-end="url(#fm)"/>
  <defs><marker id="fm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Pre-processing** — fix the *data*: reweight or resample under-represented groups, remove biased features, augment. Cheapest to reason about, but you can't fix a bias the data doesn't reveal, and proxies (zip code for race) survive naive feature removal.
- **In-processing** — fix the *training*: add a fairness constraint or adversarial term to the loss so the model optimises accuracy *and* the chosen fairness criterion together. Most powerful, but requires retraining and encodes the criterion choice into the model.
- **Post-processing** — fix the *outputs*: adjust decision thresholds per group to equalise the chosen metric. Cheapest to deploy (no retraining), works on a black-box model, but adjusting by group is legally fraught in some domains and treats the symptom.

:::interview
"You found your model is unfair. What do you actually do?"

First fix the *measurement* — pick the fairness criterion the harm demands (18-37), disaggregated. Then mitigate at the cheapest effective layer: **pre-processing** (reweight/rebalance data, remove proxies) if the bias is data-driven, **in-processing** (a fairness constraint in the loss) if you can retrain and want the strongest fix, or **post-processing** (per-group thresholds) for a quick black-box correction. Crucially, re-measure after — and accept the impossibility (18-38): satisfying one criterion sacrifices another, so I document *which* fairness property I optimised and the tradeoff I accepted. "Measure, pick a layer, mitigate, re-measure, document the tradeoff" — not "add a debias step" — is the answer.
:::
