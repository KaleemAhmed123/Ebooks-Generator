### The thing that makes it worth the setup

Backend tracing already existed. What OpenTelemetry in the browser adds is that
the browser span and the server span **join the same trace**.

The browser SDK attaches a `traceparent` header to outgoing requests. Your API,
already instrumented with OpenTelemetry, continues the trace instead of starting
a new one. The result is a single waterfall that runs from the click, through
the fetch, into your API gateway, into the database query, and back.

That answers the question that used to be unanswerable: the user says the page
took eight seconds, and you can see that six of them were one database query.
Before, the frontend team said "the API was slow" and the backend team said
"our p99 is 80ms," and both were telling the truth about different things.

```
click ──────────────────────────────────────────────── 8.2s
  └─ fetch /api/orders ─────────────────────────────── 7.9s
       └─ [server] GET /api/orders ────────────────── 7.6s
            ├─ auth check ─── 0.1s
            └─ SELECT orders ──────────────────────── 7.4s   <- here
```
