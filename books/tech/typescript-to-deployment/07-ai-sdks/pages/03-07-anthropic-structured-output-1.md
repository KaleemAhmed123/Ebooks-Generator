## Structured output

- Same problem as Module 2: the answer has to be an object your code can use, not prose that mostly looks like one
- The Anthropic API takes a schema on `output_config` and constrains generation to it

```ts
import { z } from "zod"
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod"

const Ticket = z.object({
  category: z.enum(["billing", "delivery", "technical", "other"]),
  urgency: z.number().int().min(1).max(5),
  summary: z.string(),
})

const message = await client.messages.parse({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: ticketBody }],
  output_config: { format: zodOutputFormat(Ticket) },
})

console.log(message.parsed_output)
// { category: "billing", urgency: 4, summary: "Payment failed twice..." }
```
