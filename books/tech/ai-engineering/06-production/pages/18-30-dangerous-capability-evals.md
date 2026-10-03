## Dangerous-capability evaluations

- The frameworks' thresholds are only as good as the **evaluations** that measure whether a model crossed them. A dangerous-capability eval tries to *elicit the worst* a model can do in a risk domain — and the hard part is that a weak eval gives false safety.
- The domains map to the framework tiers: CBRN uplift, cyber-offence, AI-R&D acceleration, autonomous replication/resource acquisition, and (newer) large-scale persuasion/manipulation.

<svg viewBox="0 0 360 86" role="img" aria-label="Capability elicitation with scaffolding and fine-tuning gives a higher, truer measure than a bare prompt" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="66" x2="200" y2="66" stroke="#888"/><line x1="30" y1="12" x2="30" y2="66" stroke="#888"/>
  <rect x="42" y="52" width="26" height="14" fill="#cdd"/><text x="55" y="48" text-anchor="middle" font-size="5" fill="#6b6b6b">bare prompt</text>
  <rect x="80" y="38" width="26" height="28" fill="#6a9bd0"/><text x="93" y="34" text-anchor="middle" font-size="5" fill="#24405e">+ scaffold</text>
  <rect x="118" y="22" width="26" height="44" fill="#a03050"/><text x="131" y="18" text-anchor="middle" font-size="5" fill="#a03050">+ fine-tune</text>
  <text x="285" y="34" text-anchor="middle" font-size="6">measure the CEILING,</text><text x="285" y="46" text-anchor="middle" font-size="6">not the floor —</text><text x="285" y="58" text-anchor="middle" font-size="5.5" fill="#6b6b6b">an attacker will elicit more</text>
</svg>

- **Elicit the ceiling, not the floor.** A bare prompt undersells the model; a real attacker uses scaffolding, tools, fine-tuning, and best-effort prompting. So the eval must too — otherwise you certify "safe" against a lazy attacker and ship to a determined one. This is *capability elicitation*, and doing it well is a research skill.
- **The deception caveat compounds it.** If a model can tell it is being evaluated (18-11), it may sandbag — underperform on the eval to look safe. So dangerous-capability evals increasingly pair behavioural tests with interpretability probes (18-32) that read internal state the model cannot as easily fake.

:::note
This is the crux of why "we evaluated it and it's safe" is a weaker claim than it sounds: the result is only a *lower bound* on capability under *your* elicitation, and the model may be underperforming on purpose. A rigorous dangerous-capability eval states its elicitation method, argues it approximates a real adversary's, and treats the number as a floor on risk — not a ceiling. That humility is the difference between a safety case and a checkbox.
:::
