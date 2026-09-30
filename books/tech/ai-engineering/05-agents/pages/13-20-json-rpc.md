## JSON-RPC: the message layer

- MCP does not invent a wire format. It runs on **JSON-RPC 2.0** — a tiny, decades-old standard for "call a method on the other side and get a result," expressed as JSON. If you know HTTP request/response, this is the same idea with less ceremony.
- Three message kinds, and that is the whole vocabulary:

:::mint
```json
// Request — has an id, expects a response
{ "jsonrpc": "2.0", "id": 1,
  "method": "tools/call",
  "params": { "name": "get_weather", "arguments": { "city": "Paris" } } }

// Response — same id, carries result OR error (never both)
{ "jsonrpc": "2.0", "id": 1,
  "result": { "content": [ { "type": "text", "text": "14°C, rain" } ] } }

// Notification — no id, fire-and-forget, no response
{ "jsonrpc": "2.0", "method": "notifications/initialized" }
```
:::

- **Request** carries an `id` and a `method` (like `tools/list`, `tools/call`, `resources/read`) with `params`. The other side must reply.
- **Response** echoes the `id` and returns either `result` or `error` — the `id` matches it to its request, exactly like the `tool_use_id` glue from function calling.
- **Notification** has no `id` and gets no reply — used for one-way signals like "I'm initialized" or "the tool list changed."

- Because it is symmetric, **either side can send requests**. The client calls the server's tools; the server can call *back* to the client (sampling, elicitation — later). This two-way capability is what makes MCP richer than a plain REST API.

:::note
JSON-RPC is deliberately dull, and that is the point. MCP's designers chose a boring, well-understood envelope so implementers argue about capabilities, not framing. Every MCP message you will ever debug is one of these three shapes; a wrong or missing `id`, or a `result`-and-`error` together, is usually the bug.
:::
