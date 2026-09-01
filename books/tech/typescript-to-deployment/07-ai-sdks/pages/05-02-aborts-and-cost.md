## Aborts, and the tokens you pay for anyway

- A user who closes the tab stops reading. The model keeps generating, and the bill keeps growing
- Nothing tells the provider to stop unless your code does, and this is a real and invisible cost line

```ts
function abortOnClose(req: Request) {
  const controller = new AbortController()
  req.on("close", () => controller.abort())
  return controller.signal
}
```

- `AbortSignal.any([...])` combines a client disconnect with a hard timeout, so whichever happens first wins
- **Aborting stops billing at the point it reached**, not at zero. Partial output is still charged for

### Saving a partial answer

```ts
const result = streamText({
  model,
  messages,
  abortSignal: signal,
  onAbort: ({ steps }) => {
    logger.warn({ steps: steps.length }, "client disconnected mid-stream")
  },
  onEnd: ({ text, usage }) => saveMessage(conversationId, text, usage),
})
```

- **`onEnd` does not run on an abort.** `onAbort` does, and forgetting that is how half-finished assistant messages are lost

### Backpressure

- `res.write` returns `false` when the socket buffer is full, on a slow mobile connection
- Ignoring it grows the buffer in memory until the process dies, which is the streams lesson from Booklet 3 arriving in a new place
- Piping the stream, rather than writing in a loop, handles this correctly by default
