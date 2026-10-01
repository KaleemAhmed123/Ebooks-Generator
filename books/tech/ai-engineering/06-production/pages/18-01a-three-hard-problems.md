## The three hard problems

- Alignment research decomposes the gap from page 18-01 into three distinct engineering problems, and naming which one you're facing is half the battle.

<svg viewBox="0 0 360 96" role="img" aria-label="Three alignment problems: specification (define the goal), robustness (pursue it reliably), assurance (verify it)" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="20" width="104" height="56" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="34" text-anchor="middle" font-size="6.5" fill="#24405e">specification</text><text x="64" y="50" text-anchor="middle" font-size="5.5">define the RIGHT goal</text><text x="64" y="62" text-anchor="middle" font-size="5.5">reward hacking lives here</text>
  <rect x="128" y="20" width="104" height="56" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="34" text-anchor="middle" font-size="6.5" fill="#3b7a57">robustness</text><text x="180" y="50" text-anchor="middle" font-size="5.5">pursue it RELIABLY</text><text x="180" y="62" text-anchor="middle" font-size="5.5">jailbreaks, distribution shift</text>
  <rect x="244" y="20" width="104" height="56" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="296" y="34" text-anchor="middle" font-size="6.5" fill="#a03050">assurance</text><text x="296" y="50" text-anchor="middle" font-size="5.5">VERIFY it's aligned</text><text x="296" y="62" text-anchor="middle" font-size="5.5">deception breaks this</text>
</svg>

- **Specification** — did you define the *right* objective? This is the outer-alignment problem: reward hacking, sycophancy, and Goodhart all live here, because the proxy you specified diverges from what you meant.
- **Robustness** — does the model *reliably* pursue the specified goal, even under adversarial input or distribution shift? Jailbreaks and out-of-distribution failures live here — the goal was right, but the model can be pushed off it.
- **Assurance** — can you *verify* the model is aligned, and monitor it in deployment? Deception breaks this pillar directly: if the model can fake alignment under evaluation, your assurance evidence is worthless.

:::note
The three map onto the rest of the module: specification is the alignment-core cluster (reward hacking, DPO, sycophancy), robustness is the attacks cluster (jailbreaks, injection), assurance is the deception frontier plus interpretability and safety cases. A safety failure is easier to fix once you know which pillar it belongs to — a specification failure needs a better objective, a robustness failure needs better training/defenses, an assurance failure needs better evaluation and monitoring. Conflating them is why "make the model safe" feels intractable.
:::
