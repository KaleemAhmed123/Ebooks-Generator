## Model Context Protocol

*MCP*

An open protocol for exposing tools, data and prompt templates to a model over one
interface, so an integration written once works in every client that speaks it. A
server offers three primitives — resources, prompts and tools — as JSON-RPC 2.0
messages carried over stdio or Streamable HTTP.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A host application connects through an MCP client over stdio or Streamable HTTP to a server that exposes resources, prompts and tools">
  <rect x="4" y="18" width="96" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="52" y="34" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">host + client</text>
  <path d="M100 31 H186" stroke="#1a1a1a" stroke-width="1.2"/><path d="M186 31 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="104" y="26" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">stdio | Streamable HTTP</text>
  <rect x="188" y="8" width="152" height="46" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="264" y="23" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">server</text>
  <text x="264" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">resources · prompts</text>
  <text x="264" y="49" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">tools</text>
  <text x="350" y="30" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">every request carries</text>
  <text x="350" y="41" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">its own version now</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">no handshake, no session id — the connection holds nothing</text>
</svg>

The current revision is 2026-07-28, which made the protocol stateless: the
`initialize` handshake and `Mcp-Session-Id` are gone, and a server needing
cross-call state mints an explicit handle passed as an ordinary tool argument.

**The spec moves faster than your codebase.** That same revision deprecated Roots,
Sampling and Logging, under a policy promising only a twelve-month window.

## Model Deprecation Migration

Providers retire models on their schedule, not yours. Anthropic's published policy
is at least 60 days' notice before retirement for publicly released models —
`claude-opus-4-1-20250805` was deprecated on 5 June 2026 and retired on 5 August
2026. Requests to a retired model fail.

Sixty days is comfortable if the preparation already exists: version strings pinned
in one place, an eval set to run against the replacement, a gateway to switch
behind. Without those there is no way to tell whether the replacement is worse, no
way to find which prompts broke, and model IDs scattered across six services.

**Parameters get retired too, not only models.** `temperature`, `top_p` and `top_k`
are deprecated from Claude Opus 4.7 onward and return a 400 when set to a
non-default value — a migration with no model name in it.
