## Building an MCP server

- The SDK split at version 2. Server and client are separate packages now, and older examples import a single `@modelcontextprotocol/sdk`

```bash
npm i @modelcontextprotocol/server zod
```

```ts
import { McpServer, createMcpHandler } from "@modelcontextprotocol/server"
import * as z from "zod"

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: "orders", version: "1.0.0" })

  server.registerTool(
    "get-order",
    {
      description: "Look up an order by its id.",
      inputSchema: z.object({ orderId: z.string() }),
    },
    async ({ orderId }) => {
      const order = await db.order.findUnique({ where: { id: orderId } })
      return { content: [{ type: "text", text: JSON.stringify(order) }] }
    },
  )

  return server
})
```

- `createMcpHandler` gives a `fetch` style handler, so it mounts on any HTTP server and is testable in-process with no socket
- The tool returns **content blocks**, the same shape the models use, rather than a bare value
