## Prompt caching in practice

```ts
const message = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  system: [
    { type: "text", text: SUPPORT_RULES },
    { type: "text", text: POLICY_DOCUMENT, cache_control: { type: "ephemeral" } },
  ],
  messages,
})

console.log(message.usage)
// { input_tokens: 42, cache_creation_input_tokens: 0,
//   cache_read_input_tokens: 20418, output_tokens: 190 }
```

- The `cache_control` marker is a **breakpoint**. Everything before it in the request is the cacheable prefix
- `cache_read_input_tokens` being large is the proof it worked. If it is `0` on the second call, the prefix changed

| Field | Priced at |
|---|---|
| `cache_creation_input_tokens` | 1.25x normal input, or 2x for the one hour cache |
| `cache_read_input_tokens` | 0.1x normal input |
| `input_tokens` | everything after the last breakpoint, normal price |

### The rules that decide whether it works at all

- **The prefix must match byte for byte.** A timestamp, a user name or a shuffled tool list in the system prompt destroys every hit
- **Order matters: static first, dynamic last.** System text, then tools, then documents, then the conversation
- **There is a minimum.** Roughly 512 tokens on the newest models and up to 4,096 on older ones. Below it, nothing is cached and no error is raised
- The default lifetime is five minutes, refreshed on each hit. `ttl: "1h"` buys an hour at double the write price
- Up to four breakpoints, which is how you cache the system text and a long conversation separately
