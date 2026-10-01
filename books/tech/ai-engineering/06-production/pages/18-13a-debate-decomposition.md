## Debate and task decomposition

- Scalable oversight (18-13) needs *mechanisms* a weaker overseer can actually run. Two are central: **debate** and **task decomposition**. Both work by breaking an unverifiable judgment into pieces a weaker judge *can* verify.
- **Debate:** two strong models argue opposite sides of a question in front of a weaker judge. The bet is that *defending a lie is harder than defending the truth* — a false claim can be picked apart by an equally-strong opponent, so the judge, though weaker, can tell who's right by watching the argument collapse.

<svg viewBox="0 0 360 84" role="img" aria-label="Two strong models debate a question; a weaker judge decides, exploiting that lies are harder to defend" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="16" width="80" height="20" rx="3" fill="#24405e"/><text x="54" y="29" text-anchor="middle" fill="#fff" font-size="6">strong: "yes because…"</text>
  <rect x="14" y="48" width="80" height="20" rx="3" fill="#a03050"/><text x="54" y="61" text-anchor="middle" fill="#fff" font-size="6">strong: "no because…"</text>
  <rect x="140" y="32" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="175" y="42" text-anchor="middle" font-size="6">weak judge</text><text x="175" y="50" text-anchor="middle" font-size="5" fill="#6b6b6b">picks a side</text>
  <rect x="256" y="32" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="301" y="45" text-anchor="middle" font-size="6">verified answer</text>
  <path d="M94 28 L138 38 M94 58 L138 46 M210 42 L254 42" stroke="#888" marker-end="url(#db)"/>
  <defs><marker id="db" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Task decomposition** (recursive reward modelling, iterated amplification): break a hard-to-verify task into sub-claims the overseer *can* check, verify each, and compose. Verifying "is this 100-page proof correct?" becomes verifying many small, checkable steps — the overseer never has to judge the whole thing at once.
- **The shared assumption and its risk.** Both assume verification decomposes cleanly and that a strong debater can't fool a weaker judge with a *convincing* wrong argument. That assumption is exactly what's under research — an "obfuscated argument" that the judge can't follow either way breaks debate.

:::interview
"Explain how debate could align a superhuman model."

The insight is asymmetry: even if a model is smarter than the human judge, if *two* equally-strong models argue opposite sides, defending a falsehood should be harder than defending the truth — a lie has weak points an equally-capable opponent can expose — so the weaker judge can adjudicate by watching which argument survives scrutiny. It scales oversight because the human checks the *debate*, not the *answer*. The open risk to name: obfuscated arguments the judge can't evaluate either way, which is why debate is a promising research direction, not a solved mechanism.
:::
