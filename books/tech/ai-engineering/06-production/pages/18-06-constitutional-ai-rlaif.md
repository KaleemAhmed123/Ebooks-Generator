## Constitutional AI and RLAIF

- RLHF needs humans to label which response is better — slow, expensive, inconsistent, and it bakes in whatever the raters happen to reward (including sycophancy). **Constitutional AI (CAI)** and **RLAIF** (Reinforcement Learning from AI Feedback) replace much of that human labelling with a written set of principles — a **constitution** — and a model that critiques against it.

<svg viewBox="0 0 360 92" role="img" aria-label="Constitutional AI: the model generates, critiques its own output against written principles, revises, and the revised pairs train the model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="34" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="47" text-anchor="middle" font-size="6">generate</text>
  <rect x="82" y="34" width="60" height="22" rx="3" fill="#24405e"/><text x="112" y="43" text-anchor="middle" font-size="6" fill="#fff">critique vs</text><text x="112" y="52" text-anchor="middle" font-size="5.5" fill="#cdd">constitution</text>
  <rect x="160" y="34" width="52" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="186" y="47" text-anchor="middle" font-size="6">revise</text>
  <rect x="230" y="34" width="52" height="22" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="256" y="43" text-anchor="middle" font-size="5.5">preference</text><text x="256" y="52" text-anchor="middle" font-size="5.5">pairs</text>
  <rect x="300" y="34" width="48" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="324" y="47" text-anchor="middle" font-size="6">train</text>
  <path d="M64 45 L80 45" stroke="#888" marker-end="url(#ca)"/><path d="M142 45 L158 45" stroke="#888" marker-end="url(#ca)"/><path d="M212 45 L228 45" stroke="#888" marker-end="url(#ca)"/><path d="M282 45 L298 45" stroke="#888" marker-end="url(#ca)"/>
  <path d="M324 56 Q324 76 190 76 Q38 76 38 58" fill="none" stroke="#888" stroke-dasharray="3 2" marker-end="url(#ca)"/>
  <defs><marker id="ca" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The loop:** the model generates a response, *critiques* its own output against the constitution's principles ("was that harmful? revise it to be harmless but still helpful"), produces a revised answer, and the (original, revised) pairs become preference data — an AI labelling the preferences a human would have. The human effort moves from labelling thousands of examples to *writing the principles*.
- **Why it matters for safety.** The constitution is *legible and editable* — the values are written down and can be audited and changed, instead of hidden in a rater pool's implicit preferences. It scales oversight (you supervise principles, not examples) and reduces sycophancy by letting principles explicitly value honesty over agreement.

:::note
CAI/RLAIF is the bridge from "alignment as expensive human labelling" to "alignment as a written, auditable specification" — which is why it recurs as the **action constitution** for agents (Booklet 5) and the **scalable-oversight** theme later in this module. Its own risk is that the AI critic inherits the base model's blind spots: if the model cannot recognise a harm, its self-critique will not catch it either, so a human still writes and audits the constitution and spot-checks the output.
:::
