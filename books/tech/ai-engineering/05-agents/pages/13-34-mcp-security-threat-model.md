## MCP security: the threat model

- MCP's power — connecting a model to arbitrary third-party servers that offer tools it will *execute* — is also its danger. The moment you install someone else's MCP server, you are running their code and trusting their tool descriptions, which the model obeys. **[VERIFY — security guidance evolves fast]**
- The core shift: in classic software, code you install runs with your permissions but does not *deceive your reasoning*. An MCP server can do both — run code **and** feed adversarial text straight into the model that is deciding what to do next.

<svg viewBox="0 0 360 100" role="img" aria-label="Four MCP threat categories: poisoned descriptions, rug pulls, shadowing, and over-broad auth" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="80" height="34" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="50" y="30" text-anchor="middle">tool poisoning</text><text x="50" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">hidden instructions</text>
  <rect x="98" y="16" width="80" height="34" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="138" y="30" text-anchor="middle">rug pull</text><text x="138" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">changes after trust</text>
  <rect x="186" y="16" width="80" height="34" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="226" y="30" text-anchor="middle">shadowing</text><text x="226" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">impersonate a tool</text>
  <rect x="274" y="16" width="80" height="34" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="314" y="30" text-anchor="middle">over-broad auth</text><text x="314" y="42" text-anchor="middle" font-size="5.5" fill="#6b6b6b">confused deputy</text>
  <rect x="60" y="64" width="240" height="26" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="80" text-anchor="middle" font-size="6.5">all exploit: the model trusts server-supplied text</text>
</svg>

- **The unifying insight:** every MCP attack exploits the same fact — **the model reads and acts on text the server controls** (tool names, descriptions, results). If an attacker controls that text, they partially control the agent. This is prompt injection (Module 14) with a supply chain attached.
- The next three pages cover the concrete attacks — tool poisoning, rug pulls/shadowing, and the auth failures (OAuth/confused deputy) — and their defenses. The meta-defense is constant: **treat every third-party server as untrusted input**, isolate it, and keep a human in the loop for consequential actions.

:::warn
The dangerous mental model is "an MCP server is just an API integration." It is not — it is *untrusted content injected into your model's decision loop* plus code running on your machine. An API returns data your code parses; an MCP server returns text your *model obeys*. Vet servers like you vet dependencies, pin versions, and never auto-approve tools from a server you do not trust.
:::
