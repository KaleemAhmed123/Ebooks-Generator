## Structured output

- `generateObject` is the same idea as the provider-specific structured output, with one signature across every provider
- It picks the best mechanism the provider offers, native schema constraints where they exist and tool-based extraction where they do not

```ts
import { generateObject } from "ai"
import { z } from "zod"

const { object } = await generateObject({
  model: anthropic("claude-opus-5"),
  schema: z.object({
    category: z.enum(["billing", "delivery", "technical", "other"]),
    urgency: z.number().int().min(1).max(5),
    summary: z.string(),
  }),
  prompt: ticketBody,
})

object.urgency   // typed as number, already validated
```

### The output modes

```ts
output: "array"    // schema describes one element, you get a typed array
output: "enum"     // enum: ["billing", "delivery"], returns one string
output: "no-schema"// free-form JSON, unvalidated
```

- **`output: "array"` with `streamObject` yields complete elements as they finish**, which is how a list renders progressively instead of appearing at once

### Failure and cost

- A schema violation throws `NoObjectGeneratedError`, which carries the raw text and the usage, so the failed attempt can still be logged and billed for
- **Use `.describe()` on every non-obvious field.** The description reaches the model and is the cheapest accuracy improvement available
- Keep schemas shallow. Deep nesting raises both the failure rate and the token cost of the schema itself
