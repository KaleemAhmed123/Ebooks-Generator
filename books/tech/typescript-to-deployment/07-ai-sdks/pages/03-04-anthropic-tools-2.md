## Tool use - continued

messages.push(
  { role: "assistant", content: first.content },
  { role: "user", content: [
    { type: "tool_result", tool_use_id: call.id, content: JSON.stringify(order) },
  ]},
)

const second = await client.messages.create({
  model: "claude-opus-5", max_tokens: 1024, tools, messages,
})
```

- **The tool result goes in a `user` message**, which surprises everyone once. It is the caller reporting back
- **`tool_use_id` must match** or the request is rejected
- Push the assistant's `content` array back **unchanged**. Rebuilding it from the text loses the tool call and breaks the pairing
