## Messages and roles

- The request body is an **array of messages**, and each message has a role saying who said it
- The array is the entire memory of the conversation. Drop it and the model starts blank
- Every turn resends the whole array, which is why a long chat gets more expensive with each message rather than staying flat

| Role | Holds |
|---|---|
| `system` | standing instructions, sent once, outside the conversation |
| `user` | what the caller said, and tool results in the Anthropic shape |
| `assistant` | what the model said, including its tool calls |

```ts
const messages = [
  { role: "user",      content: "How do I cancel an order?" },
  { role: "assistant", content: "Open the order and press Cancel." },
  { role: "user",      content: "It is greyed out." },
]
```

### The system prompt is not a message

- It is a separate field on the request in the Anthropic API and a separate role in the OpenAI one
- It carries the rules that never change: who the assistant is, what it may do, and the shape of its answers
- Keeping it constant is also what makes prompt caching work, covered in Module 3

### The rule that prevents the common bug

- **Messages must alternate and must end with a user turn.** Two user messages in a row, or a trailing assistant message, is rejected by some providers and confuses all of them
- Store the array in your database exactly as sent. Rebuilding it from a rendered chat log loses the tool calls and breaks the next turn
