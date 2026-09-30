## MCP primitive: tools

- MCP servers expose three kinds of capability, called **primitives**: **tools**, **resources**, and **prompts**. The distinction is *who controls them* — and it is the concept interviewers probe most. Start with tools.
- **Tools are model-controlled.** They are functions the model may *choose* to call, exactly like the function calling of 13-05 — the same name/description/schema — now discovered over MCP instead of hard-coded.

<svg viewBox="0 0 360 92" role="img" aria-label="The client lists tools then calls one, the server runs it and returns the result" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="20" width="70" height="52" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="45" y="34" text-anchor="middle" font-size="6.5">client</text><text x="45" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">(host + model)</text>
  <rect x="280" y="20" width="70" height="52" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="315" y="34" text-anchor="middle" font-size="6.5">server</text><text x="315" y="48" text-anchor="middle" font-size="5.5" fill="#6b6b6b">runs the code</text>
  <path d="M80 34 L278 34" stroke="#888" marker-end="url(#mt)"/><text x="180" y="30" text-anchor="middle" font-size="6">tools/list → [get_weather, …]</text>
  <path d="M80 56 L278 56" stroke="#888" marker-end="url(#mt)"/><text x="180" y="52" text-anchor="middle" font-size="6">tools/call get_weather{city}</text>
  <path d="M278 68 L80 68" stroke="#888" marker-end="url(#mt)"/><text x="180" y="82" text-anchor="middle" font-size="6">result: "14°C, rain"</text>
  <defs><marker id="mt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The flow:** the client calls `tools/list` to discover what the server offers (name, description, `inputSchema` each), presents them to the model, and when the model requests one, the client sends `tools/call` with the arguments. The server executes and returns `content` (text, or structured data, or even an image).
- **Discovery is dynamic.** Unlike hard-coded tools, MCP tools are fetched at connect time, so a server can add or change tools and emit a `tools/list_changed` notification — the host re-lists without a code change.
- Everything you learned about schema design (13-12–13-17) applies unchanged: a server's tool descriptions and schemas are still what the model reads to decide.

:::note
"Model-controlled" is the key phrase. The *model* decides when to call a tool, because tools have side effects and agency — searching, writing, sending. That is precisely why tools are the primitive that carries the most risk, and why the host must gate execution and get user consent. Resources and prompts, next, are controlled by the app and the user instead — a deliberate split of authority.
:::
