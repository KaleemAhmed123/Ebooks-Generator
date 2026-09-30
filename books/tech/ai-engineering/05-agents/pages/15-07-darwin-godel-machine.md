## The Darwin-Gödel Machine

- The **Darwin-Gödel Machine (DGM)** (2025) goes a step further than AlphaEvolve: it improves not a *solution* but **the agent itself** — an agent that rewrites its own code to become a better agent, keeping changes that empirically raise its performance. It is the closest working system to "self-improving agent." **[VERIFY]**

<svg viewBox="0 0 360 94" role="img" aria-label="An agent proposes edits to its own code, tests the new version on benchmarks, and keeps improvements in an archive" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="36" width="80" height="26" rx="3" fill="#24405e"/><text x="52" y="46" text-anchor="middle" fill="#fff" font-size="6">agent edits</text><text x="52" y="56" text-anchor="middle" fill="#cdd" font-size="5">its OWN code</text>
  <rect x="120" y="36" width="80" height="26" rx="3" fill="#a03050"/><text x="160" y="46" text-anchor="middle" fill="#fff" font-size="6">test new self</text><text x="160" y="56" text-anchor="middle" fill="#fc8" font-size="5">on benchmarks</text>
  <rect x="228" y="36" width="80" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="268" y="46" text-anchor="middle" font-size="6">archive of</text><text x="268" y="56" text-anchor="middle" font-size="5" fill="#6b6b6b">improved agents</text>
  <path d="M92 49 L118 49" stroke="#888" marker-end="url(#dg)"/><path d="M200 49 L226 49" stroke="#888" marker-end="url(#dg)"/><path d="M268 62 Q268 86 52 82 L52 64" stroke="#888" fill="none" marker-end="url(#dg)"/>
  <text x="330" y="50" font-size="6" fill="#6b6b6b">branch,</text><text x="330" y="60" font-size="6" fill="#6b6b6b">not replace</text>
  <defs><marker id="dg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The name's two halves:** *Gödel machine* — the theoretical ideal of a program that rewrites itself when it can prove the change is an improvement. *Darwin* — because proving improvement is intractable, DGM substitutes **empirical evolution**: try the change, *test* whether it helps on a benchmark, keep it if it does. Proof is replaced by measurement.
- **What it modifies:** the agent's own scaffolding — its tools, prompts, workflow, code. It proposes a change to how it operates, spins up the modified agent, evaluates it on coding benchmarks (SWE-bench, 14-120), and if it scores higher, adds it to a growing **archive** of agent variants (keeping diversity, not just the single best — open-ended exploration).
- **Why the archive matters:** keeping many variants (not overwriting the current best) avoids getting stuck in a local optimum and lets a currently-worse variant seed a later breakthrough — the open-ended-search insight (14-17).

:::warn
The DGM is where self-improvement's safety concern becomes concrete: an agent editing *its own code* to improve *itself* is the literal shape of recursive self-improvement. The safeguards in the real research are essential — a sandboxed environment, a fixed empirical evaluator it cannot alter to cheat, and human oversight of the archive. An unbounded self-modifying agent with a corruptible evaluator is exactly the scenario the responsible-scaling policies (15-32) are designed to catch before it is dangerous. Bounded and sandboxed, it is a research tool; unbounded, it is the thing to be careful about.
:::
