## Graceful degradation

- **Graceful degradation** is deciding, per feature, what "worse but up" looks like before the dependency is down, so that when the breaker opens (page 3) or the bulkhead fills (page 4) the caller has an answer ready instead of an error. The core path survives; the decorations fall away, one at a time, each by its own rule

| Feature | Depends on | Degraded form | The user sees |
| :--- | :--- | :--- | :--- |
| home page recommendations | recommendation service | the cached "top sellers" list, or the panel hidden | a home page, slightly less personal |
| search results | spelling correction | exact matches only; no "did you mean" | results, without the hint |
| a feed | like and comment counts | the feed without counts | posts that scroll and read |
| a video page | subtitle translation | the original language; the translate button hidden | the video |
| a product page | inventory service | "availability unknown, check at checkout" from a stale copy | the page, and checkout decides (page 8) |
| checkout | payment provider | none: an honest error and a retry later (booklet 06's payment design) | the truth, because a fake success is worse |

- The mechanism is small: the call to the dependency is wrapped (breaker, bulkhead, deadline), its failure is caught in the caller, and the caller returns a `200` with the degraded shape and a flag that says so, `"degraded": ["recommendations"]`, so the client can render honestly and the dashboards can count it (Module 6, page 8). A `500` is what happens when nobody decided
- It is a product decision as much as an engineering one, so the table is written before the outage: which panels are decoration, which stale copies are acceptable, which features must fail loudly (page 8). The BFF (Module 3, page 6) holds the per-screen version

### The failure

- The recommendations service is down and the home page returns a `500`. A side panel nobody would miss took down the page that holds the search box, the login and the cart, because its call had no fallback and its exception propagated to the top. Every non-core dependency is a place where the answer to "what if this is down" must be written in code, in advance
