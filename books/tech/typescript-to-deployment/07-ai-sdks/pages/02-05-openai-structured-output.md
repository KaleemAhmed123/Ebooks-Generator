## Structured output

- Asking for JSON in the prompt gives you JSON most of the time, and a wrapped code fence or an apology the rest of the time
- At a hundred requests a minute, most of the time is an incident
- **Structured output** constrains generation to a JSON Schema, so the response is valid by construction rather than by luck
- This is the single highest-value feature for backend work, because it turns a text generator into a typed function

```ts
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod"

const Ticket = z.object({
  category: z.enum(["billing", "delivery", "technical", "other"]),
  urgency: z.number().int().min(1).max(5),
  summary: z.string(),
})

const response = await client.responses.parse({
  model: "gpt-5.5",
  input: "My payment failed twice and the order is stuck.",
  text: { format: zodTextFormat(Ticket, "ticket") },
})

console.log(response.output_parsed)
// { category: "billing", urgency: 4, summary: "Payment failed twice..." }
```

- `responses.parse` validates against the Zod schema and gives back a typed object, so there is no cast and no manual `JSON.parse`

### The constraints that surprise people

- **Every field must be required**, and `additionalProperties` must be `false`. Model an optional field as a union with `null` rather than making it optional
- Schemas have a depth and size limit, so a deeply nested type will be rejected
- A refusal or a `max_tokens` truncation still produces no object. **Check the stop reason before reading the parsed value**

### Where to use it

- Classification, extraction from documents, routing, and anything whose output feeds another function rather than a human
