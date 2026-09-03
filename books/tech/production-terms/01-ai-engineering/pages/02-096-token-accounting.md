## Token Accounting

Recording input, output and cached tokens per request, tagged by feature, tenant
and model, so cost can be attributed rather than guessed.

A single monthly provider invoice tells you nothing. Per-feature accounting
showed one rarely used export feature was 40% of total spend.

### How it works

A monthly invoice is one number and nothing you can act on. Token accounting is
recording usage per request with enough context to attribute it.

What to record: input tokens, output tokens, cached tokens, the model, and tags
for feature, tenant, user and trace ID.

With those you can answer the questions that actually drive decisions:

- Which feature costs the most?
- Which tenants are unprofitable at their current price?
- Is prompt caching actually working, or just configured?
- Did last week's prompt change move the bill?

**The pattern that shows up almost every time this gets instrumented is a
surprise** — some feature nobody thought about accounting for a large share of
spend. Usually a background job, a retry path, or an internal tool that was
never counted because it was never customer-facing.

### In practice

**Instrument it on day one**, not when cost becomes a concern. Retrofitting
attribution leaves you with no history to compare against, so the first month of
data has nothing to be measured relative to.

The natural place is the model gateway, where every call already passes through.
One implementation instead of one per service, and it cannot be forgotten by a
team that adds a new caller.
