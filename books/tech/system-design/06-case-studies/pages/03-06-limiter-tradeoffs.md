## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| what does the client see | `429 Too Many Requests` (RFC 6585) with `Retry-After` (RFC 9110) in seconds; and on every `200`, the remaining quota in `X-RateLimit-Limit / -Remaining / -Reset` headers, the trio GitHub and Stripe-style APIs send, so a well-behaved client slows down before the 429 |
| which key | per API token for authenticated traffic, per IP for anonymous; per IP alone punishes everyone behind one NAT, per token alone lets an attacker rotate tokens. Both, with the stricter one winning |
| fairness between tenants | one tenant's burst must not empty the backend for the rest: a limit per tenant on top of the limit per key, and a global admission limit at the gateway that sheds when the sum exceeds capacity (booklet 05) |
| hot keys | one tenant, one shard: split the counter into k sub-keys or batch increments in the gateway (page 4); watch the shard's ops/s, not the tenant's |
| different limits per route | `POST /payments` at 10 a minute, `GET /prices` at 1 000: the route is part of the key, and the config is data, not code |
| what is not a rate limiter | volumetric DDoS: packets that never reach layer 7 are the network's problem, not this design's |

- The headers are the design's user interface. Developers consume APIs through client libraries that read `Retry-After`; a limiter that returns a bare 429 produces retry storms (booklet 01) from clients guessing when to try again
- Rate limiting and load shedding are different questions with similar mechanics. Limiting is per client, configured, fair; shedding is global, by measured load, and drops whoever arrives when the system is full. Booklet 05 owns shedding; the interviewer wants to hear that the two are separate and where each sits
- The 6 % rate error on page 3 and the per-PoP inaccuracy on page 4 are both acceptable for the same reason: a limit is a fence. Where the count must be exact, a paid quota billed per call, it is a ledger problem (Module 11) and the rate limiter is only its first, approximate line

### The failure

- A silent drop. Requests over the limit are closed without a status, the client retries immediately, and the limiter now serves 3× the traffic it refused. A limiter that does not say "wait 30 seconds" has told the client "try again now"
