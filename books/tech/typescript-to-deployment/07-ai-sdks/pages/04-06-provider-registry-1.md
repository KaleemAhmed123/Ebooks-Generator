## Routing between models

- A real product does not use one model. Classification goes to a small one, the chat to a mid one, the hard reasoning to a large one
- Scattering provider imports across the codebase makes that impossible to change and impossible to see
- A **provider registry** puts every model behind one named lookup, so the mapping lives in one file

```ts
import { createProviderRegistry, customProvider, wrapLanguageModel,
         defaultSettingsMiddleware } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

export const registry = createProviderRegistry({
  openai,
  anthropic: customProvider({
    languageModels: {
      fast: anthropic("claude-haiku-4-5"),
      chat: anthropic("claude-sonnet-5"),
      reasoning: wrapLanguageModel({
        model: anthropic("claude-opus-5"),
        middleware: defaultSettingsMiddleware({
          settings: { maxOutputTokens: 8192 },
        }),
      }),
    },
    fallbackProvider: anthropic,
  }),
})

const model = registry.languageModel("anthropic:fast")
```
