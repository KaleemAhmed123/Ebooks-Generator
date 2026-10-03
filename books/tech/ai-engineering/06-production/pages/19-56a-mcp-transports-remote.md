## MCP: transports and remote servers

- The MCP server (Flagship 10) ran over stdio — perfect for a *local* tool process. Real deployments need **remote** servers (a shared tool hosted for many agents), which changes the transport and adds auth.

| Transport | For | Auth |
|---|---|---|
| **stdio** | local subprocess | inherits the user's process |
| **Streamable HTTP** | remote / hosted server | OAuth 2.1 scoped tokens |

- **Streamable HTTP** is MCP's remote transport: the client talks to the server over HTTP, with server-to-client streaming for long-running operations and notifications — the same JSON-RPC messages (Flagship 4), carried over the network instead of pipes. This is how a shared MCP server serves many agents across a network.
- **Remote means auth.** A local stdio server runs as you; a remote one is a service that must *authenticate and authorise* callers — MCP uses **OAuth 2.1** with **scoped tokens**, so an agent gets exactly the permissions its tools need and no more. This is the "excessive agency" and "insecure tool design" defense (18-24a) at the protocol layer.

:::interview
"What changes when you move an MCP server from local to remote?"

The transport and the trust boundary. Locally, stdio suffices — the server runs as a subprocess inheriting your context. Remotely, you use MCP's **Streamable HTTP** transport (same JSON-RPC, over the network with server-push for long operations), and — the real change — you now need **authentication and authorization**, because the server is a shared service exposed to callers you don't control. MCP uses OAuth 2.1 with **scoped tokens** so each agent gets least-privilege access to only the tools it needs. And everything from the security cluster (18-24a, 19-56) applies harder: a remote server is untrusted-code-as-a-service, so scope tokens tightly, pin versions, sandbox, and treat its outputs as untrusted. Local-to-remote is a security boundary crossing, not just a networking change.
:::
