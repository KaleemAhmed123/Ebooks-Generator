## The initialize handshake

- Before any tool is called, client and server **negotiate** — agree on a protocol version and declare what each can do. Getting this handshake wrong is why "my MCP server won't connect." **[VERIFY current protocol version strings]**

<svg viewBox="0 0 360 116" role="img" aria-label="Client sends initialize, server replies with capabilities, client sends initialized notification" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="70" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">CLIENT</text><line x1="70" y1="18" x2="70" y2="110" stroke="#24405e"/>
  <text x="290" y="14" text-anchor="middle" font-size="6.5" fill="#a03050">SERVER</text><line x1="290" y1="18" x2="290" y2="110" stroke="#a03050"/>
  <path d="M72 32 L288 32" stroke="#888" marker-end="url(#hs)"/><text x="180" y="28" text-anchor="middle" font-size="6">initialize (version, client caps)</text>
  <path d="M288 56 L72 56" stroke="#888" marker-end="url(#hs)"/><text x="180" y="52" text-anchor="middle" font-size="6">result (version, server caps, info)</text>
  <path d="M72 80 L288 80" stroke="#888" marker-end="url(#hs)"/><text x="180" y="76" text-anchor="middle" font-size="6">notifications/initialized</text>
  <text x="180" y="102" text-anchor="middle" font-size="6" fill="#1a3a2a">→ now tools/resources/prompts may be used</text>
  <defs><marker id="hs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

1. **Client → `initialize`**: "I speak protocol version `2025-06-18`; here are my capabilities (I support sampling, roots, elicitation)."
2. **Server → result**: "I agree on that version (or the newest we both know); here are *my* capabilities (I offer tools and resources, and my tool list can change), and my name/version."
3. **Client → `notifications/initialized`**: "Ready." Only now may real calls flow.

- **Capabilities are the contract.** Neither side assumes a feature exists; each *declares* it. A server that offers no `prompts` capability will never be asked for prompts. This is how MCP evolves without breaking — new features are opt-in capabilities, and an old client and new server simply use the intersection of what they both support.

:::interview
"Why does MCP negotiate capabilities instead of assuming a fixed feature set?"

Forward and backward compatibility. The spec revises often (new primitives like elicitation, new transports). By declaring capabilities in the handshake, a client and server use only the features *both* support, so a new server still works with an old client and vice versa. It also lets each side skip advertising features it lacks, avoiding calls that would just error.
:::
