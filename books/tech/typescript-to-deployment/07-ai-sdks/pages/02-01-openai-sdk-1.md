# Module 2 - The OpenAI SDK

## Getting started

- The official Node SDK is a typed wrapper over the HTTP API, with retries, timeouts, streaming and pagination already handled
- It is worth learning first because the abstractions later in this booklet are built on exactly these calls, and debugging them means reading this layer

```bash
npm i openai
```

```ts
import OpenAI from "openai"

const client = new OpenAI()   // reads OPENAI_API_KEY

const response = await client.responses.create({
  model: "gpt-5.5",
  instructions: "You are a terse support assistant.",
  input: "How do I cancel an order?",
})

console.log(response.output_text)
// "Open the order and press Cancel."
```

### The three fields

- **`instructions`** is the standing system text, sent outside the conversation
- **`input`** is either a plain string or the full array of message items
- **`output_text`** is a convenience getter that concatenates the text parts, so simple cases need no parsing
