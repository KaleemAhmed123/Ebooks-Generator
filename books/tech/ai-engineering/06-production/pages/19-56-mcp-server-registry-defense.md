## MCP server + registry: production and defense

- Shipping an MCP server to real agents means the security threat model from Booklet 5 and Module 18 becomes concrete — a server is untrusted code an agent will run with the user's context.

| Risk (Booklet 5 / Module 18) | Control |
|---|---|
| tool poisoning (malicious description) | vet/pin servers; review tool descriptions |
| rug-pull (server changes after approval) | version-pin; re-verify on change |
| over-broad permissions | least-privilege; scope tokens per server (OAuth) |
| injection via tool results | treat tool output as untrusted (trifecta, Module 18) |
| supply-chain (registry entry) | trusted registry, signatures, sandboxed run |

- **Auth for remote servers.** A local stdio server inherits the user's process; a *remote* MCP server (Streamable HTTP transport) needs real auth — OAuth 2.1 with scoped tokens (Booklet 5) so a server gets only the permissions its tools require, and a compromised server can't act beyond its scope.
- **Observability on the server too.** Instrument tool calls with OTel spans (Flagship 9) so you can see which tools agents actually use, how often they fail, and what they cost — the same golden-signals discipline, at the tool layer.

:::interview
"You're exposing internal tools to agents via MCP. What's your security posture?"

Assume the agent (or the content it reads) may be adversarial. **Least privilege**: each MCP server exposes only the tools its job needs, with **scoped OAuth tokens** for remote servers so it can't act beyond them. **Supply-chain hygiene**: pin server versions, vet tool descriptions (tool-poisoning), re-verify on change (rug-pulls), and run untrusted servers **sandboxed**. **Trifecta-breaking**: a server that reads untrusted content shouldn't also hold private data and an exfiltration channel (Module 18). And **instrument** every tool call for audit. The framing — an MCP server is untrusted code with the user's context, so I design for a hijacked agent, not a well-behaved one — is the security-mature answer.
:::
