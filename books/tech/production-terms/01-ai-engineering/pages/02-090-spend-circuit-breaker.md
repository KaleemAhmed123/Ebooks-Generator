## Spend Circuit Breaker

A hard cap that stops AI spend when a per-tenant or global budget is exceeded,
so a runaway loop cannot produce a five-figure surprise.

A bugged agent retried in a loop overnight. A per-tenant hourly ceiling capped
the damage at a defined amount instead of an unbounded bill.

### How it works

**A bug in a normal service produces errors. A bug in an AI system can produce a
bill.**

The dangerous shape is a loop — an agent retrying a failing tool, a job
reprocessing the same documents, a retry path with no cap. Each individual call
is legitimate and small. Overnight and unattended, they accumulate into a number
nobody budgeted for.

A spend breaker tracks cost per tenant, per feature and globally over a window,
and enforces limits:

| Limit | Behaviour |
|---|---|
| Soft | alert, and degrade to a cheaper model |
| Hard | reject requests outright, with a clear error |

It is the same reasoning as a circuit breaker for a failing dependency: stop
automatically, because by the time a human notices, the damage is already done.

### In practice

**Agents need tighter caps than request-response features**, because a single
run can make many calls. Bound steps, tokens and wall-clock time per run
alongside the spend limit, so a loop terminates on whichever bound trips first.

And **alert on the rate of spend, not just the total**. A sharp increase is
actionable hours before the absolute number crosses any threshold — which is the
difference between a quick fix and a conversation with finance.
