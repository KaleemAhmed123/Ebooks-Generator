## OAuth 2.1, scopes, and the confused deputy

- Remote MCP servers (Streamable HTTP) need **authentication** — proving who is calling and limiting what they may do. The MCP auth spec builds on **OAuth 2.1**, the standard for delegated access ("let this app act on my behalf, within these limits"). **[VERIFY current auth spec]**

<svg viewBox="0 0 360 80" role="img" aria-label="OAuth issues a scoped token so the server acts only within granted permissions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="30" width="70" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="45" y="45" text-anchor="middle" font-size="6">user grants</text>
  <rect x="110" y="26" width="90" height="32" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="155" y="40" text-anchor="middle" font-size="6">token: scope=</text><text x="155" y="51" text-anchor="middle" font-size="5.5">read:repo only</text>
  <rect x="238" y="30" width="110" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="293" y="45" text-anchor="middle" font-size="6">server acts within scope</text>
  <path d="M80 42 L108 42" stroke="#888" marker-end="url(#oa)"/><path d="M200 42 L236 42" stroke="#888" marker-end="url(#oa)"/>
  <defs><marker id="oa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Scopes = least privilege.** A token should grant the *minimum* — `read:repo`, not `admin`. A GitHub MCP server for reading issues should never hold write-and-delete rights. Narrow scopes limit the blast radius if the server (or a token) is compromised.
- **Resource indicators (RFC 8707).** Tokens should be **bound to the specific server** they were issued for, so a token stolen from one server cannot be replayed against another.
- **The confused deputy.** A "deputy" is a service that acts on others' behalf. A **confused deputy** is tricked into using *its own* authority for an attacker — e.g. an MCP gateway holding broad credentials is manipulated into performing an action the requesting user was never authorized for. The server has the power; the attacker supplies the intent. Defenses: bind tokens to the end user's identity and scope, never let a shared server act with ambient authority beyond the caller's own permissions, and validate the audience of every token.

:::interview
"Why does a remote MCP server need OAuth scopes, and what's the confused-deputy risk?"

Scopes enforce least privilege — the token grants only what the task needs, so a compromised server can't do more than its narrow permission. The confused deputy is when a server with broad credentials is tricked into using them for a user who lacks that authority; the fix is binding tokens to the specific user and resource (RFC 8707 resource indicators) and never acting with ambient authority beyond the caller's own scope.
:::
