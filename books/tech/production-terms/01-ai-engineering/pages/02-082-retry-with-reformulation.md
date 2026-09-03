## Retry with Reformulation

On failure, changing something before retrying — rephrasing the query, widening
retrieval, including the validation error — rather than sending the identical
request again.

Retrieval returned nothing for a query containing an internal acronym. Retrying
identically would fail identically; expanding the acronym found the document.

### How it works

Retrying an identical request against a deterministic failure produces an
identical failure, at twice the cost.

Plain retry is right for **transient** problems — a timeout, a rate limit, a
503. The same request will eventually work. It is wrong when the request itself
was the problem.

Reformulation changes something before the second attempt:

| Failure | Change |
|---|---|
| Retrieval returned nothing | expand acronyms, drop filters, widen k, rewrite the query |
| Output failed validation | include the specific validation error |
| The model refused something legitimate | rephrase to clarify intent |

**The distinction to encode in your retry logic is transient versus
deterministic** — will the same request eventually work, or will it never.

### In practice

Cap reformulation attempts as tightly as ordinary retries, and log what changed
on each one.

Otherwise a request that fails for a perfectly good reason — the information
genuinely is not in your corpus — burns budget cycling through rewrites, when
the correct outcome was to abstain after the first attempt and say so.
