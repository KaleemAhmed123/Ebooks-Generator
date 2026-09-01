## Streaming an LLM response

- This is the most common reason a backend route streams
- A model answers token by token, and waiting for the whole answer feels broken

```ts
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  })

  return result.toTextStreamResponse()
}
```

- The SDK builds the `ReadableStream`. You are still returning a plain `Response`

### Two things that will bite you

- **A proxy that buffers.** Nginx buffers responses by default, so the stream arrives all at once. Turn buffering off for that route
- **A platform timeout.** A serverless function has a hard limit, often 10 to 60 seconds. A long answer gets cut mid-sentence with no error

- Booklet 7 covers models, tools and cost. This page is only about getting the bytes out
