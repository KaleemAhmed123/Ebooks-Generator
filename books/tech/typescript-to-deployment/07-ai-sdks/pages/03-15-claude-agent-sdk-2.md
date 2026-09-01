### Custom tools

```ts
import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk"
import { z } from "zod"

const lookup = tool("get_order", "Look up an order", { orderId: z.string() },
  async ({ orderId }) => ({ content: [{ type: "text", text: await fetchOrder(orderId) }] }))

const server = createSdkMcpServer({ name: "orders", version: "1.0.0", tools: [lookup] })
```

- Sessions can be listed and resumed by id, which gives durability without the queue in Module 8
- **It is built for agents that touch a filesystem.** For a chat feature, the AI SDK in Module 4 is the lighter fit
