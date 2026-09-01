## Content blocks and the stop reason

- A response is not one string. It is a list of typed **content blocks**, because one turn can contain several different things
- A single reply might hold a thinking block, some text, and two tool calls, and each needs handling differently
- Treating `content[0]` as the answer works until the day the model thinks first, and then it silently reads the wrong block

```ts
const text = message.content
  .filter((b): b is Anthropic.TextBlock => b.type === "text")
  .map((b) => b.text)
  .join("")
```

| Block type | Holds |
|---|---|
| `text` | prose for the user |
| `thinking` | the model's reasoning, when enabled |
| `tool_use` | a request to run one of your tools |
| `tool_result` | sent by you, in a `user` message |
