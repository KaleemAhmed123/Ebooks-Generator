### Connecting to one

```ts
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client"

const client = new Client({ name: "support-agent", version: "1.0.0" })
await client.connect(new StreamableHTTPClientTransport(new URL(process.env.MCP_URL)))

const { tools } = await client.listTools()
```

- **The tenant and the user still come from your session, never from the tool arguments.** A protocol boundary is not an authorization boundary
- Cap how many tools a server exposes. Fifty tool definitions in the prompt costs tokens on every turn and lowers accuracy
