## MCP primitive: resources

- **Resources are application-controlled.** They are *data* a server exposes for the host to read into context — a file, a database row, a wiki page, a log. Unlike tools, a resource is meant to be **read, not executed**, and it should have **no side effects** — the GET to a tool's POST.

<svg viewBox="0 0 360 92" role="img" aria-label="Resources are identified by URI, listed and read, and injected into context by the host" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="20" width="70" height="52" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="45" y="40" text-anchor="middle" font-size="6.5">host</text><text x="45" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">picks what to read</text>
  <rect x="280" y="20" width="70" height="52" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="315" y="40" text-anchor="middle" font-size="6.5">server</text><text x="315" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">exposes data</text>
  <path d="M80 34 L278 34" stroke="#888" marker-end="url(#mre)"/><text x="180" y="30" text-anchor="middle" font-size="6">resources/list → file:///readme.md …</text>
  <path d="M80 58 L278 58" stroke="#888" marker-end="url(#mre)"/><text x="180" y="52" text-anchor="middle" font-size="6">resources/read uri=file:///readme.md</text>
  <path d="M278 70 L80 70" stroke="#888" marker-end="url(#mre)"/><text x="180" y="84" text-anchor="middle" font-size="6">contents (text/blob)</text>
  <defs><marker id="mre" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Identified by URI.** Each resource has a URI like `file:///project/readme.md` or `postgres://db/users/42`. The client calls `resources/list` to enumerate them and `resources/read` to fetch content. Servers can also expose URI **templates** for parameterized resources.
- **Application-controlled** means the *host/user* decides what enters context — not the model. In Claude Desktop, a user attaches a resource; the app reads it and injects it. This is deliberate: reading data should be a user/app choice, so a server cannot unilaterally push content into the model.
- **Subscriptions:** a client can subscribe to a resource and get `resources/updated` notifications when it changes — useful for live data (a log that grows, a document being edited).

:::interview
**"Tools vs resources in MCP — when is something a resource?"** If it is *data to read* with no side effect, it is a resource (a file, a record, a page), and the *app or user* chooses to load it. If it is an *action to perform* — search, write, compute, send — it is a tool, and the *model* chooses to call it. The litmus test: does invoking it change anything or just return information? Read-only, app-chosen → resource; effectful, model-chosen → tool.
:::
