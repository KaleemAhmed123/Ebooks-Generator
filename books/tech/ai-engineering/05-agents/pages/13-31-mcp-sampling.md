## MCP sampling

- **Sampling** lets a *server* ask the *client's* LLM to generate text — the reverse of the normal direction. The server has no model and no API key of its own; it borrows the host's, through the client, under the user's control.

<svg viewBox="0 0 360 94" role="img" aria-label="A server requests a completion, the client asks its LLM with user approval and returns the result" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="250" y="30" width="96" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="298" y="44" text-anchor="middle" font-size="6.5">server</text><text x="298" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">no LLM of its own</text>
  <rect x="120" y="30" width="96" height="34" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="168" y="44" text-anchor="middle" font-size="6.5">client / host</text><text x="168" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">holds the LLM</text>
  <rect x="14" y="32" width="70" height="30" rx="4" fill="#24405e"/><text x="49" y="51" text-anchor="middle" fill="#fff" font-size="6.5">the LLM</text>
  <path d="M248 38 L218 38" stroke="#888" marker-end="url(#sp)"/><text x="233" y="26" text-anchor="middle" font-size="5.5">sampling/</text><text x="233" y="20" text-anchor="middle" font-size="5.5">createMessage</text>
  <path d="M118 44 L86 44" stroke="#888" marker-end="url(#sp)"/><text x="102" y="34" text-anchor="middle" font-size="5">ask (✋approve)</text>
  <path d="M86 56 L118 56" stroke="#888" marker-end="url(#sp)"/><path d="M218 58 L248 58" stroke="#888" marker-end="url(#sp)"/><text x="233" y="70" text-anchor="middle" font-size="5">completion</text>
  <defs><marker id="sp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The flow:** the server sends `sampling/createMessage` with the messages it wants completed. The client — with the user's approval — runs it on the host's LLM and returns the completion. The server got a model call without owning a model.
- **Why it exists:** it makes servers *agentic without an API key*. A server that summarizes a document, classifies input, or plans a sub-task can use the host's model — the user pays once, for one model, and the server ships intelligence, not just plumbing.
- **The human in the loop is central.** The client can (and should) show the user what the server wants to generate and let them approve, edit, or deny. The server never touches the model directly; the client mediates every sampling request, which is what keeps a server from silently running up cost or doing something unseen.
- **Recency (`2026-07-28`):** the current spec **deprecates sampling** (alongside roots and logging; earliest removal ≥ `2027-07-28`), steering servers toward their own provider APIs instead. It is still valid and widely used under `2025-06-18` — know it, and watch the changelog (13-39).

:::interview
"How can an MCP server use an LLM if it doesn't have one?"

Sampling. The server sends a `sampling/createMessage` request *up* to the client, which runs it on the host's model — with user approval — and returns the completion. This inverts the usual flow (server calling client) and lets servers be intelligent without their own model or key, while the client stays the gatekeeper that mediates and can refuse each request.
:::
