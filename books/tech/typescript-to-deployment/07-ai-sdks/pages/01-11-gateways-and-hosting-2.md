### Self-hosted models

- **vLLM** is the serious option for a server, and **Ollama** is the easy one for a laptop. Both expose an OpenAI-compatible endpoint
- Any OpenAI-compatible endpoint plugs into the same client, which is why that shape became the standard

```ts
const local = createOpenAICompatible({ name: "local", baseURL: "http://localhost:11434/v1" })
```

### The honest comparison

- **Self-hosting is not cheaper until utilization is high.** A GPU costs the same idle, and a provider charges nothing when you are not calling it
- Open models are strong and still behind frontier models on hard reasoning and long tool chains
- The real reasons are **data that cannot leave**, a **very high steady volume**, or a **latency floor** a network round trip cannot meet
