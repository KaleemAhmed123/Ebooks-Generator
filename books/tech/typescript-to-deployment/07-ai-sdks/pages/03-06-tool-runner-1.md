## The tool runner

- The loop on the last two pages is always the same: call, check for `tool_use`, run it, append the result, call again, until the stop reason is not `tool_use`
- Writing it by hand once is worth it. Writing it in every project is not, and hand-rolled versions usually forget the iteration cap
- **`toolRunner`** runs that loop for you, executing your handlers and feeding the results back

```ts
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod"
import { z } from "zod"

const getOrder = betaZodTool({
  name: "get_order",
  description: "Look up an order by its id.",
  inputSchema: z.object({ orderId: z.string() }),
  run: async ({ orderId }) => {
    const order = await db.order.findUnique({ where: { id: orderId } })
    return JSON.stringify(order ?? { error: "not found" })
  },
})

const runner = client.beta.messages.toolRunner({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Is o_842 delivered?" }],
  tools: [getOrder],
  max_iterations: 10,
})

const final = await runner
```
