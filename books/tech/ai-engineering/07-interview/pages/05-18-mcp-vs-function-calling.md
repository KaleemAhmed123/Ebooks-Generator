## How is MCP different from plain function calling or old-style plugins?

- They operate at different layers:
  - **Function calling** is the **model capability** — the LLM emits a structured request to call a named function with arguments. It says nothing about where tools come from or how they're hosted.
  - **MCP** is the **integration protocol** — a standard way to *expose and discover* tools/data so any client can connect to any server. MCP tools are ultimately surfaced to the model *as* function calls.
- So they're complementary: MCP **supplies** the tools; function calling is **how the model invokes** them.
- Versus proprietary **plugins** (e.g. early ChatGPT plugins): those were vendor-specific and siloed. MCP is **open and portable** — a server works across any MCP-compatible host, avoiding lock-in.
- One-liner: function calling = the model's hand; MCP = the universal socket that any tool plugs into.

:::interview
What's really being tested: that you don't conflate the layers — function calling (model invocation) vs MCP (open integration/discovery protocol) — and see MCP as the portable successor to siloed plugins.
:::
