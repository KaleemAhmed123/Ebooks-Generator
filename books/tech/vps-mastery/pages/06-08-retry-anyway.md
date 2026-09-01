## Retry in the application anyway

- `condition: service_healthy` fixes startup order. It does not fix the database restarting at 3am while the application keeps running
- A production service must survive its dependencies going away and coming back

```ts
async function connectWithRetry(attempt = 1): Promise<Pool> {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.query("SELECT 1");
    return pool;
  } catch (err) {
    if (attempt >= 10) throw err;
    const wait = Math.min(1000 * 2 ** attempt, 30_000);
    console.warn(`db not ready, retry ${attempt} in ${wait}ms`);
    await new Promise((r) => setTimeout(r, wait));
    return connectWithRetry(attempt + 1);
  }
}
```

- **Exponential backoff with a ceiling.** Doubling the wait, capped at 30 seconds, so a restarting database is not hit by every service at once

### Do not retry forever silently

- Ten attempts over roughly a minute, then exit non-zero. The restart policy on page 06-10 brings the container back and the cycle is visible in `docker ps`
- A process that retries forever without logging looks healthy while serving nothing

### The same rule for outbound calls

- Payment providers, mail services and object storage all fail intermittently. Retry the ones that are safe to repeat
- **Only retry idempotent operations.** Retrying a charge creates a second charge. That needs an idempotency key, not a retry loop
