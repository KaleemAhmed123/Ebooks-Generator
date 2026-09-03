## Async Request-Reply

Work too slow for a request cycle: accept it, hand back a job ID immediately,
and let the client poll or take a callback.

A four-minute document analysis behind a synchronous endpoint trips every
gateway timeout between it and the user. Returning `202` with a status URL makes
the slowness a declared part of the API instead of an intermittent failure.

```http
POST /jobs        → 202  { id, status_url }
GET  /jobs/{id}   → 200  { state: "running", pct: 40 }
GET  /jobs/{id}   → 200  { state: "done", result_url }
```

Offer a webhook alongside the status URL. Polling is the fallback, not the
design.

## Audit Log Design

An append-only record of who did what, when, and to which resource. Regulators
and incident reviews both want it, and neither accepts application logs as a
substitute.

"Who changed this customer's credit limit in March?" cannot be answered from
debug logs. A dedicated immutable table — actor, action, target, timestamp,
before, after, request ID — answers it in one query.

Keep it in its own store with its own retention. Audit records and debug logs
have different lifecycles, different access rules and different people asking
for them, and mixing the two means the strictest rule wins for both.
