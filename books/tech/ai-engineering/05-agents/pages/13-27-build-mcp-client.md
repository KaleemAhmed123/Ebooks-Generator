## Build an MCP client

- The other half: a **client** that connects to a server, lists its tools, and calls one. This is what a host does internally — and what you write when your *own* agent needs to consume MCP servers. **[VERIFY current SDK API]**

:::mint
```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

params = StdioServerParameters(command="python", args=["server.py"])

async with stdio_client(params) as (read, write):
    async with ClientSession(read, write) as session:
        await session.initialize()                 # the handshake (13-21)

        tools = await session.list_tools()          # tools/list
        # → hand tools to your LLM as its tool definitions

        result = await session.call_tool(           # tools/call
            "get_weather", {"city": "Paris"})
        print(result.content)                        # "14°C, rain"
```
:::

- **`initialize()` runs the handshake** — version and capability negotiation — before anything else, exactly as 13-21 described. Skip it and every call errors.
- **`list_tools()` feeds your model.** You take the returned tool definitions and pass them as the `tools` parameter to your LLM API. Now the model can request them; when it does, you call `call_tool()` and return the result — the round trip of 13-04, with MCP as the transport to the actual function.
- **This is the bridge.** MCP standardizes *tool discovery and invocation*; your agent loop (Module 14) still drives *when* to call. The client turns any MCP server into tools your existing agent can use, no per-server code.

:::interview
"How does an MCP server's tool actually reach the model?"

The host's client connects, runs `initialize`, then `tools/list` to fetch the server's tool definitions. The client passes those definitions to the LLM as its available tools. When the model emits a tool call, the client sends `tools/call` to the server, gets the result, and feeds it back into the conversation. MCP is the discovery-and-transport layer; the model's function-calling mechanism is unchanged.
:::
