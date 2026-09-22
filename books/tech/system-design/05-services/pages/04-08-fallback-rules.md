## Fallbacks that are safe

- A fallback is an answer given without the dependency. Three kinds: a stale value from a cache, a static default, or skipping the feature. Each is safe for some data and dangerous for other data, and the rule for telling them apart is the cost of being wrong: when a wrong answer costs money, permission or data, the safe fallback is the error

| Dependency | Safe fallback | Unsafe fallback | Why |
| :--- | :--- | :--- | :--- |
| user profile | the cached copy: an old avatar | an empty profile the next save writes back | stale is harmless; an empty default that gets persisted destroys data |
| pricing | the last price seen, with a bounded age, or "unavailable" | `0.00` or a hard-coded value | a wrong price is a loss on every order |
| inventory | "availability unknown"; checkout decides | "in stock" | an oversold order is a refund; "unknown" is honest |
| fraud check | decline, or hold for review | approve | approving everything is what the check exists to prevent |
| authorisation | deny | allow | fail-open on permissions is a breach; "try again" is a ticket |

- A stale value is safe when it was true once and its age is bounded: the fallback carries its timestamp, and past a maximum age it becomes "unavailable" rather than a lie. Fail-open and fail-closed are both right somewhere: a public rate limiter may fail open, because the cost is a burst; authorisation fails closed, because the cost is everything. The rule is per dependency, and the breaker's fallback function is where it lives

### The failure

- Fallback "allow" on the authorisation service. The call was wrapped in a breaker, the breaker's fallback returned `true` so that "the site stays up", and for the length of the outage every request was authorised as whoever it claimed to be. The system was up and the data was gone. When a fallback is worse than an error, the fallback is the error
