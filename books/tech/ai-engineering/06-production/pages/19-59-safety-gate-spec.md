## Flagship 12: constitutional safety gate — spec

- **Goal:** build the end-to-end safety gate a production LLM sits behind — a layered pipeline that screens inputs, enforces a constitution, and screens outputs, with a refusal eval to measure it. This assembles Module 18's runtime defenses into one shippable component.

<svg viewBox="0 0 360 88" role="img" aria-label="Safety gate layers: input classifier, injection detector, constitution check, model, output classifier, each able to block" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="36" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="28" y="47" text-anchor="middle">input</text>
  <rect x="54" y="36" width="52" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="80" y="44" text-anchor="middle">in classifier</text><text x="80" y="51" text-anchor="middle" font-size="5">+injection det.</text>
  <rect x="112" y="36" width="50" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="137" y="47" text-anchor="middle">constitution</text>
  <rect x="168" y="36" width="44" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="190" y="47" text-anchor="middle">model</text>
  <rect x="218" y="36" width="54" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="245" y="47" text-anchor="middle">out classifier</text>
  <rect x="278" y="36" width="74" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="315" y="47" text-anchor="middle">allow / refuse</text>
  <path d="M48 44 L52 44" stroke="#888" marker-end="url(#sg2)"/><path d="M106 44 L110 44" stroke="#888" marker-end="url(#sg2)"/><path d="M162 44 L166 44" stroke="#888" marker-end="url(#sg2)"/><path d="M212 44 L216 44" stroke="#888" marker-end="url(#sg2)"/><path d="M272 44 L276 44" stroke="#888" marker-end="url(#sg2)"/>
  <text x="180" y="72" text-anchor="middle" font-size="6" fill="#a03050">any layer can block — defense in depth, not one wall</text>
  <defs><marker id="sg2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Five layers, from Module 18.** An **input classifier** (Llama Guard) + **injection detector** screen the request; a **constitution** (Constitutional AI rules) shapes the model's behaviour; the model runs; an **output classifier** screens the response. Any layer can block — defense in depth, because no single classifier is a wall (18-22).
- **The constitution is the configurable policy** — the written rules (allowed/forbidden, tone, refusal style) the model checks against, the CAI mechanism (18-06) as a runtime engine, not just a training method.

:::note
The layered design is the whole point: input screening catches the obvious, the constitution shapes the model's own behaviour, output screening catches what slipped through (including obfuscated jailbreaks the input filter missed, 18-17). Each layer has false negatives, but stacked they multiply the odds of catching harm. This is Module 18's "no single defense" lesson built into one gate — and the refusal eval (19-61) is how you *measure* whether the stack actually works instead of assuming it does.
:::
