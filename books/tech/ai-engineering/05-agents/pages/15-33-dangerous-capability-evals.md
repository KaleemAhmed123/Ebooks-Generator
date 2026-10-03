## Dangerous-capability evaluations

- The frameworks (15-31, 15-32) all hinge on one thing: **measuring** whether a model has a dangerous capability. **Dangerous-capability evaluations** are the tests that decide whether a threshold has been crossed — the empirical trigger for safeguards.

<svg viewBox="0 0 360 86" role="img" aria-label="Evaluations probe for dangerous capabilities; crossing a threshold triggers required safeguards" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="18" width="100" height="50" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="60" y="32" text-anchor="middle" font-size="6.5">eval the model</text><text x="60" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">cyber, bio,</text><text x="60" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">autonomy, persuasion</text>
  <rect x="132" y="26" width="90" height="34" rx="4" fill="#a03050"/><text x="177" y="40" text-anchor="middle" fill="#fff" font-size="6">threshold</text><text x="177" y="51" text-anchor="middle" fill="#fc8" font-size="5.5">crossed?</text>
  <rect x="244" y="20" width="106" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="297" y="32" text-anchor="middle" font-size="6">no → deploy</text>
  <rect x="244" y="44" width="106" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="297" y="56" text-anchor="middle" font-size="6">yes → safeguards / pause</text>
  <path d="M110 43 L130 43" stroke="#888" marker-end="url(#dce)"/><path d="M222 40 L242 30" stroke="#888" marker-end="url(#dce)"/><path d="M222 46 L242 52" stroke="#888" marker-end="url(#dce)"/>
  <defs><marker id="dce" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What they test:** structured probes for specific worrying abilities — can the model meaningfully uplift a cyberattack, help synthesize a pathogen, autonomously acquire resources or self-replicate, or manipulate people at scale? These are run with strong "elicitation" (giving the model tools, scaffolding, and multiple attempts) to measure the *ceiling* of what it can do, not the floor — you want to know the worst case, not the average.
- **The autonomy evals are this module's subject:** tasks measuring whether an agent can operate independently over long horizons, use resources, copy itself, or evade shutdown — the concrete tests behind "model autonomy" as a tracked risk. Task-horizon measurement (15-35) is one such eval.
- **Why they are hard:** you must measure a capability *before* it is dangerous in the wild, with enough margin to react — and capabilities can be *hidden* (a model that sandbags, underperforming on the eval) or *emergent* (appearing suddenly with scale). Good elicitation and independent evaluation (15-34) exist to counter exactly these problems.

:::warn
The soundness of the whole governance edifice rests on the evaluations being *good enough* — measuring true capability, with enough lead time, before deployment. This is genuinely hard and unsolved: elicitation may miss a capability the model has (false safety), a model could in principle underperform strategically on evals, and dangerous capabilities can emerge between evaluation points. This is why *external, independent* evaluation and continuous monitoring (next page) are emphasized — no single internal test at one point in time is a reliable guarantee, and the frameworks' credibility depends on the evals keeping pace with the models.
:::
