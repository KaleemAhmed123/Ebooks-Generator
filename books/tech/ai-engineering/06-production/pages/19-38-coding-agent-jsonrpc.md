## Coding agent: JSON-RPC over stdio

- Tools often run as *separate processes* (a language server, a sandbox, an MCP server from Booklet 5) — for isolation and language independence. **JSON-RPC over stdio** is the standard wire protocol: newline-delimited JSON request/response messages over a process's stdin/stdout. It is exactly what MCP uses.

:::mint
```python
import json, subprocess

class StdioClient:
    def __init__(self, cmd):
        self.proc = subprocess.Popen(cmd, stdin=subprocess.PIPE,
            stdout=subprocess.PIPE, text=True, bufsize=1)
        self._id = 0
    def call(self, method, params):
        self._id += 1
        req = {"jsonrpc": "2.0", "id": self._id, "method": method, "params": params}
        self.proc.stdin.write(json.dumps(req) + "\n")   # one JSON per line
        self.proc.stdin.flush()
        resp = json.loads(self.proc.stdout.readline())  # read the reply
        if "error" in resp: raise RuntimeError(resp["error"])
        return resp["result"]
```
:::

- **Why JSON-RPC and stdio.** JSON-RPC is a tiny, language-agnostic request/response standard (a method name, params, an id, a result-or-error) — so a Python harness can drive a tool server written in any language. Stdio (stdin/stdout pipes) needs no ports, no network, no auth for a local child process — the simplest possible transport, which is why MCP defaults to it for local servers.
- **The `id` matches replies to requests** — essential once calls are concurrent or streamed, so a late response is routed to the right waiting caller.

:::note
Building this transport is why MCP (Booklet 5) stops feeling like magic: an MCP server *is* a JSON-RPC-over-stdio process exposing `tools/list` and `tools/call`, exactly this pattern with a defined method vocabulary. Once you have written the client, adding MCP servers to your agent is just pointing this transport at their command and speaking the MCP method names. The transport is the humble foundation the whole tool-and-protocol ecosystem stands on.
:::
