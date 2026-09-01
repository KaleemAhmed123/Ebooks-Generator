## Failures, retries and limits

- This is an outbound call to a busy third party, so it fails in all the ordinary ways plus a few of its own
- The SDK retries connection errors, `408`, `409`, `429` and `5xx` twice by default, with backoff. It does **not** retry a `400`

```ts
import OpenAI from "openai"

try {
  await client.responses.create({ ... })
} catch (err) {
  if (err instanceof OpenAI.APIError) {
    logger.error({ status: err.status, requestId: err.request_id }, "llm call failed")
  }
  throw err
}
```

- **Log `request_id` on every failure.** It is the only identifier provider support can act on

| Status | Means | Do |
|---|---|---|
| `400` | bad request, usually schema or context length | fix it, never retry |
| `401` | bad key | fail loudly at boot instead |
| `429` | rate limit or no credit | back off, or queue the work |
| `500` `503` | provider trouble | retry with jitter, then fall back |
| `529` | provider overloaded | same, and expect it during peaks |
