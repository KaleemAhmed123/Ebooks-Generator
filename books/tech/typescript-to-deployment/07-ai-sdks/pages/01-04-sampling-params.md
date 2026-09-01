## The knobs on a request

- A model does not pick the single most likely next token. It samples from a distribution, which is why the same prompt gives different answers
- The sampling parameters control how wide that sampling is, and there are only a handful worth touching

| Parameter | Does | Sensible value |
|---|---|---|
| `temperature` | how much randomness. `0` is near deterministic | `0` for extraction, `0.7` for prose |
| `top_p` | sample only from the most likely slice | leave it, or tune this **or** temperature, never both |
| `max_tokens` | ceiling on the output | always set it |
| `stop_sequences` | text that ends generation early | rarely needed now |

```ts
const response = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 512,
  temperature: 0,
  messages,
})
```

### `max_tokens` is a truncation, not a target

- The model does not aim for it. It generates until finished or until the ceiling cuts it off mid-sentence
- A truncated answer is reported as `stop_reason: "max_tokens"`, and code that ignores that field parses half a JSON object and blames the model
- **Always read the stop reason** before trusting the output

### Temperature zero is not deterministic

- It is much more repeatable, and it is still not a guarantee. Floating point ordering on the provider side varies
- Never build a cache key, an idempotency check or a test assertion on the exact output text
