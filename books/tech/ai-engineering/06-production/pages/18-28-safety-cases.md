## Safety cases

- A **safety case** is a written, structured argument that a specific deployment is acceptably safe *under worst-case assumptions* — borrowed from aviation and nuclear engineering, where you must *argue* safety, not just test and hope. As models cross the higher framework tiers, an affirmative safety case becomes a deployment requirement.
- The standard structure rests on three pillars; a given case leans on whichever the risk allows.

<svg viewBox="0 0 360 92" role="img" aria-label="Three safety-case pillars: incapability, monitoring, and illegibility, each a way to argue a deployment is safe" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="16" y="24" width="104" height="52" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="68" y="38" text-anchor="middle" font-size="6.5" fill="#1a3a2a">incapability</text><text x="68" y="54" text-anchor="middle" font-size="5.5">it CAN'T cause</text><text x="68" y="64" text-anchor="middle" font-size="5.5">the harm</text>
  <rect x="128" y="24" width="104" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="38" text-anchor="middle" font-size="6.5" fill="#24405e">monitoring</text><text x="180" y="54" text-anchor="middle" font-size="5.5">we'd DETECT it</text><text x="180" y="64" text-anchor="middle" font-size="5.5">if it tried</text>
  <rect x="240" y="24" width="104" height="52" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="292" y="38" text-anchor="middle" font-size="6.5" fill="#8a6d3b">illegibility</text><text x="292" y="54" text-anchor="middle" font-size="5.5">it CAN'T plan</text><text x="292" y="64" text-anchor="middle" font-size="5.5">the harm coherently</text>
</svg>

- **Incapability** — argue the model simply lacks the capability (measured by dangerous-capability evals, or removed by unlearning). Strongest when true; the CBRN case leans here.
- **Monitoring** — argue that *if* the model tried something harmful, you would detect and stop it in time (the AI-control protocols of 18-12). Used when you cannot rule out the capability.
- **Illegibility** — argue the model cannot execute a *coherent* harmful plan (it lacks the situational awareness or long-horizon coherence). Fragile, since capability is rising.

:::interview
"What is a safety case and how would you argue one for a capable model?"

A safety case is a written worst-case argument that a deployment is acceptably safe, structured around three pillars — **incapability** (it can't do the harm), **monitoring** (we'd catch it if it tried), and **illegibility** (it can't coherently plan the harm). I'd pick the pillar the evidence supports: for a CBRN risk, incapability via dangerous-capability evals and unlearning; for deceptive-misalignment risk, monitoring plus control protocols, since I can't prove incapability. The mature framing is that "we tested it and it seemed fine" is *not* a safety case — a safety case names its worst-case assumption and the evidence that holds under it.
:::
