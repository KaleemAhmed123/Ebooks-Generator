## Blocking the Event Loop

Node runs your JavaScript on one thread. Any synchronous CPU work on that thread
stalls every concurrent request on the process, including the health check the
orchestrator is about to fail you on.

bcrypt at cost factor 12 costs roughly 250ms of pure CPU. At forty logins per
second, one Node process is doing nothing else at all — and the profile shows
low I/O wait, which is why it gets misread as a slow database.

The usual culprits are dull: `JSON.parse` of a large payload, `readFileSync`,
synchronous crypto, sorting a big array, and a regex that backtracks. Each moves
to `worker_threads`, a stream, or a queue.

## Bulkification

Writing every trigger and helper against a collection instead of a single
record. Not a style preference — Apex triggers fire in batches of up to 200, and
per-transaction limits are counted across the whole batch.

| Shape | Cost on 200 records |
|---|---|
| `SELECT` inside the `for` loop | 200 SOQL queries — over the limit of 100 |
| query once, build a `Map<Id, X>`, then loop | 1 SOQL query |

The failure is invisible in development because a developer saves one record at
a time. It appears the first time someone runs a data import, and it fails the
whole import rather than the row that crossed the line.
