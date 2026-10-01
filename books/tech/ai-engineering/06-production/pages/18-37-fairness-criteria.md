## Fairness criteria

- "Fair" is not one thing — it is a *choice* among formal definitions that encode different values. You cannot design or defend a fair system without naming which criterion you mean, because they prescribe different behaviour and (next page) cannot all hold at once.

<svg viewBox="0 0 360 96" role="img" aria-label="Three fairness families: group parity, individual similarity, and counterfactual invariance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="20" width="108" height="64" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="66" y="34" text-anchor="middle" font-size="6.5" fill="#24405e">group</text><text x="66" y="50" text-anchor="middle" font-size="5.5">equal rates across</text><text x="66" y="60" text-anchor="middle" font-size="5.5">groups</text><text x="66" y="74" text-anchor="middle" font-size="5" fill="#6b6b6b">demographic parity,</text><text x="66" y="82" text-anchor="middle" font-size="5" fill="#6b6b6b">equalised odds</text>
  <rect x="126" y="20" width="108" height="64" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="34" text-anchor="middle" font-size="6.5" fill="#3b7a57">individual</text><text x="180" y="50" text-anchor="middle" font-size="5.5">similar people →</text><text x="180" y="60" text-anchor="middle" font-size="5.5">similar outcomes</text><text x="180" y="76" text-anchor="middle" font-size="5" fill="#6b6b6b">needs a similarity metric</text>
  <rect x="240" y="20" width="108" height="64" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="294" y="34" text-anchor="middle" font-size="6.5" fill="#8a6d3b">counterfactual</text><text x="294" y="50" text-anchor="middle" font-size="5.5">same outcome if</text><text x="294" y="60" text-anchor="middle" font-size="5.5">group were changed</text><text x="294" y="76" text-anchor="middle" font-size="5" fill="#6b6b6b">causal, hardest to verify</text>
</svg>

- **Group fairness** — equal *statistics* across groups. Flavours: *demographic parity* (equal positive rates), *equalised odds* (equal true/false-positive rates), *calibration* (a score means the same thing per group). The workhorse for allocative harm, but "equal rates" can conflict with "equal error rates."
- **Individual fairness** — *similar individuals get similar outcomes.* Intuitive, but it needs a "similarity" metric that itself encodes value judgements (which differences are relevant?), so it pushes the hard choice into defining similarity.
- **Counterfactual fairness** — the outcome would be *the same in a world where the individual's group were different.* Causal and principled, but requires a causal model of how the attribute influences everything, which is hard to build and verify.

:::interview
"How do you make a model fair?"

First reject the premise as stated: "fair" is a *choice*, not a property. I'd ask which harm we're preventing and pick the matching criterion — group parity/equalised odds for allocative decisions like lending, counterfactual invariance for "the answer shouldn't depend on a protected trait." Then measure against *that* criterion disaggregated by group, and — critically — acknowledge the tradeoff, because (next) you cannot satisfy all fairness definitions simultaneously. Naming the specific criterion and its cost, rather than promising "unbiased," is the entire signal.
:::
