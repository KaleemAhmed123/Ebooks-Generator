## Streaming a response

- Return a `ReadableStream` instead of a finished body
- The client starts receiving bytes before the handler has finished

```ts
const encoder = new TextEncoder()

async function* generate() {
  yield encoder.encode("first\n")
  await new Promise((r) => setTimeout(r, 200))
  yield encoder.encode("second\n")
}

export async function GET() {
  const iterator = generate()

  const stream = new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
      if (done) controller.close()
      else controller.enqueue(value)
    },
  })

  return new Response(stream)
}
```

- `pull` is called when the consumer is ready for more. That is backpressure, handled for you
- `controller.close()` ends the response
