## Sandboxing for autonomy

- The strongest structural safeguard for an autonomous agent is **sandboxing** — running it in an isolated environment where, whatever it does, it *cannot* reach anything you have not explicitly allowed. Where gates and rollback handle bad *actions*, the sandbox limits what actions are even *possible*.

<svg viewBox="0 0 360 92" role="img" aria-label="A sandboxed agent can act freely inside its box but cannot reach production, credentials, or the network" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="14" width="170" height="70" rx="6" fill="#f7f7fb" stroke="#888" stroke-dasharray="4,2"/><text x="99" y="26" text-anchor="middle" font-size="6.5">sandbox</text>
  <circle cx="70" cy="52" r="18" fill="#24405e"/><text x="70" y="55" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <rect x="120" y="40" width="52" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="146" y="55" text-anchor="middle" font-size="5.5">copy of data</text>
  <rect x="210" y="20" width="130" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="275" y="32" text-anchor="middle" font-size="6">production ✗</text>
  <rect x="210" y="42" width="130" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="275" y="54" text-anchor="middle" font-size="6">real credentials ✗</text>
  <rect x="210" y="64" width="130" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="275" y="76" text-anchor="middle" font-size="6">open network ✗</text>
</svg>

- **What to isolate:**
  - **Compute** — run the agent's code/tools in a container or microVM with dropped privileges (13-49), so code execution cannot touch the host.
  - **Data** — give it a *copy* or a scoped subset, never the production database directly, so a destructive action hits the copy.
  - **Credentials** — no production keys; use scoped, revocable, sandbox-only credentials (least privilege, OAuth scopes, 13-37).
  - **Network** — restrict or block outbound network (breaking the lethal trifecta's exfiltration leg, 14-129), allowing only the specific endpoints the task needs.
- **Why the sandbox is the most robust layer:** gates and rollback depend on catching or reversing a bad action; the sandbox makes the *worst case tolerable by construction* — even a fully hijacked agent (prompt injection, 14-128) inside a tight sandbox with no prod access, no real credentials, and no network can do little harm. It is defense that does not rely on the agent behaving.
- **Then promote across the boundary.** The agent works in the sandbox; a controlled, gated step (propose-then-commit, 15-23) moves its verified result out — the only path from sandbox to production.

:::interview
**"What's the most robust way to run an autonomous agent safely?"** Sandbox it, so the worst case is tolerable by construction rather than by catching every mistake. Run its code in an isolated container/microVM with dropped privileges, give it a copy of data (not production), scoped revocable credentials (never prod keys), and restricted network (blocking exfiltration). Then even a fully hijacked agent can do little, because it *can't reach* anything harmful. Gates and rollback still help, but they depend on the agent's actions being catchable or reversible; the sandbox limits what's possible at all. Promote verified results out through one controlled, gated step.
:::
