## Roots and long-running tasks

- Two more capabilities round out MCP for real work: **roots** (scoping) and support for **long-running / async tasks**. **[VERIFY current spec support]**

### Roots — telling a server where it may operate
- A **root** is a URI boundary the *client* declares to the server: "you may operate within `file:///home/me/project` and nowhere else." The server queries `roots/list` and confines its filesystem or resource access to those roots.
- It is a **least-privilege** mechanism: a filesystem server does not get the whole disk, only the folders the user opened. If the client's roots change (the user opens another project), it notifies the server.

<svg viewBox="0 0 360 74" role="img" aria-label="The client declares roots that bound the server's file access" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="26" width="90" height="26" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="59" y="42" text-anchor="middle" font-size="6.5">client: roots =</text>
  <rect x="130" y="22" width="120" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="190" y="36" text-anchor="middle" font-size="6">file:///project</text><text x="190" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">server bounded here</text>
  <rect x="272" y="26" width="80" height="26" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="312" y="39" text-anchor="middle" font-size="5.5">rest of disk: ✗</text>
  <path d="M104 39 L128 39" stroke="#888" marker-end="url(#ro)"/>
  <defs><marker id="ro" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

### Long-running tasks
- Some tools take minutes — a build, a deploy, a large query, a deep research run. A synchronous `tools/call` that blocks for ten minutes is fragile (timeouts, dropped connections). MCP addresses this with **progress notifications** (the server streams `notifications/progress` while working) and evolving support for **async task** patterns where a call returns a handle the client polls or subscribes to. **[VERIFY — this area is actively changing]**
- Streamable HTTP's SSE upgrade (13-29) is what carries these progress streams for remote servers.

:::warn
Long-running MCP tools are where naive agents hang. If a tool can take minutes, do not block the whole agent on a single synchronous call with a short timeout — use progress notifications to keep the connection alive and the user informed, and design the tool so a dropped connection can resume rather than restart. This is the MCP-level version of the durable-execution problem in Module 15.
:::
