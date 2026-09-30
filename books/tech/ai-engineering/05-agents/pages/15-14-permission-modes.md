## Permission modes

- **Permission modes** are the concrete control that sets an agent's place on the autonomy ladder (15-02): they decide which actions run freely, which need approval, and which are forbidden. Choosing them is how you tune autonomy per deployment. **[VERIFY]**

<svg viewBox="0 0 360 96" role="img" aria-label="A permission spectrum from ask-everything to full-auto, with allow/ask/deny per action class" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="18" width="108" height="22" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="64" y="32" text-anchor="middle">ask before everything</text>
  <rect x="126" y="18" width="108" height="22" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="180" y="32" text-anchor="middle">auto reads, ask writes</text>
  <rect x="242" y="18" width="108" height="22" rx="3" fill="#24405e"/><text x="296" y="32" text-anchor="middle" fill="#fff">full auto (sandbox)</text>
  <rect x="20" y="52" width="100" height="20" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="70" y="65" text-anchor="middle">allow: read, search</text>
  <rect x="130" y="52" width="100" height="20" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="65" text-anchor="middle">ask: write, run, spend</text>
  <rect x="240" y="52" width="100" height="20" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="290" y="65" text-anchor="middle">deny: deploy, delete DB</text>
</svg>

- **The design is per-action-class, not global.** A good permission policy classifies actions by risk and reversibility:
  - **Auto-allow the safe and reversible** — reads, searches, running tests in a sandbox. No approval; friction here is pure waste.
  - **Ask for the consequential** — writing files, running arbitrary commands, spending money, sending messages. A human confirms (14-52).
  - **Deny outright the dangerous** — production deploys, deleting a database, touching credentials — hard-blocked regardless of what the agent wants (executable constraints, 14-133).
- **Modes bundle policies for contexts.** "Plan mode" (read-only, no changes) for exploration; "auto-accept edits" for a trusted sandbox; "ask" for production-adjacent work. Switching mode switches the whole risk posture in one move.
- **The reversibility principle:** gate by *how hard it is to undo*. A reversible action (an edit you can revert) can run freely; an irreversible one (a sent email, a deleted record, a charge) needs a human, always. Reversibility, not just "importance," is the right axis.

:::interview
**"How do you decide which agent actions need human approval?"** By risk and reversibility, per action class — not globally. Auto-allow safe, reversible actions (reads, searches, sandboxed test runs) since approving them is pure friction. Require approval for consequential actions (file writes, arbitrary commands, spending, sending). Hard-deny the dangerous and irreversible (prod deploys, deleting data, credential access) regardless of the agent's intent. The key axis is reversibility: if a mistake can be undone, let it run; if it can't — a sent message, a charge, a deletion — a human gates it every time.
:::
