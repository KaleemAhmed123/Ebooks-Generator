## Skill permissions and sandboxes

- A skill can carry **scripts the agent runs** — so a skill is executable code from a possibly-untrusted source, with the same supply-chain risk as an MCP server (13-34). Permissions and sandboxes contain it.
- **Permissions — least privilege.** A skill should declare what it needs (which tools, which files, network or not) and be granted only that. A "format a report" skill has no business reading credentials or hitting the network. The host enforces the grant; anything outside it is denied.

<svg viewBox="0 0 360 92" role="img" aria-label="A skill's scripts run inside a sandbox with only declared permissions, isolated from the host" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="66" rx="5" fill="#f7f7fb" stroke="#888" stroke-dasharray="3,2"/><text x="89" y="30" text-anchor="middle" font-size="6.5">sandbox</text>
  <rect x="30" y="40" width="118" height="30" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="89" y="54" text-anchor="middle" font-size="6">skill script runs here</text><text x="89" y="65" text-anchor="middle" font-size="5.5" fill="#6b6b6b">only granted perms</text>
  <rect x="230" y="30" width="110" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="285" y="43" text-anchor="middle" font-size="6">✓ declared: read ./data</text>
  <rect x="230" y="56" width="110" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="285" y="69" text-anchor="middle" font-size="6">✗ blocked: net, secrets</text>
  <path d="M164 49 L228 42" stroke="#888" marker-end="url(#sb)"/><path d="M164 55 L228 64" stroke="#888" marker-end="url(#sb)"/>
  <defs><marker id="sb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Sandboxes — isolation.** Run a skill's scripts in a **sandbox**: a restricted environment (container, subprocess with dropped privileges, or a microVM) that cannot touch the host beyond what it is allowed. If the script is malicious or buggy, the damage is contained to the box. This is the same reasoning as MCP roots and least-privilege OAuth scopes — limit the blast radius.
- **Human approval on first run.** Show the user what a skill will execute before running unfamiliar scripts, especially anything with side effects — the consent gate that catches poisoned or unexpected behavior.

:::warn
Treat a downloaded skill exactly like a downloaded MCP server or npm package: it is untrusted code plus instructions your model will follow. Review it, grant it the minimum permissions, run its scripts sandboxed, and pin its version. "It's just a Markdown file" is false the moment the skill ships a script — and even a pure-instructions skill can carry injected directions the model obeys (tool poisoning, 13-35).
:::
