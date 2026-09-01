### Rate limits come in two units

- **Requests per minute** and **tokens per minute**, and the token limit is usually the one you hit first
- The response headers report both remaining counts, so a queue can pace itself rather than guessing

### The two rules from Booklet 6 that matter most here

- **One retry layer.** The SDK already retries. Wrapping it in your own retry makes eight calls out of one
- **A timeout on every call**, and a circuit breaker in front of it, so a provider outage degrades one feature rather than the service
