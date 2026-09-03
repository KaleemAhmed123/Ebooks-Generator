## Provider Rate Limit Handling

Respecting the provider's per-minute token and request budgets, because ignoring
them turns a load spike into a wall of 429s.

A batch job consumed the whole organisation's token budget and the interactive
product started failing. Separate keys plus a client-side limiter fixed it.

### How it works

Providers cap requests and tokens per minute per account. Cross the line and you
get 429s — and retrying naively extends the throttling rather than escaping it.

Three things to get right, in order of how often they are missed.

**Respect the response.** Rate limit headers report your remaining budget and
when it resets; `Retry-After` states exactly how long to wait. Honouring those
beats any backoff you would invent, because it is the provider telling you the
answer.

**Limit on your side before calling**, so you shape traffic rather than
discovering the ceiling by hitting it.

**Separate workloads** — and this is the one that causes real incidents. Batch
jobs and interactive requests share one account budget by default, so a backfill
can consume the entire quota and take down the user-facing product while doing
nothing wrong.

### In practice

Use separate API keys or explicit budget allocations for interactive versus
background work, and give background jobs a hard ceiling well below the total.

Background work is by definition able to wait. Users are not. Making that
asymmetry explicit in configuration is what stops a well-intentioned bulk job
from becoming an outage that nobody can attribute to a deploy.
