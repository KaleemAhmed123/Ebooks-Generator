# Module 4 - The Vercel AI SDK

## Why a layer over the SDKs

- The last two modules solved the same problems twice, with different field names, different response shapes and different streaming events
- A product that wants to move from one provider to another, or route cheap requests to a small model somewhere else, ends up writing an adapter
- **The AI SDK is that adapter, maintained.** One function signature, forty providers behind it
- It is not a framework. It does not own your routes, your database or your state. It normalizes the call and gets out of the way

```bash
npm i ai @ai-sdk/openai @ai-sdk/anthropic zod
```

```ts
import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

const { text, usage } = await generateText({
  model: anthropic("claude-opus-5"),
  instructions: "You are a terse support assistant.",
  prompt: "How do I cancel an order?",
})

console.log(text)    // "Open the order and press Cancel."
console.log(usage)   // { inputTokens: 31, outputTokens: 9, totalTokens: 40 }
```

### Swapping the provider is one line

```ts
import { openai } from "@ai-sdk/openai"

model: openai("gpt-5.5")
```

- Everything else, tools, streaming, structured output, stays identical
- **What it cannot normalize is behavior.** A prompt tuned for one model is not tuned for another, so a provider swap is still a change that needs testing
