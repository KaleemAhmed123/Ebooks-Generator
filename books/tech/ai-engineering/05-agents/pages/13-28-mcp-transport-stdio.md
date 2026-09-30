## Transport: stdio

- A **transport** is *how* the JSON-RPC messages physically travel between client and server. MCP defines two standard ones; the message content is identical, only the pipe differs. First: **stdio**.
- **stdio** (standard input/output) runs the server as a **local subprocess** of the host. The host writes JSON-RPC to the server's stdin and reads responses from its stdout. No network, no ports.

<svg viewBox="0 0 360 88" role="img" aria-label="The host launches the server as a subprocess and exchanges messages over stdin and stdout" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="26" width="90" height="36" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="65" y="47" text-anchor="middle" font-size="7">host</text>
  <rect x="250" y="26" width="90" height="36" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="295" y="43" text-anchor="middle" font-size="7">server</text><text x="295" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">subprocess</text>
  <path d="M110 38 L248 38" stroke="#888" marker-end="url(#st)"/><text x="179" y="34" text-anchor="middle" font-size="6">write → stdin</text>
  <path d="M248 52 L110 52" stroke="#888" marker-end="url(#st)"/><text x="179" y="66" text-anchor="middle" font-size="6">stdout → read</text>
  <defs><marker id="st" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **When to use it:** local tools — filesystem access, a local database, a CLI wrapper, anything running on the user's own machine. It is the default for desktop hosts (Claude Desktop, IDEs) and the simplest to build and secure.
- **Why it is safe by default:** no network surface. The server only exists while the host runs it, talks only to that host, and inherits the user's local permissions. There is nothing to expose to the internet.
- **The catch:** one server process per host, local only. It cannot be shared across users or machines, and it cannot be a remote SaaS integration. For that you need the HTTP transport (next page).

:::warn
stdio's one hard rule: **never print to stdout** for anything but protocol messages. A stray `print()` or a library logging to stdout corrupts the JSON-RPC stream and the connection breaks with a confusing parse error. Send all logs and debug output to **stderr** (or a file). This is the single most common bug when hand-building a stdio server.
:::
