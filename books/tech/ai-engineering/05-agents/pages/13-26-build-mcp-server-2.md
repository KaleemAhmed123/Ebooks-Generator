## Build an MCP server, part 2

- Add a **resource** and a **prompt**, then run the server. Same `FastMCP` instance from part 1.

:::mint
```python
# a RESOURCE — read-only data, addressed by URI, no side effects
@mcp.resource("weather://cities")
def known_cities() -> str:
    """The list of cities this server has cached."""
    return "Paris, Tokyo, Lima"

# a PROMPT — a user-invokable template returning messages
@mcp.prompt()
def trip_check(city: str) -> str:
    """Ask whether the weather suits outdoor plans in a city."""
    return f"Is the weather in {city} good for outdoor plans today? Check it."

if __name__ == "__main__":
    mcp.run()                      # default transport: stdio (next pages)
```
:::

- `@mcp.resource("weather://cities")` registers a resource at that URI; the client reaches it via `resources/read`. `@mcp.prompt()` registers a template the user triggers; the client reaches it via `prompts/get`. Three decorators, three primitives.
- **Run and register.** `mcp.run()` starts the server over stdio. To use it in a host like Claude Desktop, add it to the host's config so it launches your script as a subprocess:

:::mint
```json
{ "mcpServers": {
    "weather": { "command": "python", "args": ["/path/to/server.py"] } } }
```
:::

- **Test without a host** using the MCP **Inspector** (`npx @modelcontextprotocol/inspector python server.py`) — a dev UI that connects to your server, lists its tools/resources/prompts, and lets you call them by hand. Always inspect before wiring into an agent.

:::warn
The most common "it works in Inspector but not in Claude" bug is the config path or environment. The host launches your server as a fresh subprocess with a minimal environment — it will not have your shell's `PATH`, virtualenv, or API keys unless you specify them in the config (`env`, absolute paths, the venv's Python). Debug the subprocess launch, not the MCP code.
:::
