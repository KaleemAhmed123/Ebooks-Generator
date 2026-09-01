### The tool search tool

- Fifty tool definitions cost tokens on every turn and lower accuracy, because the model is choosing from a crowded list
- **`tool_search` defers the definitions.** The model searches for a tool by capability and only then loads its schema
- That is what makes a large tool catalogue workable, and it is the same idea as lazy loading a module

### The rule for all of them

- **Anything a server tool returns is untrusted text**, especially a fetched web page. It reaches the context with the same authority as your prompt
- Budget for them separately. A search or a sandbox session is billed on top of tokens
