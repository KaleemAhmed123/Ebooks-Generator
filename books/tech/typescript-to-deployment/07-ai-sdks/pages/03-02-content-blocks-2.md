### `stop_reason` is the field to branch on

| Value | Means | Do |
|---|---|---|
| `end_turn` | finished normally | use the answer |
| `tool_use` | it wants a tool run | run it and send the result back |
| `max_tokens` | truncated mid-sentence | raise the ceiling or ask for less |
| `stop_sequence` | hit a stop string | usually intentional |
| `refusal` | it declined | show a fallback, do not retry blindly |

```ts
if (message.stop_reason === "max_tokens") {
  throw new Error("response truncated")
}
```

- **Parsing the text without checking this is the most common bug in this module.** Half a JSON object parses as an error, not as truncation, and the log says nothing useful
