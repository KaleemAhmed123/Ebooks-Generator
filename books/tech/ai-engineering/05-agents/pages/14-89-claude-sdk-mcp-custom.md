## Claude Agent SDK: MCP and custom tools

- The built-in toolset (14-85) covers a computer's basics; **MCP servers and custom tools** extend the agent to everything else — your APIs, databases, and third-party integrations. **[VERIFY current API]**

- **MCP integration.** The agent is an MCP **client** (13-27): point it at MCP servers (a GitHub server, a Postgres server, your internal tools) and their tools appear alongside the built-ins. This is how the harness reaches your systems without you writing wrappers — you reuse the MCP ecosystem (13-18). The permission and hook layer (14-88) applies to MCP tools too, so third-party servers are gated the same way.
- **Custom tools.** For anything not worth an MCP server, register a plain function as a tool — the schema-design rules of 13-12 unchanged. Use custom tools for app-specific actions ("create a ticket in *our* system") that live inside your agent's process.

<svg viewBox="0 0 360 80" role="img" aria-label="The agent combines built-in tools, MCP server tools, and custom function tools" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="140" y="12" width="80" height="20" rx="3" fill="#24405e"/><text x="180" y="25" text-anchor="middle" fill="#fff">the agent</text>
  <rect x="20" y="50" width="90" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="65" y="63" text-anchor="middle">built-in tools</text>
  <rect x="135" y="50" width="90" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="63" text-anchor="middle">MCP servers</text>
  <rect x="250" y="50" width="90" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="295" y="63" text-anchor="middle">custom funcs</text>
  <path d="M165 32 L70 48" stroke="#888" marker-end="url(#mx)"/><path d="M180 32 L180 48" stroke="#888" marker-end="url(#mx)"/><path d="M195 32 L290 48" stroke="#888" marker-end="url(#mx)"/>
  <defs><marker id="mx" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The three tiers compose:** built-ins for the computer, MCP for reusable external systems, custom functions for app-specific glue. An agent typically uses all three — read/write files (built-in), query the issue tracker (MCP), create a record in your app (custom).

:::note
This layering is the whole tools story of Booklet 5 landing in one place: the model's function-calling mechanism (Module 13), MCP for standardized external access (Module 13), and a capable agent harness (this SDK) that wires them together with context management, permissions, and subagents (Module 14). The Claude Agent SDK is a good closing example because it *assembles* the booklet's pieces into the shape of a real, deployable agent.
:::
