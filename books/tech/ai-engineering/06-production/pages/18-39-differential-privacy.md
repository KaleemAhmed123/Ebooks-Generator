## Differential privacy for LLMs

- Models memorise training data — and can be made to *regurgitate* it: a name, an address, a secret from the training set, extractable by the right prompt. **Differential privacy (DP)** is the rigorous defence: a mathematical guarantee that the model's behaviour barely changes whether or not any *single* individual's data was in the training set.
- The guarantee is quantified by **epsilon (ε)** — the privacy budget. Small ε = strong privacy (one person's data has almost no effect on the model) but more added noise, so lower utility. Large ε = weaker privacy, higher utility.

<svg viewBox="0 0 340 78" role="img" aria-label="A privacy-utility tradeoff curve: smaller epsilon gives stronger privacy but lower model utility" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="62" x2="316" y2="62" stroke="#888"/><line x1="30" y1="10" x2="30" y2="62" stroke="#888"/>
  <text x="175" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">privacy budget ε →</text>
  <text x="16" y="38" font-size="5.5" fill="#6b6b6b" transform="rotate(-90 16 38)">utility</text>
  <path d="M40 58 Q120 26 200 20 Q260 16 310 14" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <text x="70" y="52" font-size="5.5" fill="#a03050">small ε: private, noisy</text><text x="270" y="26" font-size="5.5" fill="#1a3a2a">large ε: useful, leaky</text>
</svg>

- **How it is applied to LLMs.** *DP-SGD* — add calibrated noise to gradients during training so no single example dominates what the model learns. Also DP fine-tuning on sensitive data, and DP for synthetic-data generation. The noise is what buys the guarantee, and it is what costs the utility.
- **The tradeoff is unavoidable and must be stated.** There is no free privacy: stronger guarantees (smaller ε) mean more noise and a weaker model. You choose ε for the sensitivity of the data and the stakes of a leak, and you *report* it — an unstated ε is an unstated privacy claim.

:::note
DP matters wherever a model trains or fine-tunes on personal data — healthcare, finance, user content — because *memorisation-and-extraction* is a real, demonstrated leak, not a hypothetical. It complements the operational privacy controls of Module 17 (PII redaction, retention limits, 17-53): those protect data *in the pipeline*, DP protects against the *model itself* becoming a leak of its training data. The engineering discipline is to pick and *disclose* ε, and to test extraction, rather than assume "the model won't remember."
:::
