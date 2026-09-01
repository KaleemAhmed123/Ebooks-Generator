### The three streams on the result

| Stream | Carries |
|---|---|
| `textStream` | text deltas only, the common case |
| `stream` | every part: text, tool calls, reasoning, finish |
| `toUIMessageStreamResponse()` | a `Response` for a browser client |

- **`stream` was called `fullStream` before version 7.** Most examples online still use the old name
