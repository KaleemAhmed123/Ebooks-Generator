## Tools

- Same concept as the raw SDKs, with the schema written in Zod instead of JSON Schema, and the loop run for you
- The `execute` function is your code. The SDK calls it, feeds the result back, and continues until the model stops asking

```ts
import { generateText, tool, isStepCount } from "ai"
import { z } from "zod"

const { text, steps } = await generateText({
  model: anthropic("claude-opus-5"),
  prompt: "Is order o_842 delivered, and when was it shipped?",
  tools: {
    getOrder: tool({
      description: "Look up an order by its id.",
      inputSchema: z.object({ orderId: z.string().describe("like o_842") }),
      execute: async ({ orderId }) =>
        db.order.findUnique({ where: { id: orderId } }),
    }),
  },
  stopWhen: isStepCount(5),
})

console.log(steps.length)   // 2
```

### `stopWhen` is the budget, and it is required in practice

- Without it the SDK runs **one step**, returning the tool call without ever answering, which is the most common first surprise
- `isStepCount(5)` allows up to five model calls. Each step is a full request, so five steps is five times the cost
- Conditions compose: `stopWhen: [isStepCount(10), hasToolCall("submitAnswer")]` stops at whichever comes first

### The v7 renames worth knowing

- **`stepCountIs` is now `isStepCount`**, and `maxSteps` was replaced by `stopWhen` before that
- `parameters` on a tool is now **`inputSchema`**
- **Validate inside `execute` anyway** when the tool writes anything. Zod checks the shape; it does not check that this user may refund that order
