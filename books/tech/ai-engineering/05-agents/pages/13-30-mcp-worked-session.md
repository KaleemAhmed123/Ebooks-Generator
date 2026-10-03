## A worked MCP session

- One full session on the wire, from launch to answer, so every prior page connects. Client ↔ a weather server over stdio.

:::mint
```json
C→S  {"jsonrpc":"2.0","id":1,"method":"initialize",
      "params":{"protocolVersion":"2025-06-18",
                "capabilities":{"sampling":{}},
                "clientInfo":{"name":"my-agent","version":"1.0"}}}
S→C  {"jsonrpc":"2.0","id":1,"result":{
        "protocolVersion":"2025-06-18",
        "capabilities":{"tools":{"listChanged":true}},
        "serverInfo":{"name":"weather","version":"1.0"}}}
C→S  {"jsonrpc":"2.0","method":"notifications/initialized"}

C→S  {"jsonrpc":"2.0","id":2,"method":"tools/list"}
S→C  {"jsonrpc":"2.0","id":2,"result":{"tools":[
        {"name":"get_weather","description":"Get current weather…",
         "inputSchema":{"type":"object",
           "properties":{"city":{"type":"string"}},"required":["city"]}}]}}

C→S  {"jsonrpc":"2.0","id":3,"method":"tools/call",
      "params":{"name":"get_weather","arguments":{"city":"Paris"}}}
S→C  {"jsonrpc":"2.0","id":3,"result":{
        "content":[{"type":"text","text":"14°C, rain"}]}}
```
:::

- Read it top to bottom: **handshake** (ids 1 + the initialized notification), **discovery** (id 2, `tools/list`), **invocation** (id 3, `tools/call`). Every `id` pairs a request with its response; the notification has none.
- Notice the model is absent from this trace. MCP moves *tool definitions and results*; the host's LLM sits above, deciding — on seeing id-2's tool list — to emit the call that becomes id-3. MCP is the plumbing; the model is the decision-maker.

:::note
If you can read this trace, you can debug any MCP problem. Connection issues live in the `initialize` exchange (version/capability mismatch). Missing tools live in `tools/list`. Wrong behavior lives in `tools/call` arguments or the returned `content`. The MCP Inspector shows you exactly these messages — which is why "inspect first" is the rule.
:::
