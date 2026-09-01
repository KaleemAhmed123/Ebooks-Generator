## Streaming

- A long answer takes many seconds to generate, and a user staring at a spinner for eight seconds assumes the feature is broken
- **Streaming** sends the answer in pieces as it is produced, so the first words appear in a few hundred milliseconds
- The total time is the same. The perceived time is completely different, and that is the whole point
- It also lets you abort a bad answer partway rather than paying for all of it

```ts
const stream = await client.responses.create({
  model: "gpt-5.5",
  input: "Explain idempotency keys in three sentences.",
  stream: true,
})

for await (const event of stream) {
  if (event.type === "response.output_text.delta") {
    process.stdout.write(event.delta)
  }
}
```

### It is an event stream, not a text stream

- Every event carries a `type`. Text arrives as `response.output_text.delta`, and there are separate events for tool calls, reasoning and completion
- **Handle the types you care about and ignore the rest.** Providers add event types, and code that switches exhaustively breaks on the next release

### Aborting

```ts
const controller = new AbortController()
const stream = await client.responses.create({ ... }, { signal: controller.signal })
```

- Wire the signal to the client disconnecting, or a user who closes the tab keeps generating tokens you pay for
- Module 5 covers pushing this stream out over SSE from an Express route, which is where the real work is
