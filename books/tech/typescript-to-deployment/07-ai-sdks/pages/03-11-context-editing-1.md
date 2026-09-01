## Context editing and compaction

- An agent that has run thirty tool calls is carrying thirty tool results it will never look at again
- The context window fills, cost rises on every turn, and eventually the request is rejected outright
- **Context editing** removes old tool results from the request automatically, on the server, once a threshold is crossed

```ts
const message = await client.beta.messages.create({
  model: "claude-opus-5",
  max_tokens: 2048,
  betas: ["context-management-2025-06-27"],
  context_management: {
    edits: [{
      type: "clear_tool_uses_20250919",
      trigger: { type: "input_tokens", value: 60_000 },
      keep: { type: "tool_uses", value: 5 },
      exclude_tools: ["get_order"],
    }],
  },
  tools,
  messages,
})

console.log(message.context_management?.applied_edits)
// [{ type: "clear_tool_uses_20250919", cleared_tool_uses: 8, cleared_input_tokens: 50120 }]
```

| Parameter | Does |
|---|---|
| `trigger` | the token or tool-use count that activates clearing |
| `keep` | how many recent tool use and result pairs survive |
| `clear_at_least` | a floor, so a clear that would gain little does not run |
| `exclude_tools` | results that must never be dropped |
