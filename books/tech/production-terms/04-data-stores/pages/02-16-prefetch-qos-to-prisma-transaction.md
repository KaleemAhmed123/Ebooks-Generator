## Prefetch / QoS

How many unacknowledged messages one consumer is allowed to hold. Unlimited
prefetch means one consumer takes the whole queue and the rest sit idle.

With the default, consumer A grabs ten thousand messages while B and C have
nothing to do. Adding consumers does not help, because the work was already
handed out.

`prefetch = 20` spreads the work and bounds each consumer's memory at the same
time.

The number is a trade: too low and consumers wait on network round trips between
messages, too high and you are back to one greedy consumer. Somewhere between
ten and a hundred suits most workloads, and the right end depends on how long a
single message takes to process.

## Prisma $transaction

Two forms. An array of operations run atomically, or an interactive callback
where you can branch on results. The interactive form holds a database
connection for its entire duration.

Wrapping an external HTTP call inside `$transaction` holds a connection for
three seconds. Twenty concurrent requests exhaust the pool, and the symptom is
timeouts on endpoints that have nothing to do with the slow call.

| Form | Use for |
|---|---|
| `$transaction([a, b, c])` | a fixed atomic batch, no branching |
| `$transaction(async (tx) => …)` | when a later write depends on an earlier read |

**Never await a network call inside the interactive form** — no HTTP, no queue
publish, no third-party SDK. The transaction should contain database work and
nothing else, and should be short enough that its duration is uninteresting.
