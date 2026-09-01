## Tool calling

- A model cannot query your database or send an email. It can only produce text
- **Tool calling** closes that gap. You describe functions as JSON Schema, and the model replies with the name and arguments of one it wants run
- Your code runs it, sends the result back, and the model continues with the answer
- The model never executes anything. It asks, and **your code decides**, which is the security boundary the whole pattern rests on

```ts
const tools = [{
  type: "function" as const,
  name: "get_order",
  description: "Look up an order by its id.",
  parameters: {
    type: "object",
    properties: { orderId: { type: "string" } },
    required: ["orderId"],
    additionalProperties: false,
  },
  strict: true,
}]

let input: any[] = [{ role: "user", content: "What is the status of o_842?" }]

const first = await client.responses.create({ model: "gpt-5.5", input, tools })

for (const item of first.output) {
  if (item.type !== "function_call") continue
  const args = JSON.parse(item.arguments)
  const order = await db.order.findUnique({ where: { id: args.orderId } })
