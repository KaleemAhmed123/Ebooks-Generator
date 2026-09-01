## Choosing a model

- Providers ship families, not single models, and the split is almost always the same: a large one, a mid one, and a small fast one
- The mistake is defaulting to the largest. Most production traffic is classification, extraction and summarizing, which the small model does at a fraction of the cost

| Tier | Fits | Trade |
|---|---|---|
| large | hard reasoning, agents, code | slowest, most expensive |
| mid | most product features | the usual default |
| small | classify, extract, route, tag | weakest at multi-step reasoning |

```ts
// current identifiers, verified against the provider model lists
"claude-opus-5"    // Anthropic, large
"claude-sonnet-5"  // Anthropic, mid
"claude-haiku-4-5" // Anthropic, small
"gpt-5.5"          // OpenAI, large
```

### Read the model list from the API, not from a blog

```ts
const models = await client.models.list()
```

- Identifiers change, models retire, and a hard-coded string is a future outage
- **Keep the model id in configuration**, never inline, so switching is a deploy and not a code change

### How to actually pick

- Start on the mid model, build the feature, then try the small one against a saved set of real inputs
- If the small one passes, ship it. That decision is usually a ten times cost difference
- Module 9 covers the evaluation set that makes this a measurement rather than an argument
