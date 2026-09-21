## What async costs

- The broker's return value is "stored". Everything that used to be a synchronous answer becomes something else

| | Direct call | Through a broker |
|---|---|---|
| result | success or failure, now | "accepted"; whether the work happened is a later question |
| consistency | the caller sees the effect when the call returns | **eventual**: the effect appears some time after the response, and that time is not bounded |
| duplicates | one call, one effect, unless the caller retries | built in: the broker redelivers on any doubt (Module 5), so every consumer must be idempotent (booklet 01) |
| ordering | whatever order the caller used | per partition or per key at best (Module 4); none by default |
| failure | the caller learns and can tell the user | the consumer learns, hours later, in a log the user never sees |
| operations | stateless app servers | one more stateful cluster: disk, retention, lag, rebalances |

- None of these is a reason to avoid brokers. They are the bill, and it is paid in full whether or not the job needed one. Creating a user and its settings row is one database transaction; it does not need a queue
- The rule: the broker takes the work the caller does not need the answer to; the part that produces the answer stays synchronous. Booklet 05 is the wider sync-versus-async choice between services

### The failure

- "We went async and now nobody can answer 'did it happen yet?'" The API returns 202 before the export runs; the client shows a success page; the export fails in a consumer an hour later. Nothing told the user. An async write needs a status the client can read back: a job row, a poll endpoint or a push (Module 14, page 3)
