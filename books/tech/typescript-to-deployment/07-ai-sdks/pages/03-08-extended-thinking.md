## Extended thinking

- Some questions need working out rather than recall: a multi-step calculation, a plan, a tricky diagnosis
- **Extended thinking** gives the model a budget of tokens to reason with before it answers, and returns that reasoning as a `thinking` block
- It measurably improves hard tasks. It also costs tokens and adds latency, so it is wrong for a classifier

```ts
const message = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 4096,
  thinking: { type: "enabled", budget_tokens: 2048 },
  messages: [{ role: "user", content: "Plan a migration off this schema." }],
})
```

- `budget_tokens` must be less than `max_tokens`, because thinking is generated out of the same output budget
- `{ type: "adaptive" }` lets the model decide how much to spend per request, which is usually the better default in production

### Effort, the simpler knob

```ts
reasoning_effort: "low" | "medium" | "high" | "max"
```

- One setting instead of a token budget, and it is the easier thing to tune from configuration

### The rules

- **Pass thinking blocks back unchanged** in a multi-turn or tool-using conversation. Stripping them breaks the model's own continuity
- **Never show raw thinking to a user.** It is working, not an answer, and it can contain discarded reasoning that reads as a decision
- **Do not use it for extraction, classification or routing.** Those get slower and no more accurate
- Thinking tokens are billed as output tokens, which is the expensive side
