## Transport: Streamable HTTP

- For **remote** servers — a SaaS integration, a shared team server, anything not on the user's machine — MCP uses **Streamable HTTP**, the transport that replaced the older HTTP+SSE design in the 2025 spec revisions. **[VERIFY current transport name/status]**

<svg viewBox="0 0 360 92" role="img" aria-label="Client POSTs to one endpoint; the server replies with JSON or upgrades to a streamed SSE response" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="80" height="34" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="54" y="50" text-anchor="middle" font-size="7">client</text>
  <rect x="262" y="30" width="84" height="34" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="304" y="46" text-anchor="middle" font-size="7">server /mcp</text><text x="304" y="57" text-anchor="middle" font-size="5.5" fill="#6b6b6b">one endpoint</text>
  <path d="M94 40 L260 40" stroke="#888" marker-end="url(#sh)"/><text x="177" y="36" text-anchor="middle" font-size="6">POST (JSON-RPC request)</text>
  <path d="M260 56 L94 56" stroke="#888" marker-end="url(#sh)"/><text x="177" y="70" text-anchor="middle" font-size="6">JSON reply — or SSE stream</text>
  <defs><marker id="sh" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **One endpoint, two response modes.** The client `POST`s a JSON-RPC request to a single URL (e.g. `/mcp`). The server either replies with a plain JSON response (fast, done) or **upgrades to Server-Sent Events (SSE)** — a stream — when it needs to push multiple messages (progress updates, streamed results, server-initiated requests). One connection covers both.
- **Why it replaced HTTP+SSE:** the old design needed two separate endpoints and a long-lived SSE channel that was awkward to scale and resume. Streamable HTTP works over ordinary request/response infra (load balancers, serverless), streaming only when needed, and supports **resumable** connections.
- **Now security matters.** A remote endpoint is on the network, so it needs authentication (OAuth 2.1, 13-37), origin validation, and TLS — none of which stdio required. Remote transport is where MCP's threat model (next cluster) becomes real.

:::interview
"stdio vs Streamable HTTP — how do you choose?"

stdio for **local** servers: the host runs the server as a subprocess, no network, simplest and safest, ideal for filesystem/local-DB/CLI tools. Streamable HTTP for **remote** servers: a networked endpoint others can reach, needed for SaaS or shared team servers, streaming via SSE when required — but now you own auth, TLS, and the full network threat model. Local → stdio; remote/shared → Streamable HTTP.
:::
