### The Model Context Protocol

An agent that can only read your code is working from half the picture. It
cannot see the Figma file, the failing CI run, the database schema, or the
ticket.

**MCP** is an open protocol that standardizes how a model connects to those
things. A **server** exposes tools and data; a **client**, meaning your editor
or agent, connects to it. Because the interface is standard, one server works
with any client that speaks it.

```json
// .mcp.json
{
  "mcpServers": {
    "figma":     { "url": "http://127.0.0.1:3845/mcp" },
    "playwright":{ "command": "npx", "args": ["-y", "@playwright/mcp"] },
    "postgres":  { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres",
                   "postgresql://localhost/dev"] }
  }
}
```

The ones that change frontend work most:

- **Figma.** Figma shipped a native MCP server in late 2025. The agent reads the
  actual frame: the real spacing, the real token names, the real component
  structure. This is the difference between "build this from a screenshot",
  which produces hardcoded pixel values, and "build this from the design
  source", which produces `gap-4` and `bg-surface`.
- **A browser driver.** The agent can open the page it just wrote, click
  through it, read the console, and see its own bug. Without this it writes
  code and asserts that it works.
- **Your design system.** A server that exposes your component registry stops
  the model inventing a `<Button variant="primary-large">` that does not exist.
