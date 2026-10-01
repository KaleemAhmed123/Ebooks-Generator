## Multi-agent debate

- **Debate** is a structured Society-of-Mind technique: multiple agents argue *different positions* on a question over several rounds, then a judge (or a vote) decides. The adversarial structure forces flaws into the open, improving accuracy and — importantly — *oversight*. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="Two agents debate opposing positions over rounds; a judge reads the debate and decides" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="80" height="26" rx="4" fill="#24405e"/><text x="54" y="46" text-anchor="middle" fill="#fff" font-size="6.5">agent A: pro</text>
  <rect x="130" y="30" width="80" height="26" rx="4" fill="#a03050"/><text x="170" y="46" text-anchor="middle" fill="#fff" font-size="6.5">agent B: con</text>
  <rect x="250" y="30" width="96" height="26" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="298" y="43" text-anchor="middle" font-size="6.5">judge</text><text x="298" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">decides</text>
  <path d="M94 38 L128 38" stroke="#888" marker-end="url(#db)"/><path d="M128 48 L96 48" stroke="#888" marker-end="url(#db)"/><path d="M210 43 L248 43" stroke="#888" marker-end="url(#db)"/>
  <text x="112" y="72" text-anchor="middle" font-size="5.5" fill="#6b6b6b">several rounds of rebuttal</text>
  <defs><marker id="db" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** assign agents opposing positions (or have them independently answer, then critique each other), run several **rounds** where each rebuts the other's arguments, and end with a **judge** — another model or a human — reading the debate and deciding. The back-and-forth exposes weak arguments (the opponent attacks them) and surfaces the strongest case for each side.
- **Why it improves accuracy:** a single agent can be *confidently wrong* with no one to challenge it. In debate, a wrong claim gets *attacked*, and a claim that survives rebuttal is more trustworthy. It is Reflexion/self-critique (14-12, 14-13) made *adversarial and external* — the critic is a motivated opponent, not the flawed self.
- **The deeper motivation — scalable oversight:** debate is studied as a way for humans to supervise AI *smarter than themselves*. If a judge cannot evaluate a hard answer directly, watching two capable agents argue — one trying to expose the other's errors — may let the judge decide correctly even without fully understanding the domain. It is a proposed answer to overseeing superhuman systems (15-36).

:::interview
"How does multi-agent debate improve answers, and what's its bigger purpose?"

Agents argue opposing positions over several rounds and a judge decides. It improves accuracy because a lone agent's confident errors go unchecked, whereas in debate a wrong claim gets *attacked* by a motivated opponent, so surviving claims are more trustworthy — adversarial, external critique versus flawed self-review. Its bigger purpose is scalable oversight: if a human judge can't evaluate a superhuman answer directly, watching two strong agents debate — each exposing the other's flaws — may let the judge reach the right verdict without fully understanding the domain. It's a candidate mechanism for supervising AI more capable than its overseers.
:::
