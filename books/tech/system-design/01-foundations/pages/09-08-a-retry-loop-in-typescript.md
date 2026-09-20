## A retry loop in TypeScript

- Bringing together classification, budget, backoff, jitter, and deadline propagation:

```typescript
async function fetchWithRetry(url: string, signal: AbortSignal) {
  const maxAttempts = 3;
  const base = 50; // ms
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 1. Deadline propagation (fail fast if parent gave up)
    if (signal.aborted) throw new Error('Deadline exceeded');
    
    // 2. Budget check (conceptual)
    if (!retryBudget.hasTokens()) throw new Error('Budget exhausted');
    
    try {
      return await fetch(url, { signal });
    } catch (err) {
      const isTransient = err.name === 'TimeoutError' || err.status >= 500;
      if (!isTransient || attempt === maxAttempts - 1) {
        throw err; // Terminal, or out of attempts
      }
      
      // 3. Backoff and Jitter
      const expBackoff = base * Math.pow(2, attempt);
      const sleep = Math.random() * expBackoff; // Full jitter
      
      // 4. Server-directed retry (if headers exist)
      const retryAfter = parseRetryAfter(err.headers) || 0;
      const finalSleep = Math.max(sleep, retryAfter * 1000 + Math.random() * 5000);
      
      await delay(finalSleep, signal);
    }
  }
}
```

- If `signal` aborts during the `delay()`, the loop exits immediately. The client never wakes up just to send a request nobody wants
