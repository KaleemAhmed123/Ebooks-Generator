## Testing the code around the model

- Evaluations measure the model. **Ordinary tests still have to cover everything else**, which is most of the code
- Calling a real model in a unit test makes it slow, expensive and flaky. Nothing about the routing, parsing or error handling needs a real call

```ts
import { MockLanguageModelV3, simulateReadableStream } from "ai/test"
import { generateText } from "ai"

const model = new MockLanguageModelV3({
  doGenerate: async () => ({
    content: [{ type: "text", text: '{"category":"billing","urgency":4}' }],
    finishReason: "stop",
    usage: { inputTokens: 10, outputTokens: 20 },
  }),
})

const { text } = await generateText({ model, prompt: "anything" })
```

### What to test with a mock

- **Tool execution**, including the authorization check inside it. This is where a real bug hides
- **The failure paths**: a `429`, a timeout, a refusal, a truncated response, a schema violation
- **The budget and step limits**, by returning a tool call forever and asserting the loop stops
- **Streaming assembly**, using `simulateReadableStream` to produce deltas without a network

### The layer above

- **Record a handful of real responses and replay them** in integration tests. Real shapes, no cost, no flakiness
- Re-record when the provider version changes, which is also how you notice that it did

### The rule

- **Never let a unit test call a provider.** It will fail in CI at the worst time, for a reason unrelated to the change
