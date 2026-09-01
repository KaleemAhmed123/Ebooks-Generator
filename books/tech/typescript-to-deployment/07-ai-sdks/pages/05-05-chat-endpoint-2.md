### Saving the assistant turn

```ts
const result = streamText({
  model, messages,
  onEnd: ({ response, usage, finishReason }) =>
    saveMessages(conversationId, response.messages, usage, finishReason),
  onAbort: ({ steps }) => savePartial(conversationId, steps),
})
```

- **`response.messages` is the correctly shaped array to store**, tool calls included
- `onEnd` does not fire on an abort. Without `onAbort`, a user who disconnects loses the turn they paid for

### The three rules

- **Write the user message before calling the model**, so a provider failure does not lose what they typed
- **Send an idempotency key on send**, or a double click creates two turns
- **Trim what is sent, never what is stored.** The context is a view over the history, not the history
