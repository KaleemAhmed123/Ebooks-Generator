## MCP: the M×N problem

- Every AI app needs tools, and every tool needs wiring into every app. With **M** apps (Claude Desktop, Cursor, your agent) and **N** tools (GitHub, Postgres, Slack, your API), the naive world builds **M×N** bespoke integrations — each app hand-codes each tool, again and again.
- The **Model Context Protocol (MCP)** (Anthropic, open-sourced late 2024) is a standard that turns M×N into **M+N**. Each app speaks MCP once; each tool exposes MCP once; any app talks to any tool. It is "USB-C for AI tools" — one connector, not a drawer of adapters.

<svg viewBox="0 0 360 116" role="img" aria-label="Without MCP every app wires to every tool; with MCP each speaks one protocol" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="88" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">M×N (tangled)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="14" y="20" width="26" height="12"/><rect x="14" y="40" width="26" height="12"/><rect x="14" y="60" width="26" height="12"/></g>
  <g fill="#fdeef2" stroke="#a03050"><rect x="140" y="20" width="26" height="12"/><rect x="140" y="40" width="26" height="12"/><rect x="140" y="60" width="26" height="12"/></g>
  <g stroke="#bbb"><line x1="40" y1="26" x2="140" y2="26"/><line x1="40" y1="26" x2="140" y2="46"/><line x1="40" y1="26" x2="140" y2="66"/><line x1="40" y1="46" x2="140" y2="26"/><line x1="40" y1="46" x2="140" y2="46"/><line x1="40" y1="46" x2="140" y2="66"/><line x1="40" y1="66" x2="140" y2="26"/><line x1="40" y1="66" x2="140" y2="46"/><line x1="40" y1="66" x2="140" y2="66"/></g>
  <text x="290" y="12" text-anchor="middle" font-size="6.5" fill="#1a3a2a">M+N (via MCP)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="216" y="20" width="26" height="12"/><rect x="216" y="40" width="26" height="12"/><rect x="216" y="60" width="26" height="12"/></g>
  <rect x="270" y="36" width="30" height="20" rx="3" fill="#24405e"/><text x="285" y="49" text-anchor="middle" fill="#fff" font-size="5.5">MCP</text>
  <g fill="#fdeef2" stroke="#a03050"><rect x="326" y="20" width="26" height="12"/><rect x="326" y="40" width="26" height="12"/><rect x="326" y="60" width="26" height="12"/></g>
  <g stroke="#bbb"><line x1="242" y1="26" x2="270" y2="46"/><line x1="242" y1="46" x2="270" y2="46"/><line x1="242" y1="66" x2="270" y2="46"/><line x1="300" y1="46" x2="326" y2="26"/><line x1="300" y1="46" x2="326" y2="46"/><line x1="300" y1="46" x2="326" y2="66"/></g>
</svg>

- The payoff is an **ecosystem**. Because the interface is standard, a `github` MCP server written once works in every MCP-speaking app, and your app gets every existing MCP server for free. This network effect — not any single feature — is why MCP spread across the industry within a year.

:::note
MCP is to AI tools what HTTP was to documents or USB was to peripherals: boring, standard plumbing whose value is that everyone agrees on it. You rarely need MCP for a single app talking to a single tool you own — a plain function is simpler. You need it when you want your tools to be reusable across apps, or to consume the growing library of servers others have built.
:::
