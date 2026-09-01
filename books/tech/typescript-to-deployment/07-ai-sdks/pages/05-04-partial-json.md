## Streaming an object

- Streaming text is simple because a half-sentence is still readable. A half JSON object is a syntax error
- Rendering a form, a table or a list as it generates therefore needs a parser that tolerates an unfinished document

```ts
import { streamObject } from "ai"

const result = streamObject({
  model: registry.languageModel("anthropic:chat"),
  schema: z.object({
    title: z.string(),
    steps: z.array(z.object({ heading: z.string(), body: z.string() })),
  }),
  prompt: "Write a runbook for a failed payout.",
})

for await (const partial of result.partialObjectStream) {
  render(partial)   // DeepPartial of the schema, fields appear as they finish
}

const finished = await result.object   // validated, complete
```

- **`partialObjectStream` yields a deep partial**, so every field is possibly undefined and the renderer must handle that
- **`result.object` is the only validated value.** Never write a partial to a database

### Element at a time

```ts
const result = streamObject({ model, output: "array", schema: Step, prompt })

for await (const step of result.elementStream) {
  console.log(step)   // one complete, validated element per iteration
}
```

- That is the better shape for a list, because each element arrives whole
- Underneath both is the same idea: close the open braces, parse, discard incomplete leaves. `partial-json` does it standalone if you need it outside the SDK
