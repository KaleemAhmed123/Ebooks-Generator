## Eval pitfalls

- Evals are only as trustworthy as their design, and a handful of pitfalls silently make an eval measure the wrong thing — reporting great numbers while the product is bad. Knowing them is what makes your evals honest.

<svg viewBox="0 0 360 88" role="img" aria-label="Four eval pitfalls: contamination, overfitting to the eval, stale eval sets, and gaming the metric" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#fdeef2" stroke="#a03050"><rect x="12" y="16" width="164" height="26" rx="3"/><rect x="184" y="16" width="164" height="26" rx="3"/><rect x="12" y="50" width="164" height="26" rx="3"/><rect x="184" y="50" width="164" height="26" rx="3"/></g>
  <text x="94" y="28" text-anchor="middle" font-size="6" fill="#a03050">contamination</text><text x="94" y="38" text-anchor="middle" font-size="5">test data leaked into training</text>
  <text x="266" y="28" text-anchor="middle" font-size="6" fill="#a03050">overfitting the eval</text><text x="266" y="38" text-anchor="middle" font-size="5">tuning until it passes THIS set</text>
  <text x="94" y="62" text-anchor="middle" font-size="6" fill="#a03050">stale set</text><text x="94" y="72" text-anchor="middle" font-size="5">no longer reflects real traffic</text>
  <text x="266" y="62" text-anchor="middle" font-size="6" fill="#a03050">gaming the metric</text><text x="266" y="72" text-anchor="middle" font-size="5">Goodhart: metric ≠ quality</text>
</svg>

- **Contamination** — the benchmark's data leaked into the model's training, so the score reflects memorization, not capability. Decontaminate training data (18-43), and prefer *private, recent* eval sets over public benchmarks for anything that matters.
- **Overfitting to the eval** — iterating prompts/models until they pass *this specific set* produces a config tuned to the test, not the task (Goodhart again, 18-03). Hold out a *fresh* eval the tuning never saw, and rotate cases in.
- **Stale sets** — an eval frozen a year ago no longer matches how users actually query today, so it certifies a model that's good at the past. Feed real production failures back in continuously (17-46a).

:::interview
"Your eval scores are great but users complain. What went wrong?"

The eval is measuring the wrong thing — walk the pitfalls. **Contamination**: the benchmark leaked into training, so the score is memorization; I'd check with a private/recent set. **Overfitting the eval**: we tuned until this specific set passed, so it's fit to the test not the task; I'd validate on a held-out fresh eval. **Stale set**: it no longer reflects current user traffic, so it certifies yesterday's problem; I'd refresh it from production failures. **Metric mismatch** (19-71): the metric doesn't capture real quality (exact-match on open-ended, string-match on code). The meta-point: "great eval scores + unhappy users" is almost always an *eval validity* problem, and the fix is a private, fresh, production-sourced eval with the right metric — not a better model.
:::
