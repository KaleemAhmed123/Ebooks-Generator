## Tool use

- Same idea as Module 2, different shape: you describe a tool, the model replies with a `tool_use` block, you run it and send back a `tool_result`
- The round trip is worth writing out once by hand, because every agent framework later in this booklet is this loop with more code around it

```ts
const tools: Anthropic.Tool[] = [{
  name: "get_order",
  description: "Look up an order by its id.",
  input_schema: {
    type: "object",
    properties: { orderId: { type: "string" } },
    required: ["orderId"],
  },
}]

const messages: Anthropic.MessageParam[] = [
  { role: "user", content: "What is the status of o_842?" },
]

const first = await client.messages.create({
  model: "claude-opus-5", max_tokens: 1024, tools, messages,
})

const call = first.content.find(
  (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
)!

const order = await db.order.findUnique({ where: { id: call.input.orderId } })
