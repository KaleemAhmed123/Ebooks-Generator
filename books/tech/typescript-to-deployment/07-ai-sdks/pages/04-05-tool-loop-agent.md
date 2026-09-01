## The agent loop, packaged

- A **`ToolLoopAgent`** is a reusable configuration: a model, a set of tools, instructions and a stopping condition, bundled as an object
- It exists because the same four arguments get passed to `generateText` in a dozen places, and drift apart

```ts
import { ToolLoopAgent, tool, isStepCount } from "ai"
import { z } from "zod"

const supportAgent = new ToolLoopAgent({
  model: anthropic("claude-opus-5"),
  instructions: "Answer support questions. Look up orders before answering.",
  tools: {
    getOrder: tool({
      description: "Look up an order by its id.",
      inputSchema: z.object({ orderId: z.string() }),
      execute: ({ orderId }) => db.order.findUnique({ where: { id: orderId } }),
    }),
  },
  stopWhen: isStepCount(8),
})

const result = await supportAgent.generate({ prompt: "Where is o_842?" })
console.log(result.text, result.steps.length)
```

- `generate` returns when the loop finishes. `stream` gives the same loop as a stream

### What it changes and what it does not

- It is **configuration reuse, not new capability.** Everything it does can be written with `generateText` and the same arguments
- The value is one definition per agent, testable on its own and shared between a route, a queue worker and a test
- **It is still a single process holding state in memory.** An agent that must survive a restart needs the durable pattern in Module 8
- `@ai-sdk/workflow` ships a `WorkflowAgent` for exactly that, running the same loop inside a durable workflow with approval steps
