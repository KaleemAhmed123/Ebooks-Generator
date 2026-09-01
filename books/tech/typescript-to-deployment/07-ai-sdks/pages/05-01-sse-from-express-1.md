# Module 5 - Streaming in production

## Pushing a stream out of Express

- The provider streams to your server. Getting it from there to a browser is a separate problem, and it is where the real failures are
- **Server-Sent Events** is the right transport, for the reasons Booklet 6 gives: one direction, plain HTTP, automatic reconnection

```ts
app.post("/api/v1/chat", async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
  })

  const result = streamText({
    model: registry.languageModel("anthropic:chat"),
    messages: req.body.messages,
    abortSignal: AbortSignal.any([
      AbortSignal.timeout(120_000),
      abortOnClose(req),
    ]),
  })

  for await (const chunk of result.textStream) {
    res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`)
  }

  res.write("data: [DONE]\n\n")
  res.end()
})
```
