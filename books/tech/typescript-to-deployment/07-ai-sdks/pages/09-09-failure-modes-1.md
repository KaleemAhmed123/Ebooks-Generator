## When it breaks

- Model providers have outages, degrade under load, and change model behavior without a deploy on your side
- **Design for the provider being unavailable**, exactly as Booklet 6 argues for every dependency

| Failure | Looks like | Response |
|---|---|---|
| provider outage | `500`, `503`, `529` | fall back to another provider or degrade |
| rate limited | `429` | queue it, back off with jitter |
| slow, not down | p99 climbing | timeout, shed load, circuit breaker |
| context overflow | `400` on length | trim history, then fail clearly |
| schema violation | parse error | one retry, then fall back |
| quality drift | no error at all | the evaluation set catches it |

```ts
const providers = ["anthropic:chat", "openai:chat"]

for (const name of providers) {
  try {
    return await generateText({ model: registry.languageModel(name), prompt })
  } catch (err) {
    if (!isRetryable(err)) throw err
    logger.warn({ name, err }, "provider failed, trying next")
  }
}
return DEGRADED_RESPONSE
```
