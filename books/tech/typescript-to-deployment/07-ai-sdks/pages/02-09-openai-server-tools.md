## Built-in tools and automatic caching

### Tools the provider runs

- Some tools do not need your code at all. The provider executes them and returns the result inside the same response

```ts
const response = await client.responses.create({
  model: "gpt-5.5",
  input: "What changed in Node 24?",
  tools: [{ type: "web_search" }],
})
```

| Tool | Does | Watch |
|---|---|---|
| `web_search` | searches and cites live pages | results are untrusted input, see Module 6 |
| `file_search` | retrieval over files you uploaded | a hosted vector store you do not control |
| `code_interpreter` | runs Python in a sandbox | per-session charge, no network |
| `computer_use` | drives a virtual desktop | slow, and needs strict supervision |

- **The trade is control.** `file_search` is retrieval with none of the decisions in Module 7 available to you
- Server tools add usage-based charges on top of tokens, so they need their own budget line

### Automatic prompt caching

- OpenAI caches long prompt prefixes **automatically**, with no marker to place, on requests over roughly 1,024 tokens
- Anthropic requires an explicit `cache_control` breakpoint. The mechanics differ; the discipline does not

```ts
console.log(response.usage.input_tokens_details.cached_tokens)   // 2048
```

- **The rule is identical either way: static first, dynamic last, byte for byte.** A timestamp near the top of the prompt defeats both
- `prompt_cache_key` groups requests that share a prefix, which raises the hit rate across a fleet of servers
