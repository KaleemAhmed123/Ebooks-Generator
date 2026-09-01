## Responses against Chat Completions

- OpenAI has two endpoints that both generate text, and picking the wrong one is the usual first confusion
- **Chat Completions** is the older one. You send the whole message array every turn and get one message back
- **Responses** is the newer one. It models a turn as a list of typed items, and it can hold the conversation state on the server

| | Chat Completions | Responses |
|---|---|---|
| Call | `client.chat.completions.create` | `client.responses.create` |
| History | you resend it every time | `previous_response_id` or your own array |
| Output | one message | a list of typed output items |
| Built-in tools | none | web search, file search, code interpreter |
| New features | maintained | where they land first |

```ts
// Chat Completions, the shape most tutorials still show
const completion = await client.chat.completions.create({
  model: "gpt-5.5",
  messages: [
    { role: "system", content: "You are terse." },
    { role: "user", content: "How do I cancel an order?" },
  ],
})

console.log(completion.choices[0].message.content)
```

### Which to use

- **New work: Responses.** It is where the provider is adding capability, and the item model handles tools and reasoning more cleanly
- **Chat Completions** remains the right choice when a library, a proxy or a self-hosted model only speaks that shape, which is most of the compatible ecosystem
- The output shape differs, so the choice leaks into your code. Wrap it behind one function of your own rather than scattering either call across a codebase
