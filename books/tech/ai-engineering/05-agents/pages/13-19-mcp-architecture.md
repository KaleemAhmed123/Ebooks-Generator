## MCP architecture: host, client, server

- MCP has exactly three roles. Confusing them is the most common MCP misunderstanding, so pin them down.

<svg viewBox="0 0 360 118" role="img" aria-label="A host contains clients, each connecting one-to-one to a server exposing tools, resources, prompts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="140" height="96" rx="5" fill="#eef6fb" stroke="#24405e"/><text x="78" y="28" text-anchor="middle" font-size="7" fill="#24405e">HOST (the AI app)</text><text x="78" y="39" text-anchor="middle" font-size="5.5" fill="#6b6b6b">Claude Desktop · your agent</text>
  <rect x="24" y="48" width="50" height="24" rx="3" fill="#24405e"/><text x="49" y="62" text-anchor="middle" fill="#fff" font-size="6">client A</text>
  <rect x="82" y="48" width="50" height="24" rx="3" fill="#24405e"/><text x="107" y="62" text-anchor="middle" fill="#fff" font-size="6">client B</text>
  <text x="78" y="90" text-anchor="middle" font-size="5.5" fill="#6b6b6b">one client per server, 1:1</text>
  <rect x="212" y="26" width="140" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="282" y="40" text-anchor="middle" font-size="6.5">SERVER: github</text><text x="282" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tools · resources · prompts</text>
  <rect x="212" y="70" width="140" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="282" y="84" text-anchor="middle" font-size="6.5">SERVER: postgres</text><text x="282" y="96" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tools · resources · prompts</text>
  <path d="M74 60 L210 43" stroke="#888" marker-end="url(#ar)"/><path d="M132 60 L210 87" stroke="#888" marker-end="url(#ar)"/>
  <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Host** — the AI application the user runs (Claude Desktop, an IDE, your agent). It holds the LLM and the conversation, and it manages one or more clients. It decides which servers to connect and enforces user consent.
- **Client** — a connector *inside* the host, one per server, maintaining a single **1:1** session with that server. If the host uses three servers, it runs three clients.
- **Server** — a separate program (local or remote) that exposes capabilities — **tools, resources, prompts** — over MCP. A server wraps GitHub, a database, a filesystem, your API.

- The clean separation means a server author never thinks about which host will use it, and a host author never hard-codes any tool. Each side implements MCP and trusts the other to as well.

:::interview
"In MCP, what's the difference between a host, a client, and a server?"

The host is the user-facing AI app that holds the model and conversation. Inside it, each client is a 1:1 connector to one server. A server is a separate process exposing tools, resources, and prompts. One host runs many clients, each bound to exactly one server. The host mediates consent; the server never talks to the model directly except through the sampling capability the client grants.
:::
