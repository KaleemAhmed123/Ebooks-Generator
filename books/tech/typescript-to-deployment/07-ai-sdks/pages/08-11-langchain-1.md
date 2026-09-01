## LangChain

- LangChain is the oldest of these libraries and the most misunderstood, largely because version 1 is a different thing from what earlier tutorials describe
- The chains and the abstraction stack are gone. **What remains is `createAgent`, a model-agnostic agent loop with middleware**
- Its real value is the integration surface: hundreds of model providers, vector stores, loaders and tools already wrapped

```bash
npm i langchain @langchain/anthropic zod
```

```ts
import { createAgent, tool } from "langchain"
import { MemorySaver } from "@langchain/langgraph"
import * as z from "zod"

const getOrder = tool(
  async ({ orderId }) => JSON.stringify(await db.order.findUnique({ where: { id: orderId } })),
  {
    name: "get_order",
    description: "Look up an order by its id.",
    schema: z.object({ orderId: z.string() }),
  },
)

const agent = createAgent({
  model: "anthropic:claude-opus-5",
  systemPrompt: "Answer support questions. Look up orders before answering.",
  tools: [getOrder],
  checkpointer: new MemorySaver(),
})

const result = await agent.invoke(
  { messages: [{ role: "user", content: "Where is o_842?" }] },
  { configurable: { thread_id: conversationId } },
)
```
