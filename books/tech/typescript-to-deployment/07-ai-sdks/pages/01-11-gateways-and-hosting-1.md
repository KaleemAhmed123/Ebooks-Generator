## Where the model actually runs

- Calling a provider directly is one option of four, and the others exist for reasons that arrive later: procurement, data residency, cost, and privacy

| Route | Means | Fits |
|---|---|---|
| **Direct API** | your key, their endpoint | almost everything |
| **Cloud marketplace** | Bedrock, Vertex, Foundry | your data stays in your cloud account and region |
| **Gateway** | OpenRouter, LiteLLM, a proxy you run | one key, many models, central budget and logging |
| **Self-hosted** | Ollama, vLLM, llama.cpp | data cannot leave, or volume makes it cheaper |

### Cloud marketplaces

- Bedrock and Vertex run the same frontier models inside your cloud account, billed on your existing contract
- **The data residency and procurement story is the reason to use them**, not price or capability
- The SDKs support them directly, so the code barely changes

```ts
import { createAnthropic } from "@ai-sdk/anthropic"
const bedrock = createAnthropic({ baseURL: process.env.BEDROCK_URL })
```
