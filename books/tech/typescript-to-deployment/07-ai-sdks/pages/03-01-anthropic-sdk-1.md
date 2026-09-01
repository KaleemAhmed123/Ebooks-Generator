# Module 3 - The Anthropic SDK

## Getting started

- The Anthropic API has one generation endpoint, `messages`, rather than the two OpenAI carries
- The shapes differ enough from the last module to be worth learning properly, because the abstraction layers hide them and the debugging does not

```bash
npm i @anthropic-ai/sdk
```

```ts
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()   // reads ANTHROPIC_API_KEY

const message = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 512,
  system: "You are a terse support assistant.",
  messages: [{ role: "user", content: "How do I cancel an order?" }],
})

console.log(message.content[0].text)
// "Open the order and press Cancel."
```
