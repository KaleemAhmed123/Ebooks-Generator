## Online evaluation

- Offline evals (a fixed test set, Module 18/19) tell you a change is good *before* you ship. **Online evaluation** tells you it stays good *after* — measuring quality on live production traffic, because real inputs drift away from any test set.
- You cannot grade every response by hand, so online eval is built from cheap signals plus sampled deep checks.

<svg viewBox="0 0 360 92" role="img" aria-label="Production traffic feeds implicit signals, sampled LLM-judge scoring, and human review, which roll up into a live quality metric" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="38" width="60" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="42" y="50" text-anchor="middle" font-size="6">live traffic</text>
  <rect x="104" y="12" width="96" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="152" y="23" text-anchor="middle" font-size="5.5">implicit: thumbs, edits, retries</text>
  <rect x="104" y="38" width="96" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="152" y="49" text-anchor="middle" font-size="5.5">sampled LLM-judge (1–5%)</text>
  <rect x="104" y="64" width="96" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="152" y="75" text-anchor="middle" font-size="5.5">human review (rare)</text>
  <rect x="236" y="38" width="112" height="18" rx="3" fill="#24405e"/><text x="292" y="50" text-anchor="middle" font-size="6" fill="#fff">live quality metric + alert</text>
  <path d="M72 44 L102 20" stroke="#888" marker-end="url(#oe)"/><path d="M72 47 L102 46" stroke="#888" marker-end="url(#oe)"/><path d="M72 50 L102 72" stroke="#888" marker-end="url(#oe)"/>
  <path d="M200 20 L234 44" stroke="#888" marker-end="url(#oe)"/><path d="M200 46 L234 47" stroke="#888" marker-end="url(#oe)"/><path d="M200 72 L234 50" stroke="#888" marker-end="url(#oe)"/>
  <defs><marker id="oe" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Three tiers by cost.** *Implicit signals* — thumbs, copy/edit/regenerate, follow-up rephrasings — are free and cover all traffic but are noisy. *Sampled LLM-as-judge* — score 1–5% of responses with a model against a rubric — is cheap enough to run continuously and catches quality regressions. *Human review* — a tiny sample — calibrates the judge and audits high-stakes paths.
- **The payoff is catching silent regressions.** A prompt tweak or a provider model update can quietly degrade quality with zero errors and normal latency — invisible to every dashboard except a live quality metric. Online eval is the only thing that pages you when the system gets *dumber*.

:::note
Online eval closes the loop offline eval opens: ship on offline confidence, then confirm on production reality, feeding real failures back into the offline set. Without it, "we evaluated it" means "it worked on data from three months ago." The senior habit is to treat a live quality metric as a first-class SLO (17-51), alerted on, not a report someone reads quarterly.
:::
