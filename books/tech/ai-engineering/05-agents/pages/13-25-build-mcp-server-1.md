## Build an MCP server, part 1

- Build a real server with the official **Python SDK** (`mcp`, which ships `FastMCP`, a high-level decorator API). This is runnable as of the 2025 SDK. **[VERIFY current SDK API]**

:::mint
```python
# pip install mcp        # the official Model Context Protocol SDK
from mcp.server.fastmcp import FastMCP
import httpx

mcp = FastMCP("weather")          # the server's name, sent in the handshake

@mcp.tool()                        # exposes this function as an MCP tool
async def get_weather(city: str) -> str:
    """Get current weather for a city. Use for today's conditions."""
    async with httpx.AsyncClient() as c:
        r = await c.get(f"https://wttr.in/{city}?format=j1")
        cur = r.json()["current_condition"][0]
    return f'{cur["temp_C"]}°C, {cur["weatherDesc"][0]["value"]}'
```
:::

- **The decorator does the protocol work.** `@mcp.tool()` reads the function's **name**, its **docstring** (→ the tool description the model reads), and its **type hints** (`city: str` → the `inputSchema`). You write a normal function; the SDK generates the MCP tool definition and wires `tools/list` and `tools/call`.
- **Type hints are your schema.** `city: str` becomes a required string parameter. Use `Literal["celsius","fahrenheit"]` for an enum, defaults for optional args — the same schema-design rules from earlier, expressed as Python types.
- **The docstring is the description** — so write it as 13-13 demands: what it does and when to use it, not "gets weather."

:::note
FastMCP collapses the boilerplate (JSON-RPC, handshake, list/call routing) into decorators, the way FastAPI collapses HTTP. You are left writing only the actual logic. Under the hood it is still the `initialize` handshake and `tools/call` messages from the previous pages — the SDK just spares you hand-writing them. Next page: adding a resource and running it.
:::
