## Server tools and tool search

- Anthropic runs a set of tools on its own infrastructure. You pass the tool definition and receive the result, with no handler to write

```ts
const message = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  tools: [{ type: "web_search_20260209", name: "web_search" }],
  messages: [{ role: "user", content: "What changed in Node 24?" }],
})
```

| Tool | Runs | Does |
|---|---|---|
| `web_search` | server | searches, returns cited results |
| `web_fetch` | server | retrieves a page or PDF in full |
| `code_execution` | server | Python and bash in a sandbox |
| `tool_search` | server | finds and loads tools on demand |
| `bash`, `text_editor` | **your machine** | Anthropic defines the schema, you execute |
| `computer_use`, `browser_use` | your machine | screenshots, mouse, keyboard |

- **Client tools with an Anthropic schema still run on your side.** The model is trained on the schema, and the execution and its risks are yours
