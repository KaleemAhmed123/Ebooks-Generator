## Streaming

- The reasoning is the same as the last module: the answer takes seconds, and the user should see the first words in milliseconds
- The Anthropic stream is a sequence of events describing blocks being started, filled and closed, which mirrors the block structure of the response

```ts
const stream = client.messages.stream({
  model: "claude-opus-5",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Explain idempotency keys." }],
})

stream.on("text", (delta) => process.stdout.write(delta))

const final = await stream.finalMessage()
console.log(final.usage)
```

- **`messages.stream` is the helper**, and it is the one to use. It accumulates the blocks for you and hands back a complete message at the end
- `messages.create` with `stream: true` gives the raw event iterator, which is only worth it when you need the individual events

### The raw events, for when you do

| Event | Means |
|---|---|
| `message_start` | the turn began, carries input usage |
| `content_block_start` | a new block, with its type |
| `content_block_delta` | a piece of text or of tool arguments |
| `content_block_stop` | that block is complete |
| `message_delta` | the stop reason and final usage |

### Two details that bite

- **Tool arguments stream as partial JSON**, one fragment per delta, so they cannot be parsed until the block stops
- The final `usage` only exists at the end. Code that logs cost must wait for `finalMessage` or `message_delta`, not the first event
