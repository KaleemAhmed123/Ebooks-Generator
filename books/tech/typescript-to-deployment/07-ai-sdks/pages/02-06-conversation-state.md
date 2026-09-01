## Carrying the conversation

- The model is stateless, so a multi-turn chat means the history reaches it somehow. There are exactly two ways

### 1. You hold it

```ts
const input = [
  { role: "user", content: "How do I cancel?" },
  { role: "assistant", content: "Open the order and press Cancel." },
  { role: "user", content: "It is greyed out." },
]
```

- The array lives in your database, and you resend it every turn
- **This is the default choice for a product.** You own the data, you can trim or summarize it, and you can move providers

### 2. The provider holds it

```ts
const second = await client.responses.create({
  model: "gpt-5.5",
  previous_response_id: first.id,
  input: "It is greyed out.",
})
```

- Only the new turn is sent. The provider stitches the history from the stored response
- Convenient for a prototype, and it means the conversation lives on someone else's server, subject to their retention policy
- `store: false` disables retention, and it also disables this feature. The two cannot both be true

### The trimming problem, which arrives either way

- History grows without bound, and the context window does not. Something must eventually be dropped
- **Keep the system prompt and the last N turns, and summarize the middle.** That is the standard shape, and Module 8 builds it
- Never trim from the front blindly. Dropping the turn where the user gave their order id makes every later answer wrong
