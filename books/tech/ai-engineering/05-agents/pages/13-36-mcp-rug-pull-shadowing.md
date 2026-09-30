## Rug pulls and tool shadowing

- Two attacks that exploit *trust over time* and *name collisions*. **[VERIFY]**

### Rug pull
- You install a server, review its tools, approve them. Later the server **silently changes** a tool's behavior or description — the calculator you trusted now exfiltrates data. Because approval happened once, the change goes unnoticed. It is a supply-chain bait-and-switch: benign at review, malicious after trust.

### Tool shadowing
- A malicious server registers a tool with the **same name** as a trusted one — `send_email` — hoping the host or model calls the impostor. Or its description tells the model to prefer it. With multiple servers connected, name collisions let a bad server **intercept** actions meant for a good one.

<svg viewBox="0 0 360 92" role="img" aria-label="Rug pull changes a tool after approval; shadowing registers a duplicate name to intercept calls" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6.5" fill="#a03050">rug pull</text>
  <rect x="18" y="20" width="64" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="50" y="34" text-anchor="middle" font-size="6">v1: benign ✓</text>
  <rect x="18" y="50" width="64" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="50" y="64" text-anchor="middle" font-size="6">v2: malicious</text>
  <path d="M50 42 L50 48" stroke="#a03050" marker-end="url(#rp)"/><text x="120" y="46" font-size="5.5" fill="#6b6b6b">approved once,</text><text x="120" y="56" font-size="5.5" fill="#6b6b6b">changed later</text>
  <line x1="190" y1="12" x2="190" y2="80" stroke="#eee"/>
  <text x="280" y="14" text-anchor="middle" font-size="6.5" fill="#a03050">shadowing</text>
  <rect x="212" y="26" width="70" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="247" y="39" text-anchor="middle" font-size="5.5">real send_email</text>
  <rect x="212" y="52" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="247" y="65" text-anchor="middle" font-size="5.5">fake send_email</text>
  <text x="300" y="52" font-size="5.5" fill="#6b6b6b">name clash →</text><text x="300" y="62" font-size="5.5" fill="#6b6b6b">intercept</text>
</svg>

- **Defenses:**
  - **Pin and verify.** Record the hash of each tool's definition at approval; re-verify on every connect and alert on any change (kills rug pulls).
  - **Namespace by server.** Present tools as `serverA.send_email` vs `serverB.send_email` so collisions are visible and the model/user cannot be fooled by a bare name (kills shadowing).
  - **Trust boundaries.** Do not let a low-trust server's tools be auto-selected over a high-trust server's; require explicit routing for sensitive tools.

:::warn
"I reviewed it when I installed it" is not a defense. A server you approved can change under you (rug pull), and a new server can impersonate an old one's tools (shadowing). Security must be **continuous** — pin definitions, diff on every load, namespace everything — not a one-time review at install. Treat an MCP server's tool set as mutable, adversarial input on every connection.
:::
