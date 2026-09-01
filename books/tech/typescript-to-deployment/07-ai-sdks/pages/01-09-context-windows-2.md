### Counting before you send

```ts
const { input_tokens } = await client.messages.countTokens({
  model: "claude-opus-5",
  messages,
  tools,
})
```

- The token counting endpoint is free and exact, where a local encoder is an estimate

### What happens at the edge

- **Input alone over the window** is a `400`, on every model, every time
- **Input plus `max_tokens` over the window** is accepted on current models, and generation stops with `stop_reason: "model_context_window_exceeded"`
- Code that only handles `end_turn` and `tool_use` treats that as a normal answer, and ships a truncated one
