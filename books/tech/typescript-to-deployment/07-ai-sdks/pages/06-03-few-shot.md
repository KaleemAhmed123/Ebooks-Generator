## Examples

- Some requirements are easier to show than to describe. Tone, edge-case handling, and the exact shape of an answer are all like that
- **Few-shot prompting** puts two to five worked examples in the prompt, so the pattern is demonstrated rather than explained
- It is usually a larger accuracy gain than any amount of rewriting the instructions

```ts
const messages = [
  { role: "user",      content: "Ticket: my card was charged twice" },
  { role: "assistant", content: '{"category":"billing","urgency":4}' },
  { role: "user",      content: "Ticket: the app crashes on checkout" },
  { role: "assistant", content: '{"category":"technical","urgency":3}' },
  { role: "user",      content: `Ticket: ${ticket}` },
]
```

- Real message turns beat examples pasted into the system prompt, because the model is matching the pattern of a conversation it is already in

### Choosing the examples

- **Pick the hard ones.** Easy cases are already handled. Examples earn their tokens on the boundaries
- **Cover every output class**, or the missing one gets picked less often than it should
- **Keep them consistent.** Two examples formatting a date differently teaches that either is acceptable
- Three to five is the usual sweet spot. Past that the gain flattens and the cost does not

### Dynamic examples

- Selecting the examples most similar to the current input, by embedding, raises accuracy again
- It also **destroys prompt caching**, because the prefix now changes per request
- Measure before choosing. On a cached prompt the fixed set is often the better trade
