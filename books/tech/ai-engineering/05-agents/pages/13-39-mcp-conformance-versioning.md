## Conformance and versioning

- MCP is a living spec, revised on **dated versions**: `2024-11-05` → `2025-03-26` → `2025-06-18` (this module's baseline) → `2025-11-25` → **`2026-07-28`**, the current stable. Two practical concerns follow: staying compatible as it changes, and knowing a server actually implements it correctly.

<svg viewBox="0 0 360 82" role="img" aria-label="MCP dated spec revisions on a timeline; the newest, 2026-07-28, is a breaking stateless rewrite" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="24" y1="44" x2="336" y2="44" stroke="#888"/>
  <g font-size="5.3" text-anchor="middle">
    <circle cx="44" cy="44" r="3" fill="#24405e"/><text x="44" y="34" fill="#24405e">2024-11</text>
    <circle cx="117" cy="44" r="3" fill="#24405e"/><text x="117" y="34" fill="#24405e">2025-03</text>
    <circle cx="190" cy="44" r="3" fill="#24405e"/><text x="190" y="34" fill="#24405e">2025-06</text><text x="190" y="59" font-size="4.6" fill="#6b6b6b">book baseline</text>
    <circle cx="263" cy="44" r="3" fill="#24405e"/><text x="263" y="34" fill="#24405e">2025-11</text>
    <circle cx="330" cy="44" r="3.4" fill="#a03050"/><text x="330" y="34" fill="#a03050">2026-07</text><text x="330" y="59" font-size="4.6" fill="#a03050">stateless · breaking</text>
  </g>
  <text x="180" y="76" text-anchor="middle" font-size="6" fill="#6b6b6b">client and server agree on the newest revision both support</text>
</svg>

- **Negotiation, through `2025-06-18`:** handled in the handshake (13-21). The client proposes a protocol version; the server agrees or offers the newest it supports; capability negotiation covers *features*. This is how a `2025-06` client still works with a `2025-03` server — they fall back to the common version and the intersection of capabilities. **Always send an explicit `protocolVersion`; never assume "latest."**
- **The `2026-07-28` rewrite changed the model** (the biggest break since launch). It drops the `initialize` handshake and the `Mcp-Session-Id` header — the transport goes **stateless**: protocol version and capabilities ride on *every* request, and a `server/discover` call probes features. It also drops SSE stream resumability and puts **Roots, Sampling, and Logging on a deprecation clock** (earliest removal is a revision on/after `2027-07-28`). A client on the new revision cannot talk to a server on an old one, so migration means supporting both. Most deployed servers still speak `2025-06-18` today — treat this as the direction of travel, not a reason to rewrite working integrations.
- **Conformance** — does a server correctly implement the spec (right message shapes, required methods, proper errors)? The ecosystem provides **conformance test suites and the Inspector** to check a server against the spec before you trust it. A server that "mostly works" but violates the spec breaks subtly across hosts.
- **Practical hygiene:** pin the protocol version you build against, read the changelog before upgrading (primitives and transports have genuinely changed between revisions), and re-run conformance after any SDK bump.

:::interview
"MCP revises its spec often — how do you keep integrations from breaking?"

Through `2025-06-18`, the handshake negotiates a shared protocol version and capabilities, so an older server and newer client use the common subset — you rarely break outright. In practice: send an explicit `protocolVersion`, pin what you build against, gate new features behind capability checks rather than assuming they exist, run conformance tests and the Inspector after upgrades, and read the changelog. The `2026-07-28` revision is the exception — it goes stateless (no handshake, no `Mcp-Session-Id`, version and capabilities on every request) and deprecates Roots/Sampling/Logging, and it is not wire-compatible with older revisions, so crossing that boundary means dual-support, not a fallback.
:::
