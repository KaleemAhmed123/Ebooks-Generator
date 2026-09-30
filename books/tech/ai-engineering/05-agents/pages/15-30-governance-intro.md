## Why frontier labs self-govern

- Everything so far is *engineering* safety — what *you* build around *your* agent. This cluster is *governance* — how the labs building the frontier models manage the risk that a *sufficiently capable* model is dangerous regardless of the app around it. It matters to an AI engineer because these frameworks shape what models you can use, when, and under what constraints. **[VERIFY]**

<svg viewBox="0 0 360 88" role="img" aria-label="As model capability rises, potential for misuse rises, so labs tie safeguards to capability thresholds" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="70" x2="345" y2="70" stroke="#888"/><line x1="30" y1="12" x2="30" y2="70" stroke="#888"/>
  <path d="M30 66 L340 20" stroke="#24405e" stroke-width="1.5"/><text x="250" y="26" font-size="6" fill="#24405e">capability</text>
  <path d="M30 68 Q200 60 340 26" stroke="#a03050" stroke-width="1.5" fill="none"/><text x="250" y="50" font-size="6" fill="#a03050">misuse potential</text>
  <line x1="230" y1="12" x2="230" y2="70" stroke="#a03050" stroke-dasharray="3,2"/><text x="230" y="84" text-anchor="middle" font-size="5.5" fill="#a03050">threshold → new safeguards required</text>
</svg>

- **The core idea:** as models get more capable, they gain abilities that could cause serious harm — helping create weapons, conducting cyberattacks, or (the theme of this module) acting autonomously in ways hard to control. Below some capability, ordinary safeguards suffice; above it, stronger measures are required. **Responsible-scaling** frameworks tie the *safeguards* to *measured capability*: don't deploy or even train past a threshold until you can show you can contain what you've built.
- **Why labs do this voluntarily:** partly genuine risk management, partly to demonstrate the industry can self-regulate ahead of external regulation. The frameworks are public commitments — the major labs each published one (next pages), broadly similar in structure: define dangerous-capability thresholds, evaluate models against them, and gate deployment/training on meeting corresponding safety standards.
- **Why it reaches you:** these policies determine which model capabilities get released, with what access controls, and with what monitoring — the raw materials of the agents you build. An agent engineer should understand the governance layer above the models the way a web developer understands the platform they build on.

:::note
Governance is the outermost ring of the safety picture: your engineering safeguards (the safety stack, 15-29) contain *your* deployment; responsible-scaling policies contain the *models themselves* at the point of creation. The through-line with the whole module holds — **capability is traded for control, and control must scale with capability** — now applied not to one agent but to frontier AI as a whole. The next pages cover the specific frameworks by name, because they are the vocabulary of AI safety governance in 2026.
:::
