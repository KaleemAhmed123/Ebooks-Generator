## Gateways, registries, and supply chain

- As organizations run many MCP servers, three pieces of infrastructure appear.

<svg viewBox="0 0 360 100" role="img" aria-label="A gateway fronts many servers; a registry lists discoverable servers; supply chain is the trust of what you install" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="40" width="60" height="24" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="44" y="55" text-anchor="middle" font-size="6">clients</text>
  <rect x="104" y="38" width="60" height="28" rx="4" fill="#24405e"/><text x="134" y="55" text-anchor="middle" fill="#fff" font-size="6.5">gateway</text>
  <g fill="#fdeef2" stroke="#a03050"><rect x="200" y="16" width="70" height="18" rx="2"/><rect x="200" y="42" width="70" height="18" rx="2"/><rect x="200" y="68" width="70" height="18" rx="2"/></g>
  <text x="235" y="29" text-anchor="middle" font-size="5.5">server A</text><text x="235" y="55" text-anchor="middle" font-size="5.5">server B</text><text x="235" y="81" text-anchor="middle" font-size="5.5">server C</text>
  <path d="M74 52 L102 52" stroke="#888" marker-end="url(#gw)"/><path d="M164 48 L198 25" stroke="#888" marker-end="url(#gw)"/><path d="M164 52 L198 51" stroke="#888" marker-end="url(#gw)"/><path d="M164 56 L198 77" stroke="#888" marker-end="url(#gw)"/>
  <defs><marker id="gw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Gateway** — a proxy that sits between clients and many servers, giving one connection point plus central **auth, rate limiting, logging, and policy**. Instead of each host trusting each server directly, the gateway enforces org rules (which tools are allowed, who may call them, audit of every call). It is the enterprise control plane for MCP — and, being a deputy with broad access, must itself be hardened against the confused-deputy risk (13-37).
- **Registry** — a discoverable catalog of servers (the official MCP Registry and private/internal ones). It answers "what servers exist and where?" — like a package index for MCP. Registries enable discovery *and* become a place to vet and sign entries.
- **Supply chain** — the trust problem underneath all of it. Installing an MCP server is installing code and tool descriptions that steer your model. Apply dependency hygiene: prefer **signed** servers from trusted publishers, pin versions, review before enabling, and monitor for changes (rug pulls). An unvetted server from a registry is an unvetted dependency.

:::note
The MCP ecosystem is recapitulating package management — registries (like npm), gateways (like API gateways), signing and pinning (like lockfiles). The lesson from those ecosystems transfers directly: convenience of discovery and reuse comes with supply-chain risk, and the mature answer is the same — provenance, signing, pinning, least privilege, and continuous monitoring, not one-time trust.
:::
