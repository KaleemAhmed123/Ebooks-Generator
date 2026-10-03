## Flagship 10: MCP server with registry — build

- **Goal:** build a Model Context Protocol server (Booklet 5) that exposes tools to any MCP client, plus a **registry** so an agent can discover and load servers dynamically. This turns Flagship 4's local tools into a shareable, standardised ecosystem. Verified against the MCP Python SDK idiom.

:::mint
```python
# pip install mcp
from mcp.server.fastmcp import FastMCP
mcp = FastMCP("code-tools")

@mcp.tool()
def run_tests(path: str) -> str:
    """Run the test suite at path and return pass/fail output."""
    return subprocess.run(["pytest", path], capture_output=True, text=True).stdout

@mcp.resource("repo://{file}")            # expose read-only data as a resource
def read_file(file: str) -> str:
    return open(file).read()

if __name__ == "__main__":
    mcp.run()                              # speaks JSON-RPC over stdio
```
:::

- **FastMCP collapses the protocol into decorators** (the exemplar from Booklet 5): `@mcp.tool()` reads the function name, docstring (→ description), and type hints (→ input schema) and wires the JSON-RPC `tools/list` and `tools/call`. A **resource** exposes read-only data. The transport is the JSON-RPC-over-stdio of Flagship 4.
- **The registry** is a directory of servers (name, command, capabilities) an agent queries to *discover* and load tools at runtime — e.g. `{"code-tools": {"cmd": [...], "caps": ["run_tests"]}}` — instead of hard-coding them, then `load_server(name)` spawns the `StdioClient`.

:::note
The registry turns MCP from "a way to write one tool server" into an *ecosystem*: an agent discovers which servers exist, loads the ones a task needs, and speaks one protocol to all — the M×N integration problem (Booklet 5) solved. Module 18's security caveat applies: a registry is a supply chain, so an agent must vet what it loads (tool-poisoning, rug-pulls), pin versions, and run untrusted servers least-privilege. Discovery convenience and supply-chain risk are the same coin.
:::
