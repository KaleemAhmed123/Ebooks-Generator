## Continuous red-teaming

- Red-teaming (18-15) is not a launch gate you pass once — attacks evolve, models change, and public jailbreaks spread within hours, so red-teaming is a **continuous pipeline** wired into your development loop, like a security scanner or a test suite.

<svg viewBox="0 0 360 82" role="img" aria-label="A continuous red-team loop: attack suite runs in CI on every change, new attacks added from the wild, failures become regression tests" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="32" width="66" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="47" y="44" text-anchor="middle" font-size="6">attack suite</text>
  <rect x="100" y="32" width="60" height="18" rx="3" fill="#24405e"/><text x="130" y="44" text-anchor="middle" fill="#fff" font-size="6">run in CI</text>
  <rect x="180" y="32" width="70" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="215" y="44" text-anchor="middle" font-size="6">attack-success rate</text>
  <rect x="270" y="32" width="76" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="308" y="44" text-anchor="middle" font-size="6">gate + alert</text>
  <path d="M80 41 L98 41 M160 41 L178 41 M250 41 L268 41" stroke="#888" marker-end="url(#crt)"/>
  <path d="M308 32 Q308 12 160 12 Q47 12 47 30" fill="none" stroke="#3b7a57" stroke-dasharray="3 2" marker-end="url(#crt)"/><text x="180" y="10" text-anchor="middle" font-size="5.5" fill="#3b7a57">new attacks from the wild + failures → grow the suite</text>
  <defs><marker id="crt" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The loop.** A growing attack suite (garak/PyRIT + your product-specific attacks, 18-20/21) runs in CI on every model/prompt change, producing an **attack-success rate per family** (18-25). A regression (a family that now succeeds more) gates the release, exactly like a failed test. New jailbreaks from the wild and any production attack that landed get *added* to the suite as regression cases.
- **It's a ratchet, not a one-time pass.** Every attack that ever worked becomes a permanent test, so the same jailbreak can't recur — the suite only grows, and coverage compounds over time. This mirrors CI-gated evals (19-70): safety is a continuously-measured rate wired into the dev loop, not a pre-launch sign-off.

:::interview
"How do you keep an LLM product safe against jailbreaks over time, not just at launch?"

Continuous red-teaming, treated like a security test suite. A growing **attack suite** (automated tools + product-specific attacks across the taxonomy) runs **in CI on every model and prompt change**, producing an attack-success rate per family that **gates releases** — a regression blocks the merge. Then the ratchet: every new jailbreak from the wild, and every attack that lands in production, is **added as a permanent regression case**, so it can never recur and coverage only grows. Plus live monitoring of jailbreak/injection attempts in production feeding the loop. The framing: safety is a continuously-measured rate wired into the dev loop (like evals, 19-70), not a launch gate you pass once — because the attack surface reopens with every change and every new public exploit.
:::
