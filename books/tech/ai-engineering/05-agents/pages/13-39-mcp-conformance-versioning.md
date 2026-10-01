## Conformance and versioning

- MCP is a living spec, revised on **dated versions** (e.g. `2024-11-05`, `2025-03-26`, `2025-06-18`). Two practical concerns follow: staying compatible as it changes, and knowing a server actually implements it correctly. **[VERIFY exact version strings/dates]**

<svg viewBox="0 0 360 74" role="img" aria-label="Dated spec versions; client and server agree on the newest both support" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="40" x2="340" y2="40" stroke="#888"/>
  <g font-size="5.5" fill="#24405e"><circle cx="60" cy="40" r="3" fill="#24405e"/><text x="60" y="30" text-anchor="middle">2024-11</text><circle cx="170" cy="40" r="3" fill="#24405e"/><text x="170" y="30" text-anchor="middle">2025-03</text><circle cx="290" cy="40" r="3" fill="#24405e"/><text x="290" y="30" text-anchor="middle">2025-06</text></g>
  <text x="180" y="60" text-anchor="middle" font-size="6" fill="#6b6b6b">handshake picks the newest version both sides know</text>
</svg>

- **Versioning is handled in the handshake** (13-21). The client proposes a protocol version; the server agrees or offers the newest it supports; capability negotiation covers *features*. This is how a `2025-06` client still works with a `2025-03` server — they fall back to the common version and the intersection of capabilities. **Always send an explicit `protocolVersion`; never assume "latest."**
- **Conformance** — does a server correctly implement the spec (right message shapes, required methods, proper errors)? The ecosystem provides **conformance test suites and the Inspector** to check a server against the spec before you trust it. A server that "mostly works" but violates the spec breaks subtly across hosts.
- **Practical hygiene:** pin the protocol version you build against, read the changelog before upgrading (primitives and transports have changed between revisions), and re-run conformance after any SDK bump.

:::interview
"MCP revises its spec often — how do you keep integrations from breaking?"

The handshake negotiates a shared protocol version and capabilities, so an older server and newer client use the common subset — you rarely break outright. In practice: send an explicit `protocolVersion`, pin what you build against, gate new features behind capability checks rather than assuming they exist, run conformance tests and the Inspector after upgrades, and read the changelog because transports and primitives have genuinely changed between dated revisions.
:::
