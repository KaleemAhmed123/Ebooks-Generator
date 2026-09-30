## Scope contracts and isolation

- A **scope contract** is an explicit, enforced boundary on what an agent (or subagent) may touch — which files, which tools, which data, which actions. It is least privilege (13-15) raised to a design principle: define the sandbox *before* the agent runs, not after it misbehaves.

<svg viewBox="0 0 360 90" role="img" aria-label="An agent confined to a scope of specific files and tools, unable to reach outside it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="30" y="14" width="180" height="66" rx="6" fill="#eef6fb" stroke="#24405e" stroke-dasharray="4,2"/><text x="120" y="26" text-anchor="middle" font-size="6" fill="#24405e">scope: /src/auth + [read, edit, test]</text>
  <circle cx="120" cy="52" r="16" fill="#24405e"/><text x="120" y="55" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <rect x="250" y="24" width="90" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="295" y="37" text-anchor="middle">/src/billing ✗</text>
  <rect x="250" y="52" width="90" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="295" y="65" text-anchor="middle">deploy tool ✗</text>
  <path d="M136 52 L248 34" stroke="#a03050" stroke-dasharray="2,2"/><path d="M136 56 L248 60" stroke="#a03050" stroke-dasharray="2,2"/>
</svg>

- **What a scope contract specifies:** the files/directories the agent may read and write, the tools it may call, the data it may access, and the actions it may take. Anything outside is *denied by construction* (roots, 13-33; allowed-tools, 14-90; permissions, 14-88) — not by asking the agent to stay in bounds.
- **Why it is powerful:**
  - **Safety** — a tightly-scoped agent has a small blast radius (14-127); it *cannot* delete the wrong thing because it cannot reach it.
  - **Reliability** — a smaller scope means fewer ways to go wrong and easier reasoning; the agent is not distracted by irrelevant files or tempted by dangerous tools.
  - **Parallelism** — scopes that do not overlap let multiple agents work concurrently without conflict (the partition-before-launch rule for parallel agents).
- **Isolation extends it:** run the agent in an isolated environment (a worktree, a container, a copy) so even its allowed actions cannot affect anything outside the scope until you promote the result (propose-then-commit, Module 15).

:::interview
**"How do you safely run an agent that edits code?"** Give it a scope contract and isolate it. Define upfront exactly what it may touch — specific directories, a whitelist of tools (read, edit, test), no deploy or credential access — and enforce that with roots/permissions so anything outside is denied by construction, not by instruction. Run it in an isolated workspace (a git worktree or container) so its edits are contained until reviewed and promoted. Tight scope shrinks the blast radius, reduces failure modes, and lets you run several agents in parallel on non-overlapping scopes.
:::
