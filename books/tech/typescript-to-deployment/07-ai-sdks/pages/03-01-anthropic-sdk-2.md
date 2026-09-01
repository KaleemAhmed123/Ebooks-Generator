### The three differences worth noting immediately

- **`max_tokens` is required.** There is no default, and leaving it out is a `400`
- **`system` is a top-level field**, not a message with a role. That separation is what makes prompt caching straightforward later
- **`content` is always an array of blocks**, never a plain string on the way out. The next page covers why that matters

### Client options

```ts
const client = new Anthropic({ timeout: 30_000, maxRetries: 2 })
```

- The SDK retries connection errors, `408`, `409`, `429`, `5xx` and the overloaded `529`, with backoff
- Everything in the failures page of Module 2 applies here unchanged
