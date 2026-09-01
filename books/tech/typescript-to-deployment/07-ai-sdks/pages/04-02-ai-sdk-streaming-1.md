## Streaming

- `streamText` returns immediately with a set of streams and promises, rather than awaiting the whole answer
- The text arrives as an async iterable, which is the shape Node streams already use

```ts
import { streamText } from "ai"

const result = streamText({
  model: anthropic("claude-opus-5"),
  prompt: "Explain idempotency keys.",
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}

console.log(await result.usage)
```

- **`streamText` is not awaited.** It is called without `await`, and the promises on the result settle when the stream ends

### Sending it to a browser

```ts
// Next.js Route Handler
export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({ model: anthropic("claude-opus-5"), messages })
  return result.toUIMessageStreamResponse()
}
```

- That returns a `Response` with the right headers, encoding and ordering already handled
